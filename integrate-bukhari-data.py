#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'intégration des données Bukhari
Ce script lit bukhari-10-books.ts et génère un fichier hadiths.ts propre
avec extraction intelligente du texte du hadith
"""

import re
import json
import sys
from pathlib import Path

def extract_hadith_text(full_text):
    """
    Extrait le texte du hadith en enlevant la chaîne de transmission (isnad)
    
    Le hadith complet contient généralement:
    1. La chaîne de transmission (isnad): حَدَّثَنَا... قَالَ...
    2. Le texte du hadith (matn): généralement entre guillemets
    """
    
    # Nettoyer les espaces
    text = full_text.strip()
    
    # Chercher le texte entre guillemets (pattern le plus courant)
    quote_patterns = [
        r'["""]([^"""]+)["""]',  # Guillemets arabes ou anglais
        r'\"([^\"]+)\"',  # Guillemets simples
    ]
    
    for pattern in quote_patterns:
        matches = re.findall(pattern, text)
        if matches:
            # Prendre le dernier match (souvent le texte principal du hadith)
            return matches[-1].strip()
    
    # Si pas de guillemets, chercher après les indicateurs de parole
    speech_indicators = [
        r'يَقُولُ\s*:?\s*(.+)',
        r'قَالَ\s*:?\s*(.+)',
        r'فَقَالَ\s*:?\s*(.+)',
    ]
    
    for pattern in speech_indicators:
        match = re.search(pattern, text)
        if match:
            return match.group(1).strip()
    
    # Sinon, retourner le texte tel quel
    return text

def clean_narrator(narrator):
    """Nettoie le nom du narrateur"""
    narrator = narrator.strip()
    narrator = re.sub(r'^Narrated\s+', '', narrator, flags=re.IGNORECASE)
    narrator = re.sub(r':\s*$', '', narrator)
    return narrator.strip()

def escape_quotes(text):
    """Échappe les guillemets simples pour TypeScript"""
    return text.replace("'", "\\'").replace('\\n', ' ')

def parse_bukhari_data(file_path):
    """Parse le fichier bukhari-10-books.ts"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Trouver l'objet de données
    match = re.search(r'export const bukhari10Books = ({[\s\S]+});', content)
    if not match:
        raise ValueError("Impossible de trouver les données dans le fichier")
    
    # Extraire et nettoyer le JSON
    data_str = match.group(1)
    
    # Remplacer les clés non quotées par des clés quotées pour JSON valide
    data_str = re.sub(r'(\w+):', r'"\1":', data_str)
    
    # Parser le JSON
    try:
        data = json.loads(data_str)
    except json.JSONDecodeError as e:
        print(f"Erreur de parsing JSON: {e}")
        print("Tentative avec eval...")
        # Fallback: utiliser une méthode plus permissive
        data = eval(data_str)
    
    return data

def generate_typescript_file(data):
    """Génère le contenu du fichier TypeScript"""
    
    lines = [
        "// data/hadiths.ts",
        "// Base de données des hadiths authentiques",
        "// Généré automatiquement - Ne pas modifier manuellement",
        "",
        "export const hadithData = {",
        "  collections: [",
        "    {",
        "      id: 'bukhari',",
        "      name: 'Sahih al-Bukhari',",
        "      nameAr: 'صحيح البخاري',",
        "      books: ["
    ]
    
    total_hadiths = 0
    
    # Parcourir les livres
    for book_idx, book in enumerate(data['books']):
        lines.append("        {")
        lines.append(f"          id: '{book['id']}',")
        lines.append(f"          name: '{escape_quotes(book['name'])}',")
        lines.append(f"          nameAr: '{escape_quotes(book['nameAr'])}',")
        lines.append("          chapters: [")
        
        # Parcourir les chapitres
        for chapter_idx, chapter in enumerate(book['chapters']):
            lines.append("            {")
            lines.append(f"              id: '{chapter['id']}',")
            lines.append(f"              name: '{escape_quotes(chapter['name'])}',")
            lines.append(f"              nameAr: '{escape_quotes(chapter['nameAr'])}',")
            lines.append("              hadiths: [")
            
            # Parcourir les hadiths
            for hadith_idx, hadith in enumerate(chapter['hadiths']):
                # Extraire le texte propre du hadith
                clean_text_ar = extract_hadith_text(hadith['textAr'])
                clean_narrator = clean_narrator(hadith['narrator'])
                
                lines.append("                {")
                lines.append(f"                  id: {hadith['id']},")
                lines.append(f"                  textAr: '{escape_quotes(clean_text_ar)}',")
                lines.append(f"                  textTr: '{escape_quotes(hadith['textTr'])}',")
                lines.append(f"                  narrator: '{escape_quotes(clean_narrator)}',")
                lines.append(f"                  narratorAr: '{escape_quotes(hadith['narratorAr'])}',")
                lines.append(f"                  reference: '{escape_quotes(hadith['reference'])}',")
                lines.append(f"                  grade: '{escape_quotes(hadith['grade'])}'")
                
                # Ajouter une virgule sauf pour le dernier élément
                if hadith_idx < len(chapter['hadiths']) - 1:
                    lines.append("                },")
                else:
                    lines.append("                }")
                
                total_hadiths += 1
            
            lines.append("              ]")
            
            if chapter_idx < len(book['chapters']) - 1:
                lines.append("            },")
            else:
                lines.append("            }")
        
        lines.append("          ]")
        
        if book_idx < len(data['books']) - 1:
            lines.append("        },")
        else:
            lines.append("        }")
    
    lines.extend([
        "      ]",
        "    }",
        "  ]",
        "};",
        "",
        "export default hadithData;",
        ""
    ])
    
    return '\n'.join(lines), total_hadiths

def main():
    print("🚀 Début de l'intégration des données Bukhari...\n")
    
    # Déterminer le chemin du fichier
    if len(sys.argv) > 1:
        input_file = Path(sys.argv[1])
    else:
        input_file = Path('./data/bukhari-10-books.ts')
    
    if not input_file.exists():
        print(f"❌ Erreur: Le fichier {input_file} n'existe pas")
        sys.exit(1)
    
    print(f"📖 Lecture de {input_file}...")
    
    # Parser les données
    try:
        data = parse_bukhari_data(input_file)
    except Exception as e:
        print(f"❌ Erreur de parsing: {e}")
        sys.exit(1)
    
    # Statistiques
    num_books = len(data['books'])
    num_chapters = sum(len(book['chapters']) for book in data['books'])
    
    print(f"✅ Données chargées:")
    print(f"   - {num_books} livres")
    print(f"   - {num_chapters} chapitres")
    
    # Générer le fichier TypeScript
    print("\n🔨 Génération du fichier hadiths.ts...")
    content, total_hadiths = generate_typescript_file(data)
    
    print(f"   - {total_hadiths} hadiths traités")
    
    # Écrire le fichier
    output_file = Path('./data/hadiths.ts')
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    file_size_kb = len(content) / 1024
    print(f"\n✅ Fichier généré: {output_file}")
    print(f"📊 Taille: {file_size_kb:.2f} KB")
    
    print("\n🎉 Intégration terminée avec succès!")
    print("\n📝 Prochaines étapes:")
    print("   1. Vérifier le fichier data/hadiths.ts")
    print("   2. Ajouter les traductions turques (textTr)")
    print("   3. Corriger les noms de chapitres si nécessaire")
    print("   4. Intégrer dans votre application Next.js")

if __name__ == "__main__":
    main()
