// Script pour vérifier le dataset Bukhari sur HuggingFace
const fs = require('fs');

async function checkHuggingFaceDataset() {
  console.log('🔍 Vérification du dataset HuggingFace...\n');
  
  // URL du fichier JSON sur HuggingFace
  const HUGGINGFACE_URL = 'https://huggingface.co/datasets/meeAtif/hadith_datasets/resolve/main/Sahih%20al-Bukhari.json';
  
  try {
    console.log('📥 Téléchargement depuis HuggingFace...');
    console.log(`   URL: ${HUGGINGFACE_URL}\n`);
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(HUGGINGFACE_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    console.log('✅ Téléchargement réussi !');
    console.log('📊 Analyse des données...\n');
    
    const data = await response.json();
    
    // Analyser la structure
    let hadithsList = [];
    let structure = '';
    
    if (Array.isArray(data)) {
      hadithsList = data;
      structure = 'Array direct';
    } else if (data.hadiths && Array.isArray(data.hadiths)) {
      hadithsList = data.hadiths;
      structure = 'Object.hadiths';
    } else if (data.data && Array.isArray(data.data)) {
      hadithsList = data.data;
      structure = 'Object.data';
    } else if (typeof data === 'object') {
      // Peut-être un objet avec des clés
      const keys = Object.keys(data);
      console.log(`📋 Structure: Object avec ${keys.length} clés`);
      console.log(`   Premières clés: ${keys.slice(0, 10).join(', ')}`);
      
      if (keys[0] && data[keys[0]].id !== undefined) {
        hadithsList = Object.values(data);
        structure = 'Object.values';
      }
    }
    
    console.log(`📊 Structure détectée: ${structure}`);
    console.log(`📈 Nombre total d'entrées: ${hadithsList.length}\n`);
    
    if (hadithsList.length === 0) {
      console.log('⚠️  Aucun hadith trouvé. Structure complète:');
      console.log(JSON.stringify(data, null, 2).substring(0, 1000));
      return;
    }
    
    // Analyser le premier hadith
    const firstHadith = hadithsList[0];
    console.log('📄 Structure du premier hadith:');
    console.log(JSON.stringify(firstHadith, null, 2).substring(0, 500));
    console.log('\n');
    
    // Statistiques
    const ids = hadithsList.map(h => h.id || h.hadithNumber || h.number).filter(Boolean);
    const minId = Math.min(...ids);
    const maxId = Math.max(...ids);
    
    console.log('📊 STATISTIQUES:\n');
    console.log(`   Total hadiths: ${hadithsList.length}`);
    console.log(`   Premier ID: ${minId}`);
    console.log(`   Dernier ID: ${maxId}`);
    
    // Vérifier la continuité
    const uniqueIds = new Set(ids);
    const missing = [];
    
    for (let i = minId; i <= maxId; i++) {
      if (!uniqueIds.has(i)) {
        missing.push(i);
      }
    }
    
    console.log(`   IDs uniques: ${uniqueIds.size}`);
    console.log(`   IDs manquants: ${missing.length}`);
    
    if (missing.length > 0 && missing.length <= 50) {
      console.log(`   Manquants: ${missing.join(', ')}`);
    }
    
    // Vérifier les champs disponibles
    console.log('\n📋 Champs disponibles:');
    const fields = Object.keys(firstHadith);
    fields.forEach(field => {
      const value = firstHadith[field];
      const type = typeof value;
      console.log(`   - ${field}: ${type}`);
    });
    
    // Vérifier les livres
    if (firstHadith.bookId || firstHadith.book) {
      const bookIds = new Set(hadithsList.map(h => h.bookId || h.book).filter(Boolean));
      console.log(`\n📚 Livres trouvés: ${bookIds.size} livres`);
      console.log(`   IDs de livres: ${Array.from(bookIds).sort((a, b) => a - b).join(', ')}`);
    }
    
    // Langues disponibles
    console.log('\n🌐 Langues disponibles:');
    console.log(`   Arabe: ${hadithsList[0].arabic || hadithsList[0].textAr ? 'Oui ✅' : 'Non ❌'}`);
    console.log(`   Anglais: ${hadithsList[0].english || hadithsList[0].textEn ? 'Oui ✅' : 'Non ❌'}`);
    console.log(`   Turc: ${hadithsList[0].turkish || hadithsList[0].textTr ? 'Oui ✅' : 'Non ❌'}`);
    
    // Conclusion
    console.log('\n' + '='.repeat(80));
    console.log('\n✨ CONCLUSION:\n');
    
    if (maxId >= 7500) {
      console.log('🌟 EXCELLENT ! Cette source contient probablement tous les hadiths de Bukhari !');
      console.log(`   (${hadithsList.length} hadiths, max ID: ${maxId})`);
      console.log('\n💡 RECOMMANDATION: Utilisez cette source HuggingFace !');
    } else if (maxId >= 7200) {
      console.log('✅ Bonne source ! Contient presque tous les hadiths.');
      console.log(`   (${hadithsList.length} hadiths, max ID: ${maxId})`);
      console.log(`   Il manque environ ${7563 - maxId} hadiths à la fin.`);
    } else {
      console.log('⚠️  Source incomplète.');
      console.log(`   (${hadithsList.length} hadiths, max ID: ${maxId})`);
    }
    
    // Sauvegarder un échantillon
    const sample = hadithsList.slice(0, 5);
    fs.writeFileSync('./huggingface-sample.json', JSON.stringify(sample, null, 2));
    console.log('\n📁 Échantillon sauvegardé dans: huggingface-sample.json');
    
    // Sauvegarder les stats
    const stats = {
      source: 'HuggingFace',
      url: HUGGINGFACE_URL,
      totalHadiths: hadithsList.length,
      minId: minId,
      maxId: maxId,
      missingIds: missing.length,
      structure: structure,
      fields: fields,
      hasArabic: !!firstHadith.arabic || !!firstHadith.textAr,
      hasEnglish: !!firstHadith.english || !!firstHadith.textEn,
      hasTurkish: !!firstHadith.turkish || !!firstHadith.textTr
    };
    
    fs.writeFileSync('./huggingface-stats.json', JSON.stringify(stats, null, 2));
    console.log('📁 Statistiques sauvegardées dans: huggingface-stats.json\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

checkHuggingFaceDataset();
