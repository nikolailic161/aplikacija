import * as Validator from 'class-validator';
export class KorisnikRegistrationDto{
  @Validator.IsNotEmpty()
    @Validator.IsEmail({
    allow_ip_domain:false,
    allow_utf8_local_part:true,
    require_tld:true

  })
    email:string;
    @Validator.IsNotEmpty()
    password:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    username:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    ime:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    prezime:string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
  
    adresa:string;
    
}