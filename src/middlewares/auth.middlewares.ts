import { NestMiddleware, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
import { AdminService } from "src/services/admin/admin.service";
import * as jwt from "jsonwebtoken";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { jwtSecret } from "config/jwt.secret";
import { KorisnikService } from "src/services/korisnik/korisnik.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
  constructor( public adminService: AdminService, public korisnikService:KorisnikService){}

  async  use(req: Request, res: Response, next:NextFunction) {
     
    if (!req.headers.authorization){
        throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }

        const token =req.headers.authorization;
        
        let jwtData: JwtDataDto;
        try{
        jwtData=jwt.verify(token,jwtSecret);
        }
        catch(e)
        {
            throw new HttpException ('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        if(!jwtData){
            throw new HttpException ('Bad token found', HttpStatus.UNAUTHORIZED);
        }
    
        const ip = req.ip.toString();

        if (jwtData.ip !== req.ip.toString()){
            throw new HttpException ('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        if (jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException ('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.role === "admin"){
            const admin = await this.adminService.getById(jwtData.id);
            if (!admin){
                throw new HttpException ('Account not found', HttpStatus.UNAUTHORIZED);
            }
        }else if (jwtData.role==="korisnik"){
            const korisnik = await this.korisnikService.getById(jwtData.id);
            if (!korisnik){
                throw new HttpException ('Account not found', HttpStatus.UNAUTHORIZED);
            }
        }

        const trenutniTimestamp = new Date().getTime() / 1000;

        if(trenutniTimestamp >= jwtData.ext){
            throw new HttpException ('The token has expired', HttpStatus.UNAUTHORIZED);

        }

        req.token=jwtData;

        next();
    }

}