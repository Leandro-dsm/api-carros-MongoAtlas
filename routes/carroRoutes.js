import express from "express";
import carroController from "../controllers/carroController.js";

const carroRoutes = express.Router();

carroRoutes.get("/carros", carroController.listarCarros);
carroRoutes.post("/carros", carroController.criarCarro);
carroRoutes.delete("/carros/:id", carroController.deletarCarro);
carroRoutes.put("/carros/:id", carroController.atualizarCarro);
carroRoutes.get("/carros/:id", carroController.listarUmCarro);

export default carroRoutes;
