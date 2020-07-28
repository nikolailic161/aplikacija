import { Controller, Post, Body,Req } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path";
import {LoginAdminDto} from "src/dtos/admin/login.admin.dto"
import { Admin } from "src/entities/Admin";
import * as crypto from 'crypto';
import { LoginInfoAdminDto } from "src/dtos/admin/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dtos/admin/jwt.data.admin.dto";
import {Request} from 'express';
import { jwtSecret } from "config/jwt.secret";

@Controller('auth')
export class AuthController{
    constructor (public adminService: AdminService){}

    @Post ('login')
    async doLogin(@Body() data: LoginAdminDto, @Req() req:Request): Promise<ApiResponse | LoginInfoAdminDto>
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

        const jwtData=new JwtDataAdminDto();
        jwtData.adminId=admin.adminId;
        jwtData.username=admin.username;
        
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.ext=istekTimestamp;

        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];

        let token: string = jwt.sign(JSON.stringify(jwtData),jwtSecret);  

        const responseObject = new LoginInfoAdminDto(
            admin.adminId,
            admin.username,
            token
        );
            
        return new Promise (resolve => resolve (responseObject));

    }
}
