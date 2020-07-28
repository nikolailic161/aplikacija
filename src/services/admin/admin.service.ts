import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/Admin';
import { Repository } from 'typeorm';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';
import { EditAdminDto } from 'src/dtos/admin/edit.admin.dto';
import { async } from 'rxjs';
import { ApiResponse } from '../../misc/api.response.class';

@Injectable()
export class AdminService 
{
    constructor( @InjectRepository(Admin)
            private readonly admin:Repository<Admin>,
    ){}

    getAll(): Promise<Admin[]>{
        return this.admin.find();
    }

    getById(id:number): Promise<Admin>{
        return this.admin.findOne(id);
    }

    add(data:AddAdminDto): Promise<Admin | ApiResponse>{
        const crypto=require('crypto');

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        let newAdmin: Admin =new Admin();
        newAdmin.username=data.username;
        newAdmin.password=passwordHashString;


        return new Promise((resolve) =>{
            this.admin.save(newAdmin)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse=new ApiResponse("error",-1001)
                resolve(response);
            });
        });
    }

    async editById(id:number, admin: EditAdminDto): Promise<Admin | ApiResponse>{
        const oldAdmin:Admin=await this.admin.findOne(id);

        if(oldAdmin===undefined)
        {
            return new Promise((resolve)=>{
                resolve(new ApiResponse('error',-1002));
            })
        }

        let editedAdmin=new Admin();
        editedAdmin.username=oldAdmin.username;
        editedAdmin.adminId=oldAdmin.adminId;

        const crypto=require('crypto');

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(admin.password);

        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        editedAdmin.password=passwordHashString;

        return this.admin.save(editedAdmin);

    }

    async getByUsername(stringUsername:string):Promise<Admin | null>
    {
        const admin=await this.admin.findOne({
            username: stringUsername
        });

        if(admin)
            return admin;
            
        return null;
    }
}
