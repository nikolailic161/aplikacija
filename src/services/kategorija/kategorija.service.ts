import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { Kategorija } from "src/entities/Kategorija";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class KategorijaService extends TypeOrmCrudService<Kategorija>{
    constructor (
        @InjectRepository(Kategorija)
        private readonly kategorijaRepository:Repository<Kategorija>

    ){
        super(kategorijaRepository);
    }
}