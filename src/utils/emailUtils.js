export function normalizeEmail(email){
    return email.toLowerCase().trim()
}
export function isValidEmail(email) {
    return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
