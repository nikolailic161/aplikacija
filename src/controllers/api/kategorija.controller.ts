import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Kategorija } from "entities/Kategorija";
import { KategorijaService } from "src/services/kategorija/kategorija.service";

@Controller('api/kategorija')
@Crud({
    model:{
        type:Kategorija
    },
    params:{
        id:{
            field:'kategorijaId',
            type:'number',
            primary:true
        }
    },
    query: {
        join:{
            potkategorije:{
                eager: true
            },
            parent_kategorija:{
                eager:true
            }
        }
    }
})
export class kategorijaKontroler{
    constructor(public service:KategorijaService){}
}