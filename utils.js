module.exports = {
    age: (timestamp) => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDif = today.getMonth() - birthDate.getMonth()
        const dayDif = today.getDate() - birthDate.getDate()

        if (monthDif <= 0 && dayDif < 0)
            age -= 1
        
        return age
    },
    date: (timestamp) => {
        const stringDate = new Date(timestamp).toISOString()
        const date = stringDate.split('T')[0]

        const day = stringDate.slice(8, 10)
        const month = stringDate.slice(5, 7)
        const year = stringDate.slice(0, 4)
        
        return {
            date,
            birthday: `${day}/${month}`
        }
    }
}