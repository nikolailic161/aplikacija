import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Korpa } from "src/entities/Korpa";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { KorpaStavka } from "src/entities/KorpaStavka";
import { Artikl } from "src/entities/Artikl";
import { Narudzbenica } from "src/entities/Narudzbenica";


@Injectable()
export class KorpaService {
    constructor (
        @InjectRepository(Korpa)
        private readonly korpa:Repository<Korpa>,

        @InjectRepository(KorpaStavka)
        private readonly korpaStavka:Repository<KorpaStavka>,

        @InjectRepository(Artikl)
        private readonly artikl:Repository<Artikl>,

        @InjectRepository(Narudzbenica)
        private readonly narudzbenica:Repository<Narudzbenica>,

    ) { }

    async getPoslednjaAktivnaKorpaByUserId(userId:number):Promise<Korpa|null>
    {
        const carts = await this.korpa.find({
            where: {
                korisnikId:userId
            },
            order: {
                vremeKreiranja:"DESC"
            },
            take: 1,
            relations:["narudzbenica"]
        });

        if(!carts||carts.length===0){
            return null;
        }

        const cart=carts[0];

        if(cart.narudzbenica!==null)
        {
            return null;
        }

        return cart;
    }

    async createNovaKorpa(korisnikId:number):Promise<Korpa>{
        const korpa:Korpa=new Korpa();
        korpa.korisnikId=korisnikId;
        return await this.korpa.save(korpa);
    }

    async addArtiklKorpa(korpaId:number,artiklId:number,kolicinaZaDodavanje:number):Promise<Korpa>
    {
        let artikl:KorpaStavka=await this.korpaStavka.findOne({
            korpaId:korpaId,
            artiklId:artiklId
        })
        if(!artikl)
        {
            artikl=new KorpaStavka();
            artikl.artiklId=artiklId;
            artikl.korpaId=korpaId;
            artikl.kolicina=kolicinaZaDodavanje;
        }
        else
        {
            artikl.kolicina+=kolicinaZaDodavanje;
        }
        artikl = await this.korpaStavka.save(artikl);
   
        return this.getById(korpaId);
    }

    async getById(korpaId:number):Promise<Korpa>{
        return await this.korpa.findOne(korpaId,{
            relations:[
                "korisnik",
                "korpaStavkas",
                "korpaStavkas.artikl",
                "korpaStavkas.artikl.kategorija",
            ],
        });
    }

    async promenaKolicine(korpaId:number,artiklId:number,newKolicina:number): Promise<Korpa>{
        let artikl:KorpaStavka=await this.korpaStavka.findOne({
            korpaId:korpaId,
            artiklId:artiklId,
        });

        if(!artikl){
            return await this.getById(korpaId);
        }
        artikl.kolicina=newKolicina;

        if(artikl.kolicina===0){
            await this.korpaStavka.delete(artikl.stavkaId);
        }else{
            await this.korpaStavka.save(artikl);
        }
        return await this.getById(korpaId);
    
    }

    
}