import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { KorpaStavka } from "src/entities/KorpaStavka";
import { KorpaStavkaService } from "src/services/korpaStavka/korpaStavka.service";

@Controller('api/korpaStavka')
@Crud({
    model:{
        type:KorpaStavka
    },
    params:{
        id:{
            field:'stavkaId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            korpa:{
                eager: true
            },
            artikl:{
                eager: true
            }
        }
    }    
    
})
export class KorpaStavkaController{
    constructor(public service:KorpaStavkaService){}
}