import { Controller, Post, Body,Req, Put } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path";
import {LoginAdminDto} from "src/dtos/admin/login.admin.dto"
import { Admin } from "src/entities/Admin";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import {Request} from 'express';
import { jwtSecret } from "config/jwt.secret";
import { KorisnikRegistrationDto } from "src/dtos/korisnik/korisnik.registration.dto";
import { KorisnikService } from "src/services/korisnik/korisnik.service";
import { Korisnik } from "src/entities/Korisnik";
import { LoginKorisnikDto } from "src/dtos/korisnik/login.korisnik.dto";

@Controller('auth')
export class AuthController{
    constructor (public adminService: AdminService,public korisnikService:KorisnikService){}

    @Post ('admin/login')
    async doAdminLogin(@Body() data: LoginAdminDto, @Req() req:Request): Promise<ApiResponse | LoginInfoDto>
    {
        const admin:Admin|null =await this.adminService.getByUsername(data.username)

        if(!admin)
        {
            return new Promise (resolve => resolve(new ApiResponse('error',-3001)));
        }

        const crypto=require('crypto');

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        if(passwordHashString != admin.password)
        {
            return new Promise(resolve=>resolve(new ApiResponse("error",3002)));
        }

        const jwtData=new JwtDataDto();
        jwtData.role="admin";
        jwtData.id=admin.adminId;
        jwtData.username=admin.username;
        
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.ext=istekTimestamp;

        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];

        let token: string = jwt.sign(JSON.stringify(jwtData),jwtSecret);  

        const responseObject = new LoginInfoDto(
            admin.adminId,
            admin.username,
            token
        );
            
        return new Promise (resolve => resolve (responseObject));

    }

    @Put('user/register')
    async userRegister(@Body() data: KorisnikRegistrationDto){
        return await this.korisnikService.register(data);
    }

    @Post ('korisnik/login')
    async doKorisnikLogin(@Body() data: LoginKorisnikDto, @Req() req:Request): Promise<ApiResponse | LoginInfoDto>
    {
        const korisnik:Korisnik|null =await this.korisnikService.getByUsername(data.username)

        if(!korisnik)
        {
            return new Promise (resolve => resolve(new ApiResponse('error',-3001)));
        }

        const crypto=require('crypto');

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        if(passwordHashString != korisnik.password)
        {
            return new Promise(resolve=>resolve(new ApiResponse("error",3002)));
        }

        const jwtData=new JwtDataDto();
        jwtData.role="korisnik";
        jwtData.id=korisnik.korisnikId;
        jwtData.username=korisnik.username;
        
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.ext=istekTimestamp;

        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];

        let token: string = jwt.sign(JSON.stringify(jwtData),jwtSecret);  

        const responseObject = new LoginInfoDto(
            korisnik.korisnikId,
            korisnik.username,
            token
        );
            
        return new Promise (resolve => resolve (responseObject));

    }
}
