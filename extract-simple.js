// Script simplifié pour extraire depuis HuggingFace avec le bon format
const fs = require('fs');
const path = require('path');

async function extractSimple() {
  console.log('🚀 Extraction depuis HuggingFace...\n');
  
  const HUGGINGFACE_URL = 'https://huggingface.co/datasets/meeAtif/hadith_datasets/resolve/main/Sahih%20al-Bukhari.json';
  
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(HUGGINGFACE_URL);
    const rawData = await response.json();
    
    let hadithsList = Array.isArray(rawData) ? rawData : Object.values(rawData);
    
    // Extraire les numéros de hadiths
    hadithsList = hadithsList.map(h => {
      let hadithNumber = 0;
      if (h.Reference) {
        const match = h.Reference.match(/bukhari:(\d+)/);
        if (match) hadithNumber = parseInt(match[1]);
      }
      return { ...h, hadithNumber };
    }).filter(h => h.hadithNumber > 0)
      .sort((a, b) => a.hadithNumber - b.hadithNumber);
    
    console.log(`✅ ${hadithsList.length} hadiths téléchargés\n`);
    
    // Grouper par livre ET par chapitre
    const bookGroups = {};
    hadithsList.forEach(h => {
      const bookNum = h.Chapter_Number;
      if (!bookNum) return;
      
      if (!bookGroups[bookNum]) {
        bookGroups[bookNum] = {};
      }
      
      // Utiliser le titre du chapitre comme clé
      const chapterKey = h.Chapter_Title_Arabic || 'default';
      
      if (!bookGroups[bookNum][chapterKey]) {
        bookGroups[bookNum][chapterKey] = {
          titleAr: h.Chapter_Title_Arabic || '',
          titleEn: h.Chapter_Title_English || '',
          hadiths: []
        };
      }
      
      bookGroups[bookNum][chapterKey].hadiths.push({
        id: h.hadithNumber,
        textAr: h.Arabic_Text || '',
        textTr: '',
        narrator: (h.English_Text || '').match(/^Narrated\s+([^:]+):/)?.[1]?.trim() || 'Unknown',
        narratorAr: '',
        reference: `Buhari ${h.hadithNumber}`,
        grade: h.Grade || 'Sahih',
        sunnah_link: h.Reference || ''
      });
    });
    
    console.log(`📚 ${Object.keys(bookGroups).length} livres trouvés\n`);
    
    // Créer la structure finale
    const bookNames = getBookNames();
    const books = [];
    
    for (let i = 1; i <= 97; i++) {
      const chapters = bookGroups[i];
      if (!chapters || Object.keys(chapters).length === 0) continue;
      
      const bookInfo = bookNames[i - 1] || { id: `livre${i}`, name: `Livre ${i}`, nameAr: '' };
      
      // Convertir les chapitres en tableau
      const chapterArray = Object.values(chapters).map((chap, idx) => ({
        id: `ch${idx + 1}`,
        name: chap.titleEn || `Bölüm ${idx + 1}`,
        nameAr: chap.titleAr || '',
        hadiths: chap.hadiths
      }));
      
      const totalHadiths = chapterArray.reduce((sum, ch) => sum + ch.hadiths.length, 0);
      
      books.push({
        id: bookInfo.id,
        name: bookInfo.name,
        nameAr: bookInfo.nameAr,
        chapters: chapterArray
      });
      
      console.log(`   Livre ${String(i).padStart(2)}: ${totalHadiths} hadiths, ${chapterArray.length} chapitres`);
    }
    
    const totalHadiths = books.reduce((sum, b) => 
      sum + b.chapters.reduce((s, c) => s + c.hadiths.length, 0), 0
    );
    
    console.log(`\n✅ Total: ${totalHadiths} hadiths dans ${books.length} livres\n`);
    
    // Créer le fichier avec JSON.stringify puis remplacer les guillemets des clés
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const finalData = {
      collections: [{
        id: 'bukhari',
        name: 'Sahih al-Bukhari',
        nameAr: 'صحيح البخاري',
        books: books
      }]
    };
    
    // Générer le contenu TypeScript
    let tsContent = JSON.stringify(finalData, null, 2);
    
    // Remplacer les guillemets des clés
    tsContent = tsContent.replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, '$1:');
    
    const output = `// data/hadiths.ts
// Sahih al-Bukhari complet - ${totalHadiths} hadiths

export const hadithData = ${tsContent};

export default hadithData;
`;
    
    const tsPath = path.join(dataDir, 'hadiths.ts');
    fs.writeFileSync(tsPath, output, 'utf-8');
    
    console.log(`✅ Fichier créé: ${tsPath}`);
    console.log(`📊 Taille: ${(output.length / 1024 / 1024).toFixed(2)} MB\n`);
    console.log('🎉 Terminé ! Lancez: npm run dev\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

function getBookNames() {
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

extractSimple();
