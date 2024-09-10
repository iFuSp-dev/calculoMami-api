import { MongoClient,ObjectId } from "mongodb";
const url = "mongodb+srv://aifusp:651513395@clasecei.baxxy.mongodb.net/";



export async function leerTelas(){


    return new Promise(async (ok,ko) => {
        const conexion = await MongoClient.connect(url)

        try{
            const coleccion = conexion.db("telas").collection("telas");

            const telas = await coleccion.find({}).toArray();

            console.log(telas);
            

            ok(telas);
            conexion.close();

        }catch(error){
            ko({ error : "nidea"});
        }
    });
}


export async function nuevaTela(id) {
    return new Promise(async (ok, ko) => {
        const conexion = await MongoClient.connect(url)

        try {
            const coleccion = conexion.db("telas").collection("telas");
            const tela = await coleccion.insertOne({ id: id, nombre: "", enviado: 0, recibido: 0, diferencia: 0 });
            ok(tela); // Retorna la tela creada
            conexion.close();

        } catch (error) {
            ko({ error: "Error al crear tela en la base de datos" });
        }
    });
}


export async function saveTela(body) {
    return new Promise(async (ok, ko) => {
        const conexion = await MongoClient.connect(url)

        try {
            const coleccion = conexion.db("telas").collection("telas");
            const tela = await coleccion.updateOne(
                { _id: new ObjectId(body._id) }, // Filtra por _id
                { $set: { id: body.id, nombre: body.nombre, enviado: body.send, recibido: body.recived, diferencia: body.diff } } // Actualiza los campos
              );
              

            ok(tela); // Retorna la tela creada
            conexion.close();

        } catch (error) {
            ko({ error: "Error al crear tela en la base de datos" });
        }
    });
}

