import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Korpa } from "src/entities/Korpa";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class KorpaService extends TypeOrmCrudService<Korpa>{
    constructor (
        @InjectRepository(Korpa)
        private readonly korpa:Repository<Korpa>

    ){
        super(korpa);
    }
}