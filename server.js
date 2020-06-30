const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false, // permite escrita de links em html
    noCache: true
})

server.get("/", function (req, res) {

    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/52242403?s=460&u=a0abe26c4476d75ce7309e1bb32c3cd66fd8758f&v=4",
        name: "Gabriel Ribeiro",
        role: "Estudante de Engenharia de Controle e Automação no CEFET-RJ",
        description: "Estagiário na ATG (Americas Trading Group) como QA Tester, com ênfase em testes automatizados em C#",
        links: [
            { name: "GitHub", url: "https://github.com/gabrieljoseb" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/gabrieljoseribeiro" }
        ]
    }

    return res.render("about", { about }) // about: about = about
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video)
        return res.send("Video not found!")
    
    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log('server is running')
})