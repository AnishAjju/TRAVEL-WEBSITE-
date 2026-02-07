document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const returnDateGroup = document.getElementById('returnDateGroup');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Toggle return date visibility based on trip type
            // Actually, multi-trip usually has a range or annual duration.
            // For this UI demo, we'll just keep it simple.
            // If "Single Trip" we need return date. If "Multi Trip" (usually annual), maybe we hide it or change label?
            // The screenshot shows "Single Trip" selected and "When do you return?" visible.
            // Let's assume Multi Trip might act differently, but for now just visual toggle active state.
            const type = tab.dataset.tab;
            console.log('Selected trip type:', type);
        });
    });

    // Tag Removal Logic
    const tagsContainer = document.querySelector('.tags-container');
    tagsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-tag')) {
            const tag = e.target.closest('.tag');
            tag.remove();
        }
    });

    // Add Traveler Logic
    const addTravelerBtn = document.querySelector('.add-traveler-btn');
    const travelerAgesContainer = document.getElementById('travelerAges');

    addTravelerBtn.addEventListener('click', () => {
        // Limit to reasonable number
        if (travelerAgesContainer.children.length < 10) {
            const newInput = document.createElement('input');
            newInput.type = 'number';
            newInput.className = 'age-input';
            newInput.placeholder = 'Age';
            newInput.min = '0';
            newInput.max = '100';
            travelerAgesContainer.appendChild(newInput);
            newInput.focus();
        }
    });

    // Form Submission
    const form = document.getElementById('quoteForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Searching for quotes...');
    });

    // Dropdown Logic
    const travelInsuranceBtn = document.getElementById('travelInsuranceBtn');
    const travelInsuranceDropdown = document.getElementById('travelInsuranceDropdown');
    const pageOverlay = document.getElementById('pageOverlay');
    const header = document.querySelector('.main-header');

    // Only proceed if elements exist
    if (!travelInsuranceBtn || !travelInsuranceDropdown || !pageOverlay || !header) return;

    const navItem = travelInsuranceBtn.parentElement;

    function toggleMenu(show) {
        if (show) {
            travelInsuranceDropdown.classList.add('show');
            pageOverlay.classList.add('show');
            header.classList.add('dark-mode');

            const chevron = travelInsuranceBtn.querySelector('.chevron');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
            travelInsuranceDropdown.classList.remove('show');
            pageOverlay.classList.remove('show');
            header.classList.remove('dark-mode');

            const chevron = travelInsuranceBtn.querySelector('.chevron');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    }

    travelInsuranceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isShown = travelInsuranceDropdown.classList.contains('show');
        toggleMenu(!isShown);
    });

    // Close when clicking overlay or outside
    document.addEventListener('click', (e) => {
        // If menu is open ...
        if (travelInsuranceDropdown.classList.contains('show')) {
            // Check if click is outside dropdown AND outside button
            if (!travelInsuranceBtn.contains(e.target) && !travelInsuranceDropdown.contains(e.target)) {
                toggleMenu(false);
            }
        }
    });
});
