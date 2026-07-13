/* ============================================================
   BARBER PROTOTYPE 3 — i18n (EN / AR)
   - Default language: Arabic. Only remembers a choice when the
     user clicks the language toggle, stored under bp3.langChosen.
     The legacy bp3.lang auto-save key is intentionally ignored.
   - Sets <html lang> + <html dir> + body class lang-ar
   - Replaces text on elements with data-i18n="key"
   - Replaces attributes via data-i18n-attr="placeholder:key,title:key"
   - Exposes BP3.t(key), BP3.setLang(lang), BP3.getLang()
   ============================================================ */
(function () {
  'use strict';

  const STRINGS = {
    /* Nav */
    'nav.shop':           { en: 'Shop',               ar: 'الرئيسية' },
    'nav.services':       { en: 'Services',           ar: 'الخدمات' },
    'nav.barbers':        { en: 'Barbers',            ar: 'الحلاقون' },
    'nav.admin':          { en: 'Admin',              ar: 'الإدارة' },
    'nav.book':           { en: 'Book',               ar: 'احجز' },
    'nav.reserve':        { en: 'Reserve a chair',    ar: 'احجز كرسياً' },
    'nav.open_menu':      { en: 'Open menu',          ar: 'افتح القائمة' },
    'nav.meta_year':      { en: 'NORTH&HALE · EST. 2019', ar: 'نورث آند هيل · تأسس ٢٠١٩' },
    'nav.meta_hours':     { en: 'OPEN DAILY',         ar: 'مفتوح يومياً' },

    /* Hero (index) */
    'hero.eyebrow':       { en: 'Taking appointments — Spring / 2026', ar: 'نستقبل الحجوزات — ربيع ٢٠٢٦' },
    'hero.h1.line1':      { en: 'Precision craft,',   ar: 'حرفة دقيقة،' },
    'hero.h1.line2':      { en: 'inspected every chair.', ar: 'على كل كرسي.' },
    'hero.sub':           { en: 'Six barbers. One long bench under a row of brass lamps. A signature cut you can reserve to the minute, with the same hand every time.', ar: 'ستة حلاقين. مقعد طويل تحت صفّ من المصابيح النحاسية. قصّة مميّزة تحجزها بالدقيقة، بنفس اليد في كل مرة.' },
    'hero.cta.reserve':   { en: 'Reserve a chair',    ar: 'احجز كرسياً' },
    'hero.cta.services':  { en: 'See services',       ar: 'تصفّح الخدمات' },
    'hero.stat.barbers':    { en: 'Barbers on rotation', ar: 'حلاقون في المحل' },
    'hero.stat.wait':       { en: 'Avg. wait, walk-in', ar: 'متوسط الانتظار' },
    'hero.stat.wait_unit':  { en: 'm',                   ar: 'د' },
    'hero.stat.bench':      { en: 'On this bench',      ar: 'على المقعد منذ' },

    /* Marquee tile */
    'marquee.now':        { en: 'Now in rotation',    ar: 'الآن على المقعد' },
    'marquee.live':       { en: 'Live',               ar: 'مباشر' },
    'marquee.next':       { en: 'Next available',     ar: 'الموعد المتاح' },
    'marquee.today':      { en: 'Today · 4:00 PM',    ar: 'اليوم · ٤:٠٠ م' },
    'marquee.reserve':    { en: 'Reserve',            ar: 'احجز' },
    'marquee.reviews':    { en: 'Top reviews',        ar: 'آراء العملاء' },
    'marquee.agg_count':  { en: 'reviews',            ar: 'تقييم' },

    /* Manifesto */
    'manifesto.eyebrow':  { en: 'The bench, in three lines', ar: 'المقعد، في ثلاثة أسطر' },
    'manifesto.1':        { en: 'The chair you book is the chair you sit in.', ar: 'الكرسي الذي تحجزه هو الكرسي الذي تجلس عليه.' },
    'manifesto.2':        { en: 'The cut you ask for is the cut you walk out with.', ar: 'القصّة التي تطلبها هي القصّة التي تخرج بها.' },
    'manifesto.3':        { en: 'We don’t run late. We run on time, or we don’t run at all.', ar: 'لا نتأخّر. نعمل في موعدنا، أو لا نعمل أبداً.' },

    /* Services list (landing) */
    'svc.title':          { en: 'Signature services', ar: 'خدماتنا المميّزة' },
    'svc.h2.line1':       { en: 'Four ways to sit down.', ar: 'أربع طرق للجلوس.' },
    'svc.h2.line2':       { en: 'Eight ways to leave.', ar: 'ثماني طرق للمغادرة.' },
    'svc.catalogue':      { en: 'Full catalogue',     ar: 'القائمة الكاملة' },

    /* Featured barbers (landing) */
    'team.eyebrow':       { en: 'On the bench',       ar: 'على المقعد' },
    'team.h2.line1':      { en: 'Six hands.',         ar: 'ست أيدٍ.' },
    'team.h2.line2':      { en: 'Pick yours.',        ar: 'اختر يدك.' },
    'team.meet':          { en: 'Meet the bench',     ar: 'تعرّف على المقعد' },

    /* Final CTA strip (landing) */
    'cta.ready':          { en: 'Ready when you are', ar: 'جاهزون متى أردت' },
    'cta.h2.line1':       { en: 'Book a chair.',      ar: 'احجز كرسياً.' },
    'cta.h2.line2':       { en: 'Lock the minute.',   ar: 'ثبّت الدقيقة.' },
    'cta.sub':            { en: 'Pick your barber, pick your service, pick your slot. The whole thing takes about ninety seconds. We’ll see you on the bench.', ar: 'اختر حلاقك، اختر خدمتك، اختر موعدك. الأمر كله يستغرق نحو تسعين ثانية. نراك على المقعد.' },

    /* Footer */
    'footer.tagline':     { en: 'A six-chair barbershop, kept on time.', ar: 'صالون حلاقة بستة كراسٍ، يعمل في موعده.' },
    'footer.location':    { en: 'The Bench',          ar: 'المقعد' },
    'footer.address':     { en: 'Centria Mall, Floor 2\nOlaya · Riyadh', ar: 'مجمّع سنتريا، الطابق ٢\nالعليا · الرياض' },
    'footer.hours':       { en: 'Hours',              ar: 'ساعات العمل' },
    'footer.hours.1':     { en: 'SAT–THU · 11–11',    ar: 'السبت–الخميس · ١١–١١' },
    'footer.hours.2':     { en: 'FRI · 3 PM–11 PM',   ar: 'الجمعة · ٣ م – ١١ م' },
    'footer.hours.3':     { en: 'NO LATE FRIDAYS',    ar: 'لا تأخير الجمعة' },
    'footer.copy':        { en: '© 2026 NORTH&HALE BARBERS', ar: '© ٢٠٢٦ نورث آند هيل للحلاقة' },
    'footer.proto':       { en: 'PROTOTYPE BUILD',    ar: 'نموذج تجريبي' },
    'footer.proto.long':  { en: 'PROTOTYPE BUILD · NOT A LIVE STORE', ar: 'نموذج تجريبي · ليس متجراً فعلياً' },
    'footer.addr.short':  { en: 'OLAYA · RIYADH',     ar: 'العليا · الرياض' },

    /* Services page */
    'spg.eyebrow':        { en: 'The catalogue',      ar: 'القائمة' },
    'spg.h1.line1':       { en: 'Eight services.',    ar: 'ثماني خدمات.' },
    'spg.h1.line2':       { en: 'Nothing on the menu we don’t do well.', ar: 'لا شيء في القائمة لا نتقنه.' },
    'spg.sub':            { en: 'Every service is priced flat and timed exact. No upsells at the chair, no hidden fees at the till. What you book is what you pay.', ar: 'كل خدمة بسعر ثابت ومدّة محدّدة. لا إضافات عند الكرسي ولا رسوم خفية عند المحاسبة. ما تحجزه هو ما تدفعه.' },
    'spg.cta.eyebrow':    { en: 'Pick a service, pick a chair', ar: 'اختر خدمة، اختر كرسياً' },
    'spg.cta.line1':      { en: 'You’ve seen the menu.', ar: 'رأيت القائمة.' },
    'spg.cta.line2':      { en: 'Sit down.',          ar: 'تفضّل بالجلوس.' },
    'spg.book_one':       { en: 'Book this',          ar: 'احجز هذه' },
    'spg.book_one_named': { en: 'Book',               ar: 'احجز' },

    /* Tiers */
    'tier.core':          { en: 'Core',               ar: 'أساسي' },
    'tier.premium':       { en: 'Premium',            ar: 'مميّز' },
    'tier.signature':     { en: 'Signature',          ar: 'موقّع' },

    /* Barbers page */
    'bpg.eyebrow':        { en: 'The bench',          ar: 'المقعد' },
    'bpg.h1.line1':       { en: 'Six barbers.',       ar: 'ستة حلاقين.' },
    'bpg.h1.line2':       { en: 'One bench. Pick your hand.', ar: 'مقعد واحد. اختر يدك.' },
    'bpg.sub':            { en: 'Every cut booked at NORTH&HALE is tied to a single barber. The chair you book is the chair you sit in.', ar: 'كل قصّة محجوزة في نورث آند هيل ترتبط بحلاق واحد. الكرسي الذي تحجزه هو الكرسي الذي تجلس عليه.' },
    'bpg.cta.eyebrow':    { en: 'Pick a hand',        ar: 'اختر يداً' },
    'bpg.cta.line1':      { en: 'Met the bench?',     ar: 'تعرّفت على المقعد؟' },
    'bpg.cta.line2':      { en: 'Pick a chair.',      ar: 'اختر كرسياً.' },
    'bpg.book_with':      { en: 'Book with',          ar: 'احجز مع' },
    'bpg.years':          { en: 'YR',                 ar: 'سنة' },

    /* Booking flow */
    'bk.step':            { en: 'STEP',               ar: 'الخطوة' },
    'bk.of':              { en: '/',                  ar: '/' },
    'bk.step.barber':     { en: 'Barber',             ar: 'الحلاق' },
    'bk.step.service':    { en: 'Service',            ar: 'الخدمة' },
    'bk.step.when':       { en: 'Day & time',         ar: 'اليوم والوقت' },
    'bk.step.details':    { en: 'Details',            ar: 'البيانات' },

    'bk.title.barber':    { en: 'Pick your barber.',  ar: 'اختر حلاقك.' },
    'bk.title.service':   { en: 'Pick your service.', ar: 'اختر خدمتك.' },
    'bk.title.when':      { en: 'Pick a day and a time.', ar: 'اختر يوماً ووقتاً.' },
    'bk.title.details':   { en: 'Last bit, then you’re booked.', ar: 'بقيت تفصيلة أخيرة، ثم انتهى الحجز.' },

    'bk.sub.barber':      { en: 'The chair you book is the chair you sit in.', ar: 'الكرسي الذي تحجزه هو الكرسي الذي تجلس عليه.' },
    'bk.sub.service':     { en: 'Flat priced, timed exact. Nothing added at the chair.', ar: 'سعر ثابت، وقت محدّد. لا شيء يُضاف عند الكرسي.' },
    'bk.sub.when':        { en: 'Strikethrough means already booked. Pick anything open.', ar: 'الخط فوق الوقت يعني أنه محجوز. اختر أي وقت متاح.' },
    'bk.sub.details':     { en: 'We’ll send a reminder the morning of.', ar: 'سنرسل تذكيراً صباح الموعد.' },

    'bk.pick_day':        { en: 'Pick a day',         ar: 'اختر يوماً' },
    'bk.pick_day_first':  { en: 'Pick a day first',   ar: 'اختر يوماً أولاً' },
    'bk.no_day':          { en: 'No day selected.',   ar: 'لم تختر يوماً.' },
    'bk.pick_time_on':    { en: 'Pick a time on',     ar: 'اختر وقتاً يوم' },
    'bk.of_open':         { en: 'OPEN',               ar: 'متاح' },
    'bk.slots_label':     { en: 'OF',                 ar: 'من' },

    'bk.label.name':      { en: 'Your name',          ar: 'اسمك' },
    'bk.label.phone':     { en: 'Phone number',       ar: 'رقم الهاتف' },
    'bk.label.notes':     { en: 'Anything we should know?', ar: 'هل هناك ما نحتاج معرفته؟' },
    'bk.label.optional':  { en: '(optional)',         ar: '(اختياري)' },
    'bk.ph.name':         { en: 'Full name',          ar: 'الاسم الكامل' },
    'bk.ph.phone':        { en: '+966 50 555 0190',   ar: '+٩٦٦ ٥٠ ٥٥٥ ٠١٩٠' },
    'bk.ph.notes':        { en: 'Left side parts cleaner. Allergic to bay rum. Coffee, no milk.', ar: 'الجانب الأيسر فرقه أنظف. حساسية من برق الراي. قهوة بدون حليب.' },

    'bk.summary.title':   { en: 'Your reservation',   ar: 'حجزك' },
    'bk.summary.draft':   { en: 'DRAFT',              ar: 'مسودة' },
    'bk.summary.barber':  { en: 'Barber',             ar: 'الحلاق' },
    'bk.summary.service': { en: 'Service',            ar: 'الخدمة' },
    'bk.summary.duration':{ en: 'Duration',           ar: 'المدّة' },
    'bk.summary.when':    { en: 'When',               ar: 'الموعد' },
    'bk.summary.total':   { en: 'Total today',        ar: 'الإجمالي اليوم' },

    'bk.bar.barber':      { en: 'Pick a barber',      ar: 'اختر حلاقاً' },
    'bk.bar.service':     { en: 'Pick a service',     ar: 'اختر خدمة' },
    'bk.bar.slot':        { en: 'Pick a slot',        ar: 'اختر موعداً' },
    'bk.bar.confirm':     { en: 'Complete booking',   ar: 'إتمام الحجز' },
    'bk.bar.continue':    { en: 'Continue',           ar: 'متابعة' },
    'bk.bar.back':        { en: 'Back',               ar: 'رجوع' },
    'bk.bar.no_barber':   { en: 'No barber yet',      ar: 'لم تختر حلاقاً' },
    'bk.bar.no_service':  { en: 'No service yet',     ar: 'لم تختر خدمة' },
    'bk.bar.confirm_now': { en: 'Confirm details',    ar: 'تأكيد التفاصيل' },

    /* Confirmation */
    'cf.eyebrow.confirmed': { en: 'Confirmed',        ar: 'مؤكَّد' },
    'cf.h1.line1':          { en: 'You’re booked.', ar: 'تم حجزك.' },
    'cf.h1.line2':          { en: 'See you on the bench.', ar: 'نراك على المقعد.' },
    'cf.lede':              { en: 'We’ll send a reminder the morning of. If you need to change anything, just call the shop — we keep someone on the line.', ar: 'سنرسل تذكيراً صباح الموعد. وإن احتجت إلى تغيير، اتصل بالمحل — لدينا من يردّ دائماً.' },
    'cf.receipt':           { en: 'Receipt',          ar: 'الإيصال' },
    'cf.code':              { en: 'CODE',             ar: 'الرمز' },
    'cf.barber':            { en: 'Barber',           ar: 'الحلاق' },
    'cf.years':             { en: 'Years',            ar: 'سنوات الخبرة' },
    'cf.years.short':       { en: 'YR',               ar: 'سنة' },
    'cf.service':           { en: 'Service',          ar: 'الخدمة' },
    'cf.duration':          { en: 'Duration',         ar: 'المدّة' },
    'cf.duration.short':    { en: 'MIN',              ar: 'دقيقة' },
    'cf.when':              { en: 'When',             ar: 'اليوم' },
    'cf.time':              { en: 'Time',             ar: 'الوقت' },
    'cf.where':             { en: 'Where',            ar: 'المكان' },
    'cf.directions':        { en: 'Directions',       ar: 'الاتجاهات' },
    'cf.total':             { en: 'Total today',      ar: 'الإجمالي اليوم' },
    'cf.notes_for':         { en: 'Notes for',        ar: 'ملاحظات لـ' },
    'cf.add_cal':           { en: 'Add to calendar',  ar: 'أضف إلى التقويم' },
    'cf.book_another':      { en: 'Book another',     ar: 'احجز موعداً آخر' },
    'cf.change':            { en: 'Need to change it?', ar: 'تحتاج لتغييره؟' },
    'cf.change.sub':        { en: 'Call the shop. We keep someone on the line during open hours to handle changes, reschedules, and the occasional emergency.', ar: 'اتصل بالمحل. لدينا من يردّ خلال ساعات العمل لإدارة التغييرات وإعادة الجدولة وأي طارئ.' },
    'cf.phone.value':       { en: '+966 11 555 0190', ar: '+٩٦٦ ١١ ٥٥٥ ٠١٩٠' },
    'cf.phone.label':       { en: 'DAILY · 11–11',    ar: 'يومياً · ١١–١١' },
    'cf.none.eyebrow':      { en: 'No reservation found', ar: 'لا يوجد حجز' },
    'cf.none.h1':           { en: 'Nothing to confirm.', ar: 'لا شيء لتأكيده.' },
    'cf.none.sub':          { en: 'Looks like you landed here without a finished booking. Start one and come back.', ar: 'يبدو أنك وصلت إلى هنا دون حجز مكتمل. ابدأ حجزاً ثم عُد.' },
    'cf.none.cta':          { en: 'Start a booking',  ar: 'ابدأ الحجز' },
    'cf.for':               { en: 'For',              ar: 'لـ' },

    /* Misc */
    'misc.book':            { en: 'Book',             ar: 'احجز' },
    'misc.taken_label':     { en: 'TAKEN',            ar: 'محجوز' }
  };

  function pageDefaultLang() {
    /* A page can opt into a different default by setting window.BP3_DEFAULT_LANG
       BEFORE this script loads. The admin dashboard does that to default to English. */
    return (typeof window !== 'undefined' && window.BP3_DEFAULT_LANG === 'en') ? 'en' : 'ar';
  }

  function getLang() {
    try {
      /* Only an explicit user choice overrides the page default. */
      const chosen = localStorage.getItem('bp3.langChosen');
      if (chosen === 'en' || chosen === 'ar') return chosen;
      return pageDefaultLang();
    } catch (e) { return pageDefaultLang(); }
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'ar') return;
    try { localStorage.setItem('bp3.langChosen', lang); } catch (e) {}
    applyLang();
    document.dispatchEvent(new CustomEvent('bp3:langchange', { detail: { lang } }));
  }

  function t(key) {
    const lang = getLang();
    if (!STRINGS[key]) return key;
    return STRINGS[key][lang] != null ? STRINGS[key][lang] : STRINGS[key].en;
  }

  function applyLang() {
    const lang = getLang();
    const html = document.documentElement;
    html.lang = lang === 'ar' ? 'ar' : 'en';
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.classList.toggle('lang-ar', lang === 'ar');
    html.classList.toggle('lang-en', lang === 'en');

    /* Static text replacements (preserves any whitespace/structure-free elements) */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (STRINGS[key]) {
        const value = STRINGS[key][lang] || STRINGS[key].en;
        /* Allow multi-line via \n inside the dictionary */
        if (value.indexOf('\n') !== -1) {
          el.innerHTML = value.split('\n').map(esc).join('<br/>');
        } else {
          el.textContent = value;
        }
      }
    });

    /* Attribute replacements e.g. data-i18n-attr="placeholder:bk.ph.name" */
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(function (pair) {
        const idx = pair.indexOf(':');
        if (idx < 0) return;
        const attr = pair.slice(0, idx).trim();
        const key  = pair.slice(idx + 1).trim();
        if (!STRINGS[key]) return;
        const value = STRINGS[key][lang] || STRINGS[key].en;
        el.setAttribute(attr, value);
      });
    });

    /* Sync any lang-toggle UI */
    document.querySelectorAll('[data-lang-toggle]').forEach(function (el) {
      el.querySelectorAll('[data-set-lang]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
      });
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function attachToggleHandlers() {
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      if (b.__bp3wired) return;
      b.__bp3wired = true;
      b.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(b.getAttribute('data-set-lang'));
      });
    });
  }

  function start() {
    applyLang();
    attachToggleHandlers();
  }

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);

  /* Expose on BP3 */
  window.BP3 = window.BP3 || {};
  window.BP3.t = t;
  window.BP3.setLang = setLang;
  window.BP3.getLang = getLang;
  window.BP3.applyLang = applyLang;
  window.BP3.STRINGS = STRINGS;
})();
