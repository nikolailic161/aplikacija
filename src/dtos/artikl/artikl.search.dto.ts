import * as Validator from 'class-validator';
export class ArtiklSearchDto{

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity:false,
        allowNaN:false,
        maxDecimalPlaces:0,
    })
    categoryId:number;


    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2,128)
    keywords:string;

    

    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity:false,
        allowNaN:false,
        maxDecimalPlaces:2,
    })
    
    priceMin:number;

    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity:false,
        allowNaN:false,
        maxDecimalPlaces:2,
    })
    priceMax:number;

    @Validator.IsOptional()
    @Validator.IsIn(['naziv', 'cena'])
    orderBy: 'naziv' | 'cena';
    @Validator.IsOptional()
    @Validator.IsIn(['asc' , 'desc'])
    orderDirection: 'asc' | 'desc';
    
    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity:false,
        allowNaN:false,
        maxDecimalPlaces:0,
    })
    page:number;

    @Validator.IsOptional()
    @Validator.IsIn([5,10,25,50,75])
    itemsPerPage: 5 | 10 | 25 | 50 | 75;

}
