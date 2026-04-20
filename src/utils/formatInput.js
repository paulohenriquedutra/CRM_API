export function formatInput(name, email){
    let nameFormat = captalizeWords(name)
    let emailFormat = formatEmail(email)
    
    return {
        "name": nameFormat,
        "email": emailFormat
    }
}

export function captalizeWords(string){
    if (typeof(string) !== "string"){
        throw new Error("nome de usuário invalido")
    }
    return string
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export function formatEmail(email){
    if (typeof(email) !== "string"){
        throw new Error("formato de email inválido")
    }

    let lowerEmail = email.toLowerCase().trim()

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerEmail)
    if (regex) return lowerEmail
    throw new Error("formato de email inválido")
}