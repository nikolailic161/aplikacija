import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Automobil } from "entities/Automobil";
import { AutomobilService } from "src/services/automobil/automobil.service";

@Controller('api/automobil')
@Crud({
    model:{
        type:Automobil
    },
    params:{
        id:{
            field:'autoId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            artikls:{
                eager: true
            },
         
        }
    }
})
export class AutomobilController{
    constructor(public service:AutomobilService){}
}