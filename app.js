import express from "express";
//import mongoose from "mongoose";
import carroRoutes from "./routes/carroRoutes.js";
//importando db-connection
import mongoose from "./config/db-connection.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", carroRoutes);

//mongoose.connect("mongodb://127.0.0.1:27017/apicarros");

const port = 4000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}.`);
});

app.get("/", async (req, res) => {
   try{
    const carro = await Carro.find();
    res.status(200).json({ carros: carros });
   }catch (error){
    console.log(error);
    res.status(500).json({error: "Erro interno do servidor."});
   }
});

/*app.get("/", (req, res) => {
  const carros = [
    {
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2020,
      cor: "Prata",
      motor: "2.0 Flex",
      data_lancamento: "2020-02-10"
    },
    {
      marca: "Ford",
      modelo: "Mustang",
      ano: 2021,
      cor: "Vermelho",
      motor: "5.0 V8",
      data_lancamento: "2021-06-01"
    }
  ];
  res.json(carros);
}); */
