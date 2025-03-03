export interface CreateBookResponse{
    success:boolean;
    statusCode: number;
    message: string;
    error?:string;
    data?:any;
}