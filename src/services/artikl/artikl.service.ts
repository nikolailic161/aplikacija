import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Artikl } from "entities/Artikl";

@Injectable()
export class ArtiklService extends TypeOrmCrudService<Artikl>{
    constructor (
        @InjectRepository(Artikl)
        private readonly artikl:Repository<Artikl>

    ){
        super(artikl);
    }
}