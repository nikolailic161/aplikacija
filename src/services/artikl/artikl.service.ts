import { Injectable } from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Artikl } from "src/entities/Artikl";
import { ArtiklSearchDto } from "src/dtos/artikl/artikl.search.dto";

@Injectable()
export class ArtiklService extends TypeOrmCrudService<Artikl>{
    constructor (
        @InjectRepository(Artikl)
        private readonly artikl:Repository<Artikl>

    ){
        super(artikl);
    }

   /* async search (data:ArtiklSearchDto) : Promise <Artikl[]>{
        const builder = await this.artikl.createQueryBuilder("artikl");
        builder.where('artikl.categoryId = :categoryId ', {categoryId: data.categoryId})

        if (data.keywords && data.keywords.length > 0 ){
            builder.andWhere('artikl.naziv LIKE :kw OR artikl.opis LIKE :kw ',
             {kw: '%' + data.keywords + '%'});
        }
        return;
    */ 
  }
