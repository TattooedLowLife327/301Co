document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('nav button');
    const pages = document.querySelectorAll('main .page');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const settingsButton = document.getElementById('settings-button');

    // New dropdown elements
    const settingsDropdownContainer = document.getElementById('settings-dropdown-container'); // The main wrapper
    const generalSettingsPanel = document.getElementById('general-settings-panel'); // The first panel
    const themeSelectorPanel = document.getElementById('theme-selector-panel'); // The second panel

    const themesOption = document.getElementById('themes-option');
    const awayMessageOption = document.getElementById('away-message-option');
    const muteNotificationsOption = document.getElementById('mute-notifications-option');
    const backToSettingsOption = document.getElementById('back-to-settings');
    const themeSelector = document.getElementById('theme-selector');

    // --- Page Navigation Logic ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            button.classList.add('active');

            const targetPageId = button.dataset.page;
            document.getElementById(targetPageId).classList.add('active');

            // Hide any open dropdowns when navigating pages
            settingsDropdownContainer.classList.add('hidden'); // Close main dropdown
        });
    });

    // --- Theme Switching & Dropdown Logic ---

    // Function to apply the selected theme and update icons
    function applyTheme(themeName) {
        themeStylesheet.href = `themes/${themeName}.css`;
        localStorage.setItem('selectedTheme', themeName); // Save preference

// Determine the base path for icons
const iconBasePath = `assets/icons/`;

// Choose subfolder and extension based on theme
let iconSubFolder, iconExtension;

if (themeName === 'dark') {
  iconSubFolder = 'dark/';
  iconExtension = '.svg'; // white SVGs for dark theme
} else {
  iconSubFolder = 'color/';
  iconExtension = '.png'; // color PNGs for color theme
}

// Example of full icon path
const iconFileName = 'settings'; // just an example
const iconPath = `${iconBasePath}${iconSubFolder}${iconFileName}${iconExtension}`;

        // Map of icon elements to their base filenames (e.g., 'message', 'cogwheel')
        const iconElements = [
            { element: document.querySelector('.header-left .header-icon'), baseName: 'message' },
            { element: document.querySelector('.header-right .header-icon'), baseName: 'cogwheel' },
            { element: document.querySelector('nav button[data-page="home"] .nav-icon'), baseName: 'dashboard' },
            { element: document.querySelector('nav button[data-page="clients"] .nav-icon'), baseName: 'active_client' },
            { element: document.querySelector('nav button[data-page="forms"] .nav-icon'), baseName: 'blank_forms' },
            { element: document.querySelector('nav button[data-page="insurance"] .nav-icon'), baseName: 'forms_docs' },
            { element: document.querySelector('nav button[data-page="tools"] .nav-icon'), baseName: 'toolbag' },
            { element: document.querySelector('nav button[data-page="comms"] .nav-icon'), baseName: 'gmail' },
            { element: document.getElementById('scanner-float').querySelector('.float-icon-img'), baseName: 'scanner' },
            { element: document.getElementById('new-client-float').querySelector('.float-icon-img'), baseName: 'create_new' },
        ];

        // Loop through and update each icon's source
        iconElements.forEach(item => {
            if (item.element) {
                item.element.src = `${iconBasePath}${iconSubFolder}${item.baseName}${iconExtension}`;
            }
        });

        // Main logo is assumed to be static 'assets/largelogo.png'
    }

    // Initialize theme on load
    const savedTheme = localStorage.getItem('selectedTheme') || 'color'; // Default to 'color'
    applyTheme(savedTheme);
    themeSelector.value = savedTheme; // Set the theme selector dropdown to the saved theme

    // Toggle Main Settings Dropdown visibility
    settingsButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent document click listener from immediately hiding it

        // Always show the general settings panel first when opening the dropdown
        generalSettingsPanel.classList.remove('hidden');
        themeSelectorPanel.classList.add('hidden'); // Ensure theme panel is hidden

        settingsDropdownContainer.classList.toggle('hidden');
    });

    // Show Theme Selector Panel when "Themes" option is clicked
    themesOption.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        event.stopPropagation(); // Prevent dropdown from closing immediately
        generalSettingsPanel.classList.add('hidden'); // Hide general settings
        themeSelectorPanel.classList.remove('hidden'); // Show theme selector
    });

    // Handle "Away Message" click
    awayMessageOption.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        alert('Away Message functionality would go here!'); // Placeholder
        settingsDropdownContainer.classList.add('hidden'); // Close dropdown after action
    });

    // Handle "Mute Notifications" click
    muteNotificationsOption.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        alert('Mute Notifications functionality would go here!'); // Placeholder
        settingsDropdownContainer.classList.add('hidden'); // Close dropdown after action
    });

    // Go back to General Settings from Theme Selector
    backToSettingsOption.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        themeSelectorPanel.classList.add('hidden'); // Hide theme selector
        generalSettingsPanel.classList.remove('hidden'); // Show general settings
    });

    // Handle theme selection change
    themeSelector.addEventListener('change', (event) => {
        applyTheme(event.target.value);
        // Optionally hide the entire dropdown after selection
        settingsDropdownContainer.classList.add('hidden');
    });

    // Hide dropdown if clicking outside of it
    document.addEventListener('click', (event) => {
        if (!settingsButton.contains(event.target) && !settingsDropdownContainer.contains(event.target)) {
            settingsDropdownContainer.classList.add('hidden');
        }
    });

    // --- Initial page load ---
    // Make sure the home page is active on initial load
    document.getElementById('home').classList.add('active');
});
