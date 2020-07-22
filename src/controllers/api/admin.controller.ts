import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "entities/Admin";
import { AddAdminDto } from "src/dtos/admin/add.admin.dto";
import { identity } from "rxjs";
import { EditAdminDto } from "src/dtos/admin/edit.admin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { response } from "express";
import { resolve } from "path";

@Controller('api/admin')
export class AdminController 
{
    constructor(
        private adminService:AdminService
    ){}

    @Get('/admini')
    getAllAdmins(): Promise<Admin[]>{
        return this.adminService.getAll();
    }

    @Get(':id')
    async getAdmin(@Param('id') id:number): Promise<Admin|ApiResponse>{
        let admin=await this.adminService.getById(id);
        if(admin===undefined)
        {
            return new Promise((resolve)=>{
                resolve(new ApiResponse('error',-1002));
            })
        }
        return admin;
    }

    @Put()
    addAdmin(@Body() admin:AddAdminDto): Promise<Admin|ApiResponse> {
        return this.adminService.add(admin);
    }
 
    @Post(':id')
    editAdmin(@Param('id') id, @Body() admin:EditAdminDto): Promise<Admin | ApiResponse>{
        return this.adminService.editById(id,admin);
    }

}