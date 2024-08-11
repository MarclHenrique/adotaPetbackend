import { DataSource } from "typeorm";
import PetEntity from "../enitites/PetEntity";
import AdotanteEntity from "../enitites/AdotanteEntity";
import EnderecoEntity from "../enitites/EnderecoEntity";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, AdotanteEntity, EnderecoEntity], //Ao inserir entidade ela é mapeada como tabela no banco de dados
    synchronize: true, //Sicroniza ações inseridas e removidas da identidade
});