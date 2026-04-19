function formatInput(name, email){
    let nameFormat = captalizeWords(name)
    let emailFormat = formatEmail(email)

    if (!nameFormat) return {
        "error": "true",
        "message": "nome de usuário invalido"
    }
    if (!emailFormat) return {
        "error": "true",
        "message": "formato de email inválido"
    }
    
    return {
        "name": nameFormat,
        "email": emailFormat
    }
}

function captalizeWords(string){
    if (typeof(string) !== "string"){
        return false
    }
    return string
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

function formatEmail(email){
    if (typeof(email) !== "string"){
        return false
    }

    let lowerEmail = email.toLowerCase().trim()

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerEmail)
        ? lowerEmail
        : false
}


export default formatInput