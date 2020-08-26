import { Controller, Get, UseGuards, Req, Post, Body, Put } from "@nestjs/common";
import { KorpaService } from "src/services/korpa/korpa.service";
import { RoleCheckedGuard } from "src/misc/role.checked.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { Korpa } from "src/entities/Korpa";
import {Request} from 'express';
import { AddArticleToCartDto } from "src/dtos/korpa/add.article.to.cart.dto";
import { EditArticleInKorpaDto } from "src/dtos/korpa/edit.article.in.korpa.dto";
import { Narudzbenica } from "src/entities/Narudzbenica";
import { NarudzbenicaService } from "src/services/narudzbenica/narudzbenica.service";
import { ApiResponse } from "src/misc/api.response.class";
import { NarudzbinaMailer } from "src/services/narudzbenica/narudzbenica.mailer.service";


@Controller('api/korisnik/korpa')
export class KorisnikKorpaController{
    constructor (private korpaService: KorpaService,
                private narudzbenicaService : NarudzbenicaService,
                private narudzbinaMailer:NarudzbinaMailer){}

    private async getAktivnaKorpaZaKorisnika(korisnikId:number): Promise<Korpa>{
        let cart = await this.korpaService.getPoslednjaAktivnaKorpaByUserId(korisnikId);
        if(!cart)
        {
            cart=await this.korpaService.createNovaKorpa(korisnikId);
        }

        return await this.korpaService.getById(cart.korpaId);
    }

    @Get()
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles("korisnik")
    async getTrenutnaKorpa(@Req() req:Request) : Promise<Korpa>{
        return await this.getAktivnaKorpaZaKorisnika(req.token.id);
    }

    @Post('dodajUKorpu')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles("korisnik")
    async addToKorpa(@Body()data: AddArticleToCartDto,@Req() req:Request): Promise<Korpa>{
        const korpa: Korpa = await this.getAktivnaKorpaZaKorisnika(req.token.id);
        return await this.korpaService.addArtiklKorpa(korpa.korpaId,data.artiklId,data.kolicina);
    } 

    @Put('izmeniKorpu')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles("korisnik")
    async promeniKolicinu(@Body()data:EditArticleInKorpaDto,@Req() req: Request):Promise<Korpa>{
        const korpa:Korpa=await this.getAktivnaKorpaZaKorisnika(req.token.id);
        return await this.korpaService.promenaKolicine(korpa.korpaId,data.artiklId,data.kolicina);
    }

    @Post('napraviPorudzbinu')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles("korisnik")
    async napraviPorudzbinu(@Req() req:Request): Promise <Narudzbenica | ApiResponse>{
        const korpa = await this.getAktivnaKorpaZaKorisnika(req.token.id);
        const narudzbenica = await this.narudzbenicaService.add(korpa.korpaId);
    
        if (narudzbenica instanceof ApiResponse){
            return narudzbenica;
        }


    await this.narudzbinaMailer.sendOrderEmail(narudzbenica);
            return narudzbenica;
    }

} 
