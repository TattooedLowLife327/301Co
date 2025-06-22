// Simple navigation logic
const navButtons = document.querySelectorAll('nav button');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // set active button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // show selected page
        const pageId = btn.getAttribute('data-page');
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    });
});

// Placeholder features for future implementation
console.log('Prototype loaded');
