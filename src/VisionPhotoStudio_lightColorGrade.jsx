import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

/* ============================================================
   VISION PHOTO STUDIO — Est. 1994
   Built with React + Framer Motion
   ============================================================
   QUICK-EDIT INDEX — search these labels to jump to each area:

   [EDIT: FONTS]           Change Google Fonts
   [EDIT: COLORS]          Brand color palette
   [EDIT: HERO IMAGES]     Hero slideshow (3 images)
   [EDIT: ABOUT IMAGE]     About section photographer photo
   [EDIT: STUDIO IMAGE]    Wide studio/BTS image in strip
   [EDIT: ABOUT TEXT]      Studio story, tagline, stats
   [EDIT: SERVICES]        Add / remove / rename service cards
   [EDIT: GALLERY IMAGES]  All portfolio gallery photos
   [EDIT: TESTIMONIALS]    Client quotes & avatar images
   [EDIT: CONTACT INFO]    Address, phone, email, hours
   [EDIT: WHATSAPP]        WhatsApp link number
   [EDIT: SOCIAL LINKS]    Footer social icon URLs
   [EDIT: SEO / META]      Studio name, taglines, copyright
   ============================================================ */


/* ─────────────────────────────────────────────────────────────
   [EDIT: FONTS]
   Replace the Google Fonts import URL to change typography.
   Then update the three CSS variables below:
     --font-serif    → section headings  (currently Cormorant Garamond)
     --font-display  → logo / big numbers (currently Bebas Neue)
     --font-body     → body / labels      (currently Jost)
─────────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&family=Jost:wght@200;300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ─────────────────────────────────────────────────────
       [EDIT: COLORS]
       All brand colors live here as CSS variables.
       Change any hex value to re-theme the entire site instantly.

       --bg-page     Main page background (warm ivory)
       --bg-section  Alternating section background (softer ivory)
       --bg-card     Card & form surface (pure white)
       --bg-dark     Footer background (rich dark charcoal)
       --accent      Primary brand accent (warm amber-bronze)
       --accent-lt   Lighter accent for hover states
       --accent-dim  Dimmer accent for label text
       --ink         Darkest text (near-black warm)
       --ink-soft    Secondary body text
       --ink-muted   Placeholders, captions, meta text
       --border      Card / divider border color
    ───────────────────────────────────────────────────── */
    :root {
      --bg-page:    #faf8f5;
      --bg-section: #f2ede5;
      --bg-card:    #ffffff;
      --bg-dark:    #1b1710;
      --accent:     #b06c30;
      --accent-lt:  #cc8f52;
      --accent-dim: #7a4a1e;
      --ink:        #18120a;
      --ink-soft:   #48382a;
      --ink-muted:  #968070;
      --border:     rgba(176,108,48,0.16);
      --font-serif:   'Cormorant Garamond', Georgia, serif;
      --font-display: 'Bebas Neue', sans-serif;
      --font-body:    'Jost', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg-page);
      color: var(--ink);
      font-family: var(--font-body);
      font-weight: 300;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg-section); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    ::selection { background: var(--accent); color: #fff; }

    /* Subtle film grain — professional finish */
    .grain {
      position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.02;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    /* Top scroll bar */
    .scroll-bar {
      position: fixed; top: 0; left: 0; height: 2px; z-index: 9998; transform-origin: left;
      background: linear-gradient(90deg, var(--accent-dim), var(--accent), var(--accent-lt));
    }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 64px; height: 76px;
      display: flex; align-items: center; justify-content: space-between;
      transition: all 0.4s ease;
    }
    nav.scrolled {
      background: rgba(250,248,245,0.93);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 2px 20px rgba(0,0,0,0.06);
    }
    .logo {
      font-family: var(--font-display); letter-spacing: 0.12em;
      font-size: 1.35rem; color: var(--accent); cursor: pointer;
    }
    .logo span { color: var(--ink); }
    .nav-links { display: flex; gap: 36px; align-items: center; }
    .nav-link {
      font-family: var(--font-body); font-size: 0.7rem; font-weight: 400;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--ink-soft); cursor: pointer; position: relative;
      transition: color 0.3s; background: none; border: none; padding: 0;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -4px; left: 0; right: 100%;
      height: 1px; background: var(--accent); transition: right 0.3s ease;
    }
    .nav-link:hover { color: var(--accent); }
    .nav-link:hover::after { right: 0; }
    .nav-cta {
      font-family: var(--font-body); font-size: 0.7rem; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #fff; background: var(--accent); border: none;
      padding: 11px 26px; cursor: pointer; transition: all 0.3s;
    }
    .nav-cta:hover { background: var(--accent-lt); transform: translateY(-1px); }

    /* HERO */
    .hero {
      position: relative; height: 100vh; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .shutter { position: absolute; inset: 0; background: var(--ink); z-index: 100; }

    /* SECTION LABELS */
    section { position: relative; }
    .s-label {
      font-family: var(--font-body); font-size: 0.64rem; font-weight: 400;
      letter-spacing: 0.38em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 14px;
    }
    .s-title {
      font-family: var(--font-serif); font-weight: 300;
      font-style: italic; line-height: 1.1; color: var(--ink);
    }
    .s-rule {
      width: 56px; height: 1px; margin: 22px 0;
      background: linear-gradient(90deg, var(--accent), transparent);
    }

    /* SERVICE CARDS */
    .svc-card {
      background: var(--bg-card); border: 1px solid var(--border);
      padding: 40px 32px; cursor: pointer;
      transition: all 0.4s ease; position: relative; overflow: hidden;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    }
    .svc-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(176,108,48,0.06), transparent);
      opacity: 0; transition: opacity 0.4s;
    }
    .svc-card:hover { border-color: rgba(176,108,48,0.4); transform: translateY(-5px); box-shadow: 0 14px 44px rgba(176,108,48,0.1); }
    .svc-card:hover::before { opacity: 1; }

    /* GALLERY */
    .g-item { position: relative; overflow: hidden; cursor: pointer; background: var(--bg-card); }
    .g-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s ease; display: block; }
    .g-item:hover img { transform: scale(1.07); }
    .g-cap {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(24,18,10,0.82) 0%, transparent 55%);
      display: flex; align-items: flex-end; padding: 24px;
      opacity: 0; transition: opacity 0.4s;
    }
    .g-item:hover .g-cap { opacity: 1; }

    /* LIGHTBOX */
    .lightbox {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(8,6,3,0.96);
      display: flex; align-items: center; justify-content: center;
    }
    .lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; }

    /* TESTIMONIAL */
    .testi {
      background: var(--bg-card); border: 1px solid var(--border);
      padding: 56px 60px;
      box-shadow: 0 6px 40px rgba(0,0,0,0.06);
    }
    .q-mark {
      font-family: var(--font-serif); font-size: 7rem; line-height: 0.5;
      color: var(--accent); opacity: 0.16;
    }

    /* FORM */
    .f-field {
      width: 100%; background: transparent; border: none;
      border-bottom: 1px solid rgba(176,108,48,0.22);
      color: var(--ink); font-family: var(--font-body);
      font-weight: 300; font-size: 0.95rem; padding: 14px 0;
      outline: none; transition: border-color 0.3s; letter-spacing: 0.05em;
    }
    .f-field::placeholder { color: var(--ink-muted); }
    .f-field:focus { border-color: var(--accent); }
    textarea.f-field { resize: none; min-height: 100px; }
    .f-label {
      font-size: 0.62rem; font-weight: 400; letter-spacing: 0.25em;
      text-transform: uppercase; color: var(--accent-dim);
      margin-bottom: 6px; display: block;
    }

    /* BUTTONS */
    .btn-o {
      display: inline-flex; align-items: center; gap: 12px;
      background: transparent; border: 1px solid var(--accent);
      color: var(--accent); font-family: var(--font-body);
      font-size: 0.7rem; font-weight: 400; letter-spacing: 0.25em;
      text-transform: uppercase; padding: 15px 36px;
      cursor: pointer; position: relative; overflow: hidden; transition: color 0.4s;
    }
    .btn-o::before {
      content: ''; position: absolute; inset: 0; background: var(--accent);
      transform: translateX(-101%); transition: transform 0.4s ease;
    }
    .btn-o:hover { color: #fff; }
    .btn-o:hover::before { transform: translateX(0); }
    .btn-o span { position: relative; z-index: 1; }

    .btn-s {
      display: inline-flex; align-items: center; gap: 12px;
      background: var(--accent); border: 1px solid var(--accent); color: #fff;
      font-family: var(--font-body); font-size: 0.7rem; font-weight: 500;
      letter-spacing: 0.25em; text-transform: uppercase;
      padding: 15px 36px; cursor: pointer; transition: all 0.3s;
    }
    .btn-s:hover { background: var(--accent-lt); transform: translateY(-2px); }

    /* UPLOAD */
    .upload {
      border: 2px dashed rgba(176,108,48,0.28); padding: 48px;
      text-align: center; cursor: pointer; transition: all 0.3s;
    }
    .upload:hover, .upload.active { border-color: var(--accent); background: rgba(176,108,48,0.04); }

    /* LOADER */
    .loader {
      position: fixed; inset: 0; z-index: 9999; background: var(--bg-page);
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px;
    }
    .lens { width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; position: relative; }
    .lens-i { width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(176,108,48,0.38); }
    .lens-c { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); position: absolute; }

    /* FOOTER */
    footer { background: var(--bg-dark); border-top: 1px solid rgba(176,108,48,0.14); padding: 72px 80px 36px; }

    /* FLOATING BUTTONS */
    .wa-fab {
      position: fixed; bottom: 32px; right: 32px; z-index: 500;
      width: 56px; height: 56px; border-radius: 50%; background: #25D366;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 4px 20px rgba(37,211,102,0.36);
      transition: all 0.3s; border: none;
    }
    .wa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.55); }
    .music-btn {
      position: fixed; bottom: 32px; left: 32px; z-index: 500;
      width: 48px; height: 48px; border-radius: 50%;
      background: rgba(250,248,245,0.92); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;
      box-shadow: 0 2px 12px rgba(0,0,0,0.09);
    }
    .music-btn:hover { border-color: var(--accent); }
    .bar { width: 3px; border-radius: 2px; background: var(--accent); }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      nav { padding: 0 20px; }
      .nav-links { display: none; }
      footer { padding: 48px 24px 28px; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════════
   [EDIT: HERO IMAGES]  ← change images here
   [EDIT: GALLERY IMAGES] ← change gallery photos here

   HERO: 3 full-screen slideshow images.
   Use landscape photos, min 1920×1080. Recommended: ?w=1920&q=90

   GALLERY: { id, src, title, h }
     h:1 = normal height (~235px)
     h:2 = tall masonry card (~390px)
   Add as many items as you like per category.
════════════════════════════════════════════════════════════════════ */
const PHOTOS = {

  /* ── HERO SLIDESHOW ──────────────────────────────────────── */
  hero: [
    /* Slot 1 — wide wedding/couple shot */
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=90",
    /* Slot 2 — studio / camera gear / professional setup */
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=90",
    /* Slot 3 — candid emotional moment */
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90",
  ],

  /* ── WEDDING GALLERY ─────────────────────────────────────── */
  weddings: [
    { id:1,  src:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&q=90", title:"Golden Hour Vows",   h:2 },
    { id:2,  src:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=90", title:"The First Dance",    h:1 },
    { id:3,  src:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=90", title:"Eternal Bond",       h:1 },
    { id:4,  src:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=90", title:"Bridal Elegance",    h:2 },
    { id:5,  src:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&q=90", title:"Timeless Love",      h:1 },
    { id:6,  src:"https://images.unsplash.com/photo-1529636798458-92182e662485?w=1000&q=90", title:"The Ceremony",       h:1 },
  ],

  /* ── ENGAGEMENT GALLERY ──────────────────────────────────── */
  engagement: [
    { id:7,  src:"https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=1000&q=90", title:"The Promise",        h:1 },
    { id:8,  src:"https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1000&q=90", title:"Ring of Love",       h:2 },
    { id:9,  src:"https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&q=90", title:"Together",           h:1 },
    { id:10, src:"https://images.unsplash.com/photo-1543826173-70651703c5a4?w=1000&q=90", title:"Our Story",          h:1 },
  ],

  /* ── PRE-WEDDING GALLERY ─────────────────────────────────── */
  prewedding: [
    { id:11, src:"https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=1000&q=90", title:"Before Forever",     h:2 },
    { id:12, src:"https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=1000&q=90", title:"Sunlit Dreams",      h:1 },
    { id:13, src:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=90", title:"Garden Romance",     h:1 },
  ],

  /* ── BIRTHDAY GALLERY ────────────────────────────────────── */
  birthdays: [
    { id:14, src:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=90", title:"Celebrate",          h:1 },
    { id:15, src:"https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=1000&q=90", title:"Joy & Laughter",     h:2 },
    { id:16, src:"https://images.unsplash.com/photo-1578021046647-3a1e0acce9e6?w=1000&q=90", title:"Memories Made",      h:1 },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   [EDIT: SERVICES]
   Add, rename, or remove cards. Each card has:
     icon  → emoji on the front face
     label → service name
     desc  → short pitch on the front
     items → bullet list shown when card is flipped
     color → per-card accent color (hex)
════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    icon:"📸", label:"Wedding Photography",
    desc:"Every glance, every tear, every dance. We capture the full tapestry of your wedding day in stunning 4K clarity.",
    items:["Full Day Coverage","Candid Photography","Videography 4K","Videography FHD","Cinematic 4K","Cinematic FHD"],
    color:"#b06c30",
  },
  {
    icon:"💍", label:"Engagement",
    desc:"The beginning of your forever. Intimate, elegant, and utterly cinematic.",
    items:["Location Shoots","Candid Moments","Videography 4K","Videography FHD","Cinematic 4K","Cinematic FHD"],
    color:"#8a5c38",
  },
  {
    icon:"🌄", label:"Pre-Wedding",
    desc:"Let your love story unfold in breathtaking settings before the big day arrives.",
    items:["Outdoor Locations","Indoor Studio","Sunset Shoots","Videography 4K","Cinematic 4K","Cinematic FHD"],
    color:"#5e7a52",
  },
  {
    icon:"🎂", label:"Birthday Photography",
    desc:"Celebrate milestones with vivid, joyful images and cinematic films.",
    items:["Candid Coverage","Themed Setups","Group Photos","Highlight Reel","Cinematic 4K","Cinematic FHD"],
    color:"#4e6e9a",
  },
];

/* ══════════════════════════════════════════════════════════════════
   [EDIT: TESTIMONIALS]
   Replace name, event, quote, and img URL for each client.
   img → square avatar, min 80×80px.
════════════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name:"Priya & Arjun Sharma", event:"Wedding · Mumbai",
    quote:"Vision Photo Studio exceeded every expectation. The images don't just look beautiful — they feel alive. Every photo transported us straight back to that day.",
    rating:5, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    name:"Sneha & Vikram Mehta", event:"Pre-Wedding · Goa",
    quote:"Incredibly professional and deeply creative. They captured emotions we didn't even know we were feeling. Truly cinematic masterpieces.",
    rating:5, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    name:"Nisha Kapoor", event:"Birthday · Pune",
    quote:"From the first consultation to the final delivery, everything was seamless. The photos brought everyone to tears — they captured every joyful second.",
    rating:5, img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  },
];

/* ══════ UTILS ════════════════════════════════════════════════════ */
function useScrolled() {
  const [s, set] = useState(false);
  useEffect(() => {
    const h = () => set(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return s;
}

function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity:0, y:36 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay }}
    >{children}</motion.div>
  );
}

function Flash({ on }) {
  return (
    <AnimatePresence>
      {on && <motion.div initial={{ opacity:0.9 }} animate={{ opacity:0 }} transition={{ duration:0.35 }}
        style={{ position:"absolute", inset:0, background:"white", zIndex:10, pointerEvents:"none" }}/>}
    </AnimatePresence>
  );
}

/* ══════ LOADER ═══════════════════════════════════════════════════ */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPct(p => {
      if (p >= 100) { clearInterval(t); setTimeout(onDone, 350); return 100; }
      return p + Math.random() * 11;
    }), 115);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div className="loader" exit={{ opacity:0 }} transition={{ duration:0.45 }}>
      <motion.div className="lens" animate={{ rotate:360 }} transition={{ duration:3, repeat:Infinity, ease:"linear" }}>
        <div className="lens-i"/>
        <motion.div className="lens-c" animate={{ scale:[1,1.25,1] }} transition={{ duration:1.4, repeat:Infinity }}/>
      </motion.div>
      {/* [EDIT: SEO / META] Studio name in loader */}
      <div style={{ fontFamily:"var(--font-display)", letterSpacing:"0.3em", fontSize:"1.1rem", color:"var(--accent)" }}>
        VISION PHOTO STUDIO
      </div>
      <div style={{ width:200, height:1, background:"#e0d5c5", position:"relative" }}>
        <motion.div style={{ position:"absolute", left:0, top:0, height:"100%", background:"var(--accent)" }}
          animate={{ width:`${Math.min(pct,100)}%` }} transition={{ duration:0.3 }}/>
      </div>
      <div style={{ fontSize:"0.7rem", letterSpacing:"0.22em", color:"var(--ink-muted)" }}>FOCUSING LENS...</div>
    </motion.div>
  );
}

/* ══════ NAVBAR ════════════════════════════════════════════════════ */
function Navbar() {
  const scrolled = useScrolled();
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <motion.nav className={scrolled ? "scrolled" : ""}
      initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.8, delay:0.2, ease:[0.16,1,0.3,1] }}>
      {/* [EDIT: SEO / META] Navbar logo text */}
      <div className="logo">VISION<span> PHOTO STUDIO</span></div>
      <div className="nav-links">
        {["about","services","portfolio","testimonials","contact"].map(s => (
          <button key={s} className="nav-link" onClick={() => go(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button className="nav-cta" onClick={() => go("contact")}>Book Now</button>
      </div>
    </motion.nav>
  );
}

/* ══════ HERO ══════════════════════════════════════════════════════ */
function Hero() {
  const [slide, setSlide]     = useState(0);
  const [flash, setFlash]     = useState(false);
  const [open,  setOpen]      = useState(false);
  const { scrollY }           = useScroll();
  const bgY   = useTransform(scrollY, [0,600], [0,160]);
  const txtOp = useTransform(scrollY, [0,380], [1,0]);

  useEffect(() => { const t = setTimeout(() => setOpen(true), 800); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 280);
      /* [EDIT: HERO IMAGES] Cycle interval in ms — default 4500 */
      setTimeout(() => setSlide(s => (s + 1) % PHOTOS.hero.length), 280);
    }, 4500);
    return () => clearInterval(t);
  }, [open]);

  return (
    <div className="hero" id="hero">

      {/* ── Camera shutter blades ── */}
      <AnimatePresence>
        {!open && [0,1,2,3,4].map(i => (
          <motion.div key={i} className="shutter"
            style={{ clipPath:`polygon(${i*20}% 0%,${(i+1)*20}% 0%,${(i+1)*20}% 100%,${i*20}% 100%)` }}
            exit={{ scaleY:0, transformOrigin:i%2===0?"top":"bottom" }}
            transition={{ duration:0.8, delay:i*0.08, ease:[0.16,1,0.3,1] }}
          />
        ))}
      </AnimatePresence>

      {/* ── Parallax hero image background ── */}
      <motion.div style={{ position:"absolute", inset:0, y:bgY }}>
        <AnimatePresence mode="crossfade">
          {/* [EDIT: HERO IMAGES] Images come from PHOTOS.hero[] above */}
          <motion.img key={slide} src={PHOTOS.hero[slide]}
            initial={{ opacity:0, scale:1.07 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            transition={{ duration:1.3, ease:"easeOut" }}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
        </AnimatePresence>
        {/* Minimal bright vignette — light-themed, keeps text legible */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(8,6,3,0.25) 0%, rgba(8,6,3,0.05) 40%, rgba(8,6,3,0.62) 100%)" }}/>
        {/* Warm amber grade layer */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(176,108,48,0.07) 0%, transparent 55%)", mixBlendMode:"multiply", pointerEvents:"none" }}/>
      </motion.div>

      <Flash on={flash}/>

      {/* ── Hero text ── */}
      <motion.div style={{ position:"relative", zIndex:2, textAlign:"center", opacity:txtOp, padding:"0 24px" }}>
        {/* [EDIT: SEO / META] Hero top label */}
        <motion.div
          initial={{ opacity:0, letterSpacing:"0.6em" }} animate={{ opacity:1, letterSpacing:"0.35em" }}
          transition={{ duration:1.2, delay:1.1 }}
          style={{ fontFamily:"var(--font-body)", fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(255,215,170,0.92)", marginBottom:22 }}>
          ✦ Est. 1994 · Premium Photography & Videography ✦
        </motion.div>

        {/* [EDIT: SEO / META] Studio name headline */}
        <motion.h1
          initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, delay:1.3, ease:[0.16,1,0.3,1] }}
          style={{ fontFamily:"var(--font-serif)", fontWeight:300, fontStyle:"italic", fontSize:"clamp(3rem,9vw,7.5rem)", lineHeight:1.02, color:"#fff", marginBottom:12, textShadow:"0 2px 40px rgba(0,0,0,0.18)" }}>
          Vision Photo Studio
        </motion.h1>

        {/* [EDIT: SEO / META] Hero sub-tagline */}
        <motion.p
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:1.6, ease:[0.16,1,0.3,1] }}
          style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.78rem,2vw,0.94rem)", fontWeight:200, letterSpacing:"0.22em", color:"rgba(255,238,210,0.86)", marginBottom:52, textTransform:"uppercase" }}>
          Capturing Moments That Last Forever
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:2, ease:[0.16,1,0.3,1] }}
          style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-s" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior:"smooth" })}>
            <span>View Portfolio</span><span>→</span>
          </button>
          <button className="btn-o"
            style={{ color:"rgba(255,228,185,0.9)", borderColor:"rgba(255,205,140,0.45)" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
            <span>Book a Session</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Slide dots */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:2 }}>
        {PHOTOS.hero.map((_,i) => (
          <button key={i} onClick={() => setSlide(i)} style={{
            width:i===slide?24:6, height:6, borderRadius:3,
            background:i===slide?"#fff":"rgba(255,255,255,0.32)",
            border:"none", cursor:"pointer", transition:"all 0.3s", padding:0,
          }}/>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
        style={{ position:"absolute", bottom:38, right:52, zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer" }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}>
        <div style={{ fontSize:"0.57rem", letterSpacing:"0.25em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase", writingMode:"vertical-rl" }}>Scroll</div>
        <div style={{ width:1, height:38, background:"linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)" }}/>
      </motion.div>
    </div>
  );
}

/* ══════ ABOUT ═════════════════════════════════════════════════════ */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], [-55,55]);

  return (
    <section id="about" ref={ref} style={{ padding:"120px 80px", background:"var(--bg-section)", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>

        {/* ── Photo side ── */}
        <div style={{ position:"relative" }}>
          <motion.div style={{ y:imgY }}>
            <div style={{ position:"relative", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.13)" }}>
              {/*
                [EDIT: ABOUT IMAGE]
                Replace src with your photographer / team photo.
                Recommended: portrait 4:5 ratio, min 900×1100px.
                Example: "https://images.unsplash.com/photo-XXXX?w=900&q=90"
              */}
              <motion.img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=90"
                alt="Vision Photo Studio — our photographer"
                initial={{ scale:1.18, filter:"blur(10px)" }}
                whileInView={{ scale:1, filter:"blur(0px)" }}
                viewport={{ once:true }}
                transition={{ duration:1.5, ease:[0.16,1,0.3,1] }}
                style={{ width:"100%", height:580, objectFit:"cover", display:"block" }}
              />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 55%, rgba(24,18,10,0.38) 100%)" }}/>
            </div>
          </motion.div>

          {/* Est. 1994 badge */}
          <motion.div initial={{ opacity:0, x:44 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.4 }}
            style={{ position:"absolute", bottom:-32, right:-32, background:"var(--accent)", color:"#fff", padding:"24px 32px", textAlign:"center", boxShadow:"0 8px 32px rgba(176,108,48,0.35)" }}>
            {/* [EDIT: SEO / META] Founded year */}
            <div style={{ fontFamily:"var(--font-display)", fontSize:"2.8rem", lineHeight:1 }}>1994</div>
            <div style={{ fontFamily:"var(--font-body)", fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase", marginTop:4 }}>Est. Since</div>
          </motion.div>

          {/* Decorative offset frame */}
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:1, delay:0.6 }}
            style={{ position:"absolute", top:-16, left:-16, right:16, bottom:16, border:"1px solid var(--border)", zIndex:-1, pointerEvents:"none" }}/>
        </div>

        {/* ── Text side ── */}
        <div>
          <Reveal><div className="s-label">Our Story</div></Reveal>
          <Reveal delay={0.1}>
            {/* [EDIT: ABOUT TEXT] Main heading */}
            <h2 className="s-title" style={{ fontSize:"clamp(2.3rem,4vw,3.5rem)" }}>
              We Don't Just Take Photos,<br/>
              <em style={{ color:"var(--accent)" }}>We Tell Stories</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}><div className="s-rule"/></Reveal>
          <Reveal delay={0.3}>
            {/* [EDIT: ABOUT TEXT] First paragraph */}
            <p style={{ color:"var(--ink-soft)", lineHeight:1.9, fontSize:"0.95rem", marginBottom:18 }}>
              Born in 1994 from a single camera and an unshakeable belief that every moment deserves to be
              immortalized, Vision Photo Studio has grown into Mumbai's most trusted photography and videography
              house — three decades of storytelling, one frame at a time.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            {/* [EDIT: ABOUT TEXT] Second paragraph */}
            <p style={{ color:"var(--ink-muted)", lineHeight:1.9, fontSize:"0.9rem", marginBottom:40 }}>
              Our award-winning team brings an artist's eye and a storyteller's heart to every assignment.
              From the quiet intimacy of a first glance to the roaring celebration of a packed dance floor —
              we're there for every heartbeat, equipped with professional 4K cinema rigs and decades of craft.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            {/* [EDIT: ABOUT TEXT] Stats — adjust numbers as needed */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:40 }}>
              {[["30+","Years of Legacy"],["500+","Weddings Shot"],["98%","Happy Clients"]].map(([n,l]) => (
                <div key={l} style={{ borderLeft:"2px solid var(--border)", paddingLeft:16 }}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"2.2rem", color:"var(--accent)", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:"0.65rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--ink-muted)", marginTop:5 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <button className="btn-o" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
              <span>Start Your Journey</span><span>✦</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════ SERVICES ══════════════════════════════════════════════════ */
function SvcCard({ s, i }) {
  const [flip, setFlip]   = useState(false);
  const [flash, setFlash] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.7, delay:i*0.12, ease:[0.16,1,0.3,1] }}
      style={{ perspective:1200, cursor:"pointer" }}
      onClick={() => { setFlash(true); setTimeout(()=>setFlash(false),280); setTimeout(()=>setFlip(f=>!f),140); }}>
      <motion.div animate={{ rotateY:flip?180:0 }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
        style={{ transformStyle:"preserve-3d", position:"relative", minHeight:350 }}>
        {/* Front */}
        <div className="svc-card" style={{ backfaceVisibility:"hidden", position:"absolute", inset:0, minHeight:350 }}>
          <Flash on={flash}/>
          <div style={{ fontSize:"2.6rem", marginBottom:18 }}>{s.icon}</div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", color:s.color, marginBottom:10 }}>Photography & Video</div>
          <h3 style={{ fontFamily:"var(--font-serif)", fontWeight:300, fontSize:"1.5rem", marginBottom:14, lineHeight:1.2, color:"var(--ink)" }}>{s.label}</h3>
          <p style={{ color:"var(--ink-muted)", fontSize:"0.84rem", lineHeight:1.78, marginBottom:22 }}>{s.desc}</p>
          <div style={{ display:"flex", alignItems:"center", gap:8, color:s.color, fontSize:"0.67rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>
            <span>Tap to explore</span><span>→</span>
          </div>
          <div style={{ position:"absolute", top:0, right:0, width:0, height:0, borderLeft:"40px solid transparent", borderTop:`40px solid ${s.color}1a` }}/>
        </div>
        {/* Back */}
        <div className="svc-card" style={{ backfaceVisibility:"hidden", position:"absolute", inset:0, transform:"rotateY(180deg)", minHeight:350, background:"var(--bg-section)" }}>
          <div style={{ fontFamily:"var(--font-body)", fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", color:s.color, marginBottom:14 }}>Packages Include</div>
          <h3 style={{ fontFamily:"var(--font-serif)", fontWeight:300, fontSize:"1.35rem", marginBottom:18, color:"var(--ink)" }}>{s.label}</h3>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
            {/* [EDIT: SERVICES] Items on back face */}
            {s.items.map((it,j) => (
              <li key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:"0.84rem", color:"var(--ink-soft)" }}>
                <span style={{ color:s.color, fontSize:"0.46rem" }}>◆</span>{it}
              </li>
            ))}
          </ul>
          <div style={{ marginTop:20, fontSize:"0.67rem", letterSpacing:"0.15em", color:s.color, textTransform:"uppercase" }}>Tap to go back</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding:"120px 80px", background:"var(--bg-page)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <Reveal><div className="s-label">What We Offer</div></Reveal>
          <Reveal delay={0.1}><h2 className="s-title" style={{ fontSize:"clamp(2.3rem,5vw,3.7rem)" }}>Our <em style={{ color:"var(--accent)" }}>Services</em></h2></Reveal>
          <Reveal delay={0.2}><p style={{ color:"var(--ink-muted)", fontSize:"0.9rem", maxWidth:460, margin:"14px auto 0", lineHeight:1.8 }}>From intimate engagements to grand celebrations — every service tailored to your story.</p></Reveal>
        </div>
        {/* [EDIT: SERVICES] Cards generated from SERVICES[] array above */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(255px,1fr))", gap:24 }}>
          {SERVICES.map((s,i) => <SvcCard key={i} s={s} i={i}/>)}
        </div>
      </div>
    </section>
  );
}

/* ══════ STUDIO STRIP ══════════════════════════════════════════════ */
function StudioStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const y = useTransform(scrollYProgress, [0,1], [-60,60]);

  return (
    <div ref={ref} style={{ position:"relative", height:460, overflow:"hidden" }}>
      <motion.div style={{ position:"absolute", inset:0, y }}>
        {/*
          [EDIT: STUDIO IMAGE]
          Replace src with a wide studio interior, behind-the-scenes,
          or camera gear shot. Recommended: 1920×800 landscape.
          Example: "https://images.unsplash.com/photo-XXXX?w=1920&q=90"
        */}
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=90"
          alt="Vision Photo Studio — behind the lens"
          style={{ width:"100%", height:"calc(100% + 120px)", objectFit:"cover", objectPosition:"center 40%", marginTop:-60 }}
        />
      </motion.div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(24,18,10,0.78) 0%, rgba(24,18,10,0.28) 65%, rgba(24,18,10,0.08) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 80px" }}>
        <div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:"0.64rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(255,210,150,0.78)", marginBottom:14 }}>Behind the Lens</div>
          {/* [EDIT: ABOUT TEXT] Strip heading */}
          <h2 style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:300, fontSize:"clamp(2rem,4vw,3rem)", color:"#fff", lineHeight:1.15, marginBottom:18 }}>
            Where Light Meets<br/><span style={{ color:"var(--accent-lt)" }}>Emotion</span>
          </h2>
          {/* [EDIT: ABOUT TEXT] Strip body */}
          <p style={{ color:"rgba(255,255,255,0.52)", fontSize:"0.88rem", maxWidth:400, lineHeight:1.82, marginBottom:28 }}>
            Professional-grade 4K cinema cameras, Zeiss cinema lenses, and bespoke lighting rigs — built to capture every detail with breathtaking clarity since 1994.
          </p>
          <button className="btn-o"
            style={{ color:"rgba(255,225,170,0.88)", borderColor:"rgba(255,200,120,0.42)" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
            <span>Book a Studio Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════ PORTFOLIO ═════════════════════════════════════════════════ */
function GalleryGrid({ photos }) {
  const [lb, setLb] = useState(null);
  return (
    <>
      <div style={{ columns:"3 255px", gap:10 }}>
        {photos.map((p,i) => (
          <motion.div key={p.id} className="g-item"
            initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
            transition={{ duration:0.55, delay:i*0.06 }}
            style={{ marginBottom:10, breakInside:"avoid", boxShadow:"0 4px 20px rgba(0,0,0,0.07)" }}
            onClick={() => setLb(p)}>
            {/* [EDIT: GALLERY IMAGES] src and title from PHOTOS[] above */}
            <img src={p.src} alt={p.title} loading="lazy"
              style={{ width:"100%", display:"block", height:p.h===2?390:235, objectFit:"cover" }}/>
            <div className="g-cap">
              <div style={{ fontFamily:"var(--font-serif)", fontSize:"1.05rem", fontStyle:"italic", color:"#fff" }}>{p.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lb && (
          <motion.div className="lightbox" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setLb(null)}>
            <motion.img src={lb.src} alt={lb.title}
              initial={{ scale:0.82, filter:"blur(22px)", opacity:0 }}
              animate={{ scale:1, filter:"blur(0px)", opacity:1 }}
              exit={{ scale:0.88, opacity:0 }}
              transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
              onClick={e => e.stopPropagation()}/>
            <button onClick={() => setLb(null)} style={{ position:"absolute", top:24, right:24, background:"none", border:"1px solid rgba(255,255,255,0.28)", color:"white", width:44, height:44, borderRadius:"50%", cursor:"pointer", fontSize:"1rem" }}>✕</button>
            <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", fontFamily:"var(--font-serif)", fontStyle:"italic", color:"rgba(255,255,255,0.62)", fontSize:"1.05rem" }}>{lb.title}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Upload({ onUpload }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef(null);
  const load = files => Array.from(files).forEach(f => {
    if (!f.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => onUpload({ id:Date.now()+Math.random(), src:e.target.result, title:f.name.replace(/\.[^.]+$/,""), h:1 });
    r.readAsDataURL(f);
  });
  return (
    <div className={`upload${drag?" active":""}`}
      onDragOver={e=>{e.preventDefault();setDrag(true);}}
      onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);load(e.dataTransfer.files);}}
      onClick={()=>ref.current?.click()}>
      <input ref={ref} type="file" multiple accept="image/*" style={{ display:"none" }} onChange={e=>load(e.target.files)}/>
      <div style={{ fontSize:"2.2rem", marginBottom:10 }}>📁</div>
      <div style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:"1.15rem", color:"var(--ink-soft)", marginBottom:6 }}>Drop photos to add to gallery</div>
      <div style={{ fontSize:"0.7rem", letterSpacing:"0.14em", color:"var(--ink-muted)", textTransform:"uppercase" }}>or click to browse — photos appear instantly</div>
    </div>
  );
}

function Portfolio() {
  const cats   = ["Weddings","Engagement","Pre-Wedding","Birthdays"];
  const keys   = ["weddings","engagement","prewedding","birthdays"];
  const [tab,  setTab]    = useState(0);
  const [pics, setPics]   = useState(PHOTOS);
  const add = (k,p) => setPics(prev => ({ ...prev, [k]:[...prev[k],p] }));

  return (
    <section id="portfolio" style={{ padding:"120px 80px", background:"var(--bg-section)" }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:24 }}>
          <div>
            <Reveal><div className="s-label">Our Work</div></Reveal>
            <Reveal delay={0.1}><h2 className="s-title" style={{ fontSize:"clamp(2.3rem,5vw,3.7rem)" }}>The <em style={{ color:"var(--accent)" }}>Portfolio</em></h2></Reveal>
          </div>
          {/* Category tabs */}
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {cats.map((c,i) => (
              <button key={c} onClick={() => setTab(i)} style={{
                background:i===tab?"var(--accent)":"transparent",
                border:`1px solid ${i===tab?"var(--accent)":"var(--border)"}`,
                color:i===tab?"#fff":"var(--ink-soft)",
                fontFamily:"var(--font-body)", fontSize:"0.67rem", letterSpacing:"0.18em", textTransform:"uppercase",
                padding:"10px 20px", cursor:"pointer", transition:"all 0.3s",
              }}>{c}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.38 }}>
            {/* [EDIT: GALLERY IMAGES] Photos from PHOTOS[keys[tab]] */}
            <GalleryGrid photos={pics[keys[tab]]}/>
          </motion.div>
        </AnimatePresence>

        {/* Admin upload */}
        <div style={{ marginTop:60 }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div className="s-label">Admin Upload</div>
            <p style={{ color:"var(--ink-muted)", fontSize:"0.84rem" }}>Add photos to <strong>{cats[tab]}</strong></p>
          </div>
          <Upload onUpload={p => add(keys[tab],p)}/>
        </div>
      </div>
    </section>
  );
}

/* ══════ TESTIMONIALS ══════════════════════════════════════════════ */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1)%TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" style={{ padding:"120px 80px", background:"var(--bg-page)", overflow:"hidden" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <Reveal><div className="s-label">Client Love</div></Reveal>
          <Reveal delay={0.1}><h2 className="s-title" style={{ fontSize:"clamp(2.3rem,5vw,3.7rem)" }}>What They <em style={{ color:"var(--accent)" }}>Say</em></h2></Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity:0, x:80 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-80 }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}>
            {(() => {
              const t = TESTIMONIALS[idx]; /* [EDIT: TESTIMONIALS] */
              return (
                <div className="testi" style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
                  <div className="q-mark">"</div>
                  <p style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:300, fontSize:"clamp(1rem,2vw,1.38rem)", lineHeight:1.76, color:"var(--ink)", margin:"6px 0 28px" }}>{t.quote}</p>
                  <div style={{ display:"flex", justifyContent:"center", gap:3, marginBottom:20 }}>
                    {Array.from({length:t.rating}).map((_,i) => <span key={i} style={{ color:"var(--accent)", fontSize:"0.88rem" }}>★</span>)}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
                    {/* [EDIT: TESTIMONIALS] Avatar image */}
                    <img src={t.img} alt={t.name} style={{ width:50, height:50, borderRadius:"50%", objectFit:"cover", border:"2px solid var(--accent)" }}/>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontFamily:"var(--font-body)", fontWeight:400, fontSize:"0.9rem", color:"var(--ink)" }}>{t.name}</div>
                      <div style={{ fontSize:"0.67rem", letterSpacing:"0.15em", color:"var(--accent)", textTransform:"uppercase" }}>{t.event}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:40 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width:i===idx?26:8, height:8, borderRadius:4,
              background:i===idx?"var(--accent)":"#cfc0b0",
              border:"none", cursor:"pointer", transition:"all 0.3s", padding:0,
            }}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════ CONTACT ═══════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true); setTimeout(() => setSent(false), 4500);
    setForm({ name:"", phone:"", email:"", message:"" });
  };

  return (
    <section id="contact" style={{ padding:"120px 80px", background:"var(--bg-section)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }}>

        {/* Info */}
        <div>
          <Reveal><div className="s-label">Get In Touch</div></Reveal>
          <Reveal delay={0.1}><h2 className="s-title" style={{ fontSize:"clamp(2.1rem,4vw,3.4rem)" }}>Let's Create<br/><em style={{ color:"var(--accent)" }}>Something Beautiful</em></h2></Reveal>
          <Reveal delay={0.2}><div className="s-rule"/></Reveal>
          <Reveal delay={0.3}><p style={{ color:"var(--ink-muted)", lineHeight:1.9, fontSize:"0.9rem", marginBottom:44 }}>
            Ready to book? Reach out and we'll craft a bespoke photography experience tailored just for you.
          </p></Reveal>

          {/*
            [EDIT: CONTACT INFO]
            Change address, phone, email, and hours below.
          */}
          {[
            ["📍","Location",   "Tasgaon, Dist-Sangli, Maharashtra 416312"],
            ["📞","Phone",      "+91 98905 90035"],
            ["✉️","Email",     "hello@visionphotostudio.in"],
            ["⏰","Hours",      "Mon–Sat: 10am – 7pm"],
          ].map(([icon, lbl, val]) => (
            <Reveal key={lbl} delay={0.3}>
              <div style={{ display:"flex", gap:16, marginBottom:22, alignItems:"flex-start" }}>
                <span style={{ fontSize:"1.1rem", marginTop:2 }}>{icon}</span>
                <div>
                  <div style={{ fontSize:"0.61rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--accent-dim)", marginBottom:3 }}>{lbl}</div>
                  <div style={{ fontSize:"0.9rem", color:"var(--ink-soft)" }}>{val}</div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Map placeholder */}
          <Reveal delay={0.5}>
            <div style={{ marginTop:10, height:180, background:"var(--bg-card)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ textAlign:"center", color:"var(--ink-muted)" }}>
                <div style={{ fontSize:"2rem", marginBottom:8 }}>🗺️</div>
                {/* [EDIT: CONTACT INFO] Map label */}
                <div style={{ fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>Bandra West, Mumbai</div>
                <div style={{ fontSize:"0.63rem", color:"var(--accent)", marginTop:5, letterSpacing:"0.1em" }}>Embed Google Maps iframe here</div>
              </div>
              <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(176,108,48,0.025) 18px, rgba(176,108,48,0.025) 19px)", pointerEvents:"none" }}/>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.2}>
          <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
            <h3 style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:300, fontSize:"1.8rem", color:"var(--ink)" }}>Book Your Session</h3>
            {[
              { key:"name",  label:"Your Name",     type:"text",  ph:"Priya Sharma" },
              { key:"phone", label:"Phone Number",  type:"tel",   ph:"+91 98765 XXXX" },
              { key:"email", label:"Email Address", type:"email", ph:"priya@example.com" },
            ].map(f => (
              <div key={f.key}>
                <label className="f-label">{f.label}</label>
                <input className="f-field" type={f.type} placeholder={f.ph}
                  value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}/>
              </div>
            ))}
            <div>
              <label className="f-label">Your Message</label>
              <textarea className="f-field" placeholder="Tell us about your dream shoot — date, location, vibe..."
                value={form.message} onChange={e => setForm(p => ({ ...p, message:e.target.value }))}/>
            </div>

            <AnimatePresence mode="wait">
              {sent
                ? <motion.div key="ok" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    style={{ background:"rgba(176,108,48,0.08)", border:"1px solid var(--accent)", padding:"16px 24px", color:"var(--accent)", fontSize:"0.85rem", letterSpacing:"0.1em" }}>
                    ✓ Thank you! We'll be in touch within 24 hours.
                  </motion.div>
                : <motion.button key="btn" className="btn-s" style={{ alignSelf:"flex-start" }} onClick={submit} whileTap={{ scale:0.97 }}>
                    Book Your Shoot →
                  </motion.button>
              }
            </AnimatePresence>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:16, margin:"4px 0" }}>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, var(--border), transparent)" }}/>
              <span style={{ fontSize:"0.61rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-muted)", whiteSpace:"nowrap" }}>or reach us directly</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent, var(--border), transparent)" }}/>
            </div>

            {/*
              [EDIT: WHATSAPP]
              Replace the phone number in href.
              Format: https://wa.me/91XXXXXXXXXX (no spaces, include country code)
              Also update the display text to show your actual number.
            */}
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#25D366", color:"white", padding:"14px 28px", fontFamily:"var(--font-body)", fontSize:"0.75rem", letterSpacing:"0.15em", textTransform:"uppercase", textDecoration:"none", fontWeight:400, transition:"all 0.3s", boxShadow:"0 4px 16px rgba(37,211,102,0.26)" }}>
              <span style={{ fontSize:"1.1rem" }}>💬</span>
              <span>Chat on WhatsApp — +91 98765 43210</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════ FOOTER ════════════════════════════════════════════════════ */
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <footer>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:64 }}>
          <div>
            {/* [EDIT: SEO / META] Footer logo */}
            <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", color:"var(--accent)", letterSpacing:"0.1em", marginBottom:14 }}>
              VISION<span style={{ color:"rgba(255,255,255,0.65)" }}> PHOTO STUDIO</span>
            </div>
            {/* [EDIT: SEO / META] Footer tagline */}
            <p style={{ color:"rgba(255,255,255,0.36)", fontSize:"0.83rem", lineHeight:1.8, maxWidth:255 }}>
              Capturing moments that last forever. Mumbai's premier photography & videography studio — est. 1994.
            </p>

            {/*
              [EDIT: SOCIAL LINKS]
              Add onClick={() => window.open("YOUR_URL", "_blank")} to each button.
              Replace the emoji with SVG icons if preferred.
            */}
            <div style={{ display:"flex", gap:10, marginTop:22 }}>
              {[
                { e:<FaInstagram  color="#E1306C"/>, l:"Instagram" /* onClick: window.open("https://instagram.com/YOUR_HANDLE","_blank") */ },
                { e:<FaFacebook color="#1877F2" />, l:"Facebook"  /* onClick: window.open("https://facebook.com/YOUR_PAGE","_blank") */ },
                { e:<FaYoutube color="#FF0000" />, l:"YouTube"   /* onClick: window.open("https://youtube.com/YOUR_CHANNEL","_blank") */ },
                { e:<FaTwitter color="#1DA1F2" />, l:"Twitter"   /* onClick: window.open("https://twitter.com/YOUR_HANDLE","_blank") */ },
              ].map(({ e, l }) => (
                <button key={l} title={l}
                  style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", fontSize:"0.84rem", transition:"all 0.3s" }}
                  onMouseEnter={el => { el.currentTarget.style.borderColor="var(--accent)"; el.currentTarget.style.background="rgba(176,108,48,0.2)"; }}
                  onMouseLeave={el => { el.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; el.currentTarget.style.background="rgba(255,255,255,0.07)"; }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {[
            { title:"Navigate", links:["About","Services","Portfolio","Testimonials","Contact"] },
            { title:"Services",  links:["Wedding","Engagement","Pre-Wedding","Birthday","Videography","Cinematic"] },
            {
              title:"Contact",
              /* [EDIT: CONTACT INFO] Footer contact column */
              links:["Tasgaon, Maharashtra India","+91 98905 90035","hello@visionphotostudio.in","Mon–Sat 10–7pm"],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--accent)", marginBottom:18 }}>{col.title}</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <button onClick={() => go(l.toLowerCase())}
                      style={{ background:"none", border:"none", color:"rgba(255,255,255,0.36)", fontSize:"0.83rem", cursor:"pointer", padding:0, transition:"color 0.3s", textAlign:"left" }}
                      onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                      onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.36)"}>{l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          {/* [EDIT: SEO / META] Copyright */}
          <div style={{ fontSize:"0.69rem", color:"rgba(255,255,255,0.24)", letterSpacing:"0.1em" }}>
            © 1994–2025 Vision Photo Studio. All rights reserved.
          </div>
          <div style={{ fontSize:"0.69rem", color:"rgba(176,108,48,0.45)", letterSpacing:"0.1em" }}>Crafted with ✦ in Mumbai</div>
        </div>
      </div>
    </footer>
  );
}

/* ══════ MUSIC BARS ════════════════════════════════════════════════ */
function MusicBars({ playing }) {
  return (
    <div style={{ display:"flex", gap:2, alignItems:"center", height:16 }}>
      {[1,2,3].map(i => (
        <motion.div key={i} className="bar"
          animate={playing ? { height:["4px","14px","6px","12px","4px"] } : { height:"4px" }}
          transition={{ duration:0.6, repeat:Infinity, delay:i*0.15, ease:"easeInOut" }}
          style={{ height:4 }}/>
      ))}
    </div>
  );
}

/* ══════ PARALLAX TICKER ═══════════════════════════════════════════ */
function Ticker() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const x = useTransform(scrollYProgress, [0,1], [-80,80]);
  /* [EDIT: SEO / META] Words in the scrolling banner */
  const words = ["WEDDING","ENGAGEMENT","PRE-WEDDING","BIRTHDAY","CINEMATIC","CANDID","4K VIDEO"];
  return (
    <div ref={ref} style={{ overflow:"hidden", padding:"28px 0", background:"var(--accent)" }}>
      <motion.div style={{ x, display:"flex", gap:36, whiteSpace:"nowrap" }}>
        {[...words,...words,...words].map((w,i) => (
          <span key={i} style={{ fontFamily:"var(--font-display)", fontSize:"1.42rem", letterSpacing:"0.14em", color:i%2===0?"#fff":"rgba(255,255,255,0.42)" }}>
            {w} ✦
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ROOT APP - VisionPhotoStudio_lightColorGrade
════════════════════════════════════════════════════════════════════ */
export default function VisionPhotoStudio_lightColorGrade() {
  const [loaded, setLoaded]           = useState(false);
  const [music,  setMusic]            = useState(false);
  const { scrollYProgress }           = useScroll();
  const scaleX                        = useSpring(scrollYProgress, { stiffness:100, damping:30 });

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg-page)" }}>
      <FontLoader/>
      <div className="grain"/>
      <motion.div className="scroll-bar" style={{ scaleX }}/>

      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)}/>}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}>
            <Navbar/>
            <Hero/>
            <About/>
            <Ticker/>
            <Services/>
            <StudioStrip/>
            <Portfolio/>
            <Testimonials/>
            <Contact/>
            <Footer/>

            {/*
              [EDIT: WHATSAPP]
              Change the href to your WhatsApp link:
              https://wa.me/91XXXXXXXXXX
            */}
            <motion.a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              className="wa-fab"
              initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:3, type:"spring" }}
              whileHover={{ scale:1.1 }} whileTap={{ scale:0.94 }} title="Chat on WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </motion.a>

            {/* Music toggle
            <motion.button className="music-btn"
              initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:3.2, type:"spring" }}
              onClick={() => setMusic(m => !m)} title="Toggle Background Music">
              <MusicBars playing={music}/>
            </motion.button> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
