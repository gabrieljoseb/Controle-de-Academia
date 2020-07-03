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
    }
}