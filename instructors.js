const fs = require('fs')

// create
exports.post = (req, res) => {

    // pega todos os objetos em array do campo "name" do input, ex: ["avatar_url", "name", "birth"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
        if (err) return res.send("Error writting file!")

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}