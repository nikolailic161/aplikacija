import { Injectable } from "@nestjs/common";
import { Narudzbenica } from "src/entities/Narudzbenica";
import { MailerService } from "@nestjs-modules/mailer";
import { MailConfig } from "config/mail.config";
import { KorpaStavka } from "src/entities/KorpaStavka";

@Injectable()
export class NarudzbinaMailer{
    constructor (private readonly mailerService:MailerService){}
        
       async sendOrderEmail(narudzbina:Narudzbenica){
            await this.mailerService.sendMail({
                to:narudzbina.korpa.korisnik.email,
                bcc:MailConfig.orderNotificationMail,
                subject:'Detalji narudzbine',
                encoding:'UTF-8',
                html:this.makeOrderHtml(narudzbina),
            });
        

    }    

   private makeOrderHtml(narudzbina:Narudzbenica) : string {
   /*     let suma = narudzbina.korpa.korpaStavkas.reduce((sum,current:KorpaStavka)=>{
            return sum +
                    current.kolicina *
                    current.artikl.cena[current.artikl.cena.length-1].cena},0);


        }
        )
*/

        return `<p>Zahaljujemo se na vasoj porudzbini</p>
         <p>Ovo su detalji porudzbine:</p>
          <ul>
           ${narudzbina.korpa.korpaStavkas.map((KorpaStavka: KorpaStavka)=>{
                return `<li>
                    ${KorpaStavka.artikl.naziv} x 
                    ${KorpaStavka.kolicina}
                    </li>`;
           }).join("")}
          </ul>`;
        //  <p>Ukupan iznos je: ${suma}EUR.</p>
                
                                
    }
}