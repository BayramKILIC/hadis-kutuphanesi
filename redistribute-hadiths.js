// Script pour redistribuer les hadiths dans les 10 livres corrects
// Basé sur les numéros de hadiths de Bukhari

const fs = require('fs');

// Mapping des plages de hadiths par livre
// Source: Structure standard de Sahih al-Bukhari
const bookRanges = [
  { id: 'iman', name: 'İman Kitabı', nameAr: 'كتاب الإيمان', start: 1, end: 58 },
  { id: 'ilm', name: 'İlim Kitabı', nameAr: 'كتاب العلم', start: 59, end: 134 },
  { id: 'wudu', name: 'Abdest Kitabı', nameAr: 'كتاب الوضوء', start: 135, end: 247 },
  { id: 'ghusl', name: 'Gusl (Boy Abdesti) Kitabı', nameAr: 'كتاب الغسل', start: 248, end: 292 },
  { id: 'hayd', name: 'Hayız Kitabı', nameAr: 'كتاب الحيض', start: 293, end: 329 },
  { id: 'tayammum', name: 'Teyemmüm Kitabı', nameAr: 'كتاب التيمم', start: 330, end: 344 },
  { id: 'salat', name: 'Namaz Kitabı', nameAr: 'كتاب الصلاة', start: 345, end: 511 },
  { id: 'mawaqit', name: 'Namaz Vakitleri Kitabı', nameAr: 'كتاب مواقيت الصلاة', start: 512, end: 588 },
  { id: 'adhan', name: 'Ezan Kitabı', nameAr: 'كتاب الأذان', start: 589, end: 919 },
  { id: 'jumua', name: 'Cuma Kitabı', nameAr: 'كتاب الجمعة', start: 920, end: 1000 }
];

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
    return JSON.stringify(obj);
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }
  
  return 'null';
}

function getBookForHadith(hadithId) {
  for (const book of bookRanges) {
    if (hadithId >= book.start && hadithId <= book.end) {
      return book;
    }
  }
  // Par défaut, retourner le dernier livre si hors plage
  return bookRanges[bookRanges.length - 1];
}

async function redistributeHadiths() {
  try {
    console.log('🚀 Redistribution des hadiths dans les 10 livres...\n');
    
    // Lire le fichier hadiths.ts actuel
    const hadithsPath = './data/hadiths.ts';
    
    if (!fs.existsSync(hadithsPath)) {
      throw new Error('Le fichier data/hadiths.ts n\'existe pas');
    }
    
    const content = fs.readFileSync(hadithsPath, 'utf-8');
    const dataMatch = content.match(/export const hadithData = ({[\s\S]+});/);
    
    if (!dataMatch) {
      throw new Error('Impossible de trouver hadithData dans le fichier');
    }
    
    const data = eval('(' + dataMatch[1] + ')');
    
    // Collecter tous les hadiths
    console.log('📖 Collecte de tous les hadiths...');
    const allHadiths = [];
    
    data.collections[0].books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.hadiths.forEach(hadith => {
          allHadiths.push(hadith);
        });
      });
    });
    
    console.log(`✅ ${allHadiths.length} hadiths collectés\n`);
    
    // Créer les nouveaux livres avec les hadiths redistribués
    console.log('📚 Redistribution dans les 10 livres...\n');
    
    const newBooks = bookRanges.map(bookInfo => {
      // Filtrer les hadiths pour ce livre
      const bookHadiths = allHadiths.filter(hadith => {
        const bookForHadith = getBookForHadith(hadith.id);
        return bookForHadith.id === bookInfo.id;
      });
      
      console.log(`   ${bookInfo.name}: ${bookHadiths.length} hadiths (#${bookInfo.start}-#${bookInfo.end})`);
      
      // Créer un seul chapitre par livre pour l'instant
      return {
        id: bookInfo.id,
        name: bookInfo.name,
        nameAr: bookInfo.nameAr,
        chapters: [
          {
            id: 'ch1',
            name: 'Bölüm 1',
            nameAr: '',
            hadiths: bookHadiths
          }
        ]
      };
    });
    
    // Créer la nouvelle structure
    const newData = {
      collections: [
        {
          id: 'bukhari',
          name: 'Sahih al-Bukhari',
          nameAr: 'صحيح البخاري',
          books: newBooks
        }
      ]
    };
    
    // Générer le fichier TypeScript
    console.log('\n🔨 Génération du nouveau fichier hadiths.ts...');
    
    const output = `// data/hadiths.ts
// Base de données des hadiths authentiques
// Généré automatiquement avec redistribution correcte des livres

export const hadithData = ${objectToTypeScript(newData, 0)};

export default hadithData;
`;
    
    // Sauvegarder
    fs.writeFileSync(hadithsPath, output, 'utf-8');
    
    console.log(`✅ Fichier généré: ${hadithsPath}`);
    console.log(`📊 Taille: ${(output.length / 1024).toFixed(2)} KB\n`);
    
    console.log('🎉 Redistribution terminée avec succès!\n');
    console.log('📋 Résumé:');
    newBooks.forEach((book, idx) => {
      const totalHadiths = book.chapters.reduce((sum, ch) => sum + ch.hadiths.length, 0);
      console.log(`   ${idx + 1}. ${book.name}: ${totalHadiths} hadiths`);
    });
    
    console.log('\n🚀 Vous pouvez maintenant lancer: npm run dev');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

redistributeHadiths();
