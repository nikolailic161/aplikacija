import * as Validator from 'class-validator';
export class AddArticleToCartDto{
    
    artiklId:number;
    @Validator.IsNotEmpty()
  
    kolicina:number;
}