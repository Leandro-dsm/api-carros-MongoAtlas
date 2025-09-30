import carroService from "../services/carroService.js";
import { ObjectId } from "mongodb";

// Listar todos os carros
const listarCarros = async (req, res) => {
    try {
        const carros = await carroService.listarTodos();
        res.status(200).json({ carros });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

// Criar carro
const criarCarro = async (req, res) => {
    try {
        const { marca, modelo, ano, cor, motor, data_lancamento } = req.body;
        await carroService.criar(marca, modelo, ano, cor, motor, data_lancamento);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

// Deletar carro (id no body)
const deletarCarro = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) return res.status(400).json({ erro: "ID é obrigatório." });
        if (!ObjectId.isValid(id)) return res.status(400).json({ erro: "ID inválido." });

        const carro = await carroService.listarUm(id);
        if (!carro) return res.status(404).json({ erro: "Carro não encontrado." });

        await carroService.deletar(id);
        res.status(200).json({ message: "Carro deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

// Atualizar carro (id no body)
const atualizarCarro = async (req, res) => {
    try {
        const { id, marca, modelo, ano, cor, motor, data_lancamento } = req.body;

        if (!id) return res.status(400).json({ erro: "ID é obrigatório." });
        if (!ObjectId.isValid(id)) return res.status(400).json({ erro: "ID inválido." });

        const carro = await carroService.atualizar(id, marca, modelo, ano, cor, motor, data_lancamento);
        if (!carro) return res.status(404).json({ erro: "Carro não encontrado." });

        res.status(200).json({ carro });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

// Listar 1 carro (id no body)
const listarUmCarro = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) return res.status(400).json({ erro: "ID é obrigatório." });
        if (!ObjectId.isValid(id)) return res.status(400).json({ erro: "ID inválido." });

        const carro = await carroService.listarUm(id);
        if (!carro) return res.status(404).json({ erro: "Carro não encontrado." });

        res.status(200).json({ carro });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno do servidor." });
    }
};

export default { listarCarros, criarCarro, deletarCarro, atualizarCarro, listarUmCarro };
