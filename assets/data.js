/* ============================================================
   BARBER PROTOTYPE 3 — Mock Data (bilingual EN / AR)
   Exposed on window as window.BP3
   ============================================================ */
(function () {
  'use strict';

  /* Each localized string is { en, ar }.
     BP3.L(value) returns the active-language string at render time. */

  const BARBERS = [
    {
      id: 'marcus-hale',
      name: { en: 'Marcus Hale',           ar: 'ماركوس هيل' },
      role: { en: 'Master Barber',          ar: 'حلاق رئيسي' },
      years: 14,
      rating: 4.9, reviews: 287,
      specialties: {
        en: ['Skin fades', 'Scissor work', 'Classic taper'],
        ar: ['تدرّج للجلد', 'عمل بالمقص', 'تدرّج كلاسيكي']
      },
      bio: {
        en: 'Trained in Brooklyn, refined in Florence. Marcus chases the geometry of a perfect fade.',
        ar: 'تدرّب في بروكلين وصقل مهارته في فلورنسا. يطارد هندسة التدرّج المثالي.'
      },
      letter: 'M',
      tone: 'amber',
      quotes: [
        { stars: 5, by: { en: 'Khaled A.', ar: 'خالد ع.' }, when: { en: '1 week ago', ar: 'قبل أسبوع' },
          text: { en: 'Insane precision on the fade. Best cut I\'ve had this year.', ar: 'ماركوس عنده دقّة عجيبة في التدرّج. أفضل قصّة أخذتها هذي السنة.' } },
        { stars: 5, by: { en: 'Ahmed S.',  ar: 'أحمد س.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'Every detail dialed in. Professional and never rushed.', ar: 'كل تفصيلة بمكانها. حلاق محترف وما يستعجل.' } },
        { stars: 5, by: { en: 'Faisal H.', ar: 'فيصل ح.' }, when: { en: '1 month ago', ar: 'قبل شهر' },
          text: { en: 'Walked out looking completely different. My regular now.', ar: 'خرجت بشكل مختلف تماماً. صار حلاقي الثابت.' } }
      ]
    },
    {
      id: 'diego-reyes',
      name: { en: 'Diego Reyes',            ar: 'دييغو رييس' },
      role: { en: 'Senior Barber',          ar: 'حلاق أول' },
      years: 11,
      rating: 4.8, reviews: 198,
      specialties: {
        en: ['Beard sculpting', 'Hot towel', 'Lineup'],
        ar: ['نحت اللحية', 'منشفة ساخنة', 'ضبط الخط']
      },
      bio: {
        en: 'Hot-towel obsessive. Believes a great shave should feel like a quiet ritual, not a service.',
        ar: 'مهووس بالمنشفة الساخنة. يؤمن بأن الحلاقة الجيدة طقس هادئ، لا مجرد خدمة.'
      },
      letter: 'D',
      tone: 'cobalt',
      quotes: [
        { stars: 5, by: { en: 'Yousef G.', ar: 'يوسف غ.' }, when: { en: '3 days ago', ar: 'قبل ٣ أيام' },
          text: { en: 'His shaves are a full experience. The hot towel is something else.', ar: 'الحلاقة عنده تجربة كاملة. المنشفة الساخنة شيء ثاني.' } },
        { stars: 5, by: { en: 'Turki R.',  ar: 'تركي ر.' }, when: { en: '1 week ago', ar: 'قبل أسبوع' },
          text: { en: 'Sculpted my beard with precision. Not a hair out of place.', ar: 'ضبط لي اللحية بدقّة، ما ترك شعرة بدون حساب.' } },
        { stars: 4, by: { en: 'Rakan F.',  ar: 'راكان ف.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'Calm and focused, gets the work right without rushing.', ar: 'هادئ ومركّز، يخلّص الشغل صح بدون استعجال.' } }
      ]
    },
    {
      id: 'tobias-lin',
      name: { en: 'Tobias Lin',             ar: 'توبياس لين' },
      role: { en: 'Senior Barber',          ar: 'حلاق أول' },
      years: 9,
      rating: 4.7, reviews: 156,
      specialties: {
        en: ['Textured cuts', 'Curl work', 'Color'],
        ar: ['قصّات بنية', 'عمل التجعيد', 'تلوين']
      },
      bio: {
        en: 'Editorial styling background. Treats hair as a material, not a haircut.',
        ar: 'خلفية في التصميم التحريري. يتعامل مع الشعر كمادة، لا كقصة.'
      },
      letter: 'T',
      tone: 'signal',
      quotes: [
        { stars: 5, by: { en: 'Ziyad S.',  ar: 'زياد ص.' }, when: { en: '1 week ago', ar: 'قبل أسبوع' },
          text: { en: 'Got exactly what I wanted before I could explain. My curls look natural.', ar: 'فهم بالضبط وش أبي قبل لا أوصف. شعري المجعّد طلع طبيعي.' } },
        { stars: 5, by: { en: 'Sultan A.', ar: 'سلطان ع.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'A different experience from any other barber. My hair really transformed.', ar: 'تجربة مختلفة عن أي حلاق ثاني. شكل الشعر تغيّر بصراحة.' } },
        { stars: 5, by: { en: 'Majed Z.',  ar: 'ماجد ز.' }, when: { en: '3 weeks ago', ar: 'قبل ٣ أسابيع' },
          text: { en: 'Recommended if your hair is tricky and never sits right.', ar: 'ينصح فيه لو شعرك صعب وما يطلع زي ما تبي.' } }
      ]
    },
    {
      id: 'sasha-volkov',
      name: { en: 'Sasha Volkov',           ar: 'ساشا فولكوف' },
      role: { en: 'Master Barber',          ar: 'حلاق رئيسي' },
      years: 18,
      rating: 5.0, reviews: 412,
      specialties: {
        en: ['Classic cuts', 'Pomade work', 'Straight razor'],
        ar: ['قصّات كلاسيكية', 'عمل البوماد', 'موس مستقيم']
      },
      bio: {
        en: 'Old-school straight razor. New-school precision. Built like a Swiss watch.',
        ar: 'موس مستقيم بالطراز القديم، ودقّة بالطراز الحديث. مبنيّ كساعة سويسرية.'
      },
      letter: 'S',
      tone: 'mono',
      quotes: [
        { stars: 5, by: { en: 'Hamad N.',  ar: 'حمد ن.' }, when: { en: '4 days ago', ar: 'قبل ٤ أيام' },
          text: { en: 'His straight razor is like the movies. Decades of real craft.', ar: 'الموس عنده زي اللي في الأفلام. حرفة عمرها سنوات.' } },
        { stars: 5, by: { en: 'Nasser S.', ar: 'ناصر س.' }, when: { en: '1 week ago', ar: 'قبل أسبوع' },
          text: { en: 'Classic from start to finish. Feels like a 50-year-old shop.', ar: 'كلاسيكي بكل تفاصيله. كأنك في محل عمره ٥٠ سنة.' } },
        { stars: 5, by: { en: 'Omar Sh.',  ar: 'عمر ش.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'Every motion intentional. Best classic cut in Riyadh.', ar: 'كل دقة محسوبة. أفضل قصّة كلاسيكية بالرياض.' } }
      ]
    },
    {
      id: 'idris-carter',
      name: { en: 'Idris Carter',           ar: 'إدريس كارتر' },
      role: { en: 'Lead Barber',            ar: 'حلاق قائد' },
      years: 7,
      rating: 4.8, reviews: 142,
      specialties: {
        en: ['Burst fades', 'Beard design', 'Sculpted lines'],
        ar: ['تدرّج منفجر', 'تصميم اللحية', 'خطوط منحوتة']
      },
      bio: {
        en: 'Lines so clean you could file taxes against them.',
        ar: 'خطوط نظيفة لدرجة تكفي للمحاسبة عليها.'
      },
      letter: 'I',
      tone: 'amber',
      quotes: [
        { stars: 5, by: { en: 'Bandar O.', ar: 'بندر ع.' }, when: { en: '4 days ago', ar: 'قبل ٤ أيام' },
          text: { en: 'Lines came out razor sharp. Different league.', ar: 'الخطوط طلعت حادة جداً. مستوى مختلف.' } },
        { stars: 5, by: { en: 'Majed Z.',  ar: 'مجد ز.' }, when: { en: '1 week ago', ar: 'قبل أسبوع' },
          text: { en: 'His burst fades are next level. Won\'t book anyone else.', ar: 'تدرّج البرست عنده مستوى ثاني. ما أحجز عند غيره.' } },
        { stars: 5, by: { en: 'Saud M.',   ar: 'سعود م.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'Cares about details. Nothing leaves his chair unfinished.', ar: 'يهتم بالتفاصيل، ما يطلع شي بدون ضبط.' } }
      ]
    },
    {
      id: 'jules-okafor',
      name: { en: 'Jules Okafor',           ar: 'جولز أوكافور' },
      role: { en: 'Senior Barber',          ar: 'حلاق أول' },
      years: 6,
      rating: 4.9, reviews: 169,
      specialties: {
        en: ['Modern crops', 'Fringe work', 'Texturizing'],
        ar: ['قصّات حديثة', 'عمل النواصي', 'تنعيم']
      },
      bio: {
        en: 'Quiet shop favorite. Books out two weeks ahead for a reason.',
        ar: 'المفضّل الهادئ في المحل. يُحجز قبل أسبوعين لسبب وجيه.'
      },
      letter: 'J',
      tone: 'cobalt',
      quotes: [
        { stars: 5, by: { en: 'Abdulrahman D.', ar: 'عبدالرحمن د.' }, when: { en: '5 days ago', ar: 'قبل ٥ أيام' },
          text: { en: 'Modern style without overdoing it. The cut holds for a month.', ar: 'ستايل عصري بدون مبالغة. القصّة تكفي شهر.' } },
        { stars: 5, by: { en: 'Majed Z.',        ar: 'ماجد ز.' }, when: { en: '2 weeks ago', ar: 'قبل أسبوعين' },
          text: { en: 'Best fringe work around. Book ahead.', ar: 'النواصي عنده ولا أحد. خذ موعد قبل وقت.' } },
        { stars: 4, by: { en: 'Yousef G.',       ar: 'يوسف غ.' }, when: { en: '3 weeks ago', ar: 'قبل ٣ أسابيع' },
          text: { en: 'Calm and tasteful. You leave looking different than how you came in.', ar: 'هادي وذواق. تخرج بستايل مختلف عن اللي دخلت فيه.' } }
      ]
    }
  ];

  /* Prices in Saudi Riyal — premium Riyadh barbershop pricing. */
  const SERVICES = [
    {
      id: 'signature-cut',
      name:        { en: 'Signature Cut',                                            ar: 'القصّة المميّزة' },
      tagline:     { en: 'The house standard.',                                      ar: 'معيار المحل.' },
      description: { en: 'Consultation, machine and scissor work, hot towel finish.',ar: 'استشارة، عمل بالماكينة والمقص، خاتمة بمنشفة ساخنة.' },
      price: 120,
      duration: 45,
      tier: 'core'
    },
    {
      id: 'skin-fade',
      name:        { en: 'Skin Fade',                                                ar: 'تدرّج للجلد' },
      tagline:     { en: 'Engineered taper, zero to top.',                           ar: 'تدرّج مهندَس، من الصفر للقمة.' },
      description: { en: 'Detailed gradient with razor finish at the neckline.',     ar: 'تدرّج مفصّل مع لمسة موس عند الرقبة.' },
      price: 150,
      duration: 50,
      tier: 'core'
    },
    {
      id: 'beard-sculpt',
      name:        { en: 'Beard Sculpt',                                             ar: 'نحت اللحية' },
      tagline:     { en: 'Shape, line, soften.',                                     ar: 'شكّل، حدّد، نعّم.' },
      description: { en: 'Trim, line-up, hot towel, beard oil. No haircut.',          ar: 'تشذيب، تحديد، منشفة ساخنة، زيت لحية. بدون قصّة شعر.' },
      price: 70,
      duration: 30,
      tier: 'core'
    },
    {
      id: 'hot-towel-shave',
      name:        { en: 'Hot Towel Shave',                                          ar: 'حلاقة بالمنشفة الساخنة' },
      tagline:     { en: 'A ritual, not a service.',                                 ar: 'طقس، لا مجرد خدمة.' },
      description: { en: 'Pre-shave oil, two towels, straight razor, two passes.',   ar: 'زيت ما قبل الحلاقة، منشفتان، موس مستقيم، تمريرتان.' },
      price: 200,
      duration: 60,
      tier: 'premium'
    },
    {
      id: 'hair-wash',
      name:        { en: 'Hair Wash',                                                ar: 'غسيل الشعر' },
      tagline:     { en: 'Shampoo, scalp massage, dry.',                             ar: 'شامبو، مساج لفروة الرأس، تجفيف.' },
      description: { en: 'Deep cleanse, scalp massage, blow dry. On its own or before any service.', ar: 'تنظيف عميق، مساج لفروة الرأس، تجفيف. وحدها أو قبل أي خدمة.' },
      price: 50,
      duration: 25,
      tier: 'core'
    },
    {
      id: 'executive',
      name:        { en: 'Executive Package',                                        ar: 'الباقة التنفيذية' },
      tagline:     { en: 'Cut, shave, scalp, restore.',                              ar: 'قصّة، حلاقة، فروة، إنعاش.' },
      description: { en: 'Signature cut, hot towel shave, scalp treatment, espresso.', ar: 'القصّة المميّزة، حلاقة بالمنشفة الساخنة، علاج لفروة الرأس، إسبريسو.' },
      price: 350,
      duration: 90,
      tier: 'premium'
    },
    {
      id: 'lineup',
      name:        { en: 'Lineup & Detail',                                          ar: 'ضبط وتفاصيل' },
      tagline:     { en: 'Quick precision work.',                                    ar: 'عمل دقيق وسريع.' },
      description: { en: 'Sharpens an existing cut. In and out in twenty minutes.',  ar: 'شحذ قصّة قائمة. في عشرين دقيقة.' },
      price: 50,
      duration: 20,
      tier: 'core'
    },
    {
      id: 'the-reset',
      name:        { en: 'The Reset',                                                ar: 'إعادة الضبط' },
      tagline:     { en: 'The full transformation.',                                 ar: 'التحوّل الكامل.' },
      description: { en: 'Cut, beard sculpt, hot towel shave, scalp treatment, style.', ar: 'قصّة، نحت لحية، حلاقة بالمنشفة الساخنة، علاج لفروة الرأس، تسريح.' },
      price: 450,
      duration: 105,
      tier: 'signature'
    }
  ];

  /* ---------- Language-aware helpers ---------- */
  function getLang() {
    try { return (localStorage.getItem('bp3.lang') === 'ar') ? 'ar' : 'en'; }
    catch (e) { return 'en'; }
  }

  function L(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    const lang = getLang();
    if (Array.isArray(value)) return value;
    if (typeof value === 'object') return value[lang] != null ? value[lang] : value.en;
    return String(value);
  }

  /* ---------- Deterministic slot hash ---------- */
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
  }

  function buildDates() {
    const out = [];
    const lang = getLang();
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase(),
        day: d.getDate(),
        mon: d.toLocaleDateString(locale, { month: 'short' }).toUpperCase(),
        date: d
      });
    }
    return out;
  }

  function slotsFor(barberId, isoDate) {
    const out = [];
    for (let h = 9; h < 19; h++) {
      const key = `${barberId}:${isoDate}:${h}`;
      const taken = (hash(key) % 5) === 0;
      const time24 = `${String(h).padStart(2, '0')}:00`;
      const time12 = formatTime12(h, 0);
      out.push({ key, time24, time12, hour: h, taken });
    }
    return out;
  }

  function formatTime12(h, m) {
    const lang = getLang();
    const period = h >= 12 ? (lang === 'ar' ? 'م' : 'PM') : (lang === 'ar' ? 'ص' : 'AM');
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${String(m).padStart(2, '0')} ${period}`;
  }

  function findBarber(id) { return BARBERS.find(b => b.id === id) || null; }
  function findService(id) { return SERVICES.find(s => s.id === id) || null; }

  function formatPrice(n) {
    const lang = getLang();
    return lang === 'ar' ? `${n} ر.س` : `SAR ${n}`;
  }

  function formatDuration(min) {
    const lang = getLang();
    return lang === 'ar' ? `${min} د` : `${min} min`;
  }

  function formatDateLong(iso) {
    const lang = getLang();
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function genConfirmationCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s.slice(0, 4) + '-' + s.slice(4);
  }

  /* Fake reviews of the shop (bilingual). Rotated in the hero glass tile. */
  const REVIEWS = [
    {
      quote: {
        en: 'Best haircut I’ve had in Riyadh. Marcus is an artist.',
        ar: 'أفضل قصّة جرّبتها في الرياض. ماركوس فنّان.'
      },
      author: { en: 'Ahmed A.', ar: 'أحمد ع.' },
      rating: 5
    },
    {
      quote: {
        en: 'Professional, exactly on time, and worth every riyal.',
        ar: 'احترافية كاملة، في موعدها بالضبط، تستاهل كل ريال.'
      },
      author: { en: 'Faisal H.', ar: 'فيصل ح.' },
      rating: 5
    },
    {
      quote: {
        en: 'The Reset was worth every riyal. Felt royal for two hours.',
        ar: 'إعادة الضبط استحقّت كل ريال. شعرت كملك لساعتين.'
      },
      author: { en: 'Khalid A.', ar: 'خالد ع.' },
      rating: 4.5
    },
    {
      quote: {
        en: 'Premium atmosphere, every detail considered.',
        ar: 'أجواء فاخرة، وكل تفصيلة مدروسة.'
      },
      author: { en: 'Yousef G.', ar: 'يوسف غ.' },
      rating: 5
    },
    {
      quote: {
        en: 'Sasha’s straight razor is craftsmanship from another era.',
        ar: 'حلاقة ساشا بالموس مهارة من زمن آخر.'
      },
      author: { en: 'Saud M.', ar: 'سعود م.' },
      rating: 5
    },
    {
      quote: {
        en: 'Booked online in a minute. Chair was ready the second I walked in.',
        ar: 'حجزت أونلاين في دقيقة. الكرسي جاهز لحظة وصولي.'
      },
      author: { en: 'Bandar O.', ar: 'بندر ع.' },
      rating: 5
    },
    {
      quote: {
        en: 'They actually listen. First time I walked out with the cut I asked for.',
        ar: 'يسمعون فعلاً. أوّل مرة أطلع بالقصّة اللي طلبتها.'
      },
      author: { en: 'Turki R.', ar: 'تركي ر.' },
      rating: 4
    }
  ];

  /* Returns an HTML snippet rendering a 5-star rating with review count. */
  function renderRating(rating, reviews, opts) {
    opts = opts || {};
    const r = Number(rating || 0);
    const pct = Math.max(0, Math.min(100, (r / 5) * 100));
    const lang = getLang();
    const reviewLabel = reviews == null ? '' :
      (lang === 'ar' ? `${reviews} تقييم` : `${reviews} review${reviews === 1 ? '' : 's'}`);
    return (
      `<span class="rating ${opts.size === 'sm' ? 'rating-sm' : ''}" aria-label="${r} out of 5">`
        + `<span class="stars" style="--fill:${pct}%"></span>`
        + `<span class="rating-num" data-ltr>${r.toFixed(1)}</span>`
        + (reviews != null ? `<span class="rating-count">· ${reviewLabel}</span>` : '')
      + `</span>`
    );
  }

  window.BP3 = {
    BARBERS,
    SERVICES,
    REVIEWS,
    L,
    getLang,
    buildDates,
    slotsFor,
    findBarber,
    findService,
    formatPrice,
    formatDuration,
    formatDateLong,
    formatTime12,
    genConfirmationCode,
    renderRating
  };
})();
