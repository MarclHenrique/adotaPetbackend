import { Request, response, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../respositories/PetRepository";
import PetEntity from "../enitites/PetEntity";
import EnumPorte from "../enum/EnumPorte";

let listaDePets: Array<TipoPet> = []; //Definindo lista com Array que recebe os valores em TipoPet

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) { }
  async criaPet(req: Request, res: Response) {
    const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>req.body; //Passando os tipos definidos lá em TipoPet 

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Especie inválida" })
    }

    if (porte && !(porte in EnumPorte)) { //Verifica se a propriedade dentro da variável porte está contida
      return res.status(400).json({ error: "Especie inválida" }) //em EnumPorte
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

    await this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  // PetController.ts
  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscarPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const petEncontrado = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
  
    if (petEncontrado) {
      return res.status(200).json(petEncontrado);
    } else {
      return res.status(404).json({ mensagem: "Pet não encontrado" });
    }
  }
}
