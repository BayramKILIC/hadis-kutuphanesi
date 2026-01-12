# Intégration des données Bukhari

Ce dossier contient les scripts pour intégrer les données de `bukhari-10-books.ts` dans votre fichier principal `hadiths.ts`.

## 📁 Fichiers

- `integrate-bukhari-data.js` - Script Node.js
- `integrate-bukhari-data.py` - Script Python (recommandé)
- `README.md` - Ce fichier

## 🚀 Utilisation

### Option 1: Script Python (Recommandé)

```bash
# Assurez-vous d'être dans le dossier du projet
cd /chemin/vers/hadis-kutuphanesi

# Exécuter le script
python3 integrate-bukhari-data.py

# Ou spécifier le chemin du fichier source
python3 integrate-bukhari-data.py ./data/bukhari-10-books.ts
```

### Option 2: Script Node.js

```bash
# Exécuter le script
node integrate-bukhari-data.js

# Ou spécifier le chemin du fichier source
node integrate-bukhari-data.js ./data/bukhari-10-books.ts
```

## ✨ Fonctionnalités

Les scripts effectuent automatiquement:

1. **Extraction du texte du hadith** 
   - Enlève la chaîne de transmission (isnad)
   - Garde uniquement le texte principal du hadith (matn)
   - Exemple: 
     ```
     Avant: "حَدَّثَنَا... قَالَ: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ""
     Après: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ"
     ```

2. **Nettoyage des narrateurs**
   - Enlève le préfixe "Narrated"
   - Exemple:
     ```
     Avant: "Narrated 'Umar bin Al-Khattab:"
     Après: "'Umar bin Al-Khattab"
     ```

3. **Formatage TypeScript propre**
   - Génère du code TypeScript bien formaté
   - Échappe correctement les guillemets
   - Structure hiérarchique claire

4. **Statistiques**
   - Affiche le nombre de livres, chapitres et hadiths
   - Calcule la taille du fichier généré

## 📊 Structure de sortie

Le fichier `data/hadiths.ts` généré aura cette structure:

```typescript
export const hadithData = {
  collections: [
    {
      id: 'bukhari',
      name: 'Sahih al-Bukhari',
      nameAr: 'صحيح البخاري',
      books: [
        {
          id: 'kitab1',
          name: 'İman Kitabı',
          nameAr: 'كتاب الإيمان',
          chapters: [
            {
              id: 'ch1',
              name: 'Chapitre 1',
              nameAr: '',
              hadiths: [
                {
                  id: 1,
                  textAr: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ...',
                  textTr: '',
                  narrator: '\'Umar bin Al-Khattab',
                  narratorAr: '',
                  reference: 'Buhari 1',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
```

## 📝 Prochaines étapes après l'intégration

1. **Vérifier le fichier généré**
   ```bash
   cat data/hadiths.ts | head -100
   ```

2. **Ajouter les traductions turques**
   - Les champs `textTr` sont vides
   - Vous pouvez les remplir manuellement ou via une API

3. **Corriger les noms de chapitres**
   - Actuellement: "Chapitre 1", "Chapitre 2", etc.
   - À remplacer par les vrais noms turcs

4. **Compléter les narrateurs en arabe**
   - Les champs `narratorAr` sont vides
   - À remplir si nécessaire

5. **Intégrer dans votre application**
   ```typescript
   import { hadithData } from './data/hadiths';
   
   // Utiliser les données
   const bukhari = hadithData.collections[0];
   const firstBook = bukhari.books[0];
   ```

## 🔧 Personnalisation

Si vous voulez modifier le comportement des scripts:

### Script Python
Éditez les fonctions:
- `extract_hadith_text()` - Pour changer la logique d'extraction
- `clean_narrator()` - Pour changer le nettoyage des narrateurs
- `generate_typescript_file()` - Pour changer le format de sortie

### Script Node.js
Éditez les fonctions:
- `extractHadithText()` - Pour changer la logique d'extraction
- `cleanNarrator()` - Pour changer le nettoyage des narrateurs
- `generateHadithsFile()` - Pour changer le format de sortie

## ⚠️ Notes importantes

- Le fichier `data/hadiths.ts` sera **écrasé** à chaque exécution
- Faites une sauvegarde si vous avez fait des modifications manuelles
- Les traductions turques doivent être ajoutées séparément
- La taille du fichier peut être importante (plusieurs MB)

## 🐛 Résolution de problèmes

### Erreur: "Fichier non trouvé"
```bash
# Vérifiez le chemin
ls -la data/bukhari-10-books.ts

# Spécifiez le chemin complet
python3 integrate-bukhari-data.py /chemin/complet/vers/bukhari-10-books.ts
```

### Erreur: "Parsing JSON"
Le fichier source peut contenir des caractères invalides. Essayez le script Python qui est plus robuste.

### Fichier trop volumineux
Si le fichier généré est trop gros pour être commité dans Git:
```bash
# Ajouter au .gitignore
echo "data/hadiths.ts" >> .gitignore
```

## 📧 Support

Si vous rencontrez des problèmes, vérifiez:
1. Que le fichier source existe et est bien formaté
2. Que vous avez les permissions d'écriture dans le dossier `data/`
3. Que Python 3 ou Node.js sont bien installés
