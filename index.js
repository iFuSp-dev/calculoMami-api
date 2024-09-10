import { leerTelas, nuevaTela, saveTela } from "./db.js";
import express from "express";
import cors from "cors";
const server = express();



server.use(express.json())
server.use(cors())



server.get("/telas",async (req,res ) => {
    try {
        
        let telas = await leerTelas()
        res.json(telas)

    } catch (error) {
        res.json(error)
    }



})


server.put("/updateTela",async (req,res) =>{

    try {
        console.log(req.body);
        
       let res =  await saveTela(req.body)

       console.log(res);
       

    } catch (error) {
        res.json(error)
    }
})

server.post("/nuevaTela", async (req, res) => {
    try {
        console.log(req.body.newRow.id);
        
        const id = req.body.newRow.id; // Asegúrate de que solo recibes el "id" directamente, no un objeto anidado
        const ntela = await nuevaTela(id);
        console.log(ntela);
        res.json(ntela);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la nueva tela" });
    }
});


server.listen(3000)