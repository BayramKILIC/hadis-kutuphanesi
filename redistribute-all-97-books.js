// Script pour redistribuer les 7277 hadiths dans les 97 livres de Sahih al-Bukhari
const fs = require('fs');

// Liste complète des 97 livres de Sahih al-Bukhari avec leurs plages
const bukhariBooks = [
  { id: 'vahyin-baslamasi', name: 'Vahyin Başlaması', nameAr: 'بدء الوحي', start: 1, end: 7 },
  { id: 'iman', name: 'İman', nameAr: 'كتاب الإيمان', start: 8, end: 58 },
  { id: 'ilm', name: 'İlim', nameAr: 'كتاب العلم', start: 59, end: 134 },
  { id: 'abdest', name: 'Abdest (Vudû)', nameAr: 'كتاب الوضوء', start: 135, end: 247 },
  { id: 'gusul', name: 'Gusül', nameAr: 'كتاب الغسل', start: 248, end: 293 },
  { id: 'hayiz', name: 'Hayız (Âdet Hali)', nameAr: 'كتاب الحيض', start: 294, end: 333 },
  { id: 'teyemmum', name: 'Teyemmüm', nameAr: 'كتاب التيمم', start: 334, end: 348 },
  { id: 'namaz', name: 'Namaz', nameAr: 'كتاب الصلاة', start: 349, end: 520 },
  { id: 'namaz-vakitleri', name: 'Namaz Vakitleri', nameAr: 'كتاب مواقيت الصلاة', start: 521, end: 602 },
  { id: 'ezan', name: 'Ezan', nameAr: 'كتاب الأذان', start: 603, end: 875 },
  { id: 'cuma', name: 'Cuma Namazı', nameAr: 'كتاب الجمعة', start: 876, end: 941 },
  { id: 'korku-namazi', name: 'Korku Namazı', nameAr: 'كتاب صلاة الخوف', start: 942, end: 947 },
  { id: 'bayramlar', name: 'İki Bayram (Ramazan ve Kurban)', nameAr: 'كتاب العيدين', start: 948, end: 989 },
  { id: 'vitir', name: 'Vitir Namazı', nameAr: 'كتاب الوتر', start: 990, end: 1004 },
  { id: 'yagmur-duasi', name: 'Yağmur Duası (İstiskâ)', nameAr: 'كتاب الاستسقاء', start: 1005, end: 1039 },
  { id: 'tutulma', name: 'Güneş ve Ay Tutulması', nameAr: 'كتاب الكسوف', start: 1040, end: 1065 },
  { id: 'secde', name: 'Kur\'an Okunurken Secde', nameAr: 'كتاب سجود القرآن', start: 1067, end: 1079 },
  { id: 'kisaltma', name: 'Seferde Namazı Kısaltma', nameAr: 'كتاب التقصير', start: 1080, end: 1119 },
  { id: 'teheccud', name: 'Gece Namazı (Teheccüd)', nameAr: 'كتاب التهجد', start: 1120, end: 1187 },
  { id: 'mescit-fazileti', name: 'Mekke ve Medine Mescitlerinde Namazın Fazileti', nameAr: 'كتاب فضل الصلاة في المساجد', start: 1188, end: 1197 },
  { id: 'namaz-fiilleri', name: 'Namazda Yapılan Fiiller', nameAr: 'كتاب العمل في الصلاة', start: 1198, end: 1223 },
  { id: 'sehiv', name: 'Namazda Sehiv (Unutma)', nameAr: 'كتاب السهو', start: 1224, end: 1236 },
  { id: 'cenazeler', name: 'Cenazeler', nameAr: 'كتاب الجنائز', start: 1237, end: 1394 },
  { id: 'zekat', name: 'Zekât', nameAr: 'كتاب الزكاة', start: 1395, end: 1512 },
  { id: 'hac', name: 'Hac', nameAr: 'كتاب الحج', start: 1513, end: 1771 },
  { id: 'umre', name: 'Umre', nameAr: 'كتاب العمرة', start: 1773, end: 1805 },
  { id: 'muhsar', name: 'Hacdan Alıkonulanlar', nameAr: 'كتاب المحصر', start: 1806, end: 1820 },
  { id: 'av-cezasi', name: 'İhramlıyken Avlanmanın Cezası', nameAr: 'كتاب جزاء الصيد', start: 1821, end: 1866 },
  { id: 'medine-fazileti', name: 'Medine\'nin Faziletleri', nameAr: 'كتاب فضائل المدينة', start: 1867, end: 1890 },
  { id: 'oruc', name: 'Oruç', nameAr: 'كتاب الصيام', start: 1891, end: 2007 },
  { id: 'teravih', name: 'Ramazan\'da Gece Namazı (Teravih)', nameAr: 'كتاب التراويح', start: 2008, end: 2013 },
  { id: 'kadir-gecesi', name: 'Kadir Gecesinin Fazileti', nameAr: 'كتاب فضل ليلة القدر', start: 2014, end: 2024 },
  { id: 'itikaf', name: 'İtikâf', nameAr: 'كتاب الاعتكاف', start: 2025, end: 2046 },
  { id: 'alisveris', name: 'Alışveriş', nameAr: 'كتاب البيوع', start: 2047, end: 2238 },
  { id: 'selem', name: 'Selem (Vadeli Satış)', nameAr: 'كتاب السلم', start: 2239, end: 2256 },
  { id: 'sufa', name: 'Şuf\'a (Önalım Hakkı)', nameAr: 'كتاب الشفعة', start: 2257, end: 2259 },
  { id: 'icare', name: 'İcâre (Kiralama)', nameAr: 'كتاب الإجارة', start: 2260, end: 2285 },
  { id: 'havale', name: 'Havale (Borç Devri)', nameAr: 'كتاب الحوالات', start: 2287, end: 2289 },
  { id: 'kefalet', name: 'Kefalet', nameAr: 'كتاب الكفالة', start: 2290, end: 2298 },
  { id: 'vekalet', name: 'Vekâlet', nameAr: 'كتاب الوكالة', start: 2299, end: 2319 },
  { id: 'ziraat', name: 'Ziraat (Tarım)', nameAr: 'كتاب الحرث', start: 2320, end: 2350 },
  { id: 'sulama', name: 'Sulama ve Su Paylaşımı', nameAr: 'كتاب المساقاة', start: 2351, end: 2383 },
  { id: 'borclar', name: 'Borçlar ve İflas', nameAr: 'كتاب الاستقراض', start: 2385, end: 2409 },
  { id: 'husumetler', name: 'Husumetler', nameAr: 'كتاب الخصومات', start: 2410, end: 2425 },
  { id: 'lukata', name: 'Buluntu Mal (Lukata)', nameAr: 'كتاب اللقطة', start: 2426, end: 2439 },
  { id: 'zulumler', name: 'Zulümler', nameAr: 'كتاب المظالم', start: 2440, end: 2482 },
  { id: 'ortaklik', name: 'Ortaklık', nameAr: 'كتاب الشركة', start: 2483, end: 2507 },
  { id: 'rehin', name: 'Rehin', nameAr: 'كتاب الرهن', start: 2508, end: 2515 },
  { id: 'azat', name: 'Köle Azadı', nameAr: 'كتاب العتق', start: 2517, end: 2559 },
  { id: 'mukatebe', name: 'Mükâtebe', nameAr: 'كتاب المكاتب', start: 2560, end: 2565 },
  { id: 'hibe', name: 'Hibe (Hediyeler)', nameAr: 'كتاب الهبة', start: 2566, end: 2636 },
  { id: 'sahitlik', name: 'Şahitlik', nameAr: 'كتاب الشهادات', start: 2637, end: 2689 },
  { id: 'sulh', name: 'Sulh', nameAr: 'كتاب الصلح', start: 2690, end: 2710 },
  { id: 'sartlar', name: 'Şartlar', nameAr: 'كتاب الشروط', start: 2711, end: 2737 },
  { id: 'vasiyetler', name: 'Vasiyetler', nameAr: 'كتاب الوصايا', start: 2738, end: 2781 },
  { id: 'cihad', name: 'Cihad ve Siyer', nameAr: 'كتاب الجهاد والسير', start: 2782, end: 3090 },
  { id: 'humus', name: 'Ganimetin Beşte Biri (Humus)', nameAr: 'كتاب فرض الخمس', start: 3091, end: 3155 },
  { id: 'cizye', name: 'Cizye ve Antlaşmalar', nameAr: 'كتاب الجزية', start: 3156, end: 3189 },
  { id: 'yaratilis', name: 'Yaratılışın Başlangıcı', nameAr: 'كتاب بدء الخلق', start: 3190, end: 3325 },
  { id: 'peygamberler', name: 'Peygamberler', nameAr: 'كتاب الأنبياء', start: 3326, end: 3488 },
  { id: 'peygamber-fazileti', name: 'Peygamber\'in ve Ashabının Faziletleri', nameAr: 'كتاب المناقب', start: 3489, end: 3648 },
  { id: 'ashab-fazileti', name: 'Ashabın Faziletleri', nameAr: 'كتاب فضائل الصحابة', start: 3649, end: 3775 },
  { id: 'ensar', name: 'Ensar\'ın Faziletleri', nameAr: 'كتاب مناقب الأنصار', start: 3776, end: 3948 },
  { id: 'megazi', name: 'Megazi (Gazveler)', nameAr: 'كتاب المغازي', start: 3949, end: 4473 },
  { id: 'tefsir', name: 'Kur\'an Tefsiri (Nebevi Tefsir)', nameAr: 'كتاب التفسير', start: 4474, end: 4977 },
  { id: 'kuran-fazileti', name: 'Kur\'an\'ın Faziletleri', nameAr: 'كتاب فضائل القرآن', start: 4978, end: 5062 },
  { id: 'nikah', name: 'Nikâh', nameAr: 'كتاب النكاح', start: 5063, end: 5250 },
  { id: 'talak', name: 'Talâk (Boşanma)', nameAr: 'كتاب الطلاق', start: 5251, end: 5350 },
  { id: 'nafakalar', name: 'Nafakalar (Aile Geçimi)', nameAr: 'كتاب النفقات', start: 5351, end: 5372 },
  { id: 'yiyecekler', name: 'Yiyecekler', nameAr: 'كتاب الأطعمة', start: 5373, end: 5466 },
  { id: 'akika', name: 'Akîka', nameAr: 'كتاب العقيقة', start: 5467, end: 5474 },
  { id: 'av-kesim', name: 'Av ve Kesim', nameAr: 'كتاب الذبائح والصيد', start: 5475, end: 5544 },
  { id: 'kurban', name: 'Kurban', nameAr: 'كتاب الأضاحي', start: 5545, end: 5574 },
  { id: 'icecekler', name: 'İçecekler', nameAr: 'كتاب الأشربة', start: 5575, end: 5639 },
  { id: 'hastalar', name: 'Hastalar', nameAr: 'كتاب المرضى', start: 5640, end: 5677 },
  { id: 'tip', name: 'Tıp', nameAr: 'كتاب الطب', start: 5678, end: 5782 },
  { id: 'giyim', name: 'Giyim', nameAr: 'كتاب اللباس', start: 5783, end: 5969 },
  { id: 'edep', name: 'Edep ve Ahlâk', nameAr: 'كتاب الأدب', start: 5970, end: 6226 },
  { id: 'izin', name: 'İzin İsteme', nameAr: 'كتاب الاستئذان', start: 6227, end: 6303 },
  { id: 'dualar', name: 'Dualar', nameAr: 'كتاب الدعوات', start: 6304, end: 6411 },
  { id: 'rikak', name: 'Rikak (Kalpleri Yumuşatan Konular)', nameAr: 'كتاب الرقاق', start: 6412, end: 6593 },
  { id: 'kader', name: 'Kader', nameAr: 'كتاب القدر', start: 6594, end: 6620 },
  { id: 'yeminler', name: 'Yeminler ve Adaklar', nameAr: 'كتاب الأيمان والنذور', start: 6621, end: 6707 },
  { id: 'kefaret', name: 'Yemin Kefaretleri', nameAr: 'كتاب الكفارات', start: 6708, end: 6722 },
  { id: 'miras', name: 'Miras (Ferâiz)', nameAr: 'كتاب الفرائض', start: 6723, end: 6771 },
  { id: 'hadler', name: 'Hadler (Cezalar)', nameAr: 'كتاب الحدود', start: 6772, end: 6859 },
  { id: 'diyetler', name: 'Diyetler', nameAr: 'كتاب الديات', start: 6861, end: 6917 },
  { id: 'murtedler', name: 'Mürtedler', nameAr: 'كتاب استتابة المرتدين', start: 6918, end: 6939 },
  { id: 'ikrah', name: 'İkrah (Zorlama)', nameAr: 'كتاب الإكراه', start: 6940, end: 6952 },
  { id: 'hileler', name: 'Hileler', nameAr: 'كتاب الحيل', start: 6953, end: 6981 },
  { id: 'ruya', name: 'Rüya Tabiri', nameAr: 'كتاب التعبير', start: 6982, end: 7047 },
  { id: 'fitneler', name: 'Fitneler ve Kıyamet', nameAr: 'كتاب الفتن', start: 7048, end: 7136 },
  { id: 'hukumler', name: 'Hükümler (Ahkâm)', nameAr: 'كتاب الأحكام', start: 7137, end: 7225 },
  { id: 'temenniler', name: 'Temenniler', nameAr: 'كتاب التمني', start: 7226, end: 7245 },
  { id: 'haber-vahid', name: 'Haber-i Vâhid', nameAr: 'كتاب أخبار الآحاد', start: 7246, end: 7267 },
  { id: 'itisam', name: 'Kur\'an ve Sünnete Sarılmak', nameAr: 'كتاب الاعتصام', start: 7268, end: 7370 },
  { id: 'tevhid', name: 'Tevhid', nameAr: 'كتاب التوحيد', start: 7371, end: 7563 }
];

function objectToTypeScript(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => spaces + '  ' + objectToTypeScript(item, indent + 1)).join(',\n');
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
  
  if (typeof obj === 'string') return JSON.stringify(obj);
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  return 'null';
}

function getBookForHadith(hadithId) {
  for (const book of bukhariBooks) {
    if (hadithId >= book.start && hadithId <= book.end) {
      return book;
    }
  }
  return null;
}

async function redistributeHadiths() {
  try {
    console.log('🚀 Redistribution dans les 97 livres de Sahih al-Bukhari...\n');
    
    const hadithsPath = './data/hadiths.ts';
    if (!fs.existsSync(hadithsPath)) throw new Error('Le fichier data/hadiths.ts n\'existe pas');
    
    const content = fs.readFileSync(hadithsPath, 'utf-8');
    const dataMatch = content.match(/export const hadithData = ({[\s\S]+});/);
    if (!dataMatch) throw new Error('Impossible de trouver hadithData');
    
    const data = eval('(' + dataMatch[1] + ')');
    
    console.log('📖 Collecte de tous les hadiths...');
    const allHadiths = [];
    
    data.collections[0].books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.hadiths.forEach(hadith => allHadiths.push(hadith));
      });
    });
    
    console.log(`✅ ${allHadiths.length} hadiths collectés\n`);
    
    console.log('📚 Redistribution dans les 97 livres...\n');
    
    let distributed = 0;
    let notFound = 0;
    
    const newBooks = bukhariBooks.map((bookInfo, idx) => {
      const bookHadiths = allHadiths.filter(hadith => {
        const book = getBookForHadith(hadith.id);
        return book && book.id === bookInfo.id;
      });
      
      bookHadiths.sort((a, b) => a.id - b.id);
      distributed += bookHadiths.length;
      
      if (bookHadiths.length > 0) {
        const firstId = bookHadiths[0].id;
        const lastId = bookHadiths[bookHadiths.length - 1].id;
        console.log(`${String(idx + 1).padStart(2)}. ${bookInfo.name.padEnd(45)} | ${String(bookHadiths.length).padStart(4)} hadiths (#${firstId}-#${lastId})`);
      } else {
        console.log(`${String(idx + 1).padStart(2)}. ${bookInfo.name.padEnd(45)} | ${String(0).padStart(4)} hadiths`);
        notFound++;
      }
      
      return {
        id: bookInfo.id,
        name: bookInfo.name,
        nameAr: bookInfo.nameAr,
        chapters: [{
          id: 'ch1',
          name: 'Bölüm 1',
          nameAr: '',
          hadiths: bookHadiths
        }]
      };
    });
    
    console.log(`\n📊 Statistiques:`);
    console.log(`   Total hadiths: ${allHadiths.length}`);
    console.log(`   Distribués: ${distributed}`);
    console.log(`   Non trouvés: ${allHadiths.length - distributed}`);
    console.log(`   Livres vides: ${notFound}`);
    
    const newData = {
      collections: [{
        id: 'bukhari',
        name: 'Sahih al-Bukhari',
        nameAr: 'صحيح البخاري',
        books: newBooks
      }]
    };
    
    console.log('\n🔨 Génération du fichier...');
    const output = `// data/hadiths.ts\n// Sahih al-Bukhari - 97 livres complets\n\nexport const hadithData = ${objectToTypeScript(newData, 0)};\n\nexport default hadithData;\n`;
    
    fs.writeFileSync(hadithsPath, output, 'utf-8');
    
    console.log(`✅ Fichier généré: ${hadithsPath}`);
    console.log(`📊 Taille: ${(output.length / 1024).toFixed(2)} KB`);
    console.log('\n🎉 Redistribution terminée!');
    console.log('🚀 Lancez: npm run dev\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

redistributeHadiths();
