import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Korisnik } from "src/entities/Korisnik";
import { KorisnikService } from "src/services/korisnik/korisnik.service";


@Controller('api/korisnik')
@Crud({
    model:{
        type:Korisnik
    },
    params:{
        id:{
            field:'korisnikId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            korpas:{
                eager: true
            },
         
        }
    }
})
export class KorisnikController{
    constructor(public service:KorisnikService){}
}