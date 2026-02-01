(() => {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const status = document.getElementById('theme-status');
    const STORAGE_KEY = 'orbit-theme';

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored || (prefersDark ? 'dark' : 'light');

    const setTheme = (mode) => {
        root.setAttribute('data-theme', mode);
        if (toggle) {
            toggle.setAttribute('aria-pressed', mode === 'dark');
            toggle.textContent = mode === 'dark' ? 'Day' : 'Night';
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
})();
