import * as Validator from 'class-validator';

export class LoginKorisnikDto{
    username:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    password:string;
}