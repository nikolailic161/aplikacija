import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Korisnik } from "src/entities/Korisnik";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class KorisnikService extends TypeOrmCrudService<Korisnik>{
    constructor (
        @InjectRepository(Korisnik)
        private readonly korisnik:Repository<Korisnik>

    ){
        super(korisnik);
    }
}