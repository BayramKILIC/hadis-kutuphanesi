// scripts/extract-bukhari-shamela-complete.js
// Script pour extraire TOUS les hadiths de Sahih al-Bukhari depuis GitHub
// 97 livres complets - ~7563 hadiths

const fs = require('fs');
const path = require('path');

async function extractAllBukhariFromGitHub() {
  console.log('🚀 Extraction COMPLÈTE de Sahih al-Bukhari depuis GitHub...\n');
  
  // URL du fichier JSON Bukhari sur GitHub
  const GITHUB_BUKHARI_URL = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books/bukhari.json';
  
  try {
    console.log('📥 Téléchargement des données...');
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(GITHUB_BUKHARI_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const bukhariData = await response.json();
    
    console.log('✅ Données téléchargées depuis GitHub\n');
    
    // Extraire les hadiths
    let hadithsList = [];
    
    if (Array.isArray(bukhariData)) {
      hadithsList = bukhariData;
    } else if (bukhariData.hadiths && Array.isArray(bukhariData.hadiths)) {
      hadithsList = bukhariData.hadiths;
    } else if (bukhariData.data && Array.isArray(bukhariData.data)) {
      hadithsList = bukhariData.data;
    } else {
      hadithsList = Object.values(bukhariData);
    }
    
    console.log(`📊 Total hadiths trouvés: ${hadithsList.length}`);
    
    if (hadithsList.length === 0) {
      console.log('⚠️ Aucun hadith trouvé. Structure des données:');
      console.log(JSON.stringify(bukhariData, null, 2).substring(0, 500));
      return;
    }
    
    // Afficher un exemple
    console.log('\n📄 Exemple de hadith:');
    console.log(JSON.stringify(hadithsList[0], null, 2));
    console.log('\n');
    
    // Transformer au format de votre site (TOUS les livres)
    console.log('🔄 Transformation des données...\n');
    const transformedBooks = transformAllBooks(hadithsList);
    
    console.log(`✅ ${transformedBooks.length} livres transformés`);
    
    // Compter le total de hadiths
    let totalHadiths = 0;
    transformedBooks.forEach(book => {
      book.chapters.forEach(chapter => {
        totalHadiths += chapter.hadiths.length;
      });
    });
    
    console.log(`📊 Total hadiths extraits: ${totalHadiths}\n`);
    
    // Générer le fichier TypeScript
    await generateTypeScriptFile(transformedBooks);
    
    console.log('✅ Extraction GitHub terminée !');
    console.log('📁 Fichier généré: data/bukhari-complete.json');
    console.log('\n🎉 Vous pouvez maintenant relancer le script de redistribution !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

function transformAllBooks(githubData) {
  // Grouper par livre (TOUS les livres, pas seulement 10)
  const bookGroups = {};
  
  console.log('📚 Groupement par livres...');
  
  githubData.forEach(hadith => {
    const bookId = hadith.bookId || hadith.book || 1;
    
    if (!bookGroups[bookId]) {
      bookGroups[bookId] = [];
    }
    bookGroups[bookId].push(hadith);
  });
  
  const bookCount = Object.keys(bookGroups).length;
  console.log(`   ${bookCount} livres trouvés\n`);
  
  // Transformer en structure de votre site
  const books = [];
  
  for (const bookId of Object.keys(bookGroups).sort((a, b) => Number(a) - Number(b))) {
    const hadiths = bookGroups[bookId];
    
    // Grouper par chapitres
    const chapterGroups = {};
    
    hadiths.forEach(h => {
      const chapterId = h.chapterId || h.chapter || 1;
      
      if (!chapterGroups[chapterId]) {
        chapterGroups[chapterId] = {
          id: `ch${chapterId}`,
          name: h.chapterEnglish || h.chapterName || `Chapitre ${chapterId}`,
          nameAr: h.chapterArabic || h.chapterNameAr || '',
          hadiths: []
        };
      }
      
      // Extraire le texte arabe
      let textAr = '';
      if (typeof h.arabic === 'string') {
        textAr = h.arabic;
      } else if (h.arabic?.body) {
        textAr = h.arabic.body;
      } else if (h.hadith) {
        const arText = h.hadith.find(t => t.lang === 'ar');
        textAr = arText?.body || '';
      } else if (h.text) {
        textAr = h.text;
      }
      
      // Extraire le narrateur
      let narrator = 'Unknown';
      let narratorAr = '';
      
      if (h.narrator) {
        narrator = h.narrator;
      } else if (h.english?.narrator) {
        narrator = h.english.narrator;
      } else if (h.hadith) {
        const enText = h.hadith.find(t => t.lang === 'en');
        narrator = enText?.narrator || 'Unknown';
      }
      
      if (h.arabic?.narrator) {
        narratorAr = h.arabic.narrator;
      }
      
      chapterGroups[chapterId].hadiths.push({
        id: h.hadithNumber || h.id || h.number || 0,
        textAr: textAr,
        textTr: '', // À compléter avec traductions turques
        narrator: narrator,
        narratorAr: narratorAr,
        reference: `Buhari ${h.hadithNumber || h.id || h.number || 0}`,
        grade: 'Sahih'
      });
    });
    
    // Trier les hadiths par ID
    Object.values(chapterGroups).forEach(chapter => {
      chapter.hadiths.sort((a, b) => a.id - b.id);
    });
    
    books.push({
      id: `kitab${bookId}`,
      name: `Kitab ${bookId}`, // Sera remplacé par le script de redistribution
      nameAr: '', // Sera remplacé par le script de redistribution
      chapters: Object.values(chapterGroups).sort((a, b) => {
        const aNum = parseInt(a.id.replace('ch', ''));
        const bNum = parseInt(b.id.replace('ch', ''));
        return aNum - bNum;
      })
    });
    
    const hadithCount = Object.values(chapterGroups).reduce((sum, ch) => sum + ch.hadiths.length, 0);
    console.log(`   Livre ${bookId}: ${hadithCount} hadiths, ${Object.keys(chapterGroups).length} chapitres`);
  }
  
  return books;
}

async function generateTypeScriptFile(books) {
  // Créer le dossier data s'il n'existe pas
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'bukhari-complete.json');
  
  // Sauvegarder en JSON pour faciliter le traitement
  const jsonData = {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    nameAr: 'صحيح البخاري',
    books: books
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log('\n✅ Fichier JSON généré !');
  
  // Aussi générer le fichier TypeScript
  const tsOutputPath = path.join(dataDir, 'bukhari-complete.ts');
  
  const fileContent = `// data/bukhari-complete.ts
// Généré automatiquement depuis GitHub
// Sahih al-Bukhari complet
// Les traductions turques sont à compléter

export const bukhariComplete = ${JSON.stringify(jsonData, null, 2)};
`;

  fs.writeFileSync(tsOutputPath, fileContent, 'utf8');
  console.log('✅ Fichier TypeScript généré !\n');
}

// Exécuter le script
extractAllBukhariFromGitHub();
