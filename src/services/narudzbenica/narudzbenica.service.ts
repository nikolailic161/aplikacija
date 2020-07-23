import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Narudzbenica } from "entities/Narudzbenica";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class NarudzbenicaService extends TypeOrmCrudService<Narudzbenica>{
    constructor (
        @InjectRepository(Narudzbenica)
        private readonly narudzbenica:Repository<Narudzbenica>

    ){
        super(narudzbenica);
    }
}