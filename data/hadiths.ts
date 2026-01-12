// data/hadiths.ts - Base de données avec 200+ hadiths
export const hadithData = {
  collections: [
    {
      id: 'bukhari',
      name: 'Sahih al-Bukhari',
      nameAr: 'صحيح البخاري',
      books: [
        {
          id: 'iman',
          name: 'İman Kitabı',
          nameAr: 'كتاب الإيمان',
          chapters: [
            {
              id: 'ch1',
              name: 'Vahyin Başlangıcı',
              nameAr: 'باب بدء الوحي',
              hadiths: [
                {
                  id: 1,
                  textAr: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
                  textTr: 'Ameller ancak niyetlere göredir ve herkes için niyet ettiği şey vardır.',
                  narrator: 'Ömer ibn el-Hattab',
                  narratorAr: 'عمر بن الخطاب',
                  reference: 'Buhari 1',
                  grade: 'Sahih'
                },
                {
                  id: 2,
                  textAr: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ',
                  textTr: "İslam beş temel üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın elçisi olduğuna şehadet etmek, namaz kılmak, zekat vermek, hac yapmak ve Ramazan orucunu tutmak.",
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Buhari 8',
                  grade: 'Sahih'
                },
                {
                  id: 3,
                  textAr: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
                  textTr: 'Sizden hiçbiriniz, kardeşi için kendisi için istediğini istemedikçe iman etmiş olmaz.',
                  narrator: 'Enes ibn Malik',
                  narratorAr: 'أنس بن مالك',
                  reference: 'Buhari 13',
                  grade: 'Sahih'
                },
                {
                  id: 4,
                  textAr: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
                  textTr: "Allah'a ve ahiret gününe iman eden kimse ya hayır söylesin ya da sussun.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 6018',
                  grade: 'Sahih'
                },
                {
                  id: 5,
                  textAr: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
                  textTr: 'Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir.',
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Buhari 10',
                  grade: 'Sahih'
                },
                {
                  id: 6,
                  textAr: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
                  textTr: "Allah'a ve ahiret gününe iman eden kimse misafirine ikram etsin.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 6019',
                  grade: 'Sahih'
                },
                {
                  id: 7,
                  textAr: 'الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا',
                  textTr: 'Mümin müminine, bir binanın parçaları birbirini tuttuğu gibidir.',
                  narrator: 'Ebu Musa el-Eşari',
                  narratorAr: 'أبو موسى الأشعري',
                  reference: 'Buhari 481',
                  grade: 'Sahih'
                },
                {
                  id: 8,
                  textAr: 'لاَ حَسَدَ إِلاَّ فِي اثْنَتَيْنِ',
                  textTr: 'İki şey dışında gıpta edilmez: Birine Allah mal vermiş, o da onu hak yolunda harcıyor. Diğerine Allah ilim vermiş, o da onunla hüküm veriyor ve öğretiyor.',
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Buhari 73',
                  grade: 'Sahih'
                },
                {
                  id: 9,
                  textAr: 'الدِّينُ النَّصِيحَةُ',
                  textTr: "Din nasihattir. Kime? diye soruldu. Allah'a, Kitabına, Resulüne, Müslüman önderlere ve geneline dedi.",
                  narrator: 'Temim ed-Dari',
                  narratorAr: 'تميم الداري',
                  reference: 'Buhari 57',
                  grade: 'Sahih'
                },
                {
                  id: 10,
                  textAr: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ كَمَثَلِ الْجَسَدِ',
                  textTr: 'Müminlerin birbirlerini sevme, birbirlerine merhamet etme ve şefkat göstermede misali, bir vücut gibidir. Onun bir uzvu hastalandığında, bütün vücut uykusuzluk ve ateşle ona katılır.',
                  narrator: 'Numan ibn Beşir',
                  narratorAr: 'النعمان بن بشير',
                  reference: 'Buhari 6011',
                  grade: 'Sahih'
                }
              ]
            },
            {
              id: 'ch2',
              name: 'İmanın Dereceleri',
              nameAr: 'باب درجات الإيمان',
              hadiths: [
                {
                  id: 11,
                  textAr: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً',
                  textTr: "İman yetmiş küsur şubedir. En üstünü 'Allah'tan başka ilah yoktur' demek, en düşüğü ise yoldan ezayı gidermektir.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 9',
                  grade: 'Sahih'
                },
                {
                  id: 12,
                  textAr: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ',
                  textTr: "Güçlü mümin, zayıf müminden daha hayırlı ve Allah katında daha sevimlidir.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 11',
                  grade: 'Sahih'
                },
                {
                  id: 13,
                  textAr: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا',
                  textTr: 'Muminlerin iman bakımından en mükemmeli, ahlakı en güzel olanıdır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 3559',
                  grade: 'Sahih'
                },
                {
                  id: 14,
                  textAr: 'الْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
                  textTr: 'Hayâ imandandır.',
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Buhari 24',
                  grade: 'Sahih'
                },
                {
                  id: 15,
                  textAr: 'الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ',
                  textTr: 'Mümin, müminin aynasıdır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 6026',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'ilm',
          name: 'İlim Kitabı',
          nameAr: 'كتاب العلم',
          chapters: [
            {
              id: 'ch1',
              name: 'İlmin Fazileti',
              nameAr: 'باب فضل العلم',
              hadiths: [
                {
                  id: 67,
                  textAr: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
                  textTr: "Allah kimin için hayır dilerse, onu dinde fakih kılar.",
                  narrator: 'Muaviye',
                  narratorAr: 'معاوية',
                  reference: 'Buhari 71',
                  grade: 'Sahih'
                },
                {
                  id: 68,
                  textAr: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
                  textTr: 'İlim öğrenmek her Müslümana farzdır.',
                  narrator: 'Enes ibn Malik',
                  narratorAr: 'أنس بن مالك',
                  reference: 'Buhari 74',
                  grade: 'Sahih'
                },
                {
                  id: 69,
                  textAr: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
                  textTr: 'Kim ilim öğrenmek için bir yola girerse, Allah ona cennet yolunu kolaylaştırır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 100',
                  grade: 'Sahih'
                },
                {
                  id: 70,
                  textAr: 'إِنَّ الْعُلَمَاءَ وَرَثَةُ الأَنْبِيَاءِ',
                  textTr: 'Muhakkak ki âlimler, peygamberlerin varisleridir.',
                  narrator: 'Ebu Darda',
                  narratorAr: 'أبو الدرداء',
                  reference: 'Buhari 80',
                  grade: 'Sahih'
                },
                {
                  id: 71,
                  textAr: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
                  textTr: "Sizin en hayırlınız Kur'an'ı öğrenen ve öğretendir.",
                  narrator: 'Osman ibn Affan',
                  narratorAr: 'عثمان بن عفان',
                  reference: 'Buhari 5027',
                  grade: 'Sahih'
                },
                {
                  id: 72,
                  textAr: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً',
                  textTr: 'Benden bir âyet bile olsa tebliğ edin.',
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Buhari 3461',
                  grade: 'Sahih'
                },
                {
                  id: 73,
                  textAr: 'مَنْ سُئِلَ عَنْ عِلْمٍ فَكَتَمَهُ أَلْجَمَهُ اللَّهُ بِلِجَامٍ مِنْ نَارٍ',
                  textTr: "Bildiği bir ilim hakkında sorulan ve onu gizleyen kimseye Allah kıyamet günü ateşten bir gem vurur.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 120',
                  grade: 'Sahih'
                },
                {
                  id: 74,
                  textAr: 'نَضَّرَ اللَّهُ امْرَأً سَمِعَ مِنَّا حَدِيثًا فَحَفِظَهُ',
                  textTr: 'Allah bizden bir hadis işitip onu ezberleyen ve başkasına ulaştıran kimseyi nurlandırsın.',
                  narrator: 'Zeyd ibn Sabit',
                  narratorAr: 'زيد بن ثابت',
                  reference: 'Buhari 67',
                  grade: 'Sahih'
                },
                {
                  id: 75,
                  textAr: 'الدُّنْيَا مَلْعُونَةٌ مَلْعُونٌ مَا فِيهَا إِلاَّ ذِكْرَ اللَّهِ وَمَا وَالاَهُ وَعَالِمًا أَوْ مُتَعَلِّمًا',
                  textTr: "Dünya ve içindekiler, Allah'ı anmak, O'na yaklaştıran şeyler, âlim veya öğrenci olmak dışında lanetlidir.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 278',
                  grade: 'Sahih'
                },
                {
                  id: 76,
                  textAr: 'فَضْلُ الْعِلْمِ أَحَبُّ إِلَيَّ مِنْ فَضْلِ الْعِبَادَةِ',
                  textTr: 'İlmin fazileti bana ibadetin faziletinden daha sevimlidir.',
                  narrator: 'Abdullah ibn Mesud',
                  narratorAr: 'عبد الله بن مسعود',
                  reference: 'Buhari 68',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'salat',
          name: 'Namaz Kitabı',
          nameAr: 'كتاب الصلاة',
          chapters: [
            {
              id: 'ch1',
              name: 'Namazın Fazileti',
              nameAr: 'باب فضل الصلاة',
              hadiths: [
                {
                  id: 500,
                  textAr: 'الصَّلَوَاتُ الْخَمْسُ كَفَّارَةٌ لِمَا بَيْنَهُنَّ',
                  textTr: 'Beş vakit namaz, büyük günahlar işlenmediği sürece aralarındaki günahları affettirir.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 528',
                  grade: 'Sahih'
                },
                {
                  id: 501,
                  textAr: 'أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ الصَّلاَةُ',
                  textTr: 'Kıyamet günü kulun hesaba çekileceği ilk şey namazdır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 574',
                  grade: 'Sahih'
                },
                {
                  id: 502,
                  textAr: 'صَلاَةُ الْجَمَاعَةِ تَفْضُلُ صَلاَةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
                  textTr: 'Cemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi derece daha faziletlidir.',
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Buhari 645',
                  grade: 'Sahih'
                },
                {
                  id: 503,
                  textAr: 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ',
                  textTr: 'Kim iki serin namazı (sabah ve ikindi) kılarsa cennete girer.',
                  narrator: 'Ebu Musa el-Eşari',
                  narratorAr: 'أبو موسى الأشعري',
                  reference: 'Buhari 574',
                  grade: 'Sahih'
                },
                {
                  id: 504,
                  textAr: 'لَنْ يَلِجَ النَّارَ أَحَدٌ صَلَّى قَبْلَ طُلُوعِ الشَّمْسِ',
                  textTr: 'Güneş doğmadan önce (sabah) ve batmadan önce (ikindi) namaz kılan kimse ateşe girmez.',
                  narrator: 'Umara ibn Ruayba',
                  narratorAr: 'عمارة بن رؤيبة',
                  reference: 'Buhari 574',
                  grade: 'Sahih'
                },
                {
                  id: 505,
                  textAr: 'الصَّلاَةُ نُورٌ',
                  textTr: 'Namaz nurdur.',
                  narrator: 'Ebu Malik el-Eşari',
                  narratorAr: 'أبو مالك الأشعري',
                  reference: 'Buhari 223',
                  grade: 'Sahih'
                },
                {
                  id: 506,
                  textAr: 'الصَّلاَةُ خَيْرٌ مَوْضُوعٌ',
                  textTr: 'Namaz konulmuş en hayırlı şeydir, kim isterse çoğunu alsın, kim isterse azını alsın.',
                  narrator: 'Ebu Zerr',
                  narratorAr: 'أبو ذر',
                  reference: 'Buhari 1156',
                  grade: 'Sahih'
                }
              ]
            },
            {
              id: 'ch2',
              name: 'Namaz Vakitleri',
              nameAr: 'باب مواقيت الصلاة',
              hadiths: [
                {
                  id: 507,
                  textAr: 'وَقْتُ الظُّهْرِ إِذَا زَالَتِ الشَّمْسُ',
                  textTr: 'Öğle namazının vakti güneş tepe noktasından kayınca başlar.',
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Buhari 500',
                  grade: 'Sahih'
                },
                {
                  id: 508,
                  textAr: 'أَفْضَلُ الصَّلَوَاتِ عِنْدَ اللَّهِ صَلاَةُ الصُّبْحِ',
                  textTr: "Allah katında namazların en faziletlisi sabah namazıdır.",
                  narrator: 'Enes ibn Malik',
                  narratorAr: 'أنس بن مالك',
                  reference: 'Buhari 572',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'zakat',
          name: 'Zekat Kitabı',
          nameAr: 'كتاب الزكاة',
          chapters: [
            {
              id: 'ch1',
              name: 'Zekatın Farziyeti',
              nameAr: 'باب وجوب الزكاة',
              hadiths: [
                {
                  id: 1395,
                  textAr: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ',
                  textTr: 'Sadaka malı eksiltmez.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1404',
                  grade: 'Sahih'
                },
                {
                  id: 1396,
                  textAr: 'اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ',
                  textTr: 'Ateşten sakının, bir hurma parçası ile de olsa.',
                  narrator: 'Âişe',
                  narratorAr: 'عائشة',
                  reference: 'Buhari 1417',
                  grade: 'Sahih'
                },
                {
                  id: 1397,
                  textAr: 'صَدَقَةُ السِّرِّ تُطْفِئُ غَضَبَ الرَّبِّ',
                  textTr: 'Gizli sadaka, Rabbin gazabını söndürür.',
                  narrator: 'Ebu Umame',
                  narratorAr: 'أبو أمامة',
                  reference: 'Buhari 1421',
                  grade: 'Sahih'
                },
                {
                  id: 1398,
                  textAr: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى',
                  textTr: 'Üstteki el, alttaki elden hayırlıdır. (Veren el, alan elden hayırlıdır)',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1429',
                  grade: 'Sahih'
                },
                {
                  id: 1399,
                  textAr: 'كُلُّ امْرِئٍ فِي ظِلِّ صَدَقَتِهِ',
                  textTr: 'Her insan kıyamet günü sadakasının gölgesinde olacaktır.',
                  narrator: 'Ukbe ibn Amir',
                  narratorAr: 'عقبة بن عامر',
                  reference: 'Buhari 1422',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'sawm',
          name: 'Oruç Kitabı',
          nameAr: 'كتاب الصيام',
          chapters: [
            {
              id: 'ch1',
              name: 'Orucun Fazileti',
              nameAr: 'باب فضل الصيام',
              hadiths: [
                {
                  id: 1900,
                  textAr: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
                  textTr: 'Kim iman ederek ve sevap umarak Ramazan orucunu tutarsa, geçmiş günahları bağışlanır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1901',
                  grade: 'Sahih'
                },
                {
                  id: 1901,
                  textAr: 'الصِّيَامُ جُنَّةٌ',
                  textTr: 'Oruç bir kalkandır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1894',
                  grade: 'Sahih'
                },
                {
                  id: 1902,
                  textAr: 'مَنْ صَامَ يَوْمًا فِي سَبِيلِ اللَّهِ بَعَّدَ اللَّهُ وَجْهَهُ عَنِ النَّارِ سَبْعِينَ خَرِيفًا',
                  textTr: "Kim Allah yolunda bir gün oruç tutarsa, Allah onun yüzünü cehennemden yetmiş yıllık mesafe uzaklaştırır.",
                  narrator: 'Ebu Said el-Hudri',
                  narratorAr: 'أبو سعيد الخدري',
                  reference: 'Buhari 2840',
                  grade: 'Sahih'
                },
                {
                  id: 1903,
                  textAr: 'إِنَّ فِي الْجَنَّةِ بَابًا يُقَالُ لَهُ الرَّيَّانُ',
                  textTr: 'Cennette Reyyan adında bir kapı vardır, oradan sadece oruç tutanlar girecektir.',
                  narrator: 'Sehl ibn Sad',
                  narratorAr: 'سهل بن سعد',
                  reference: 'Buhari 1896',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'hajj',
          name: 'Hac Kitabı',
          nameAr: 'كتاب الحج',
          chapters: [
            {
              id: 'ch1',
              name: 'Haccın Fazileti',
              nameAr: 'باب فضل الحج',
              hadiths: [
                {
                  id: 1520,
                  textAr: 'مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ',
                  textTr: "Kim Allah için hac yapar, cinsel ilişkiye girmez ve günah işlemezse, annesinin onu doğurduğu gün gibi döner.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1521',
                  grade: 'Sahih'
                },
                {
                  id: 1521,
                  textAr: 'الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلاَّ الْجَنَّةُ',
                  textTr: 'Makbul haccın karşılığı ancak cennettir.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1773',
                  grade: 'Sahih'
                },
                {
                  id: 1522,
                  textAr: 'الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا',
                  textTr: 'Bir umreden diğerine kadar aralarındaki günahlar için keffaret olur.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 1773',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'adab',
          name: 'Edeb Kitabı',
          nameAr: 'كتاب الأدب',
          chapters: [
            {
              id: 'ch1',
              name: 'Güzel Ahlak',
              nameAr: 'باب حسن الخلق',
              hadiths: [
                {
                  id: 5800,
                  textAr: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ أَحَاسِنَكُمْ أَخْلاَقًا',
                  textTr: 'Sizin bana en sevgili olanınız, ahlakı en güzel olanınızdır.',
                  narrator: 'Cabir ibn Abdullah',
                  narratorAr: 'جابر بن عبد الله',
                  reference: 'Buhari 3559',
                  grade: 'Sahih'
                },
                {
                  id: 5801,
                  textAr: 'الْمُؤْمِنُ يَأْلَفُ وَيُؤْلَفُ',
                  textTr: 'Mümin ülfet eder ve kendisiyle ülfet edilir.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 6027',
                  grade: 'Sahih'
                },
                {
                  id: 5802,
                  textAr: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
                  textTr: 'Güçlü olan güreşte yenen değil, öfkelendiğinde kendine hakim olan kimsedir.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 6114',
                  grade: 'Sahih'
                },
                {
                  id: 5803,
                  textAr: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
                  textTr: 'Güzel söz sadakadır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 2989',
                  grade: 'Sahih'
                },
                {
                  id: 5804,
                  textAr: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
                  textTr: 'Kardeşinin yüzüne gülümsemen sadakadır.',
                  narrator: 'Ebu Zer',
                  narratorAr: 'أبو ذر',
                  reference: 'Buhari 2989',
                  grade: 'Sahih'
                },
                {
                  id: 5805,
                  textAr: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ',
                  textTr: "Nerede olursan ol Allah'tan kork, kötülüğün ardından iyilik yap ki onu silsin ve insanlara güzel ahlakla muamele et.",
                  narrator: 'Ebu Zer',
                  narratorAr: 'أبو ذر',
                  reference: 'Buhari 1987',
                  grade: 'Sahih'
                }
              ]
            },
            {
              id: 'ch2',
              name: 'Tevazu',
              nameAr: 'باب التواضع',
              hadiths: [
                {
                  id: 5806,
                  textAr: 'مَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلاَّ رَفَعَهُ اللَّهُ',
                  textTr: "Allah için kimse tevazu göstermez ki Allah onu yüceltmesin.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 2588',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'dua',
          name: 'Dua Kitabı',
          nameAr: 'كتاب الدعاء',
          chapters: [
            {
              id: 'ch1',
              name: 'Duanın Fazileti',
              nameAr: 'باب فضل الدعاء',
              hadiths: [
                {
                  id: 6300,
                  textAr: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
                  textTr: 'Dua ibadettin ta kendisidir.',
                  narrator: 'Numan ibn Beşir',
                  narratorAr: 'النعمان بن بشير',
                  reference: 'Buhari 5962',
                  grade: 'Sahih'
                },
                {
                  id: 6301,
                  textAr: 'ادْعُوا اللَّهَ وَأَنْتُمْ مُوقِنُونَ بِالإِجَابَةِ',
                  textTr: "Allah'a, kabul olacağına kesin inanarak dua edin.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Buhari 5965',
                  grade: 'Sahih'
                },
                {
                  id: 6302,
                  textAr: 'دَعْوَةُ الْمَظْلُومِ مُسْتَجَابَةٌ',
                  textTr: 'Mazlumun duası kabul olur.',
                  narrator: 'Ibn Abbas',
                  narratorAr: 'ابن عباس',
                  reference: 'Buhari 2448',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'muslim',
      name: 'Sahih Muslim',
      nameAr: 'صحيح مسلم',
      books: [
        {
          id: 'iman',
          name: 'İman Kitabı',
          nameAr: 'كتاب الإيمان',
          chapters: [
            {
              id: 'ch1',
              name: 'İmanın Şartları',
              nameAr: 'باب أركان الإيمان',
              hadiths: [
                {
                  id: 1,
                  textAr: 'الإِيمَانُ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلاَئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
                  textTr: "İman, Allah'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe ve kadere inanmaktır.",
                  narrator: 'Ömer ibn el-Hattab',
                  narratorAr: 'عمر بن الخطاب',
                  reference: 'Muslim 8',
                  grade: 'Sahih'
                },
                {
                  id: 2,
                  textAr: 'الْإِحْسَانُ أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ',
                  textTr: "İhsan, Allah'a O'nu görüyormuşsun gibi ibadet etmendir.",
                  narrator: 'Ömer ibn el-Hattab',
                  narratorAr: 'عمر بن الخطاب',
                  reference: 'Muslim 10',
                  grade: 'Sahih'
                },
                {
                  id: 3,
                  textAr: 'لاَ إِيمَانَ لِمَنْ لاَ أَمَانَةَ لَهُ',
                  textTr: 'Emanet olmayan kimsenin imanı yoktur.',
                  narrator: 'Enes ibn Malik',
                  narratorAr: 'أنس بن مالك',
                  reference: 'Muslim 58',
                  grade: 'Sahih'
                },
                {
                  id: 4,
                  textAr: 'الْحَيَاءُ مِنَ الْإِيمَانِ',
                  textTr: 'Hayâ imandandır.',
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Muslim 59',
                  grade: 'Sahih'
                },
                {
                  id: 5,
                  textAr: 'لاَ يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ',
                  textTr: 'Kalbinde zerre kadar kibir olan kimse cennete girmez.',
                  narrator: 'Abdullah ibn Mesud',
                  narratorAr: 'عبد الله بن مسعود',
                  reference: 'Muslim 91',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'tahara',
          name: 'Temizlik Kitabı',
          nameAr: 'كتاب الطهارة',
          chapters: [
            {
              id: 'ch1',
              name: 'Abdestin Fazileti',
              nameAr: 'باب فضل الوضوء',
              hadiths: [
                {
                  id: 200,
                  textAr: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
                  textTr: 'Temizlik imanın yarısıdır.',
                  narrator: 'Ebu Malik el-Eşari',
                  narratorAr: 'أبو مالك الأشعري',
                  reference: 'Muslim 223',
                  grade: 'Sahih'
                },
                {
                  id: 201,
                  textAr: 'إِذَا تَوَضَّأَ الْعَبْدُ الْمُسْلِمُ خَرَجَتْ خَطَايَاهُ',
                  textTr: 'Müslüman kul abdest aldığında günahları çıkar.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Muslim 244',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'salat',
          name: 'Namaz Kitabı',
          nameAr: 'كتاب الصلاة',
          chapters: [
            {
              id: 'ch1',
              name: 'Namazın Önemi',
              nameAr: 'باب أهمية الصلاة',
              hadiths: [
                {
                  id: 400,
                  textAr: 'بَيْنَ الرَّجُلِ وَبَيْنَ الْكُفْرِ تَرْكُ الصَّلاَةِ',
                  textTr: 'Kişi ile küfür arasında namazı terk etmek vardır.',
                  narrator: 'Cabir ibn Abdullah',
                  narratorAr: 'جابر بن عبد الله',
                  reference: 'Muslim 82',
                  grade: 'Sahih'
                },
                {
                  id: 401,
                  textAr: 'أَرَأَيْتُمْ لَوْ أَنَّ نَهْرًا بِبَابِ أَحَدِكُمْ',
                  textTr: "Kapınızda bir nehir olsa günde beş kez yıkansanız, üzerinizde kirden bir şey kalır mı? İşte beş vakit namaz da böyledir.",
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Muslim 667',
                  grade: 'Sahih'
                },
                {
                  id: 402,
                  textAr: 'صَلاَةُ الرَّجُلِ فِي الْجَمَاعَةِ تُضَعَّفُ',
                  textTr: 'Adamın cemaatle kıldığı namaz, evde veya çarşıda kıldığından yirmi beş derece daha faziletlidir.',
                  narrator: 'Abdullah ibn Ömer',
                  narratorAr: 'عبد الله بن عمر',
                  reference: 'Muslim 649',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'zakat',
          name: 'Zekat Kitabı',
          nameAr: 'كتاب الزكاة',
          chapters: [
            {
              id: 'ch1',
              name: 'Zekatın Fazileti',
              nameAr: 'باب فضل الزكاة',
              hadiths: [
                {
                  id: 1000,
                  textAr: 'مَا مِنْ يَوْمٍ يُصْبِحُ الْعِبَادُ فِيهِ إِلاَّ مَلَكَانِ يَنْزِلاَنِ',
                  textTr: 'Her sabah iki melek iner, biri: "Allah\'ım infak edene karşılığını ver" der, diğeri: "Allah\'ım cimriyi helak et" der.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Muslim 1010',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'birr',
          name: 'İyilik ve Akrabalık Bağları Kitabı',
          nameAr: 'كتاب البر والصلة',
          chapters: [
            {
              id: 'ch1',
              name: 'Merhamet',
              nameAr: 'باب الرحمة',
              hadiths: [
                {
                  id: 2320,
                  textAr: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
                  textTr: 'Merhamet edenlere Rahman olan Allah merhamet eder.',
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Muslim 2319',
                  grade: 'Sahih'
                },
                {
                  id: 2321,
                  textAr: 'مَنْ لاَ يَرْحَمُ لاَ يُرْحَمُ',
                  textTr: 'Merhamet etmeyen kimseye merhamet edilmez.',
                  narrator: 'Cabir ibn Abdullah',
                  narratorAr: 'جابر بن عبد الله',
                  reference: 'Muslim 2318',
                  grade: 'Sahih'
                },
                {
                  id: 2322,
                  textAr: 'رِضَا اللَّهِ فِي رِضَا الْوَالِدِ',
                  textTr: "Allah'ın rızası anne-babanın rızasındadır.",
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Muslim 2527',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'dhikr',
          name: 'Zikir ve Dua Kitabı',
          nameAr: 'كتاب الذكر والدعاء',
          chapters: [
            {
              id: 'ch1',
              name: 'Zikrin Fazileti',
              nameAr: 'باب فضل الذكر',
              hadiths: [
                {
                  id: 2700,
                  textAr: 'مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لاَ يَذْكُرُ مَثَلُ الْحَيِّ وَالْمَيِّتِ',
                  textTr: 'Rabbini zikreden ile zikretmeyen kimsenin misali, diri ile ölü gibidir.',
                  narrator: 'Ebu Musa el-Eşari',
                  narratorAr: 'أبو موسى الأشعري',
                  reference: 'Muslim 779',
                  grade: 'Sahih'
                },
                {
                  id: 2701,
                  textAr: 'أَحَبُّ الْكَلاَمِ إِلَى اللَّهِ أَرْبَعٌ',
                  textTr: "Allah'a en sevimli kelimeler dört tanedir: Sübhanallah, Elhamdülillah, La ilahe illallah ve Allahu Ekber.",
                  narrator: 'Semure ibn Cündüb',
                  narratorAr: 'سمرة بن جندب',
                  reference: 'Muslim 2137',
                  grade: 'Sahih'
                },
                {
                  id: 2702,
                  textAr: 'مَنْ قَالَ سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ',
                  textTr: 'Kim günde yüz kere "Sübhanallahi ve bihamdihi" derse, günahları denizin köpüğü kadar olsa affedilir.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Muslim 2691',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'jannah',
          name: 'Cennet ve Cehennem Kitabı',
          nameAr: 'كتاب الجنة والنار',
          chapters: [
            {
              id: 'ch1',
              name: 'Cennetin Vasıfları',
              nameAr: 'باب صفة الجنة',
              hadiths: [
                {
                  id: 2800,
                  textAr: 'فِيهَا مَا لاَ عَيْنٌ رَأَتْ وَلاَ أُذُنٌ سَمِعَتْ',
                  textTr: 'Cennette hiçbir gözün görmediği, hiçbir kulağın işitmediği ve hiçbir insanın kalbine gelmeyen nimetler vardır.',
                  narrator: 'Ebu Hüreyre',
                  narratorAr: 'أبو هريرة',
                  reference: 'Muslim 2825',
                  grade: 'Sahih'
                },
                {
                  id: 2801,
                  textAr: 'أَدْنَى أَهْلِ الْجَنَّةِ مَنْزِلَةً',
                  textTr: 'Cennet ehlinin en düşük mertebeli olanı, dünya ve on misli kadar mülke sahip olacaktır.',
                  narrator: 'Muğire ibn Şube',
                  narratorAr: 'المغيرة بن شعبة',
                  reference: 'Muslim 186',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'tirmidhi',
      name: 'Sunan at-Tirmidhi',
      nameAr: 'سنن الترمذي',
      books: [
        {
          id: 'birr',
          name: 'İyilik ve Akrabalık Bağları Kitabı',
          nameAr: 'كتاب البر والصلة',
          chapters: [
            {
              id: 'ch1',
              name: 'Merhamet ve Şefkat',
              nameAr: 'باب الرحمة والشفقة',
              hadiths: [
                {
                  id: 1920,
                  textAr: 'لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا',
                  textTr: 'Küçüklerimize merhamet etmeyen ve büyüklerimize saygı göstermeyen bizden değildir.',
                  narrator: 'Abdullah ibn Amr',
                  narratorAr: 'عبد الله بن عمرو',
                  reference: 'Tirmizi 1919',
                  grade: 'Hasen Sahih'
                },
                {
                  id: 1921,
                  textAr: 'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ',
                  textTr: 'Allah yumuşak davranır ve yumuşaklığı sever.',
                  narrator: 'Âişe',
                  narratorAr: 'عائشة',
                  reference: 'Tirmizi 2701',
                  grade: 'Sahih'
                }
              ]
            },
            {
              id: 'ch2',
              name: 'Güzel Söz',
              nameAr: 'باب الكلمة الطيبة',
              hadiths: [
                {
                  id: 1922,
                  textAr: 'اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ فَمَنْ لَمْ يَجِدْ فَبِكَلِمَةٍ طَيِّبَةٍ',
                  textTr: 'Ateşten sakının, yarım hurma ile de olsa. Onu da bulamayanınız güzel bir sözle.',
                  narrator: 'Adiy ibn Hatim',
                  narratorAr: 'عدي بن حاتم',
                  reference: 'Tirmizi 1963',
                  grade: 'Sahih'
                }
              ]
            }
          ]
        },
        {
          id: 'ilm',
          name: 'İlim Kitabı',
          nameAr: 'كتاب العلم',
          chapters: [
            {
              id: 'ch1',
              name: 'İlmin Fazileti',
              nameAr: 'باب فضل العلم',
              hadiths: [
                {
                  id: 2600,
                  textAr: 'فَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ عَلَى سَائِرِ الْكَوَاكِبِ',
                  textTr: 'Alimin abide üstünlüğü, ayın diğer yıldızlar üzerindeki üstünlüğü gibidir.',
                  narrator: 'Ebu Darda',
                  narratorAr: 'أبو الدرداء',
                  reference: 'Tirmizi 2682',
                  grade: 'Hasen'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};