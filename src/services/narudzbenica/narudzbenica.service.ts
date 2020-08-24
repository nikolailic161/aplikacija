import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Narudzbenica } from "src/entities/Narudzbenica";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Korpa } from "src/entities/Korpa";
import { ApiResponse } from "src/misc/api.response.class";


@Injectable()
export class NarudzbenicaService{
    constructor (
        @InjectRepository(Narudzbenica)
        private readonly narudzbenica:Repository<Narudzbenica>,

        @InjectRepository(Korpa)
        private readonly korpa:Repository<Korpa>,

    ){}    

    async add(korpaId : number): Promise <Narudzbenica | ApiResponse> {
        const narudzbenica = await this.narudzbenica.findOne({
            korpaId:korpaId,
        });
        if(narudzbenica){
            return new ApiResponse ("error",-7001,"Nalog je vec napravljen za korpu")
        }

        const korpa= await this.korpa.findOne(korpaId,{
            relations:[
                "korpaStavkas",
            ],
        });

        if(!korpa) {
            return new ApiResponse ("error",-7002,"Nepostoji korpa ")

        }
        if(korpa.korpaStavkas.length === 0){
            return new ApiResponse ("error",-7003,"Korpa je prazna ")

        }

        const newNarudzbina : Narudzbenica = new Narudzbenica();
        newNarudzbina.korpaId=korpaId;
        const savedNarudzbina = await this.narudzbenica.save(newNarudzbina);
        
        return await this.narudzbenica.findOne(savedNarudzbina.narudzbenicaId,{
            relations:[
                "korpa",
                "korpa.korisnik",
                "korpa.korpaStavkas",
                "korpa.korpaStavkas.artikl",
                "korpa.korpaStavkas.artikl.kategorija"
            ],

        });

    }
}
