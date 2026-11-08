
/* ============================================================
   PORTFOLIO - SHARED COMPONENTS & THEME MANAGEMENT
   ============================================================ */


/* ============================================================
   1. LOAD SHARED COMPONENTS
   ============================================================ */

/**
 * Memuat komponen HTML dari folder components.
 * Menggunakan URL relatif agar kompatibel dengan GitHub Pages.
 */
async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);

    if (!container) {
        console.warn(`Container #${elementId} tidak ditemukan.`);
        return;
    }

    // Membentuk URL berdasarkan lokasi halaman saat ini.
    const componentURL = new URL(filePath, window.location.href);

    try {
        const response = await fetch(componentURL);

        if (!response.ok) {
            throw new Error(
                `Gagal memuat ${componentURL.href}. Status: ${response.status}`
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

/**
 * Menambahkan aturan CSS khusus untuk dark mode.
 * Style hanya aktif ketika elemen html memiliki class "dark".
 */
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

    /* Tombol pergantian tema */
    html.dark button#theme-toggle {
        border-color: #5c4754 !important;
        color: #fceef3 !important;
    }
`;

// Pastikan style tidak ditambahkan lebih dari sekali.
if (!document.getElementById("dark-mode-styles")) {
    document.head.appendChild(darkThemeStyle);
}


/* ============================================================
   4. THEME TOGGLE UI
   ============================================================ */

/**
 * Memperbarui ikon dan teks tombol tema.
 *
 * @param {boolean} isDark - Status tema saat ini.
 */
function updateToggleUI(isDark) {
    const icon = document.getElementById("theme-toggle-icon");
    const text = document.getElementById("theme-toggle-text");

    if (icon) {
        icon.textContent = isDark ? "☀️" : "🌙";
    }

    if (text) {
        text.textContent = isDark ? "Light" : "Dark";
    }
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
 * Mengaktifkan pergantian tema ketika tombol ditekan.
 * Preferensi tema akan disimpan ke localStorage.
 */
function initializeThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (!themeToggleBtn) return;

    // Mencegah event listener terpasang lebih dari sekali.
    if (themeToggleBtn.dataset.initialized === "true") return;

    themeToggleBtn.dataset.initialized = "true";

    themeToggleBtn.addEventListener("click", () => {
        // Periksa tema yang sedang aktif.
        const isDark =
            !document.documentElement.classList.contains("dark");

        // Terapkan tema yang dipilih.
        document.documentElement.classList.toggle("dark", isDark);

        // Simpan preferensi tema.
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        // Perbarui ikon dan teks tombol.
        updateToggleUI(isDark);
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
   8. INITIALIZE PORTFOLIO
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
