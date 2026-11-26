
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

/* ============================================================
   10. INITIALIZE PORTFOLIO
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

});

// ==========================================
// INTERACTIVE ARCHITECTURAL INTRO REVEAL (FAST)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  const spotlight = document.getElementById("intro-spotlight");
  const card = document.getElementById("intro-card");
  const sub = document.getElementById("intro-sub");
  const nameEl = document.getElementById("intro-name");
  const role = document.getElementById("intro-role");
  const line = document.getElementById("intro-line");
  const percentEl = document.getElementById("intro-percent");
  const skipBtn = document.getElementById("intro-skip");

  if (!overlay) return;

  document.body.style.overflow = "hidden";
  let isClosing = false;

  const closeIntro = (instant = false) => {
    if (isClosing) return;
    isClosing = true;

    if (instant) {
      overlay.style.transitionDuration = "300ms";
    }

    overlay.classList.add("opacity-0", "scale-[1.02]", "pointer-events-none");
    document.body.style.overflow = "";
    setTimeout(() => overlay.remove(), instant ? 320 : 650);
  };

  // 1. Animasi teks muncul langsung
  requestAnimationFrame(() => {
    if (sub) sub.classList.remove("translate-y-full");
    if (nameEl) nameEl.classList.remove("translate-y-full");
    if (role) role.classList.remove("translate-y-full");
  });

  // 2. Efek interaktif mouse
  overlay.addEventListener("mousemove", (e) => {
    if (spotlight) {
      spotlight.style.background = `radial-gradient(450px circle at ${e.clientX}px ${e.clientY}px, rgba(247, 220, 229, 0.65), transparent 70%)`;
    }
    if (card) {
      const moveX = (e.clientX - window.innerWidth / 2) * -0.015;
      const moveY = (e.clientY - window.innerHeight / 2) * -0.015;
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  // 3. Progress bar cepat & mulus (selesai dalam ~900ms)
  let progress = 0;
  const timer = setInterval(() => {
    progress += 8; // Naik cepat & konsisten
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(() => closeIntro(false), 180);
    }
    if (line) line.style.width = `${progress}%`;
    if (percentEl) percentEl.textContent = `${progress}%`;
  }, 55);

  // 4. Klik tombol -> langsung kebuka dalam 0.3 detik
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      clearInterval(timer);
      if (line) line.style.width = "100%";
      if (percentEl) percentEl.textContent = "100%";
      closeIntro(true);
    });
  }
});