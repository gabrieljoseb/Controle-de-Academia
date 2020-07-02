const fs = require('fs')
const data = require('./data.json')

// create
exports.post = (req, res) => {

    // pega todos os objetos em array do campo "name" do input, ex: ["avatar_url", "name", "birth"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_in = Date.now()

    data.instructors.push(req.body)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Error writting file!")

        return res.redirect("/instructors")
    })
}