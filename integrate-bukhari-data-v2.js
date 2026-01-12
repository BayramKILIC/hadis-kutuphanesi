// Script d'intégration amélioré avec gestion correcte des échappements
const fs = require('fs');
const path = require('path');

// Fonction pour convertir un objet en TypeScript avec une indentation correcte
function objectToTypeScript(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    
    const items = obj.map(item => 
      spaces + '  ' + objectToTypeScript(item, indent + 1)
    ).join(',\n');
    
    return '[\n' + items + '\n' + spaces + ']';
  }
  
  if (obj !== null && typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    
    const items = entries.map(([key, value]) => {
      const tsValue = objectToTypeScript(value, indent + 1);
      return `${spaces}  ${key}: ${tsValue}`;
    }).join(',\n');
    
    return '{\n' + items + '\n' + spaces + '}';
  }
  
  if (typeof obj === 'string') {
    // Utiliser JSON.stringify pour échapper correctement les chaînes
    return JSON.stringify(obj);
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }
  
  return 'null';
}

function extractHadithText(fullText) {
  // Chercher les guillemets qui contiennent le hadith
  const quoteMatch = fullText.match(/[""]([^""]+)[""]$/);
  if (quoteMatch) {
    return quoteMatch[1].trim();
  }
  
  // Si pas de guillemets, chercher après les mots-clés courants
  const keywordMatch = fullText.match(/(?:يَقُولُ|قَالَ|فَقَالَ)(?:\s*:)?\s*[""]?([^""]+)[""]?$/);
  if (keywordMatch) {
    return keywordMatch[1].trim();
  }
  
  return fullText.trim();
}

function cleanNarrator(narrator) {
  return narrator
    .replace(/^Narrated\s+/i, '')
    .replace(/:\s*$/, '')
    .trim();
}

async function main() {
  try {
    console.log('🚀 Début de l\'intégration améliorée des données Bukhari...\n');
    
    const bukhariFilePath = process.argv[2] || './data/bukhari-10-books.ts';
    console.log(`📖 Lecture de ${bukhariFilePath}...`);
    
    if (!fs.existsSync(bukhariFilePath)) {
      throw new Error(`Le fichier ${bukhariFilePath} n'existe pas`);
    }
    
    const bukhariContent = fs.readFileSync(bukhariFilePath, 'utf-8');
    
    // Extraire l'objet JavaScript
    const dataMatch = bukhariContent.match(/export const bukhari10Books = ({[\s\S]+});/);
    if (!dataMatch) {
      throw new Error('Impossible de trouver les données dans le fichier');
    }
    
    // Parser les données avec eval (dans un contexte contrôlé)
    const bukhariData = eval('(' + dataMatch[1] + ')');
    
    console.log(`✅ Données chargées:`);
    console.log(`   - ${bukhariData.books.length} livres`);
    
    let totalChapters = 0;
    let totalHadiths = 0;
    
    // Nettoyer et transformer les données
    const cleanedData = {
      collections: [
        {
          id: 'bukhari',
          name: 'Sahih al-Bukhari',
          nameAr: 'صحيح البخاري',
          books: bukhariData.books.map(book => {
            totalChapters += book.chapters.length;
            
            return {
              id: book.id,
              name: book.name,
              nameAr: book.nameAr,
              chapters: book.chapters.map(chapter => {
                totalHadiths += chapter.hadiths.length;
                
                return {
                  id: chapter.id,
                  name: chapter.name,
                  nameAr: chapter.nameAr,
                  hadiths: chapter.hadiths.map(hadith => ({
                    id: hadith.id,
                    textAr: extractHadithText(hadith.textAr),
                    textTr: hadith.textTr,
                    narrator: cleanNarrator(hadith.narrator),
                    narratorAr: hadith.narratorAr,
                    reference: hadith.reference,
                    grade: hadith.grade
                  }))
                };
              })
            };
          })
        }
      ]
    };
    
    console.log(`   - ${totalChapters} chapitres`);
    console.log(`   - ${totalHadiths} hadiths\n`);
    
    // Générer le fichier TypeScript
    console.log('🔨 Génération du fichier hadiths.ts...');
    
    const output = `// data/hadiths.ts
// Base de données des hadiths authentiques
// Généré automatiquement - Ne pas modifier manuellement

export const hadithData = ${objectToTypeScript(cleanedData, 0)};

export default hadithData;
`;
    
    // Écrire le fichier
    const outputPath = './data/hadiths.ts';
    fs.writeFileSync(outputPath, output, 'utf-8');
    
    console.log(`✅ Fichier généré: ${outputPath}`);
    console.log(`📊 Taille: ${(output.length / 1024).toFixed(2)} KB\n`);
    
    console.log('🎉 Intégration terminée avec succès!');
    console.log('\n✨ Le fichier est maintenant sans erreurs de parsing!');
    console.log('\n🚀 Vous pouvez lancer: npm run dev');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
