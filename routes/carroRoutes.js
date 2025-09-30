import express from "express";
import carroController from "../controllers/carroController.js";

const carroRoutes = express.Router();

// Listar todos os carros
carroRoutes.get("/carros", carroController.listarCarros);

// Criar carro
carroRoutes.post("/carros", carroController.criarCarro);

// Atualizar carro (id no body)
carroRoutes.put("/carros", carroController.atualizarCarro);

// Deletar carro (id no body)
carroRoutes.delete("/carros", carroController.deletarCarro);

// Listar 1 carro (id no body)
carroRoutes.get("/carros/um", carroController.listarUmCarro);

export default carroRoutes;
