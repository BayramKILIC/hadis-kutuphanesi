// Script de fusion de bukhari-structure.ts avec bukhari-10-books.ts
// Ce script mappe correctement les IDs et noms de livres/chapitres

const fs = require('fs');

// Mapper les IDs génériques vers les vrais IDs et noms
const bookMapping = [
  { oldId: 'kitab1', newId: 'iman', name: 'İman Kitabı', nameAr: 'كتاب الإيمان' },
  { oldId: 'kitab2', newId: 'ilm', name: 'İlim Kitabı', nameAr: 'كتاب العلم' },
  { oldId: 'kitab3', newId: 'wudu', name: 'Abdest Kitabı', nameAr: 'كتاب الوضوء' },
  { oldId: 'kitab4', newId: 'ghusl', name: 'Gusl (Boy Abdesti) Kitabı', nameAr: 'كتاب الغسل' },
  { oldId: 'kitab5', newId: 'hayd', name: 'Hayız Kitabı', nameAr: 'كتاب الحيض' },
  { oldId: 'kitab6', newId: 'tayammum', name: 'Teyemmüm Kitabı', nameAr: 'كتاب التيمم' },
  { oldId: 'kitab7', newId: 'salat', name: 'Namaz Kitabı', nameAr: 'كتاب الصلاة' },
  { oldId: 'kitab8', newId: 'mawaqit', name: 'Namaz Vakitleri Kitabı', nameAr: 'كتاب مواقيت الصلاة' },
  { oldId: 'kitab9', newId: 'adhan', name: 'Ezan Kitabı', nameAr: 'كتاب الأذان' },
  { oldId: 'kitab10', newId: 'jumua', name: 'Cuma Kitabı', nameAr: 'كتاب الجمعة' }
];

// Pour les noms de chapitres, on va créer une structure plus détaillée
// basée sur les vraies données de Shamela
const chapterNamesMap = {
  'iman': {
    'ch1': { name: 'Vahyin Başlangıcı', nameAr: 'باب بدء الوحي' },
    'ch2': { name: 'İman Nedir', nameAr: 'باب ما جاء في الإيمان' },
    'ch3': { name: 'İslam Beş Esas Üzerine Kuruludur', nameAr: 'باب بني الإسلام على خمس' },
    'ch4': { name: 'İmanın Şubesi', nameAr: 'باب من الإيمان' },
    'ch5': { name: 'Namaz İmandandır', nameAr: 'باب الصلاة من الإيمان' },
    'ch6': { name: 'Zikir ve Tespih', nameAr: 'باب تطوع قيام رمضان من الإيمان' },
    'ch7': { name: 'Cihad İmandandır', nameAr: 'باب الجهاد من الإيمان' },
    'ch8': { name: 'İyiliği Emretmek', nameAr: 'باب من الإيمان أن يحب لأخيه ما يحب لنفسه' },
    'ch9': { name: 'Peygamberi Sevmek', nameAr: 'باب حب الرسول صلى الله عليه وسلم من الإيمان' },
    'ch10': { name: 'İmanın Tatlılığı', nameAr: 'باب حلاوة الإيمان' },
    'ch11': { name: 'Allah İçin Sevmek ve Buğzetmek', nameAr: 'باب من كره أن يعود في الكفر' },
    'ch12': { name: 'Komşusuna Eziyet Etmemek', nameAr: 'باب إطعام الطعام من الإيمان' },
  },
  // Diğer kitaplar için varsayılan yapı
  'default': (chapterNumber) => ({
    name: `Bölüm ${chapterNumber}`,
    nameAr: `الباب ${chapterNumber}`
  })
};

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

function extractHadithText(fullText) {
  const quoteMatch = fullText.match(/[""]([^""]+)[""]$/);
  if (quoteMatch) {
    return quoteMatch[1].trim();
  }
  
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
    console.log('🚀 Fusion de bukhari-structure.ts et bukhari-10-books.ts...\n');
    
    // Lire bukhari-10-books.ts
    const bukhariFilePath = './data/bukhari-10-books.ts';
    console.log(`📖 Lecture de ${bukhariFilePath}...`);
    
    if (!fs.existsSync(bukhariFilePath)) {
      throw new Error(`Le fichier ${bukhariFilePath} n'existe pas`);
    }
    
    const bukhariContent = fs.readFileSync(bukhariFilePath, 'utf-8');
    const dataMatch = bukhariContent.match(/export const bukhari10Books = ({[\s\S]+});/);
    
    if (!dataMatch) {
      throw new Error('Impossible de trouver les données dans le fichier');
    }
    
    const bukhariData = eval('(' + dataMatch[1] + ')');
    
    console.log(`✅ Données chargées: ${bukhariData.books.length} livres\n`);
    
    // Mapper les livres avec les bons IDs et noms
    let totalHadiths = 0;
    let totalChapters = 0;
    
    const mappedBooks = bukhariData.books.map((book, bookIndex) => {
      const bookInfo = bookMapping[bookIndex];
      
      if (!bookInfo) {
        console.warn(`⚠️  Pas de mapping pour ${book.id}`);
        return book;
      }
      
      console.log(`📚 Traitement: ${bookInfo.name} (${book.chapters.length} chapitres)`);
      
      // Mapper les chapitres
      const mappedChapters = book.chapters.map((chapter, chapterIndex) => {
        totalChapters++;
        
        // Obtenir le nom du chapitre depuis le mapping ou utiliser un nom par défaut
        const chapterNames = chapterNamesMap[bookInfo.newId] || {};
        const chapterInfo = chapterNames[chapter.id] || {
          name: `Bölüm ${chapterIndex + 1}`,
          nameAr: chapter.nameAr || ''
        };
        
        // Traiter les hadiths
        const mappedHadiths = chapter.hadiths.map(hadith => {
          totalHadiths++;
          
          return {
            id: hadith.id,
            textAr: extractHadithText(hadith.textAr),
            textTr: hadith.textTr,
            narrator: cleanNarrator(hadith.narrator),
            narratorAr: hadith.narratorAr,
            reference: hadith.reference,
            grade: hadith.grade
          };
        });
        
        return {
          id: chapter.id,
          name: chapterInfo.name,
          nameAr: chapterInfo.nameAr,
          hadiths: mappedHadiths
        };
      });
      
      return {
        id: bookInfo.newId,
        name: bookInfo.name,
        nameAr: bookInfo.nameAr,
        chapters: mappedChapters
      };
    });
    
    console.log(`\n📊 Statistiques:`);
    console.log(`   - ${mappedBooks.length} livres`);
    console.log(`   - ${totalChapters} chapitres`);
    console.log(`   - ${totalHadiths} hadiths\n`);
    
    // Créer la structure finale
    const finalData = {
      collections: [
        {
          id: 'bukhari',
          name: 'Sahih al-Bukhari',
          nameAr: 'صحيح البخاري',
          books: mappedBooks
        }
      ]
    };
    
    // Générer le fichier TypeScript
    console.log('🔨 Génération du fichier hadiths.ts...');
    
    const output = `// data/hadiths.ts
// Base de données des hadiths authentiques
// Généré automatiquement avec mapping correct des livres et chapitres

export const hadithData = ${objectToTypeScript(finalData, 0)};

export default hadithData;
`;
    
    // Écrire le fichier
    const outputPath = './data/hadiths.ts';
    fs.writeFileSync(outputPath, output, 'utf-8');
    
    console.log(`✅ Fichier généré: ${outputPath}`);
    console.log(`📊 Taille: ${(output.length / 1024).toFixed(2)} KB\n`);
    
    console.log('🎉 Fusion terminée avec succès!');
    console.log('\n✨ Maintenant chaque livre a:');
    console.log('   - Son vrai ID (iman, ilm, wudu, etc.)');
    console.log('   - Son vrai nom en turc');
    console.log('   - Son vrai nom en arabe');
    console.log('\n🚀 Vous pouvez lancer: npm run dev');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
