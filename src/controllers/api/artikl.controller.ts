import { Controller, Param, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ArtiklService } from "src/services/artikl/artikl.service";
import { Artikl } from "src/entities/Artikl";
import {FileInterceptor} from '@nestjs/platform-express';
import { StorageConfig } from "config/storage.config";
import {diskStorage} from "multer";

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


    // @Post (':id/uploadPhoto/')
    // @UseInterceptors(
    //     FileInterceptor('photo', {
    //         storage: diskStorage({
    //             destination: StorageConfig.photos,
    //             filename: (req,file,callback) => {

    //                 let original = file.originalname;

    //                 let normalized = original.replace (/\s+/g, '-');
    //                 let sada =new Date();
    //                 let datePart='';
    //                 datePart += sada.getFullYear().toString();
    //                 datePart += (sada.getMonth() +1 ).toString();
    //                 datePart += sada.getDate().toString();

    //                 let randomPart: string = 
    //                     new Array(10)
    //                     .fill(0)
    //                         .map( e=> (Math.random() * 9).toString())
    //                         .join('');


    //                 let fileName = datePart + '-' +randomPart+'-'+normalized;

    //                 callback(null,fileName)
    //             }
    //         })
    //     })
    // )   
    // uploadPhoto(@Param('id') artiklId: number, @UploadedFile() photo){
    //     let imagePath = photo.filename;
        
    //     const newPhoto: Photo = new Photo();
    //     newPhoto.artiklId=artiklId;
// Nije gotova funkcija pogledati video 047
    }

