import * as Validator from 'class-validator';

export class AddArtiklDto{
    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2,30)
    
    naziv : string;

    categoryId :number;

    @Validator.IsNotEmpty()
    @Validator.IsOptional()
    fabricki:string;


    @Validator.IsNotEmpty()
    stanje:number;


    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2,200)

    opis:string;
    

}