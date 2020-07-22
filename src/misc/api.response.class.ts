export class ApiResponse{
    status:string;
    statusCode:number;
    message:string|null;

    constructor(status:string, code:number, message:string|null=null)
    {
        this.status=status;
        this.statusCode=code;
        this.message=message;
    }
}