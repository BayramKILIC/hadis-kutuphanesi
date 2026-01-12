// Script d'analyse de bukhari-10-books.ts
const fs = require('fs');

async function analyzeBukhari() {
  try {
    console.log('🔍 Analyse de bukhari-10-books.ts...\n');
    
    const filePath = './data/bukhari-10-books.ts';
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ Le fichier data/bukhari-10-books.ts n\'existe pas');
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const dataMatch = content.match(/export const bukhari10Books = ({[\s\S]+});/);
    
    if (!dataMatch) {
      console.error('❌ Impossible de trouver bukhari10Books');
      return;
    }
    
    console.log('📖 Parsing du fichier...');
    const data = eval('(' + dataMatch[1] + ')');
    
    console.log(`\n✅ Fichier parsé avec succès!`);
    console.log(`\n📊 Structure trouvée:`);
    console.log(`   Collection: ${data.name}`);
    console.log(`   Nombre de livres: ${data.books.length}\n`);
    
    console.log('📚 Détail des livres:\n');
    
    let totalHadiths = 0;
    
    data.books.forEach((book, idx) => {
      const bookHadiths = book.chapters.reduce((sum, ch) => {
        return sum + ch.hadiths.length;
      }, 0);
      
      const firstHadith = book.chapters[0]?.hadiths[0]?.id || 0;
      const lastChapter = book.chapters[book.chapters.length - 1];
      const lastHadith = lastChapter?.hadiths[lastChapter.hadiths.length - 1]?.id || 0;
      
      totalHadiths += bookHadiths;
      
      console.log(`${idx + 1}. ${book.id} - ${book.name}`);
      console.log(`   Nom arabe: ${book.nameAr}`);
      console.log(`   Chapitres: ${book.chapters.length}`);
      console.log(`   Hadiths: ${bookHadiths} (#${firstHadith} → #${lastHadith})`);
      console.log('');
    });
    
    console.log(`📊 TOTAL: ${totalHadiths} hadiths dans ${data.books.length} livres\n`);
    
    // Générer le mapping correct
    console.log('✨ Mapping suggéré pour merge-bukhari-structure.js:\n');
    console.log('const bookMapping = [');
    data.books.forEach((book, idx) => {
      const lastChapter = book.chapters[book.chapters.length - 1];
      const lastHadith = lastChapter?.hadiths[lastChapter.hadiths.length - 1]?.id || 0;
      const firstHadith = book.chapters[0]?.hadiths[0]?.id || 0;
      
      console.log(`  { oldId: '${book.id}', newId: 'livre${idx + 1}', name: '${book.name}', nameAr: '${book.nameAr}', range: [${firstHadith}, ${lastHadith}] },`);
    });
    console.log('];\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

analyzeBukhari();
