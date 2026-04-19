export function formatTimeStamp(inputDate,language){
    const date = new Date(inputDate)
    return date.toLocaleString(language, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}