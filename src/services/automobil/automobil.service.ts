import { Injectable } from "@nestjs/common";
import { Automobil } from "src/entities/Automobil";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AutomobilService extends TypeOrmCrudService<Automobil>{
    constructor (
        @InjectRepository(Automobil)
        private readonly automobil:Repository<Automobil>

    ){
        super(automobil);
    }
}