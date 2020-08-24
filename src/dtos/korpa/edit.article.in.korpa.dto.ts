import * as Validator from 'class-validator';


export class EditArticleInKorpaDto{
    artiklId:number;
    @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN:false,
    maxDecimalPlaces:0
  })
    kolicina:number;
}