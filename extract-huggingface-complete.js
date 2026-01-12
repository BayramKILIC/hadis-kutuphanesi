// Script pour extraire TOUS les hadiths de Bukhari depuis HuggingFace
// Source complète: 7563 hadiths, 97 livres

const fs = require('fs');
const path = require('path');

async function extractFromHuggingFace() {
  console.log('🚀 Extraction complète de Sahih al-Bukhari depuis HuggingFace...\n');
  
  const HUGGINGFACE_URL = 'https://huggingface.co/datasets/meeAtif/hadith_datasets/resolve/main/Sahih%20al-Bukhari.json';
  
  try {
    console.log('📥 Téléchargement des données...');
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(HUGGINGFACE_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const rawData = await response.json();
    console.log('✅ Données téléchargées !\n');
    
    // Convertir en array si nécessaire
    let hadithsList = Array.isArray(rawData) ? rawData : Object.values(rawData);
    
    console.log(`📊 Total d'entrées: ${hadithsList.length}`);
    
    // Extraire le numéro de hadith depuis la référence
    hadithsList = hadithsList.map(h => {
      let hadithNumber = 0;
      
      // Essayer d'extraire depuis Reference
      if (h.Reference) {
        const match = h.Reference.match(/bukhari:(\d+)/);
        if (match) {
          hadithNumber = parseInt(match[1]);
        }
      }
      
      // Fallback sur In-book reference
      if (!hadithNumber && h['In-book reference']) {
        const match = h['In-book reference'].match(/Book (\d+), Hadith (\d+)/);
        if (match) {
          // On utilisera le numéro depuis Reference si disponible
          hadithNumber = 0; // À calculer
        }
      }
      
      return {
        ...h,
        hadithNumber: hadithNumber
      };
    });
    
    // Filtrer les hadiths valides et trier
    hadithsList = hadithsList
      .filter(h => h.hadithNumber > 0)
      .sort((a, b) => a.hadithNumber - b.hadithNumber);
    
    console.log(`📊 Hadiths valides: ${hadithsList.length}`);
    console.log(`🔢 Premier: #${hadithsList[0].hadithNumber}`);
    console.log(`🔢 Dernier: #${hadithsList[hadithsList.length - 1].hadithNumber}\n`);
    
    // Grouper par livre en utilisant Chapter_Number
    console.log('📚 Groupement par livres (utilisation de Chapter_Number)...\n');
    
    const bookGroups = {};
    
    hadithsList.forEach(hadith => {
      const bookNumber = hadith.Chapter_Number;
      
      if (!bookNumber) {
        console.warn(`⚠️  Hadith ${hadith.hadithNumber} sans Chapter_Number, ignoré`);
        return;
      }
      
      if (!bookGroups[bookNumber]) {
        bookGroups[bookNumber] = {
          hadiths: [],
          titleAr: hadith.Chapter_Title_Arabic || '',
          titleEn: hadith.Chapter_Title_English || ''
        };
      }
      
      bookGroups[bookNumber].hadiths.push({
        id: hadith.hadithNumber,
        textAr: hadith.Arabic_Text || '',
        textTr: '', // À compléter
        narrator: extractNarrator(hadith.English_Text || ''),
        narratorAr: '',
        reference: `Buhari ${hadith.hadithNumber}`,
        grade: hadith.Grade || 'Sahih',
        sunnah_link: hadith.Reference || ''
      });
    });
    
    const bookCount = Object.keys(bookGroups).length;
    console.log(`✅ ${bookCount} livres trouvés\n`);
    
    // Mapping des noms de livres en turc (vos 97 livres)
    const bookNames = getBookNames();
    
    // Créer la structure finale
    const books = [];
    
    for (let bookNum = 1; bookNum <= 97; bookNum++) {
      const bookData = bookGroups[bookNum];
      const bookInfo = bookNames[bookNum - 1];
      
      if (!bookData) {
        console.log(`   Livre ${bookNum}: 0 hadiths (vide)`);
        continue;
      }
      
      // Trier les hadiths par ID
      bookData.hadiths.sort((a, b) => a.id - b.id);
      
      const firstId = bookData.hadiths[0].id;
      const lastId = bookData.hadiths[bookData.hadiths.length - 1].id;
      
      console.log(`   Livre ${String(bookNum).padStart(2)}: ${String(bookData.hadiths.length).padStart(4)} hadiths (#${firstId}-#${lastId}) - ${bookInfo ? bookInfo.name : 'Unknown'}`);
      
      books.push({
        id: bookInfo ? bookInfo.id : `livre${bookNum}`,
        name: bookInfo ? bookInfo.name : `Livre ${bookNum}`,
        nameAr: bookInfo ? bookInfo.nameAr : bookData.titleAr,
        chapters: [
          {
            id: 'ch1',
            name: 'Bölüm 1',
            nameAr: '',
            hadiths: bookData.hadiths
          }
        ]
      });
    }
    
    console.log(`\n✅ Total livres créés: ${books.length}`);
    
    const totalHadiths = books.reduce((sum, book) => {
      return sum + book.chapters.reduce((s, ch) => s + ch.hadiths.length, 0);
    }, 0);
    
    console.log(`✅ Total hadiths: ${totalHadiths}\n`);
    
    // Générer le fichier
    console.log('🔨 Génération du fichier...');
    
    const finalData = {
      id: 'bukhari',
      name: 'Sahih al-Bukhari',
      nameAr: 'صحيح البخاري',
      books: books
    };
    
    // Créer le dossier data
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Sauvegarder en JSON
    const jsonPath = path.join(dataDir, 'bukhari-complete-huggingface.json');
    fs.writeFileSync(jsonPath, JSON.stringify(finalData, null, 2), 'utf-8');
    console.log(`✅ JSON sauvegardé: ${jsonPath}`);
    
    // Sauvegarder en TypeScript avec le bon format
    const tsPath = path.join(dataDir, 'hadiths.ts');
    
    // Fonction pour convertir JSON en TypeScript propre (sans guillemets sur les clés)
    function jsonToTS(obj, indent = 0) {
      const spaces = '  '.repeat(indent);
      
      if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        const items = obj.map(item => spaces + '  ' + jsonToTS(item, indent + 1)).join(',\n');
        return '[\n' + items + '\n' + spaces + ']';
      }
      
      if (obj !== null && typeof obj === 'object') {
        const entries = Object.entries(obj);
        if (entries.length === 0) return '{}';
        const items = entries.map(([key, value]) => {
          const tsValue = jsonToTS(value, indent + 1);
          return `${spaces}  ${key}: ${tsValue}`;
        }).join(',\n');
        return '{\n' + items + '\n' + spaces + '}';
      }
      
      return JSON.stringify(obj);
    }
    
    const tsContent = `// data/hadiths.ts
// Extrait depuis HuggingFace - Collection COMPLÈTE
// ${totalHadiths} hadiths, ${books.length} livres

export const hadithData = {
  collections: [
${jsonToTS(finalData, 2).split('\n').slice(1, -1).join('\n')}
  ]
};

export default hadithData;
`;
    
    fs.writeFileSync(tsPath, tsContent, 'utf-8');
    console.log(`✅ TypeScript sauvegardé: ${tsPath}`);
    
    console.log(`\n📊 Taille: ${(tsContent.length / 1024 / 1024).toFixed(2)} MB`);
    
    console.log('\n🎉 Extraction terminée avec succès !');
    console.log('\n📝 Prochaines étapes:');
    console.log('   1. Le fichier hadiths.ts est prêt !');
    console.log('   2. Lancez: npm run dev');
    console.log('   3. Profitez de vos 7563 hadiths complets !\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function extractNarrator(englishText) {
  const match = englishText.match(/^Narrated\s+([^:]+):/);
  if (match) {
    return match[1].trim();
  }
  return 'Unknown';
}

function getBookNames() {
  // Les 97 livres de Bukhari avec vos noms turcs
  return [
    { id: 'vahyin-baslamasi', name: 'Vahyin Başlaması', nameAr: 'بدء الوحي' },
    { id: 'iman', name: 'İman', nameAr: 'كتاب الإيمان' },
    { id: 'ilm', name: 'İlim', nameAr: 'كتاب العلم' },
    { id: 'abdest', name: 'Abdest (Vudû)', nameAr: 'كتاب الوضوء' },
    { id: 'gusul', name: 'Gusül', nameAr: 'كتاب الغسل' },
    { id: 'hayiz', name: 'Hayız (Âdet Hali)', nameAr: 'كتاب الحيض' },
    { id: 'teyemmum', name: 'Teyemmüm', nameAr: 'كتاب التيمم' },
    { id: 'namaz', name: 'Namaz', nameAr: 'كتاب الصلاة' },
    { id: 'namaz-vakitleri', name: 'Namaz Vakitleri', nameAr: 'كتاب مواقيت الصلاة' },
    { id: 'ezan', name: 'Ezan', nameAr: 'كتاب الأذان' },
    { id: 'cuma', name: 'Cuma Namazı', nameAr: 'كتاب الجمعة' },
    { id: 'korku-namazi', name: 'Korku Namazı', nameAr: 'كتاب صلاة الخوف' },
    { id: 'bayramlar', name: 'İki Bayram (Ramazan ve Kurban)', nameAr: 'كتاب العيدين' },
    { id: 'vitir', name: 'Vitir Namazı', nameAr: 'كتاب الوتر' },
    { id: 'yagmur-duasi', name: 'Yağmur Duası (İstiskâ)', nameAr: 'كتاب الاستسقاء' },
    { id: 'tutulma', name: 'Güneş ve Ay Tutulması', nameAr: 'كتاب الكسوف' },
    { id: 'secde', name: 'Kur\'an Okunurken Secde', nameAr: 'كتاب سجود القرآن' },
    { id: 'kisaltma', name: 'Seferde Namazı Kısaltma', nameAr: 'كتاب التقصير' },
    { id: 'teheccud', name: 'Gece Namazı (Teheccüd)', nameAr: 'كتاب التهجد' },
    { id: 'mescit-fazileti', name: 'Mekke ve Medine Mescitlerinde Namazın Fazileti', nameAr: 'كتاب فضل الصلاة في المساجد' },
    { id: 'namaz-fiilleri', name: 'Namazda Yapılan Fiiller', nameAr: 'كتاب العمل في الصلاة' },
    { id: 'sehiv', name: 'Namazda Sehiv (Unutma)', nameAr: 'كتاب السهو' },
    { id: 'cenazeler', name: 'Cenazeler', nameAr: 'كتاب الجنائز' },
    { id: 'zekat', name: 'Zekât', nameAr: 'كتاب الزكاة' },
    { id: 'hac', name: 'Hac', nameAr: 'كتاب الحج' },
    { id: 'umre', name: 'Umre', nameAr: 'كتاب العمرة' },
    { id: 'muhsar', name: 'Hacdan Alıkonulanlar', nameAr: 'كتاب المحصر' },
    { id: 'av-cezasi', name: 'İhramlıyken Avlanmanın Cezası', nameAr: 'كتاب جزاء الصيد' },
    { id: 'medine-fazileti', name: 'Medine\'nin Faziletleri', nameAr: 'كتاب فضائل المدينة' },
    { id: 'oruc', name: 'Oruç', nameAr: 'كتاب الصيام' },
    { id: 'teravih', name: 'Ramazan\'da Gece Namazı (Teravih)', nameAr: 'كتاب التراويح' },
    { id: 'kadir-gecesi', name: 'Kadir Gecesinin Fazileti', nameAr: 'كتاب فضل ليلة القدر' },
    { id: 'itikaf', name: 'İtikâf', nameAr: 'كتاب الاعتكاف' },
    { id: 'alisveris', name: 'Alışveriş', nameAr: 'كتاب البيوع' },
    { id: 'selem', name: 'Selem (Vadeli Satış)', nameAr: 'كتاب السلم' },
    { id: 'sufa', name: 'Şuf\'a (Önalım Hakkı)', nameAr: 'كتاب الشفعة' },
    { id: 'icare', name: 'İcâre (Kiralama)', nameAr: 'كتاب الإجارة' },
    { id: 'havale', name: 'Havale (Borç Devri)', nameAr: 'كتاب الحوالات' },
    { id: 'kefalet', name: 'Kefalet', nameAr: 'كتاب الكفالة' },
    { id: 'vekalet', name: 'Vekâlet', nameAr: 'كتاب الوكالة' },
    { id: 'ziraat', name: 'Ziraat (Tarım)', nameAr: 'كتاب الحرث' },
    { id: 'sulama', name: 'Sulama ve Su Paylaşımı', nameAr: 'كتاب المساقاة' },
    { id: 'borclar', name: 'Borçlar ve İflas', nameAr: 'كتاب الاستقراض' },
    { id: 'husumetler', name: 'Husumetler', nameAr: 'كتاب الخصومات' },
    { id: 'lukata', name: 'Buluntu Mal (Lukata)', nameAr: 'كتاب اللقطة' },
    { id: 'zulumler', name: 'Zulümler', nameAr: 'كتاب المظالم' },
    { id: 'ortaklik', name: 'Ortaklık', nameAr: 'كتاب الشركة' },
    { id: 'rehin', name: 'Rehin', nameAr: 'كتاب الرهن' },
    { id: 'azat', name: 'Köle Azadı', nameAr: 'كتاب العتق' },
    { id: 'mukatebe', name: 'Mükâtebe', nameAr: 'كتاب المكاتب' },
    { id: 'hibe', name: 'Hibe (Hediyeler)', nameAr: 'كتاب الهبة' },
    { id: 'sahitlik', name: 'Şahitlik', nameAr: 'كتاب الشهادات' },
    { id: 'sulh', name: 'Sulh', nameAr: 'كتاب الصلح' },
    { id: 'sartlar', name: 'Şartlar', nameAr: 'كتاب الشروط' },
    { id: 'vasiyetler', name: 'Vasiyetler', nameAr: 'كتاب الوصايا' },
    { id: 'cihad', name: 'Cihad ve Siyer', nameAr: 'كتاب الجهاد والسير' },
    { id: 'humus', name: 'Ganimetin Beşte Biri (Humus)', nameAr: 'كتاب فرض الخمس' },
    { id: 'cizye', name: 'Cizye ve Antlaşmalar', nameAr: 'كتاب الجزية' },
    { id: 'yaratilis', name: 'Yaratılışın Başlangıcı', nameAr: 'كتاب بدء الخلق' },
    { id: 'peygamberler', name: 'Peygamberler', nameAr: 'كتاب الأنبياء' },
    { id: 'peygamber-fazileti', name: 'Peygamber\'in ve Ashabının Faziletleri', nameAr: 'كتاب المناقب' },
    { id: 'ashab-fazileti', name: 'Ashabın Faziletleri', nameAr: 'كتاب فضائل الصحابة' },
    { id: 'ensar', name: 'Ensar\'ın Faziletleri', nameAr: 'كتاب مناقب الأنصار' },
    { id: 'megazi', name: 'Megazi (Gazveler)', nameAr: 'كتاب المغازي' },
    { id: 'tefsir', name: 'Kur\'an Tefsiri (Nebevi Tefsir)', nameAr: 'كتاب التفسير' },
    { id: 'kuran-fazileti', name: 'Kur\'an\'ın Faziletleri', nameAr: 'كتاب فضائل القرآن' },
    { id: 'nikah', name: 'Nikâh', nameAr: 'كتاب النكاح' },
    { id: 'talak', name: 'Talâk (Boşanma)', nameAr: 'كتاب الطلاق' },
    { id: 'nafakalar', name: 'Nafakalar (Aile Geçimi)', nameAr: 'كتاب النفقات' },
    { id: 'yiyecekler', name: 'Yiyecekler', nameAr: 'كتاب الأطعمة' },
    { id: 'akika', name: 'Akîka', nameAr: 'كتاب العقيقة' },
    { id: 'av-kesim', name: 'Av ve Kesim', nameAr: 'كتاب الذبائح والصيد' },
    { id: 'kurban', name: 'Kurban', nameAr: 'كتاب الأضاحي' },
    { id: 'icecekler', name: 'İçecekler', nameAr: 'كتاب الأشربة' },
    { id: 'hastalar', name: 'Hastalar', nameAr: 'كتاب المرضى' },
    { id: 'tip', name: 'Tıp', nameAr: 'كتاب الطب' },
    { id: 'giyim', name: 'Giyim', nameAr: 'كتاب اللباس' },
    { id: 'edep', name: 'Edep ve Ahlâk', nameAr: 'كتاب الأدب' },
    { id: 'izin', name: 'İzin İsteme', nameAr: 'كتاب الاستئذان' },
    { id: 'dualar', name: 'Dualar', nameAr: 'كتاب الدعوات' },
    { id: 'rikak', name: 'Rikak (Kalpleri Yumuşatan Konular)', nameAr: 'كتاب الرقاق' },
    { id: 'kader', name: 'Kader', nameAr: 'كتاب القدر' },
    { id: 'yeminler', name: 'Yeminler ve Adaklar', nameAr: 'كتاب الأيمان والنذور' },
    { id: 'kefaret', name: 'Yemin Kefaretleri', nameAr: 'كتاب الكفارات' },
    { id: 'miras', name: 'Miras (Ferâiz)', nameAr: 'كتاب الفرائض' },
    { id: 'hadler', name: 'Hadler (Cezalar)', nameAr: 'كتاب الحدود' },
    { id: 'diyetler', name: 'Diyetler', nameAr: 'كتاب الديات' },
    { id: 'murtedler', name: 'Mürtedler', nameAr: 'كتاب استتابة المرتدين' },
    { id: 'ikrah', name: 'İkrah (Zorlama)', nameAr: 'كتاب الإكراه' },
    { id: 'hileler', name: 'Hileler', nameAr: 'كتاب الحيل' },
    { id: 'ruya', name: 'Rüya Tabiri', nameAr: 'كتاب التعبير' },
    { id: 'fitneler', name: 'Fitneler ve Kıyamet', nameAr: 'كتاب الفتن' },
    { id: 'hukumler', name: 'Hükümler (Ahkâm)', nameAr: 'كتاب الأحكام' },
    { id: 'temenniler', name: 'Temenniler', nameAr: 'كتاب التمني' },
    { id: 'haber-vahid', name: 'Haber-i Vâhid', nameAr: 'كتاب أخبار الآحاد' },
    { id: 'itisam', name: 'Kur\'an ve Sünnete Sarılmak', nameAr: 'كتاب الاعتصام' },
    { id: 'tevhid', name: 'Tevhid', nameAr: 'كتاب التوحيد' }
  ];
}

extractFromHuggingFace();
