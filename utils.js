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
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        console.log(`${year}-${month}-${day}`)
    }
}