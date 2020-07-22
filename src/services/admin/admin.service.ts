import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'entities/Admin';
import { Repository } from 'typeorm';
import { AddAdminDto } from 'src/dtos/admin/add.admin.dto';

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

    add(data:AddAdminDto): Promise<Admin>{
        const crypto=require('crypto');

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString=passwordHash.digest('hex').toUpperCase();

        let newAdmin: Admin =new Admin();
        newAdmin.username=data.username;
        newAdmin.password=passwordHashString;

        return this.admin.save(newAdmin);
    }
}
