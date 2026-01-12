// Script pour corriger les erreurs d'échappement dans hadiths.ts
const fs = require('fs');
const path = require('path');

function fixEscaping() {
  console.log('🔧 Correction des erreurs d\'échappement...\n');
  
  const filePath = './data/hadiths.ts';
  
  if (!fs.existsSync(filePath)) {
    console.error('❌ Fichier hadiths.ts introuvable');
    process.exit(1);
  }
  
  // Lire le fichier
  let content = fs.readFileSync(filePath, 'utf-8');
  console.log('📖 Fichier lu:', filePath);
  console.log('📊 Taille originale:', (content.length / 1024).toFixed(2), 'KB\n');
  
  // Stratégie: utiliser des backticks (`) au lieu de guillemets simples
  // pour les valeurs qui contiennent du texte arabe
  
  // Remplacer les patterns problématiques
  // Pattern: textAr: '...'  →  textAr: `...`
  content = content.replace(
    /textAr: '([^']*(?:\\'[^']*)*)'/g,
    (match, p1) => {
      // Enlever les échappements existants et utiliser des backticks
      const cleaned = p1.replace(/\\'/g, "'");
      return `textAr: \`${cleaned}\``;
    }
  );
  
  // Pattern: textTr: '...'  →  textTr: `...`
  content = content.replace(
    /textTr: '([^']*)'/g,
    (match, p1) => {
      const cleaned = p1.replace(/\\'/g, "'");
      return `textTr: \`${cleaned}\``;
    }
  );
  
  // Pattern: narrator: '...'  →  narrator: `...`
  content = content.replace(
    /narrator: '([^']*(?:\\'[^']*)*)'/g,
    (match, p1) => {
      const cleaned = p1.replace(/\\'/g, "'");
      return `narrator: \`${cleaned}\``;
    }
  );
  
  // Pattern: narratorAr: '...'  →  narratorAr: `...`
  content = content.replace(
    /narratorAr: '([^']*)'/g,
    (match, p1) => {
      const cleaned = p1.replace(/\\'/g, "'");
      return `narratorAr: \`${cleaned}\``;
    }
  );
  
  // Pattern: name: '...'  →  name: `...`
  content = content.replace(
    /name: '([^']*(?:\\'[^']*)*)'/g,
    (match, p1) => {
      const cleaned = p1.replace(/\\'/g, "'");
      return `name: \`${cleaned}\``;
    }
  );
  
  // Pattern: nameAr: '...'  →  nameAr: `...`
  content = content.replace(
    /nameAr: '([^']*)'/g,
    (match, p1) => {
      const cleaned = p1.replace(/\\'/g, "'");
      return `nameAr: \`${cleaned}\``;
    }
  );
  
  // Sauvegarder le fichier corrigé
  fs.writeFileSync(filePath, content, 'utf-8');
  
  console.log('✅ Fichier corrigé avec succès!');
  console.log('📊 Taille finale:', (content.length / 1024).toFixed(2), 'KB');
  console.log('\n🎉 Vous pouvez maintenant lancer: npm run dev');
}

try {
  fixEscaping();
} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
}
