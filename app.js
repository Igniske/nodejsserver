const express = require("express")
const app = express();

const {infoCursos} = require("./datos/cursos")

const routerMatematicas = require("./routers/matematicas")

const routerProgramacion = require("./routers/programacion")

app.use("/api/cursos/programacion", routerProgramacion)

app.use("/api/cursos/matematicas", routerMatematicas)


app.get("/", (req, res)=>{
res.send("mi primer servidor. Cursooos:")
})

app.get("/api/cursos", (req, res)=>{
    res.send(JSON.stringify(infoCursos))
})



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>{
    console.log(`el servidor se esta ejecutando en ${PUERTO}...`)
})