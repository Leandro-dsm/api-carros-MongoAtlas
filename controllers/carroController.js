import carroService from "../services/carroService.js";
import { ObjectId } from "mongodb";

const listarCarros = async (req, res) => {
  try {
    const carros = await carroService.listarTodos();
    res.status(200).json({ carros });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

const criarCarro = async (req, res) => {
  try {
    const { marca, modelo, ano, cor, motor, data_lancamento } = req.body;
    await carroService.criar(marca, modelo, ano, cor, motor, data_lancamento);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

const deletarCarro = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      await carroService.deletar(req.params.id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ erro: "ID inválida" });
    }
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

const atualizarCarro = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const { marca, modelo, ano, cor, motor, data_lancamento } = req.body;
      const carro = await carroService.atualizar(
          req.params.id, marca, modelo, ano, cor, motor, data_lancamento
      );
      res.status(200).json({ carro });
    } else {
      res.status(400).json({ erro: "ID inválida" });
    }
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

const listarUmCarro = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const carro = await carroService.listarUm(req.params.id);
      if (!carro) {
        res.status(404).json({ erro: "Carro não encontrado." });
      } else {
        res.status(200).json({ carro });
      }
    } else {
      res.status(400).json({ erro: "ID inválida" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export default { listarCarros, criarCarro, deletarCarro, atualizarCarro, listarUmCarro };
