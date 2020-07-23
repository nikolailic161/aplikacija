import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { KorpaStavka } from "entities/KorpaStavka";
import { InjectRepository } from "@nestjs/typeorm";
import { KorpaService } from "../korpa/korpa.service";
import { Repository } from "typeorm";


@Injectable()
export class KorpaStavkaService extends TypeOrmCrudService<KorpaStavka>{
    constructor (
        @InjectRepository(KorpaStavka)
        private readonly korpaStavka:Repository<KorpaStavka>

    ){
        super(korpaStavka);
    }
}