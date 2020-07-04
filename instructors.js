const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// show
exports.show = (req, res) => {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor)
        return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_in: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_in)
    }

    return res.render('instructors/show', { instructor })
}

// create
exports.post = (req, res) => {

    // pega todos os objetos em array do campo "name" do input, ex: ["avatar_url", "name", "birth"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth)
    const created_in = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_in
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Error writting file!")

        return res.redirect("/instructors")
    })
}

// edit
exports.edit = (req, res) => {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor)
        return res.send('Instructor not found!')

    date(foundInstructor.birth)

    return res.render('instructors/edit', { instructor: foundInstructor })
}