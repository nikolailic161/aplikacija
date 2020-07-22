import { Controller, Get, Param } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "entities/Admin";

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
    getAdmin(@Param('id') id:number): Promise<Admin>{
        return this.adminService.getById(id);
    }


}