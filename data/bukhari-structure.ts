// data/bukhari-structure.ts
export const bukhariBooks = [
  {
    id: 'iman',
    name: 'İman Kitabı',
    nameAr: 'كتاب الإيمان',
    chapters: [] // Déjà rempli dans hadiths.ts
  },
  {
    id: 'ilm',
    name: 'İlim Kitabı',
    nameAr: 'كتاب العلم',
    chapters: [] // Déjà rempli
  },
  {
    id: 'wudu',
    name: 'Abdest Kitabı',
    nameAr: 'كتاب الوضوء',
    chapters: [
      { id: 'ch1', name: 'Abdestin Fazileti', nameAr: 'باب فضل الوضوء', hadiths: [] }
    ]
  },
  {
    id: 'ghusl',
    name: 'Gusl (Boy Abdesti) Kitabı',
    nameAr: 'كتاب الغسل',
    chapters: [
      { id: 'ch1', name: 'Guslün Farziyeti', nameAr: 'باب وجوب الغسل', hadiths: [] }
    ]
  },
  {
    id: 'hayd',
    name: 'Hayız Kitabı',
    nameAr: 'كتاب الحيض',
    chapters: [
      { id: 'ch1', name: 'Hayız Hükümleri', nameAr: 'باب أحكام الحيض', hadiths: [] }
    ]
  },
  {
    id: 'tayammum',
    name: 'Teyemmüm Kitabı',
    nameAr: 'كتاب التيمم',
    chapters: [
      { id: 'ch1', name: 'Teyemmümün Meşruiyeti', nameAr: 'باب التيمم', hadiths: [] }
    ]
  },
  {
    id: 'salat',
    name: 'Namaz Kitabı',
    nameAr: 'كتاب الصلاة',
    chapters: [] // Déjà rempli
  },
  {
    id: 'mawaqit',
    name: 'Namaz Vakitleri Kitabı',
    nameAr: 'كتاب مواقيت الصلاة',
    chapters: [
      { id: 'ch1', name: 'Vakitlerin Fazileti', nameAr: 'باب فضل المواقيت', hadiths: [] }
    ]
  },
  {
    id: 'adhan',
    name: 'Ezan Kitabı',
    nameAr: 'كتاب الأذان',
    chapters: [
      { id: 'ch1', name: 'Ezanın Başlangıcı', nameAr: 'باب بدء الأذان', hadiths: [] }
    ]
  },
  {
    id: 'jumua',
    name: 'Cuma Kitabı',
    nameAr: 'كتاب الجمعة',
    chapters: [
      { id: 'ch1', name: 'Cuma Namazının Farziyeti', nameAr: 'باب وجوب الجمعة', hadiths: [] }
    ]
  },
  {
    id: 'khawf',
    name: 'Korku Namazı Kitabı',
    nameAr: 'كتاب صلاة الخوف',
    chapters: [
      { id: 'ch1', name: 'Korku Namazı', nameAr: 'باب صلاة الخوف', hadiths: [] }
    ]
  },
  {
    id: 'eidain',
    name: 'Bayram Namazları Kitabı',
    nameAr: 'كتاب العيدين',
    chapters: [
      { id: 'ch1', name: 'Bayram Namazı', nameAr: 'باب صلاة العيدين', hadiths: [] }
    ]
  },
  {
    id: 'witr',
    name: 'Vitir Namazı Kitabı',
    nameAr: 'كتاب الوتر',
    chapters: [
      { id: 'ch1', name: 'Vitir Namazı', nameAr: 'باب الوتر', hadiths: [] }
    ]
  },
  {
    id: 'istisqa',
    name: 'Yağmur Duası Kitabı',
    nameAr: 'كتاب الاستسقاء',
    chapters: [
      { id: 'ch1', name: 'Yağmur Duası Namazı', nameAr: 'باب صلاة الاستسقاء', hadiths: [] }
    ]
  },
  {
    id: 'kusuf',
    name: 'Güneş ve Ay Tutulması Namazı Kitabı',
    nameAr: 'كتاب الكسوف',
    chapters: [
      { id: 'ch1', name: 'Tutulma Namazı', nameAr: 'باب صلاة الكسوف', hadiths: [] }
    ]
  },
  {
    id: 'sujud',
    name: 'Secde Kitabı',
    nameAr: 'كتاب السجود',
    chapters: [
      { id: 'ch1', name: 'Tilavetin Secdesi', nameAr: 'باب سجود القرآن', hadiths: [] }
    ]
  },
  {
    id: 'taqsir',
    name: 'Namazı Kısaltma Kitabı',
    nameAr: 'كتاب التقصير',
    chapters: [
      { id: 'ch1', name: 'Seferde Namaz', nameAr: 'باب الصلاة في السفر', hadiths: [] }
    ]
  },
  {
    id: 'tahajjud',
    name: 'Teheccüd Namazı Kitabı',
    nameAr: 'كتاب التهجد',
    chapters: [
      { id: 'ch1', name: 'Gece Namazı', nameAr: 'باب قيام الليل', hadiths: [] }
    ]
  },
  {
    id: 'masajid',
    name: 'Mescidler Kitabı',
    nameAr: 'كتاب المساجد',
    chapters: [
      { id: 'ch1', name: 'Mescid Yapmanın Fazileti', nameAr: 'باب بناء المساجد', hadiths: [] }
    ]
  },
  {
    id: 'zakat',
    name: 'Zekat Kitabı',
    nameAr: 'كتاب الزكاة',
    chapters: [] // Déjà rempli
  },
  {
    id: 'zakatul-fitr',
    name: 'Fıtır Sadakası Kitabı',
    nameAr: 'كتاب زكاة الفطر',
    chapters: [
      { id: 'ch1', name: 'Fıtır Sadakası', nameAr: 'باب زكاة الفطر', hadiths: [] }
    ]
  },
  {
    id: 'hajj',
    name: 'Hac Kitabı',
    nameAr: 'كتاب الحج',
    chapters: [] // Déjà rempli
  },
  {
    id: 'umra',
    name: 'Umre Kitabı',
    nameAr: 'كتاب العمرة',
    chapters: [
      { id: 'ch1', name: 'Umre', nameAr: 'باب العمرة', hadiths: [] }
    ]
  },
  {
    id: 'muhsar',
    name: 'İhramdan Çıkamama Kitabı',
    nameAr: 'كتاب المحصر',
    chapters: [
      { id: 'ch1', name: 'Muhsar', nameAr: 'باب المحصر', hadiths: [] }
    ]
  },
  {
    id: 'jazaa',
    name: 'Hac Cezaları Kitabı',
    nameAr: 'كتاب جزاء الصيد',
    chapters: [
      { id: 'ch1', name: 'Haccın Cezaları', nameAr: 'باب جزاء الصيد', hadiths: [] }
    ]
  },
  {
    id: 'fadail-madina',
    name: 'Medine\'nin Faziletleri Kitabı',
    nameAr: 'كتاب فضائل المدينة',
    chapters: [
      { id: 'ch1', name: 'Medine\'nin Fazileti', nameAr: 'باب فضل المدينة', hadiths: [] }
    ]
  },
  {
    id: 'sawm',
    name: 'Oruç Kitabı',
    nameAr: 'كتاب الصيام',
    chapters: [] // Déjà rempli
  },
  {
    id: 'tarawih',
    name: 'Teravih Namazı Kitabı',
    nameAr: 'كتاب التراويح',
    chapters: [
      { id: 'ch1', name: 'Teravih', nameAr: 'باب التراويح', hadiths: [] }
    ]
  },
  {
    id: 'itikaf',
    name: 'İtikaf Kitabı',
    nameAr: 'كتاب الاعتكاف',
    chapters: [
      { id: 'ch1', name: 'İtikaf', nameAr: 'باب الاعتكاف', hadiths: [] }
    ]
  },
  {
    id: 'buyu',
    name: 'Alışveriş Kitabı',
    nameAr: 'كتاب البيوع',
    chapters: [
      { id: 'ch1', name: 'Ticaret', nameAr: 'باب البيع', hadiths: [] }
    ]
  },
  {
    id: 'salam',
    name: 'Selem Kitabı',
    nameAr: 'كتاب السلم',
    chapters: [
      { id: 'ch1', name: 'Selem Akdi', nameAr: 'باب السلم', hadiths: [] }
    ]
  },
  {
    id: 'shurut',
    name: 'Şartlar Kitabı',
    nameAr: 'كتاب الشروط',
    chapters: [
      { id: 'ch1', name: 'Akitlerde Şartlar', nameAr: 'باب الشروط', hadiths: [] }
    ]
  },
  {
    id: 'wasaya',
    name: 'Vasiyetler Kitabı',
    nameAr: 'كتاب الوصايا',
    chapters: [
      { id: 'ch1', name: 'Vasiyet', nameAr: 'باب الوصايا', hadiths: [] }
    ]
  },
  {
    id: 'jihad',
    name: 'Cihad Kitabı',
    nameAr: 'كتاب الجهاد',
    chapters: [
      { id: 'ch1', name: 'Cihadın Fazileti', nameAr: 'باب فضل الجهاد', hadiths: [] }
    ]
  },
  {
    id: 'bad-khalq',
    name: 'Yaratılışın Başlangıcı Kitabı',
    nameAr: 'كتاب بدء الخلق',
    chapters: [
      { id: 'ch1', name: 'Yaratılış', nameAr: 'باب بدء الخلق', hadiths: [] }
    ]
  },
  {
    id: 'anbiya',
    name: 'Peygamberler Kitabı',
    nameAr: 'كتاب الأنبياء',
    chapters: [
      { id: 'ch1', name: 'Peygamberlerin Kıssaları', nameAr: 'باب قصص الأنبياء', hadiths: [] }
    ]
  },
  {
    id: 'manaqib',
    name: 'Sahabeler Kitabı',
    nameAr: 'كتاب المناقب',
    chapters: [
      { id: 'ch1', name: 'Sahabenin Fazileti', nameAr: 'باب فضائل الصحابة', hadiths: [] }
    ]
  },
  {
    id: 'fadail-quran',
    name: 'Kur\'an\'ın Faziletleri Kitabı',
    nameAr: 'كتاب فضائل القرآن',
    chapters: [
      { id: 'ch1', name: 'Kur\'an\'ın Fazileti', nameAr: 'باب فضل القرآن', hadiths: [] }
    ]
  },
  {
    id: 'nikah',
    name: 'Nikah Kitabı',
    nameAr: 'كتاب النكاح',
    chapters: [
      { id: 'ch1', name: 'Evlilik', nameAr: 'باب النكاح', hadiths: [] }
    ]
  },
  {
    id: 'talaq',
    name: 'Boşanma Kitabı',
    nameAr: 'كتاب الطلاق',
    chapters: [
      { id: 'ch1', name: 'Talak', nameAr: 'باب الطلاق', hadiths: [] }
    ]
  },
  {
    id: 'nafaqat',
    name: 'Nafaka Kitabı',
    nameAr: 'كتاب النفقات',
    chapters: [
      { id: 'ch1', name: 'Nafaka', nameAr: 'باب النفقة', hadiths: [] }
    ]
  },
  {
    id: 'atima',
    name: 'Yemekler Kitabı',
    nameAr: 'كتاب الأطعمة',
    chapters: [
      { id: 'ch1', name: 'Yemek Adabı', nameAr: 'باب آداب الطعام', hadiths: [] }
    ]
  },
  {
    id: 'aqiqa',
    name: 'Akika Kitabı',
    nameAr: 'كتاب العقيقة',
    chapters: [
      { id: 'ch1', name: 'Akika', nameAr: 'باب العقيقة', hadiths: [] }
    ]
  },
  {
    id: 'zabh',
    name: 'Kurban Kesme Kitabı',
    nameAr: 'كتاب الذبائح',
    chapters: [
      { id: 'ch1', name: 'Kesim', nameAr: 'باب الذبح', hadiths: [] }
    ]
  },
  {
    id: 'sayd',
    name: 'Avcılık Kitabı',
    nameAr: 'كتاب الصيد',
    chapters: [
      { id: 'ch1', name: 'Av', nameAr: 'باب الصيد', hadiths: [] }
    ]
  },
  {
    id: 'adahi',
    name: 'Kurbanlar Kitabı',
    nameAr: 'كتاب الأضاحي',
    chapters: [
      { id: 'ch1', name: 'Kurban', nameAr: 'باب الأضحية', hadiths: [] }
    ]
  },
  {
    id: 'ashriba',
    name: 'İçecekler Kitabı',
    nameAr: 'كتاب الأشربة',
    chapters: [
      { id: 'ch1', name: 'İçecek Adabı', nameAr: 'باب آداب الشرب', hadiths: [] }
    ]
  },

  {
    id: 'marda',
    name: 'Hastalar Kitabı',
    nameAr: 'كتاب المرضى',
    chapters: [
      { id: 'ch1', name: 'Hasta Ziyareti', nameAr: 'باب عيادة المريض', hadiths: [] }
    ]
  },
  {
    id: 'tibb',
    name: 'Tıp Kitabı',
    nameAr: 'كتاب الطب',
    chapters: [
      { id: 'ch1', name: 'Tedavi', nameAr: 'باب التداوي', hadiths: [] }
    ]
  },
  {
    id: 'libas',
    name: 'Elbise Kitabı',
    nameAr: 'كتاب اللباس',
    chapters: [
      { id: 'ch1', name: 'Giyim Kuşam', nameAr: 'باب اللباس', hadiths: [] }
    ]
  },
  {
    id: 'adab',
    name: 'Edeb Kitabı',
    nameAr: 'كتاب الأدب',
    chapters: [] // Déjà rempli
  },
  {
    id: 'isti-dhan',
    name: 'İzin İsteme Kitabı',
    nameAr: 'كتاب الاستئذان',
    chapters: [
      { id: 'ch1', name: 'İzin Alma Adabı', nameAr: 'باب الاستئذان', hadiths: [] }
    ]
  },
  {
    id: 'dawa',
    name: 'Dua ve Zikirler Kitabı',
    nameAr: 'كتاب الدعوات',
    chapters: [
      { id: 'ch1', name: 'Dualar', nameAr: 'باب الدعاء', hadiths: [] }
    ]
  },
  {
    id: 'riqaq',
    name: 'Kalpleri Yumuşatan Sözler Kitabı',
    nameAr: 'كتاب الرقاق',
    chapters: [
      { id: 'ch1', name: 'Kalp Yumuşaklığı', nameAr: 'باب الرقاق', hadiths: [] }
    ]
  },
  {
    id: 'qadar',
    name: 'Kader Kitabı',
    nameAr: 'كتاب القدر',
    chapters: [
      { id: 'ch1', name: 'Kadere İman', nameAr: 'باب الإيمان بالقدر', hadiths: [] }
    ]
  },
  {
    id: 'aiman',
    name: 'Yeminler Kitabı',
    nameAr: 'كتاب الأيمان',
    chapters: [
      { id: 'ch1', name: 'Yemin ve Nezirler', nameAr: 'باب الأيمان', hadiths: [] }
    ]
  },
  {
    id: 'kafarat',
    name: 'Keffaretler Kitabı',
    nameAr: 'كتاب الكفارات',
    chapters: [
      { id: 'ch1', name: 'Kefaret', nameAr: 'باب الكفارات', hadiths: [] }
    ]
  },
  {
    id: 'faraid',
    name: 'Miras Kitabı',
    nameAr: 'كتاب الفرائض',
    chapters: [
      { id: 'ch1', name: 'Miras Hukuku', nameAr: 'باب الفرائض', hadiths: [] }
    ]
  },
  {
    id: 'hudud',
    name: 'Had Cezaları Kitabı',
    nameAr: 'كتاب الحدود',
    chapters: [
      { id: 'ch1', name: 'Hadler', nameAr: 'باب الحدود', hadiths: [] }
    ]
  },
  {
    id: 'diyat',
    name: 'Diyet Kitabı',
    nameAr: 'كتاب الديات',
    chapters: [
      { id: 'ch1', name: 'Diyet', nameAr: 'باب الديات', hadiths: [] }
    ]
  },
  {
    id: 'istitate',
    name: 'Mürtedler Kitabı',
    nameAr: 'كتاب استتابة المرتدين',
    chapters: [
      { id: 'ch1', name: 'Mürtetler', nameAr: 'باب المرتدين', hadiths: [] }
    ]
  },
  {
    id: 'ikrah',
    name: 'Zorlama Kitabı',
    nameAr: 'كتاب الإكراه',
    chapters: [
      { id: 'ch1', name: 'İkrah', nameAr: 'باب الإكراه', hadiths: [] }
    ]
  },
  {
    id: 'hiyal',
    name: 'Hileler Kitabı',
    nameAr: 'كتاب الحيل',
    chapters: [
      { id: 'ch1', name: 'Hukuki Hileler', nameAr: 'باب الحيل', hadiths: [] }
    ]
  },
  {
    id: 'tafsir',
    name: 'Tefsir Kitabı',
    nameAr: 'كتاب التفسير',
    chapters: [
      { id: 'ch1', name: 'Kur\'an Tefsiri', nameAr: 'باب التفسير', hadiths: [] }
    ]
  },
  {
    id: 'maghazi',
    name: 'Gazveler Kitabı',
    nameAr: 'كتاب المغازي',
    chapters: [
      { id: 'ch1', name: 'Peygamberin Savaşları', nameAr: 'باب المغازي', hadiths: [] }
    ]
  },
  {
    id: 'tawhid',
    name: 'Tevhid Kitabı',
    nameAr: 'كتاب التوحيد',
    chapters: [
      { id: 'ch1', name: 'Allah\'ın Birliği', nameAr: 'باب التوحيد', hadiths: [] }
    ]
  },
  {
    id: 'itisam',
    name: 'Kitap ve Sünnete Sarılma Kitabı',
    nameAr: 'كتاب الاعتصام',
    chapters: [
      { id: 'ch1', name: 'Sünnete Bağlılık', nameAr: 'باب الاعتصام بالكتاب والسنة', hadiths: [] }
    ]
  },
  {
    id: 'ahkam',
    name: 'Hükümler Kitabı',
    nameAr: 'كتاب الأحكام',
    chapters: [
      { id: 'ch1', name: 'Yöneticilik', nameAr: 'باب الإمارة', hadiths: [] }
    ]
  },
  {
    id: 'tamanni',
    name: 'Temenniler Kitabı',
    nameAr: 'كتاب التمني',
    chapters: [
      { id: 'ch1', name: 'Temenniler', nameAr: 'باب التمني', hadiths: [] }
    ]
  },
  {
    id: 'khabar-ahad',
    name: 'Haber-i Vahid Kitabı',
    nameAr: 'كتاب أخبار الآحاد',
    chapters: [
      { id: 'ch1', name: 'Tek Kişiden Gelen Haber', nameAr: 'باب أخبار الآحاد', hadiths: [] }
    ]
  },
  {
    id: 'rahn',
    name: 'Rehin Kitabı',
    nameAr: 'كتاب الرهن',
    chapters: [
      { id: 'ch1', name: 'Rehin', nameAr: 'باب الرهن', hadiths: [] }
    ]
  },
  {
    id: 'atq',
    name: 'Köle Azat Etme Kitabı',
    nameAr: 'كتاب العتق',
    chapters: [
      { id: 'ch1', name: 'Azat Etme', nameAr: 'باب العتق', hadiths: [] }
    ]
  },
  {
    id: 'mukatab',
    name: 'Mukatebe Kitabı',
    nameAr: 'كتاب المكاتب',
    chapters: [
      { id: 'ch1', name: 'Mukatebe', nameAr: 'باب المكاتب', hadiths: [] }
    ]
  },
  {
    id: 'hiba',
    name: 'Bağış Kitabı',
    nameAr: 'كتاب الهبة',
    chapters: [
      { id: 'ch1', name: 'Hediye ve Bağış', nameAr: 'باب الهبة', hadiths: [] }
    ]
  },
  {
    id: 'shahadat',
    name: 'Şehadet Kitabı',
    nameAr: 'كتاب الشهادات',
    chapters: [
      { id: 'ch1', name: 'Tanıklık', nameAr: 'باب الشهادات', hadiths: [] }
    ]
  },
  {
    id: 'sulh',
    name: 'Barış Kitabı',
    nameAr: 'كتاب الصلح',
    chapters: [
      { id: 'ch1', name: 'Uzlaşma', nameAr: 'باب الصلح', hadiths: [] }
    ]
  },
  {
    id: 'muzaraa',
    name: 'Ortakçılık Kitabı',
    nameAr: 'كتاب المزارعة',
    chapters: [
      { id: 'ch1', name: 'Tarım Ortaklığı', nameAr: 'باب المزارعة', hadiths: [] }
    ]
  },
  {
    id: 'musaqat',
    name: 'Sulama Ortaklığı Kitabı',
    nameAr: 'كتاب المساقاة',
    chapters: [
      { id: 'ch1', name: 'Sulama Ortaklığı', nameAr: 'باب المساقاة', hadiths: [] }
    ]
  },
  {
    id: 'istiqrad',
    name: 'Borç Alma Kitabı',
    nameAr: 'كتاب الاستقراض',
    chapters: [
      { id: 'ch1', name: 'Borç', nameAr: 'باب الاستقراض', hadiths: [] }
    ]
  },
  {
    id: 'khusuma',
    name: 'Anlaşmazlıklar Kitabı',
    nameAr: 'كتاب الخصومات',
    chapters: [
      { id: 'ch1', name: 'Davalar', nameAr: 'باب الخصومات', hadiths: [] }
    ]
  },
  {
    id: 'luqata',
    name: 'Kayıp Eşya Kitabı',
    nameAr: 'كتاب اللقطة',
    chapters: [
      { id: 'ch1', name: 'Buluntu', nameAr: 'باب اللقطة', hadiths: [] }
    ]
  },
  {
    id: 'mazalim',
    name: 'Zulümler Kitabı',
    nameAr: 'كتاب المظالم',
    chapters: [
      { id: 'ch1', name: 'Zulüm ve Haksızlık', nameAr: 'باب المظالم', hadiths: [] }
    ]
  },
  {
    id: 'sharikat',
    name: 'Ortaklıklar Kitabı',
    nameAr: 'كتاب الشركة',
    chapters: [
      { id: 'ch1', name: 'Şirket', nameAr: 'باب الشركة', hadiths: [] }
    ]
  },
  {
    id: 'wakala',
    name: 'Vekalet Kitabı',
    nameAr: 'كتاب الوكالة',
    chapters: [
      { id: 'ch1', name: 'Vekil Tayin Etme', nameAr: 'باب الوكالة', hadiths: [] }
    ]
  },
  {
    id: 'harth',
    name: 'Tarım Kitabı',
    nameAr: 'كتاب الحرث',
    chapters: [
      { id: 'ch1', name: 'Ziraat', nameAr: 'باب الحرث والزرع', hadiths: [] }
    ]
  },
  {
    id: 'shufa',
    name: 'Şufa Kitabı',
    nameAr: 'كتاب الشفعة',
    chapters: [
      { id: 'ch1', name: 'Önalım Hakkı', nameAr: 'باب الشفعة', hadiths: [] }
    ]
  },
  {
    id: 'ijarah',
    name: 'Kiralama Kitabı',
    nameAr: 'كتاب الإجارة',
    chapters: [
      { id: 'ch1', name: 'Kira', nameAr: 'باب الإجارة', hadiths: [] }
    ]
  },
  {
    id: 'hawalat',
    name: 'Havale Kitabı',
    nameAr: 'كتاب الحوالات',
    chapters: [
      { id: 'ch1', name: 'Havale', nameAr: 'باب الحوالة', hadiths: [] }
    ]
  },
  {
    id: 'kafala',
    name: 'Kefalet Kitabı',
    nameAr: 'كتاب الكفالة',
    chapters: [
      { id: 'ch1', name: 'Kefil Olma', nameAr: 'باب الكفالة', hadiths: [] }
    ]
  },
  {
    id: 'wadiah',
    name: 'Emanet Kitabı',
    nameAr: 'كتاب الوديعة',
    chapters: [
      { id: 'ch1', name: 'Emanet', nameAr: 'باب الوديعة', hadiths: [] }
    ]
  },
  {
    id: 'manaqib-ansar',
    name: 'Ensar\'ın Faziletleri Kitabı',
    nameAr: 'كتاب مناقب الأنصار',
    chapters: [
      { id: 'ch1', name: 'Ensar', nameAr: 'باب مناقب الأنصار', hadiths: [] }
    ]
  },
  {
    id: 'janaiz',
    name: 'Cenazeler Kitabı',
    nameAr: 'كتاب الجنائز',
    chapters: [
      { id: 'ch1', name: 'Cenaze Namazı', nameAr: 'باب الجنائز', hadiths: [] }
    ]
  },
  {
    id: 'fitan',
    name: 'Fitneler Kitabı',
    nameAr: 'كتاب الفتن',
    chapters: [
      { id: 'ch1', name: 'Fitneler', nameAr: 'باب الفتن', hadiths: [] }
    ]
  }
];

// Export de tous les livres de Bukhari
export const bukhariComplete = {
  id: 'bukhari',
  name: 'Sahih al-Bukhari',
  nameAr: 'صحيح البخاري',
  books: bukhariBooks
};
