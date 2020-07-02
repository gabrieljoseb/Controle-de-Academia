const express = require('express')
const routes = express.Router()

routes.get("/", function (req, res) {
    return res.redirect('/instructors')
})

routes.get("/instructors", function (req, res) {
    return res.render('instructors/index')
})

routes.get("/instructors/create", (req, res) => {
    return res.render('instructors/create')
})

routes.post("/instructors", (req, res) => {

    // pega todos os objetos em array do campo "name" do input, ex: ["avatar_url", "name", "birth"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    return res.send(req.body)
})

routes.get("/members", function (req, res) {
    return res.send('members')
})

module.exports = routes