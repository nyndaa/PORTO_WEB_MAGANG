// ============================================================
// LOGIKA SAKELAR TEMA (PERSISTENT & INSTANT SWITCH)
// ============================================================

// 1. Injeksi Style CSS Khusus Mode Gelap (Teks Cerah & Kontras Jelas)
const darkThemeStyle = document.createElement('style');
darkThemeStyle.id = 'dark-mode-styles';
darkThemeStyle.innerHTML = `
  html.dark body {
    background-color: #201a1e !important;
    color: #fceef3 !important;
  }
  html.dark .bg-white,
  html.dark .bg-paper {
    background-color: #2c2328 !important;
    color: #fceef3 !important;
  }
  html.dark .text-muted {
    color: #e2b3c2 !important;
  }
  html.dark .text-ink {
    color: #fceef3 !important;
  }
  html.dark .border-line,
  html.dark .border-[#e6dcd9],
  html.dark .border-[#dfd4d5],
  html.dark .border-[#e9dfdf] {
    border-color: #44363f !important;
  }
  html.dark a {
    color: #f4abbf;
  }
  html.dark header nav a {
    color: #e2b3c2;
  }
  html.dark header nav a.border-rose {
    color: #f4abbf !important;
    border-color: #f4abbf !important;
  }
  html.dark button#theme-toggle {
    border-color: #5c4754 !important;
    color: #fceef3 !important;
  }
`;
document.head.appendChild(darkThemeStyle);

// 2. Update Tampilan Tombol Toggle
function updateToggleUI(isDark) {
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeToggleText = document.getElementById('theme-toggle-text');
  
  if (isDark) {
    if (themeToggleIcon) themeToggleIcon.textContent = "☀️";
    if (themeToggleText) themeToggleText.textContent = "Light";
  } else {
    if (themeToggleIcon) themeToggleIcon.textContent = "🌙";
    if (themeToggleText) themeToggleText.textContent = "Dark";
  }
}

// 3. Inisialisasi & Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('portfolio-theme') === 'dark';
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  updateToggleUI(isDark);

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const setDark = !document.documentElement.classList.contains('dark');
      
      if (setDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
      }
      
      updateToggleUI(setDark);
    });
  }
});