import useDarkMode from "../../hooks/useDarkMode";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-forest hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default ThemeToggle;
