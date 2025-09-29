import mongoose from "mongoose";

const dbUser = "leandrosueoka_db_user";
const dbPassword = "hffYd8Ha6QYJB1S0";



const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wlzobev.mongodb.net/api-carros-MongoAtlas?retryWrites=true&w=majority&appName=Cluster0`
    );
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Erro ao conectar ao MongoDB Atlas.")
    });
    connection.on("open", () =>{
        console.log("Conectado ao MongoDB Atlas com sucesso!!");
    });
};
connect();
export default mongoose;