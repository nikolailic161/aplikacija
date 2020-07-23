import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Narudzbenica } from "entities/Narudzbenica";
import { NarudzbenicaService } from "src/services/narudzbenica/narudzbenica.service";

@Controller('api/narudzbenica')
@Crud({
    model:{
        type:Narudzbenica
    },
    params:{
        id:{
            field:'narudzbenicaId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            korpa:{
                eager: true
            },
         
        }
    }
})
export class NarudzbenicaController{
    constructor(public service:NarudzbenicaService){}
}