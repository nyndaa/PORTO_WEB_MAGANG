// Logika Sakelar Tema Terang / Gelap
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const themeToggleText = document.getElementById('theme-toggle-text');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
      document.body.style.backgroundColor = "#231f24";
      document.body.style.color = "#f7dce5";
      if (themeToggleIcon) themeToggleIcon.textContent = "☀️";
      if (themeToggleText) themeToggleText.textContent = "Light";
    } else {
      document.body.style.backgroundColor = "#fffdf9";
      document.body.style.color = "#302b31";
      if (themeToggleIcon) themeToggleIcon.textContent = "🌙";
      if (themeToggleText) themeToggleText.textContent = "Dark";
    }
  });
}