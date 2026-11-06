// Shared light/dark theme state.
// The pre-paint bootstrap in index.html sets `data-theme` on <html> from
// localStorage ("ifak-theme") or the OS preference; this module mirrors that
// in Vue state so the navbar toggle can flip it.
import { ref } from 'vue'

const STORAGE_KEY = 'ifak-theme'

function initialTheme() {
  if (typeof document !== 'undefined') {
    const t = document.documentElement.getAttribute('data-theme')
    if (t === 'dark' || t === 'light') return t
  }
  return 'light'
}

const theme = ref(initialTheme())

export function useTheme() {
  const setTheme = (value) => {
    if (value !== 'dark' && value !== 'light') return
    theme.value = value
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', value)
    }
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch (e) { /* private mode — theme still applies for the session */ }
  }
  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')
  return { theme, toggle, setTheme }
}
