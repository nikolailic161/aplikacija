export class ApiResponse{
    status:string;
    statusCode:number;
    message:string|null;

    constructor(status:string, Statuscode:number, message:string|null=null)
    {
        this.status=status;
        this.statusCode=Statuscode;
        this.message=message;
    }
}