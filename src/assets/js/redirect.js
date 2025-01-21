// Determine the user's language
const userLang = navigator.language || navigator.userLanguage
const preferredLang =
    userLang.startsWith('uk') || userLang.startsWith('ru') ? 'uk' : 'en'

// Get the current path
const currentPath = window.location.pathname

// Check if the language is already included in the path
if (!currentPath.startsWith(`/${preferredLang}`)) {
    // Remove an existing language prefix (if any)
    const pathWithoutLang = currentPath.replace(/^\/(en|uk)/, '')
    // Redirect to the path with the correct language prefix
    window.location.href = `/${preferredLang}${pathWithoutLang}`
}
