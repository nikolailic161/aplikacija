import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Korisnik } from "src/entities/Korisnik";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { KorisnikRegistrationDto } from "src/dtos/korisnik/korisnik.registration.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { async } from "rxjs";

@Injectable()
export class KorisnikService extends TypeOrmCrudService<Korisnik>{
    constructor (
        @InjectRepository(Korisnik)
        private readonly korisnik:Repository<Korisnik>

    ){
        super(korisnik);
    }

    async register(data: KorisnikRegistrationDto): Promise<Korisnik | ApiResponse> {
        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        const newKorisnik: Korisnik = new Korisnik();
        newKorisnik.email = data.email;
        newKorisnik.password=passwordHashString;
        newKorisnik.ime=data.ime;
        newKorisnik.prezime=data.prezime;
        newKorisnik.adresa=data.adresa;
        newKorisnik.username=data.username;

        try {
            const savedKorisnik= await this.korisnik.save(newKorisnik);

            if (!savedKorisnik)
            {
                throw new Error('');
            }
            return savedKorisnik;
        }
        catch (e)
        {
            return new ApiResponse ('error',-6001,'Nije uspesno kreiran korisnik')
        }
    }
    async getById(id:number): Promise<Korisnik>
    {
        return await this.korisnik.findOne(id);
    }

    
    async getByUsername(stringUsername:string):Promise<Korisnik | null>
    {
        const korisnik=await this.korisnik.findOne({
            username: stringUsername
        });

        if(korisnik)
            return korisnik;
            
        return null;
    }

}

