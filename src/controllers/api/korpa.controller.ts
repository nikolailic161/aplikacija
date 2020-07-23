import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Korpa } from "entities/Korpa";
import { KorpaService } from "src/services/korpa/korpa.service";

@Controller('api/korpa')
@Crud({
    model:{
        type:Korpa
    },
    params:{
        id:{
            field:'korpaId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            korisnik:{
                eager: true
            },
            narudzbenica:{
                eager: true
            },
            korpaStavkas:{
                eager: true
            },
        }
    }
})
export class KorpaController{
    constructor(public service:KorpaService){}
}