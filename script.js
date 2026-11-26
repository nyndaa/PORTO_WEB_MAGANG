/* ============================================================
   PORTFOLIO - SHARED COMPONENTS & THEME MANAGEMENT
   ============================================================ */



/* ============================================================
   1. LOAD SHARED COMPONENTS
   ============================================================ */

/**
 * Memuat komponen HTML dari folder components.
 * Path disesuaikan dengan GitHub Pages project repository.
 */
async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);

    if (!container) {
        console.warn(`Container #${elementId} tidak ditemukan.`);
        return;
    }

    try {
        // Base URL khusus repository GitHub Pages.
        const baseURL = "/PORTO_WEB_MAGANG/";

        const componentURL = `${baseURL}${filePath}`;

        const response = await fetch(componentURL);

        if (!response.ok) {
            throw new Error(
                `Gagal memuat ${componentURL}. Status: ${response.status}`
            );
        }

        container.innerHTML = await response.text();

    } catch (error) {
        console.error("Component loading error:", error);

        container.innerHTML = `
            <p class="py-4 text-sm text-muted">
                Komponen tidak dapat dimuat.
            </p>
        `;
    }
}


/* ============================================================
   2. NAVIGATION ACTIVE STATE
   ============================================================ */

/**
 * Memberikan penanda pada menu sesuai halaman yang sedang dibuka.
 * Menu aktif akan memiliki warna rose dan border bawah.
 */
function setActiveNavigation() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const isActive = link.dataset.page === currentPage;

        // Perbarui tampilan menu.
        link.classList.toggle("border-rose", isActive);
        link.classList.toggle("text-rose", isActive);

        link.classList.toggle("border-transparent", !isActive);
        link.classList.toggle("text-muted", !isActive);

        // Tambahkan atribut aksesibilitas pada menu aktif.
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}


/* ============================================================
3. DARK MODE STYLE
   ============================================================ */

const darkThemeStyle = document.createElement("style");
darkThemeStyle.id = "dark-mode-styles";

darkThemeStyle.textContent = `
    /* Background dan teks utama */
    html.dark body {
        background-color: #201a1e !important;
        color: #fceef3 !important;
    }

    /* Background elemen */
    html.dark .bg-white,
    html.dark .bg-paper {
        background-color: #2c2328 !important;
        color: #fceef3 !important;
    }

    /* Warna teks */
    html.dark .text-muted {
        color: #e2b3c2 !important;
    }

    html.dark .text-ink {
        color: #fceef3 !important;
    }

    /* Warna border */
    html.dark .border-line,
    html.dark .border-\\[\\#e6dcd9\\],
    html.dark .border-\\[\\#dfd4d5\\],
    html.dark .border-\\[\\#e9dfdf\\] {
        border-color: #44363f !important;
    }

    /* Warna link */
    html.dark a {
        color: #f4abbf;
    }

    /* Navigasi */
    html.dark header nav a {
        color: #e2b3c2;
    }

    html.dark header nav a.border-rose {
        color: #f4abbf !important;
        border-color: #f4abbf !important;
    }

  /* Navbar sticky saat dark mode */
    html.dark #navbar-container {
        background-color: rgba(32, 26, 30, 0.85) !important;
        border-color: #44363f !important;
    }

    /* Container switch dua bilah saat dark mode */
    html.dark #theme-toggle {
        background-color: #2c2328 !important;
        border-color: #5c4754 !important;
    }
`;

if (!document.getElementById("dark-mode-styles")) {
    document.head.appendChild(darkThemeStyle);
}

/* ============================================================
4. THEME TOGGLE UI
   ============================================================ */

/**
 * Memperbarui status aktif pada bilah Light (kiri) dan Dark (kanan).
 *
 * @param {boolean} isDark - Status tema saat ini.
 */
function updateToggleUI(isDark) {
    const options = document.querySelectorAll(".theme-option");
    const activeTheme = isDark ? "dark" : "light";

    options.forEach(btn => {
        const isSelected = btn.dataset.themeValue === activeTheme;
        btn.setAttribute("aria-pressed", String(isSelected));

        if (isSelected) {
            // Tampilan bilah yang sedang aktif
            btn.classList.add(
                isDark ? "bg-[#5c4754]" : "bg-pink",
                isDark ? "text-[#fceef3]" : "text-[#573a46]",
                "shadow-sm"
            );
            btn.classList.remove("text-muted", "opacity-70");
        } else {
            // Tampilan bilah yang tidak aktif
            btn.classList.remove(
                "bg-pink",
                "bg-[#5c4754]",
                "text-[#573a46]",
                "text-[#fceef3]",
                "shadow-sm"
            );
            btn.classList.add("text-muted", "opacity-70");
        }
    });
}


/* ============================================================
   5. INITIALIZE THEME
   ============================================================ */

/**
 * Mengambil preferensi tema dari localStorage.
 * Tema yang tersimpan akan diterapkan ketika halaman dibuka.
 */
function initializeTheme() {
    const isDark =
        localStorage.getItem("portfolio-theme") === "dark";

    // Terapkan tema pada elemen html.
    document.documentElement.classList.toggle("dark", isDark);

    // Perbarui tampilan tombol tema.
    updateToggleUI(isDark);
}


/* ============================================================
6. THEME EVENT LISTENER
   ============================================================ */

/**
 * Mengaktifkan pergantian tema saat bilah kiri (Light) atau kanan (Dark) diklik.
 */
function initializeThemeToggle() {
    const options = document.querySelectorAll(".theme-option");

    if (!options.length) return;

    options.forEach(btn => {
        if (btn.dataset.initialized === "true") return;
        btn.dataset.initialized = "true";

        btn.addEventListener("click", () => {
            const isDark = btn.dataset.themeValue === "dark";

            // Terapkan tema yang dipilih
            document.documentElement.classList.toggle("dark", isDark);

            // Simpan preferensi tema ke localStorage
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

            // Perbarui tampilan aktif kedua bilah
            updateToggleUI(isDark);
        });
    });
}


/* ============================================================
   7. PROJECT FILTER
   ============================================================ */

/**
 * Menampilkan project berdasarkan kategori yang dipilih.
 * Kategori mengikuti atribut data-category pada setiap project card.
 *
 * Contoh:
 * data-filter="web"
 * data-category="web"
 */
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll("[data-category]");

    // Hentikan jika halaman tidak memiliki filter project.
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            // Perbarui tampilan tombol filter.
            filterButtons.forEach(item => {
                const isActive = item === button;

                item.setAttribute("aria-pressed", String(isActive));

                item.classList.toggle("border-pink", isActive);
                item.classList.toggle("bg-pink", isActive);
                item.classList.toggle("text-[#70485a]", isActive);

                item.classList.toggle("border-[#e9dfdf]", !isActive);
                item.classList.toggle("text-[#786c73]", !isActive);
            });

            // Tampilkan project sesuai kategori yang dipilih.
            projectCards.forEach(card => {
                const matches =
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter;

                card.hidden = !matches;
            });
        });
    });
}

/* ============================================================
8. WORK APPROACH INTERACTIVE PANEL
   ============================================================ */

/**
 * Mengatur panel interaktif pada bagian Engineering Workflow (halaman About).
 * Memperbarui status aktif tab di sebelah kiri dan konten detail di sebelah kanan.
 */
function initializeWorkApproach() {
    const tabs = document.querySelectorAll(".approach-tab");
    const badgeEl = document.getElementById("approach-badge");
    const metricEl = document.getElementById("approach-metric");
    const titleEl = document.getElementById("approach-title");
    const descEl = document.getElementById("approach-desc");
    const checklistEl = document.getElementById("approach-checklist");
    const tagsEl = document.getElementById("approach-tags");

    // Hentikan jika halaman tidak memiliki panel Work Approach.
    if (!tabs.length || !titleEl) return;

    const approachData = [
        {
            badge: "01 / Interface Standard",
            metric: "Mobile-First & WCAG Ready",
            title: "Responsive UI Engineering",
            desc: "Every interface starts with clear visual hierarchy and fluid breakpoints so users get a consistent experience whether browsing on a smartphone or a wide desktop monitor.",
            checklist: [
                "Fluid grid and flexbox layouts tested across standard mobile, tablet, and desktop breakpoints.",
                "Consistent light and dark theme parity with readable typography and color contrast.",
                "Interactive feedback states for buttons, forms, navigation menus, and loading indicators."
            ],
            tags: ["Figma", "HTML5", "Tailwind CSS", "Responsive CSS"]
        },
        {
            badge: "02 / Code Architecture",
            metric: "Clean & Scalable Structure",
            title: "Modular & Maintainable Code",
            desc: "Structuring components, stylesheets, and client-side state logically so features can be extended, debugged, and maintained cleanly across collaborative repositories.",
            checklist: [
                "Semantic HTML5 markup paired with predictable, reusable UI component patterns.",
                "Decoupled JavaScript modules and clean event handling without fragile DOM dependencies.",
                "Consistent naming conventions, Git version control hygiene, and clear documentation."
            ],
            tags: ["JavaScript (ES6+)", "Component Architecture", "Git & GitHub", "Semantic HTML"]
        },
        {
            badge: "03 / Full-Stack Delivery",
            metric: "API & Data Reliability",
            title: "End-to-End System Integration",
            desc: "Bridging user interfaces with backend services, authentication flows, and structured databases to deliver complete, production-ready web applications.",
            checklist: [
                "Asynchronous RESTful API integration with clear loading, empty, and error state handling.",
                "Structured database schemas and secure CRUD workflows across relational and NoSQL stores.",
                "Environment configuration, cloud asset storage, and deployment verification."
            ],
            tags: ["REST API", "Laravel / Node.js", "MySQL & MongoDB", "S3 Object Storage"]
        }
    ];

    const activeTabClasses = ["border-rose", "bg-white", "shadow-soft", "dark:border-rose", "dark:bg-[#221c20]"];
    const inactiveTabClasses = ["border-line", "bg-white/70", "hover:border-pink", "hover:bg-white", "dark:border-[#2e262b]", "dark:bg-[#221c20]/60", "dark:hover:border-[#47353e]", "dark:hover:bg-[#221c20]"];

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const index = Number(tab.dataset.approach);
            const data = approachData[index];
            if (!data) return;

            // Perbarui status aktif dan tampilan tab kiri.
            tabs.forEach((t, i) => {
                const numBadge = t.querySelector("span");
                const arrow = t.querySelector("h3 + span");
                const isSelected = i === index;

                if (isSelected) {
                    t.classList.remove(...inactiveTabClasses);
                    t.classList.add(...activeTabClasses);
                    numBadge.classList.remove("bg-paper", "text-muted", "dark:bg-[#191518]", "dark:text-[#b5a8b0]");
                    numBadge.classList.add("bg-rose", "text-white");
                    arrow.classList.remove("text-muted", "opacity-0");
                    arrow.classList.add("text-rose", "opacity-100");
                } else {
                    t.classList.remove(...activeTabClasses);
                    t.classList.add(...inactiveTabClasses);
                    numBadge.classList.remove("bg-rose", "text-white");
                    numBadge.classList.add("bg-paper", "text-muted", "dark:bg-[#191518]", "dark:text-[#b5a8b0]");
                    arrow.classList.remove("text-rose", "opacity-100");
                    arrow.classList.add("text-muted", "opacity-0");
                }
            });

            // Perbarui konten panel kanan.
            badgeEl.textContent = data.badge;
            metricEl.textContent = data.metric;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;

            checklistEl.innerHTML = data.checklist
                .map(
                    item => `
                    <li class="flex items-start gap-2.5">
                        <span class="mt-0.5 text-rose">✓</span>
                        <span>${item}</span>
                    </li>`
                )
                .join("");

            tagsEl.innerHTML = data.tags
                .map(
                    tag => `
                    <span class="rounded-full border border-line bg-paper px-3 py-1 text-[11px] font-medium text-ink dark:border-[#362c32] dark:bg-[#191518] dark:text-[#f5eff2]">${tag}</span>`
                )
                .join("");
        });
    });
}


/* ============================================================
9. INITIALIZE PORTFOLIO
   ============================================================ */

/**
 * Menjalankan seluruh fungsi setelah halaman selesai dimuat.
 * Navbar dan footer dimuat terlebih dahulu sebelum inisialisasi
 * navigasi dan tombol tema dilakukan.
 */
document.addEventListener("DOMContentLoaded", async () => {

    // Muat Navbar dan Footer secara bersamaan.
    await Promise.all([
        loadComponent("navbar-container", "components/navbar.html"),
        loadComponent("footer-container", "components/footer.html")
    ]);

    // Inisialisasi navigasi setelah navbar tersedia.
    setActiveNavigation();

    // Inisialisasi tema dan tombol pergantian tema.
    initializeTheme();
    initializeThemeToggle();

    // Inisialisasi filter project.
    initializeProjectFilter();

    // Inisialisasi panel interaktif Work Approach.
    initializeWorkApproach();

});


// ==========================================
// INTRO: PRESSED CHERRY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  const curtain = document.getElementById("intro-curtain");
  if (!overlay) return;

  const cleanUp = () => {
    overlay.remove();
    if (curtain) curtain.remove();
    document.body.style.overflow = "";
  };

  // Sudah tampil di sesi ini → langsung buang tanpa animasi.
  if (document.documentElement.classList.contains("intro-seen")) {
    cleanUp();
    return;
  }

  const countEl = document.getElementById("intro-count");
  const lineEl = document.getElementById("intro-line");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.style.overflow = "hidden";

  // Jalankan animasi masuk di frame berikutnya agar transisi CSS terpicu.
  requestAnimationFrame(() => overlay.classList.add("is-ready"));

  const duration = reduceMotion ? 600 : 2200;
  const startDelay = reduceMotion ? 0 : 450; // beri waktu ceri mulai tergambar
  let startTime = null;

  // Tunggu font siap (maks 2,5 detik) supaya nama tidak berganti font saat tampil.
  const fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(resolve => setTimeout(resolve, 2500))
  ]);

  function tick(now) {
    if (startTime === null) startTime = now + startDelay;

    const raw = Math.min(Math.max((now - startTime) / duration, 0), 1);
    // easeInOutCubic: pelan di awal, cepat di tengah, lembut di akhir
    const eased = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;

    if (countEl) countEl.textContent = String(Math.round(eased * 100)).padStart(3, "0");
    if (lineEl) lineEl.style.strokeDashoffset = String(1 - eased);

    if (raw < 1) requestAnimationFrame(tick);
    else fontsReady.then(leave);
  }

  function leave() {
    try { sessionStorage.setItem("portfolio-intro-seen", "1"); } catch (e) {}

    // 1) Konten tengah naik & memudar
    overlay.classList.add("is-out");

    // 2) Lembar kertas terangkat, disusul tirai pink
    setTimeout(() => {
      overlay.classList.add("is-leaving");
      if (curtain) curtain.classList.add("is-leaving");
      document.body.style.overflow = "";
    }, reduceMotion ? 0 : 450);

    // 3) Bersihkan dari DOM
    setTimeout(cleanUp, reduceMotion ? 500 : 1700);
  }

  requestAnimationFrame(tick);
});

/* ============================================================
10. PAGE TRANSITION (CHERRY SHEET)
   ============================================================ */

/**
 * Transisi antar halaman: lembar pink + kertas naik menutup layar
 * sambil menampilkan nama halaman tujuan, lalu terangkat di halaman baru.
 * Berlaku otomatis untuk semua link internal ke file .html.
 * Tambahkan atribut data-no-transition pada link untuk mengecualikannya.
 */
(function initializePageTransition() {
    const html = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LEAVE_DURATION = reduceMotion ? 250 : 720;

    const PAGE_LABELS = {
        "": "Home",
        "index.html": "Home",
        "about.html": "About",
        "projects.html": "Projects",
        "contact.html": "Contact"
    };

    /* ---------- Style transisi ---------- */
    const style = document.createElement("style");
    style.id = "page-transition-styles";
    style.textContent = `
        #page-transition {
            --pt-ease: cubic-bezier(.76, 0, .24, 1);
            --pt-soft: cubic-bezier(.22, 1, .36, 1);
            position: fixed;
            inset: 0;
            z-index: 10000;
            pointer-events: none;
            overflow: hidden;
        }
        #page-transition.is-active { pointer-events: auto; }

        .pt-layer {
            position: absolute;
            inset: 0;
            transform: translateY(100%);
            border-radius: 50% 50% 0 0 / 12vh 12vh 0 0;
            transition: transform .65s var(--pt-ease), border-radius .65s var(--pt-ease);
            will-change: transform;
        }
        .pt-pink  { background: #f7dce5; }
        .pt-paper {
            display: grid;
            place-items: center;
            background: #fffdf9;
            transition-delay: .08s;
        }
        html.dark .pt-pink  { background: #3a2a32; }
        html.dark .pt-paper { background: #201a1e; }

        .pt-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            opacity: 0;
            transform: translateY(14px);
            transition: opacity .4s ease, transform .6s var(--pt-soft);
        }
        .pt-label svg { width: 38px; height: 38px; margin-bottom: 14px; }
        .pt-eyebrow {
            font-family: "DM Sans", Arial, sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: .32em;
            text-transform: uppercase;
            color: #817780;
        }
        .pt-title {
            margin-top: 6px;
            font-family: "Playfair Display", Georgia, serif;
            font-size: clamp(2.4rem, 8vw, 4rem);
            font-weight: 500;
            line-height: 1.05;
            letter-spacing: -.02em;
            color: #302b31;
        }
        .pt-title em { color: #b96782; }
        html.dark .pt-eyebrow { color: #c9a3b1; }
        html.dark .pt-title { color: #fceef3; }
        html.dark .pt-title em { color: #f4abbf; }

        /* Menutup layar (halaman lama) */
        #page-transition.is-covering .pt-layer { transform: none; border-radius: 0; }
        #page-transition.is-covering .pt-label { opacity: 1; transform: none; transition-delay: .4s; }

        /* Langsung tertutup (awal halaman baru) */
        #page-transition.is-covered .pt-layer,
        #page-transition.is-covered .pt-label { transform: none; border-radius: 0; opacity: 1; transition: none; }

        /* Membuka layar (halaman baru) */
        #page-transition.is-revealing .pt-layer {
            transform: translateY(-100%);
            border-radius: 0 0 50% 50% / 0 0 12vh 12vh;
        }
        #page-transition.is-revealing .pt-paper { transition-delay: .12s; }
        #page-transition.is-revealing .pt-pink  { transition-delay: .22s; }
        #page-transition.is-revealing .pt-label {
            opacity: 0;
            transform: translateY(-14px);
            transition-duration: .3s;
        }

        @media (prefers-reduced-motion: reduce) {
            .pt-layer, .pt-label { transform: none !important; border-radius: 0 !important; }
            .pt-layer { opacity: 0; transition: opacity .25s ease !important; }
            #page-transition.is-covering .pt-layer,
            #page-transition.is-covered .pt-layer { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    /* ---------- Elemen transisi ---------- */
    function buildTransition(label, stateClass) {
        const old = document.getElementById("page-transition");
        if (old) old.remove();

        const el = document.createElement("div");
        el.id = "page-transition";
        el.setAttribute("aria-hidden", "true");
        if (stateClass) el.className = stateClass;

        el.innerHTML = `
            <div class="pt-layer pt-pink"></div>
            <div class="pt-layer pt-paper">
                <div class="pt-label">
                    <svg viewBox="0 0 64 64">
                        <path d="M33 12 C 39 5, 48 5, 53 9 C 47 14, 39 15, 33 12 Z" fill="#cfdcc4"/>
                        <path d="M33 12 C 30 22, 25 32, 21 41 M33 12 C 35 22, 40 30, 44 39" fill="none" stroke="#b96782" stroke-width="1.8" stroke-linecap="round"/>
                        <circle cx="20" cy="48" r="8.5" fill="#e79ab3"/>
                        <circle cx="45" cy="46" r="8.5" fill="#e79ab3"/>
                        <ellipse cx="16.8" cy="44.8" rx="2.3" ry="1.4" fill="#fff" fill-opacity=".8"/>
                        <ellipse cx="41.8" cy="42.8" rx="2.3" ry="1.4" fill="#fff" fill-opacity=".8"/>
                    </svg>
                    <span class="pt-eyebrow">Nadia &mdash; Portfolio</span>
                    <span class="pt-title"></span>
                </div>
            </div>
        `;

        // Isi judul dengan textContent agar aman dari HTML.
        const title = el.querySelector(".pt-title");
        title.textContent = label;
        const dot = document.createElement("em");
        dot.textContent = ".";
        title.appendChild(dot);

        document.body.appendChild(el);
        return el;
    }

    /* ---------- Masuk: buka layar di halaman baru ---------- */
    let incomingLabel = null;
    try {
        incomingLabel = sessionStorage.getItem("pt-label");
        sessionStorage.removeItem("pt-label");
    } catch (e) {}

    if (incomingLabel) {
        const intro = document.getElementById("intro-overlay");
        const introWillPlay = intro && !html.classList.contains("intro-seen");

        if (introWillPlay) {
            // Intro di beranda sudah menutup layar, jadi transisi tidak perlu.
            html.classList.remove("pt-entering");
        } else {
            const el = buildTransition(incomingLabel, "is-covered is-active");
            html.classList.remove("pt-entering");

            // Tunggu navbar termuat (maks 700ms) supaya tidak muncul tiba-tiba.
            const navbarReady = new Promise(resolve => {
                const nav = document.getElementById("navbar-container");
                if (!nav || nav.children.length) return resolve();
                new MutationObserver((_, obs) => { obs.disconnect(); resolve(); })
                    .observe(nav, { childList: true });
            });

            Promise.race([navbarReady, new Promise(r => setTimeout(r, 700))]).then(() => {
                requestAnimationFrame(() => {
                    el.classList.remove("is-covered", "is-active");
                    void el.offsetWidth; // paksa reflow agar transisi berjalan
                    el.classList.add("is-revealing");
                    setTimeout(() => el.remove(), 1000);
                });
            });
        }
    }

    /* ---------- Keluar: tutup layar sebelum pindah halaman ---------- */
    let isNavigating = false;

    document.addEventListener("click", event => {
        if (isNavigating || event.defaultPrevented) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest("a[href]");
        if (!link || link.hasAttribute("download") || link.hasAttribute("data-no-transition")) return;
        if (link.target && link.target !== "_self") return;

        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin) return;

        // Hanya untuk halaman HTML (bukan PDF, gambar, dsb).
        const file = url.pathname.split("/").pop();
        if (file && !file.endsWith(".html")) return;

        // Abaikan link ke halaman yang sama atau anchor (#).
        if (url.pathname === location.pathname && url.search === location.search) return;

        event.preventDefault();
        isNavigating = true;

        const label = PAGE_LABELS[file] || link.textContent.trim() || "Nadia";
        try { sessionStorage.setItem("pt-label", label); } catch (e) {}

        const el = buildTransition(label, "is-active");
        void el.offsetWidth;
        el.classList.add("is-covering");

        setTimeout(() => { window.location.href = url.href; }, LEAVE_DURATION);
    });

    /* ---------- Tombol Back browser (halaman dari cache) ---------- */
    window.addEventListener("pageshow", event => {
        if (!event.persisted) return;
        isNavigating = false;
        html.classList.remove("pt-entering");
        const el = document.getElementById("page-transition");
        if (el) el.remove();
    });
})();