document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION TABS ---
  const navButtons = document.querySelectorAll('nav button');
  const pages     = document.querySelectorAll('main .page');
  const settingsDropdownContainer = document.getElementById('settings-dropdown-container');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // deactivate all
      navButtons.forEach(b => b.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active')); 
      // activate this
      button.classList.add('active');
      document.getElementById(button.dataset.page).classList.add('active');
      // hide settings if open
      settingsDropdownContainer.classList.add('hidden');
    });
  });

  // --- SETTINGS & THEME ---
  const settingsButton       = document.getElementById('settings-button');
  const generalSettingsPanel = document.getElementById('general-settings-panel');
  const themeSelectorPanel   = document.getElementById('theme-selector-panel');
  const themesOption         = document.getElementById('themes-option');
  const backToSettings       = document.getElementById('back-to-settings');
  const themeSelector        = document.getElementById('theme-selector');
  const themeStylesheet      = document.getElementById('theme-stylesheet');

  function applyTheme(name) {
    themeStylesheet.href = `themes/${name}.css`;
    localStorage.setItem('selectedTheme', name);
  }

  // initialize theme
  const saved = localStorage.getItem('selectedTheme') || 'color';
  applyTheme(saved);
  themeSelector.value = saved;

  settingsButton.addEventListener('click', e => {
    e.stopPropagation();
    generalSettingsPanel.classList.remove('hidden');
    themeSelectorPanel.classList.add('hidden');
    settingsDropdownContainer.classList.toggle('hidden');
  });
  themesOption.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    generalSettingsPanel.classList.add('hidden');
    themeSelectorPanel.classList.remove('hidden');
  });
  backToSettings.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    themeSelectorPanel.classList.add('hidden');
    generalSettingsPanel.classList.remove('hidden');
  });
  themeSelector.addEventListener('change', e => {
    applyTheme(e.target.value);
    settingsDropdownContainer.classList.add('hidden');
  });
  document.addEventListener('click', e => {
    if (!settingsButton.contains(e.target) && !settingsDropdownContainer.contains(e.target)) {
      settingsDropdownContainer.classList.add('hidden');
    }
  });

  // --- MEASUREMENT CONVERTER ---
  const inputValue = document.getElementById('inputValue');
  const fromUnit   = document.getElementById('fromUnit');
  const toUnit     = document.getElementById('toUnit');
  const resultEl   = document.getElementById('result');

  function convert() {
    const rates = { in:1, ft:12, cm:0.393701, m:39.3701 };
    const v = parseFloat(inputValue.value);
    if (isNaN(v)) {
      resultEl.textContent = 'Converted value will appear here';
      return;
    }
    const inches = v * rates[fromUnit.value];
    const out    = inches / rates[toUnit.value];
    resultEl.textContent = `${out.toFixed(4)} ${toUnit.options[toUnit.selectedIndex].text}`;
  }
  inputValue.addEventListener('input', convert);
  fromUnit.addEventListener('change', convert);
  toUnit.addEventListener('change', convert);
});