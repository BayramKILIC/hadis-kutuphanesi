// update-translations.js
// Script pour intégrer les traductions turques dans data/hadiths.ts

const fs = require('fs');
const path = require('path');

async function updateTranslations() {
  console.log('🔄 Mise à jour des traductions turques...\n');

  // 1. Lire le fichier JSON des traductions
  const translationsPath = path.join(process.cwd(), 'hadith_translations_turkish.json');
  
  if (!fs.existsSync(translationsPath)) {
    console.error('❌ Fichier hadith_translations_turkish.json introuvable !');
    console.log('   Placez le fichier JSON exporté dans le dossier du projet.\n');
    process.exit(1);
  }

  const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));
  const translationCount = Object.keys(translations).length;
  
  console.log(`✅ Fichier de traductions chargé : ${translationCount} traductions trouvées\n`);

  // 2. Lire le fichier hadiths.ts actuel
  const hadithsPath = path.join(process.cwd(), 'data', 'hadiths.ts');
  
  if (!fs.existsSync(hadithsPath)) {
    console.error('❌ Fichier data/hadiths.ts introuvable !');
    process.exit(1);
  }

  let hadithsContent = fs.readFileSync(hadithsPath, 'utf-8');
  console.log('✅ Fichier hadiths.ts chargé\n');

  // 3. Créer une sauvegarde
  const backupPath = path.join(process.cwd(), 'data', `hadiths.backup.${Date.now()}.ts`);
  fs.writeFileSync(backupPath, hadithsContent);
  console.log(`💾 Sauvegarde créée : ${backupPath}\n`);

  // 4. Mettre à jour les traductions
  let updatedCount = 0;
  let notFoundCount = 0;

  for (const [hadithId, turkishText] of Object.entries(translations)) {
    // Nettoyer le texte turc (échapper les guillemets et antislashs)
    const cleanText = turkishText
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');

    // Pattern pour trouver le hadith avec cet ID
    // Cherche: id: 1, ... textTr: ""
    const pattern = new RegExp(
      `(id:\\s*${hadithId},\\s*[^}]*textTr:\\s*")([^"]*)(")`,
      'g'
    );

    const before = hadithsContent;
    hadithsContent = hadithsContent.replace(pattern, `$1${cleanText}$3`);

    if (hadithsContent !== before) {
      updatedCount++;
      console.log(`✓ Hadith #${hadithId} mis à jour`);
    } else {
      notFoundCount++;
      console.log(`⚠ Hadith #${hadithId} non trouvé dans le fichier`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 RÉSUMÉ:\n`);
  console.log(`   ✅ Traductions mises à jour: ${updatedCount}`);
  console.log(`   ⚠  Non trouvées: ${notFoundCount}`);
  console.log(`   💾 Sauvegarde: ${backupPath}\n`);

  // 5. Écrire le fichier mis à jour
  if (updatedCount > 0) {
    fs.writeFileSync(hadithsPath, hadithsContent, 'utf-8');
    console.log('✅ Fichier data/hadiths.ts mis à jour avec succès !\n');
    console.log('🚀 Relancez votre application pour voir les changements.\n');
  } else {
    console.log('⚠️  Aucune traduction n\'a été mise à jour.\n');
  }
}

updateTranslations().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
