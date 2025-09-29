import mongoose from "mongoose";

// Criando um documento
const descriptionSchema = new mongoose.Schema({
  genero: String,
  platforma: String,
  avaliacao: String
});

const carroSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    ano: Number,
    cor: String,
    motor: String,
    data_lancamento: Date
});

const carro = mongoose.model("Carro", carroSchema);

export default carro;
