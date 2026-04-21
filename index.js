const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("¡Servidor encendido!"))

app.use(express.json())
const fecha = new Date()

//Agregar Producto
app.post("/productos", (req, res) => {
//1
const producto = req.body
//2
const productos = JSON.parse(fs.readFileSync("productos.json"))
//3
productos.push(producto)
//4
fs.writeFileSync("productos.json", JSON.stringify(productos))
//5
res.send("¡Producto agregado con éxito!")
})

//Ver por consola productos
app.get("/productos", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    res.json(productos)
})


app.get("/fecha", (req, res) => res.send(`Fecha actual: ${fecha.toString()}`) )
app.get("/home", (req, res) => { res.send("Estoy en Home") })
app.get("/perfil", (req, res) => { res.send("Rafael Mora Cárdenas") })


// Delete productos
app.delete("/productos/:id", (req, res) => {
const { id } = req.params
const productos = JSON.parse(fs.readFileSync("productos.json"))
const index = productos.findIndex(p => p.id == id)
productos.splice(index, 1)
fs.writeFileSync("productos.json", JSON.stringify(productos))
res.send("Producto eliminado con éxito")
})

//Modificar productos PUT
app.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const producto = req.body
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos[index] = producto
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto modificado con éxito!")
})