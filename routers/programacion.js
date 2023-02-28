const express = require("express")

const routerProgramacion = express.Router()

routerProgramacion.use(express.json())

const {programacion} = require("../datos/cursos").infoCursos

routerProgramacion.get("/", (req, res) =>{
    res.send(programacion)
})

routerProgramacion.get("/:lenguaje", (req, res) =>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje)

    if(resultados.length === 0){    
       return res.status(404).send(`no existen cursos con el nombre ${lenguaje}`)
    }

    if(req.query.ordenar === "vistas"){
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)))
    }

    res.send(JSON.stringify(resultados))
})

routerProgramacion.get("/:lenguaje/:nivel", (req, res) =>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

    if(resultados.length === 0){    
       return res.status(404).send(`no existen cursos con el nombre ${lenguaje} con el nivel ${nivel}`)
    }

    res.send(JSON.stringify(resultados))
})

routerProgramacion.post("/", (req, res)=>{
    let cursoNuevo = req.body
    programacion.push(cursoNuevo)
    res.send(JSON.stringify(programacion))
})

routerProgramacion.put("/:id", (req, res)=>{
    let cursoActualizado = req.body;
    const id = req.params.id
    const resultados = programacion.findIndex(curso => curso.id == id)

    if(resultados >= 0){
        programacion[resultados] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion))


})

routerProgramacion.patch("/:id", (req, res) =>{
    let infoNueva = req.body
    const id = req.params.id
    const resultados = programacion.findIndex(curso => curso.id == id)

    if(resultados >= 0){
        const cursoMod = programacion[resultados]
        Object.assign(cursoMod, infoNueva)
    }

    res.send(JSON.stringify(programacion))
})

routerProgramacion.delete("/:id", (req, res) =>{
    const id = req.params.id
    const index = programacion.findIndex(curso => curso.id == id)

    if(index >= 0){
        programacion.splice(index, 1)
    }

    res.send(JSON.stringify(programacion))
})

module.exports = routerProgramacion;