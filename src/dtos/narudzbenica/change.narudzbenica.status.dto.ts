import * as Validator from 'class-validator';
export class ChangeNarudzbenicaStatusDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.IsIn(["odbijeno", "prihvaceno", "poslato", "na cekanju"])
    newStatus: "odbijeno" | "prihvaceno" | "poslato" | "na cekanju";

}