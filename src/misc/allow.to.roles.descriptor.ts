import { SetMetadata } from "@nestjs/common"

export const AllowToRoles= (...roles: ("admin" | "korisnik")[])=> {
  return  SetMetadata('allow_to_roles',roles);
};