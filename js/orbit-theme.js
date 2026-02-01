(() => {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const status = document.getElementById('theme-status');
    const a11yToggle = document.getElementById('a11y-toggle');
    const a11yStatus = document.getElementById('a11y-status');
    const STORAGE_KEY = 'orbit-theme';
    const A11Y_KEY = 'orbit-accessibility';

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored || (prefersDark ? 'dark' : 'light');

    const setTheme = (mode) => {
        root.setAttribute('data-theme', mode);
        if (toggle) {
            toggle.setAttribute('aria-pressed', mode === 'dark');
        }
        if (status) {
            status.textContent = `Theme set to ${mode} mode.`;
        }
        localStorage.setItem(STORAGE_KEY, mode);
    };

    setTheme(initial);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    const setAccessibility = (enabled) => {
        root.setAttribute('data-accessibility', enabled ? 'on' : 'off');
        if (a11yToggle) {
            a11yToggle.setAttribute('aria-pressed', enabled);
        }
        if (a11yStatus) {
            a11yStatus.textContent = enabled
                ? 'Accessibility mode enabled.'
                : 'Accessibility mode disabled.';
        }
        localStorage.setItem(A11Y_KEY, enabled ? 'on' : 'off');
    };

    const a11yStored = localStorage.getItem(A11Y_KEY) === 'on';
    setAccessibility(a11yStored);

    if (a11yToggle) {
        a11yToggle.addEventListener('click', () => {
            const enabled = root.getAttribute('data-accessibility') === 'on';
            setAccessibility(!enabled);
        });
    }
})();
