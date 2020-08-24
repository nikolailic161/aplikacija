import * as Validator from 'class-validator';
export class KorisnikRegistrationDto{
    email:string;
    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      allow_ip_domain:false,
      allow_utf8_local_part:true,
      require_tld:true
  
    })
    password:string;
    @Validator.IsNotEmpty()
    @Validator.IsHash('sha512')
    username:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    ime:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,30)
    prezime:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,40)
    adresa:string;
    
}