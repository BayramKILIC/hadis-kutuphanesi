// scripts/extract-bukhari-shamela.js
// Script pour extraire les 10 premiers livres de Bukhari depuis Shamela

const fs = require('fs');
const path = require('path');

// IMPORTANT : Ce script utilise la bibliothèque shamela
// Installation : npm install shamela

const { configure, getBook } = require('shamela');

// Configuration Shamela
// Note: Shamela peut nécessiter une clé API
// Visitez shamela.ws pour obtenir les identifiants si nécessaire
configure({
  // apiKey: 'VOTRE_CLE_API_ICI', // Si nécessaire
  booksEndpoint: 'https://shamela.ws/api/books',
  masterPatchEndpoint: 'https://shamela.ws/api/master_patch'
});

// ID du livre Sahih Bukhari sur Shamela
// Ce numéro peut varier - à vérifier sur shamela.ws
const BUKHARI_BOOK_ID = 6; // ID typique pour Bukhari sur Shamela

// Les 10 premiers livres (kitab) de Bukhari
const FIRST_10_BOOKS = [
  { id: 1, name: 'İman Kitabı', nameAr: 'كتاب الإيمان' },
  { id: 2, name: 'İlim Kitabı', nameAr: 'كتاب العلم' },
  { id: 3, name: 'Abdest Kitabı', nameAr: 'كتاب الوضوء' },
  { id: 4, name: 'Gusl Kitabı', nameAr: 'كتاب الغسل' },
  { id: 5, name: 'Hayız Kitabı', nameAr: 'كتاب الحيض' },
  { id: 6, name: 'Teyemmüm Kitabı', nameAr: 'كتاب التيمم' },
  { id: 7, name: 'Namaz Kitabı', nameAr: 'كتاب الصلاة' },
  { id: 8, name: 'Namaz Vakitleri Kitabı', nameAr: 'كتاب مواقيت الصلاة' },
  { id: 9, name: 'Ezan Kitabı', nameAr: 'كتاب الأذان' },
  { id: 10, name: 'Cuma Kitabı', nameAr: 'كتاب الجمعة' }
];

async function extractBukhariBooks() {
  console.log('🚀 Début de l\'extraction de Bukhari depuis Shamela...\n');

  try {
    // Télécharger le livre complet de Bukhari
    console.log('📥 Téléchargement de Sahih al-Bukhari...');
    const bukhariBook = await getBook(BUKHARI_BOOK_ID);
    
    console.log('✅ Livre téléchargé avec succès !');
    console.log(`📖 Titre: ${bukhariBook.title || 'Sahih al-Bukhari'}\n`);

    // Extraire les 10 premiers livres
    const extractedBooks = [];
    
    for (const bookInfo of FIRST_10_BOOKS) {
      console.log(`📚 Extraction du livre ${bookInfo.id}: ${bookInfo.name}...`);
      
      // Structure du livre extrait
      const bookData = {
        id: `kitab${bookInfo.id}`,
        name: bookInfo.name,
        nameAr: bookInfo.nameAr,
        chapters: []
      };

      // TODO: Parser le contenu de Shamela pour extraire les chapitres et hadiths
      // La structure exacte dépend du format de données de Shamela
      // Cette partie sera ajustée selon la structure réelle des données
      
      // Exemple de structure attendue:
      // bookData.chapters = parseChapters(bukhariBook, bookInfo.id);
      
      extractedBooks.push(bookData);
      console.log(`✅ Livre ${bookInfo.id} extrait\n`);
    }

    // Générer le fichier TypeScript
    await generateTypeScriptFile(extractedBooks);
    
    console.log('✅ Extraction terminée avec succès !');
    console.log('📁 Fichier généré: data/bukhari-10-books.ts');

  } catch (error) {
    console.error('❌ Erreur lors de l\'extraction:', error.message);
    console.error(error);
  }
}

function parseChapters(bookContent, bookNumber) {
  // Cette fonction parsera le contenu du livre Shamela
  // et extraira les chapitres et hadiths
  
  // Format de retour:
  // [
  //   {
  //     id: 'ch1',
  //     name: 'Nom du chapitre',
  //     nameAr: 'اسم الباب',
  //     hadiths: [
  //       {
  //         id: 1,
  //         textAr: 'النص العربي',
  //         textTr: '', // Vide pour l'instant
  //         narrator: 'الراوي',
  //         narratorAr: 'الراوي',
  //         reference: 'Buhari 1',
  //         grade: 'Sahih'
  //       }
  //     ]
  //   }
  // ]
  
  return [];
}

async function generateTypeScriptFile(books) {
  const outputPath = path.join(__dirname, '..', 'data', 'bukhari-10-books.ts');
  
  const fileContent = `// data/bukhari-10-books.ts
// Généré automatiquement depuis Shamela
// Les 10 premiers livres de Sahih al-Bukhari
// Les traductions turques sont à compléter

export const bukhari10Books = {
  id: 'bukhari',
  name: 'Sahih al-Bukhari',
  nameAr: 'صحيح البخاري',
  books: ${JSON.stringify(books, null, 2)
    .replace(/"textTr": ""/g, 'textTr: ""')
    .replace(/"narrator"/g, 'narrator')
    .replace(/"narratorAr"/g, 'narratorAr')
    .replace(/"reference"/g, 'reference')
    .replace(/"grade"/g, 'grade')}
};
`;

  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log('✅ Fichier TypeScript généré !');
}

// Exécuter le script
//extractBukhariBooks();


// ============================================
// ALTERNATIVE SIMPLE SI SHAMELA API NE FONCTIONNE PAS
// ============================================

// Si la bibliothèque Shamela ne fonctionne pas ou nécessite trop de configuration,
// voici une alternative utilisant les données GitHub déjà disponibles :

async function extractFromGitHub() {
  console.log('📥 Extraction depuis GitHub (AhmedBaset/hadith-json)...\n');
  
  // URL du fichier JSON Bukhari sur GitHub
  const GITHUB_BUKHARI_URL = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books/bukhari.json';
  
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(GITHUB_BUKHARI_URL);
    const bukhariData = await response.json();
    
    console.log('✅ Données téléchargées depuis GitHub');
    console.log('🔍 Structure des données:', typeof bukhariData);
    console.log('🔍 Clés disponibles:', Object.keys(bukhariData).slice(0, 10));
    
    // Le format peut être un objet, pas un tableau
    // Essayons de trouver les hadiths
    let hadithsList = [];
    
    if (Array.isArray(bukhariData)) {
      hadithsList = bukhariData;
    } else if (bukhariData.hadiths && Array.isArray(bukhariData.hadiths)) {
      hadithsList = bukhariData.hadiths;
    } else if (bukhariData.data && Array.isArray(bukhariData.data)) {
      hadithsList = bukhariData.data;
    } else {
      // Si c'est un objet avec des clés numériques
      hadithsList = Object.values(bukhariData);
    }
    
    console.log(`📊 Total hadiths trouvés: ${hadithsList.length}`);
    
    if (hadithsList.length === 0) {
      console.log('⚠️ Aucun hadith trouvé. Structure des données:');
      console.log(JSON.stringify(bukhariData, null, 2).substring(0, 500));
      return;
    }
    
    // Afficher un exemple de hadith pour comprendre la structure
    console.log('\n📄 Exemple de hadith:');
    console.log(JSON.stringify(hadithsList[0], null, 2));
    
    // Transformer au format de votre site
    const transformedBooks = transformGitHubData(hadithsList);
    
    await generateTypeScriptFile(transformedBooks);
    
    console.log('✅ Extraction GitHub terminée !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

function transformGitHubData(githubData) {
  // Grouper par livre
  const bookGroups = {};
  
  githubData.forEach(hadith => {
    const bookId = hadith.bookId || hadith.book;
    if (bookId <= 10) { // Seulement les 10 premiers livres
      if (!bookGroups[bookId]) {
        bookGroups[bookId] = [];
      }
      bookGroups[bookId].push(hadith);
    }
  });
  
  // Transformer en structure de votre site
  const books = [];
  
  for (let bookNum = 1; bookNum <= 10; bookNum++) {
    if (!bookGroups[bookNum]) continue;
    
    const bookInfo = FIRST_10_BOOKS[bookNum - 1];
    const hadiths = bookGroups[bookNum];
    
    // Grouper par chapitres
    const chapterGroups = {};
    hadiths.forEach(h => {
      const chapterId = h.chapterId || h.chapter || 1;
      if (!chapterGroups[chapterId]) {
        chapterGroups[chapterId] = {
          id: `ch${chapterId}`,
          name: h.chapterEnglish || `Chapitre ${chapterId}`,
          nameAr: h.chapterArabic || '',
          hadiths: []
        };
      }
      
      chapterGroups[chapterId].hadiths.push({
        id: h.hadithNumber || h.id,
        textAr: h.arabic || h.hadith?.find(t => t.lang === 'ar')?.body || '',
        textTr: '', // À compléter
        narrator: h.english?.narrator || 'Inconnu',
        narratorAr: h.arabic?.narrator || '',
        reference: `Buhari ${h.hadithNumber || h.id}`,
        grade: 'Sahih'
      });
    });
    
    books.push({
      id: `kitab${bookNum}`,
      name: bookInfo.name,
      nameAr: bookInfo.nameAr,
      chapters: Object.values(chapterGroups)
    });
  }
  
  return books;
}

// Décommenter pour utiliser GitHub au lieu de Shamela:
 extractFromGitHub();