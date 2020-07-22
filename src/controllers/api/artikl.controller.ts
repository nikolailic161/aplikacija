import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ArtiklService } from "src/services/artikl/artikl.service";
import { Artikl } from "entities/Artikl";

@Controller('api/artikl')
@Crud({
    model:{
        type:Artikl
    },
    params:{
        id:{
            field:'artiklId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            kategorija:{
                eager: true
            },
            automobils:{
                eager:true
            }
        }
    }
})
export class ArtiklController{
    constructor(public service:ArtiklService){}
}