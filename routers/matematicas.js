const express = require("express")

const {matematicas} = require("../datos/cursos.js").infoCursos

const routerMatematicas = express.Router()

routerMatematicas.get("/", (req, res) =>{
    res.send(matematicas)
})


routerMatematicas.get("/:tema", (req, res) =>{
    const tema = req.params.tema;
    const resultados = matematicas.filter(cursos => cursos.tema === tema)

    if(resultados.length === 0){
        return res.status(404).send("No se han encontrado cursos con ese nombre")
    }

    res.send(JSON.stringify(resultados))
})

module.exports = routerMatematicas;