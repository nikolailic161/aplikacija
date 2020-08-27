import { NarudzbenicaService } from "src/services/narudzbenica/narudzbenica.service";
import { Param, Get, UseGuards, Patch, Body, Controller } from "@nestjs/common";
import { Narudzbenica } from "src/entities/Narudzbenica";
import { ApiResponse } from "src/misc/api.response.class";
import { RoleCheckedGuard } from "src/misc/role.checked.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import * as Validator from 'class-validator';
import { ChangeNarudzbenicaStatusDto } from "src/dtos/narudzbenica/change.narudzbenica.status.dto";

@Controller('api/narudzbenica')
export class AdminNarudzbinaController{
    constructor(
        private narudzbenicaService: NarudzbenicaService,
    ){}


    @Get(':id')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('admin')
    async get(@Param('id')id: number): Promise<Narudzbenica | ApiResponse>{
        const narudzbenica = await this.narudzbenicaService.getById(id);

        if(!narudzbenica){
            return new ApiResponse("error", -9001 , "Nije pronadjena porudzbina")
        }
        return narudzbenica

    }

    @Patch(':id')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('admin')
        async changeStatus (@Param('id')id: number,@Body()data:ChangeNarudzbenicaStatusDto): Promise<Narudzbenica | ApiResponse> {
            return await this.narudzbenicaService.changeStatus(id,data.newStatus);
        }
}