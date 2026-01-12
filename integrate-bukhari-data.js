// Script d'intégration des données Bukhari
// Ce script lit bukhari-10-books.ts et génère un fichier hadiths.ts propre

const fs = require('fs');
const path = require('path');

// Fonction pour extraire le texte du hadith (sans la chaîne de transmission)
function extractHadithText(fullText) {
  // Chercher les guillemets qui contiennent le hadith proprement dit
  const quoteMatch = fullText.match(/[""]([^""]+)[""]$/);
  if (quoteMatch) {
    return quoteMatch[1].trim();
  }
  
  // Si pas de guillemets, chercher après les mots-clés courants
  const keywordMatch = fullText.match(/(?:يَقُولُ|قَالَ|فَقَالَ)(?:\s*:)?\s*[""]?([^""]+)[""]?$/);
  if (keywordMatch) {
    return keywordMatch[1].trim();
  }
  
  // Sinon retourner le texte tel quel
  return fullText.trim();
}

// Fonction pour nettoyer le narrateur
function cleanNarrator(narrator) {
  return narrator
    .replace(/^Narrated\s+/i, '')
    .replace(/:\s*$/, '')
    .trim();
}

// Fonction pour générer le code TypeScript
function generateHadithsFile(bukhariData) {
  let output = `// data/hadiths.ts
// Base de données des hadiths authentiques
// Généré automatiquement - Ne pas modifier manuellement

export const hadithData = {
  collections: [
    {
      id: 'bukhari',
      name: 'Sahih al-Bukhari',
      nameAr: 'صحيح البخاري',
      books: [\n`;

  // Parcourir tous les livres
  bukhariData.books.forEach((book, bookIndex) => {
    output += `        {\n`;
    output += `          id: '${book.id}',\n`;
    output += `          name: '${book.name}',\n`;
    output += `          nameAr: '${book.nameAr}',\n`;
    output += `          chapters: [\n`;
    
    // Parcourir tous les chapitres
    book.chapters.forEach((chapter, chapterIndex) => {
      output += `            {\n`;
      output += `              id: '${chapter.id}',\n`;
      output += `              name: '${chapter.name}',\n`;
      output += `              nameAr: '${chapter.nameAr}',\n`;
      output += `              hadiths: [\n`;
      
      // Parcourir tous les hadiths
      chapter.hadiths.forEach((hadith, hadithIndex) => {
        const cleanedTextAr = extractHadithText(hadith.textAr);
        const cleanedNarrator = cleanNarrator(hadith.narrator);
        
        output += `                {\n`;
        output += `                  id: ${hadith.id},\n`;
        output += `                  textAr: '${cleanedTextAr.replace(/'/g, "\\'")}',\n`;
        output += `                  textTr: '${hadith.textTr}',\n`;
        output += `                  narrator: '${cleanedNarrator.replace(/'/g, "\\'")}',\n`;
        output += `                  narratorAr: '${hadith.narratorAr}',\n`;
        output += `                  reference: '${hadith.reference}',\n`;
        output += `                  grade: '${hadith.grade}'\n`;
        output += `                }${hadithIndex < chapter.hadiths.length - 1 ? ',' : ''}\n`;
      });
      
      output += `              ]\n`;
      output += `            }${chapterIndex < book.chapters.length - 1 ? ',' : ''}\n`;
    });
    
    output += `          ]\n`;
    output += `        }${bookIndex < bukhariData.books.length - 1 ? ',' : ''}\n`;
  });

  output += `      ]
    }
  ]
};

export default hadithData;
`;

  return output;
}

// Fonction principale
async function main() {
  try {
    console.log('🚀 Début de l\'intégration des données Bukhari...\n');
    
    // Lire le fichier bukhari-10-books.ts
    const bukhariFilePath = process.argv[2] || './data/bukhari-10-books.ts';
    console.log(`📖 Lecture de ${bukhariFilePath}...`);
    
    if (!fs.existsSync(bukhariFilePath)) {
      throw new Error(`Le fichier ${bukhariFilePath} n'existe pas`);
    }
    
    const bukhariContent = fs.readFileSync(bukhariFilePath, 'utf-8');
    
    // Extraire l'objet JavaScript (enlever l'export et les commentaires)
    const dataMatch = bukhariContent.match(/export const bukhari10Books = ({[\s\S]+});/);
    if (!dataMatch) {
      throw new Error('Impossible de trouver les données dans le fichier');
    }
    
    // Parser les données
    const bukhariData = eval('(' + dataMatch[1] + ')');
    
    console.log(`✅ Données chargées:`);
    console.log(`   - ${bukhariData.books.length} livres`);
    
    let totalChapters = 0;
    let totalHadiths = 0;
    bukhariData.books.forEach(book => {
      totalChapters += book.chapters.length;
      book.chapters.forEach(chapter => {
        totalHadiths += chapter.hadiths.length;
      });
    });
    
    console.log(`   - ${totalChapters} chapitres`);
    console.log(`   - ${totalHadiths} hadiths\n`);
    
    // Générer le nouveau fichier
    console.log('🔨 Génération du fichier hadiths.ts...');
    const outputContent = generateHadithsFile(bukhariData);
    
    // Écrire le fichier
    const outputPath = './data/hadiths.ts';
    fs.writeFileSync(outputPath, outputContent, 'utf-8');
    
    console.log(`✅ Fichier généré: ${outputPath}`);
    console.log(`📊 Taille: ${(outputContent.length / 1024).toFixed(2)} KB\n`);
    
    console.log('🎉 Intégration terminée avec succès!');
    console.log('\n📝 Prochaines étapes:');
    console.log('   1. Vérifier le fichier data/hadiths.ts');
    console.log('   2. Ajouter les traductions turques (textTr)');
    console.log('   3. Corriger les noms de chapitres (actuellement "Chapitre X")');
    console.log('   4. Intégrer dans votre application');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();
