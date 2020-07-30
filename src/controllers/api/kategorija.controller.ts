import { Controller, UseGuards, All } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Kategorija } from "src/entities/Kategorija";
import { KategorijaService } from "src/services/kategorija/kategorija.service";
import { RoleCheckedGuard } from "src/misc/role.checked.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

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
    }, 
    routes: {
        only: [
            "createOneBase",
            "createManyBase",
            "updateOneBase",
            "getManyBase",
            "getOneBase",

        ],
        createOneBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('admin'),
            ],
        },
        createManyBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('admin')
            ],
        
        },
        updateOneBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('admin')

            ],

        },
        getManyBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('admin','korisnik')
            ],
        },
        getOneBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('admin', 'korisnik')
            ], 
        },

    }

})
export class kategorijaKontroler{
    constructor(public service:KategorijaService){}
}