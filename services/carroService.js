import carro from "../models/carros.js";

class carroService {
  async listarTodos() {
    return await carro.find();
  }

  async criar(marca, modelo, ano, cor, motor, data_lancamento) {
    const novoCarro = new carro({ marca, modelo, ano, cor, motor, data_lancamento });
    await novoCarro.save();
  }

  async deletar(id) {
    await carro.findByIdAndDelete(id);
    console.log(`Carro com id ${id} foi deletado.`);
  }

  async atualizar(id, marca, modelo, ano, cor, motor, data_lancamento) {
    return await carro.findByIdAndUpdate(
        id,
        { marca, modelo, ano, cor, motor, data_lancamento },
        { new: true }
    );
  }

  async listarUm(id) {
    return await carro.findOne({ _id: id });
  }
}

export default new carroService();
