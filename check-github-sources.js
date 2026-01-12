// Script pour vérifier plusieurs sources GitHub et trouver Bukhari complet
const fs = require('fs');

// Liste des sources à vérifier
const GITHUB_SOURCES = [
  {
    name: 'AhmedBaset/hadith-json',
    url: 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books/bukhari.json',
    description: 'Source actuelle'
  },
  {
    name: 'hadith/hadith',
    url: 'https://raw.githubusercontent.com/hadith/hadith/master/bukhari.json',
    description: 'Collection hadith standard'
  },
  {
    name: 'hadith/hadith (alternative)',
    url: 'https://raw.githubusercontent.com/hadith/hadith/master/books/bukhari.json',
    description: 'Dossier books'
  },
  {
    name: 'sunnah.com dataset',
    url: 'https://raw.githubusercontent.com/sunnah-com/hadith/master/bukhari.json',
    description: 'Dataset sunnah.com'
  },
  {
    name: 'islamic-network',
    url: 'https://raw.githubusercontent.com/islamic-network/hadith-api/master/data/bukhari.json',
    description: 'Islamic Network API'
  }
];

async function checkAllSources() {
  console.log('🔍 Vérification des sources GitHub pour Sahih al-Bukhari...\n');
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const source of GITHUB_SOURCES) {
    console.log(`\n📚 Source: ${source.name}`);
    console.log(`   Description: ${source.description}`);
    console.log(`   URL: ${source.url}`);
    
    try {
      const fetch = (await import('node-fetch')).default;
      console.log('   📥 Téléchargement...');
      
      const response = await fetch(source.url);
      
      if (!response.ok) {
        console.log(`   ❌ Erreur HTTP: ${response.status}`);
        results.push({
          source: source.name,
          status: 'error',
          error: `HTTP ${response.status}`,
          count: 0
        });
        continue;
      }
      
      const data = await response.json();
      
      // Analyser la structure
      let hadithsList = [];
      let structure = 'unknown';
      
      if (Array.isArray(data)) {
        hadithsList = data;
        structure = 'array';
      } else if (data.hadiths && Array.isArray(data.hadiths)) {
        hadithsList = data.hadiths;
        structure = 'object.hadiths';
      } else if (data.data && Array.isArray(data.data)) {
        hadithsList = data.data;
        structure = 'object.data';
      } else if (typeof data === 'object') {
        hadithsList = Object.values(data);
        structure = 'object.values';
      }
      
      const count = hadithsList.length;
      
      // Trouver le dernier ID
      let maxId = 0;
      if (hadithsList.length > 0) {
        hadithsList.forEach(h => {
          const id = h.hadithNumber || h.id || h.number || 0;
          if (id > maxId) maxId = id;
        });
      }
      
      console.log(`   ✅ Succès !`);
      console.log(`   📊 Structure: ${structure}`);
      console.log(`   📈 Nombre d'entrées: ${count}`);
      console.log(`   🔢 Dernier ID trouvé: ${maxId}`);
      
      // Afficher un exemple
      if (hadithsList.length > 0) {
        const sample = hadithsList[0];
        console.log(`   📄 Exemple de structure:`);
        console.log(`      Clés: ${Object.keys(sample).join(', ')}`);
      }
      
      results.push({
        source: source.name,
        url: source.url,
        status: 'success',
        count: count,
        maxId: maxId,
        structure: structure,
        hasArabic: hadithsList.length > 0 && (hadithsList[0].arabic || hadithsList[0].textAr),
        hasEnglish: hadithsList.length > 0 && (hadithsList[0].english || hadithsList[0].textEn)
      });
      
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
      results.push({
        source: source.name,
        status: 'error',
        error: error.message,
        count: 0
      });
    }
  }
  
  // Résumé final
  console.log('\n' + '=' .repeat(80));
  console.log('\n📊 RÉSUMÉ DES SOURCES:\n');
  
  results.sort((a, b) => (b.count || 0) - (a.count || 0));
  
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.source}`);
    if (result.status === 'success') {
      console.log(`   ✅ ${result.count} hadiths (max ID: ${result.maxId})`);
      console.log(`   📖 Arabe: ${result.hasArabic ? 'Oui' : 'Non'} | Anglais: ${result.hasEnglish ? 'Oui' : 'Non'}`);
      
      if (result.maxId >= 7500) {
        console.log(`   🌟 COLLECTION COMPLÈTE ! (≥7500 hadiths)`);
      }
    } else {
      console.log(`   ❌ ${result.error}`);
    }
    console.log('');
  });
  
  // Recommandation
  const bestSource = results.find(r => r.status === 'success' && r.maxId >= 7500);
  
  if (bestSource) {
    console.log('🎯 RECOMMANDATION:');
    console.log(`   Utilisez: ${bestSource.source}`);
    console.log(`   URL: ${bestSource.url}`);
    console.log(`   Cette source contient ${bestSource.count} hadiths (max ID: ${bestSource.maxId})`);
    console.log('\n💡 Copiez cette URL dans le script extract-bukhari-shamela-complete.js');
  } else {
    console.log('⚠️  Aucune source GitHub ne contient les 7563 hadiths complets.');
    console.log('   Vous devrez utiliser Sunnah.com API ou Shamela directement.');
  }
  
  // Sauvegarder les résultats
  fs.writeFileSync('./github-sources-check.json', JSON.stringify(results, null, 2));
  console.log('\n📁 Résultats sauvegardés dans: github-sources-check.json\n');
}

checkAllSources().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
