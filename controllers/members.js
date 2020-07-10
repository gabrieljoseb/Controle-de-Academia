const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, date } = require('../utils')

exports.index = (req, res) => {
    return res.render("members/index", { members: data.members })
}

exports.create = (req, res) => {
    res.render('members/create')
}

exports.post = (req, res) => {

    // pega todos os objetos em array do campo "name" do input, ex: ["avatar_url", "name", "birth"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('please, fill all fields')
    }

    birth = Date.parse(req.body.birth)

    let id = 1;
    const lastMember = data.members[data.members.length - 1]

    if (lastMember) id = lastMember.id + 1

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Error writting file!")

        return res.redirect(`/members/${id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember)
        return res.send('Member not found!')

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render('members/show', { member })
}

exports.edit = (req, res) => {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember)
        return res.send('Member not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', { member })
}

exports.put = (req, res) => {
    const { id } = req.body

    const foundMember = data.members.find((member) => id == member.id)

    if (!foundMember) return res.send('member not found!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[id - 1] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error!')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredmembers = data.members.filter((member) => {
        return member.id != id
    })

    data.members = filteredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect('/members')
    })
}