import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/book.dto";
import { CreateBookResponse } from "./interface/book.interface";

@Controller("book")
export class BookController{
    constructor(private readonly bookService:BookService){}

    //added pipes for validation
    //book create function

    @Post()
    @UsePipes(new ValidationPipe())
    async createBook(@Body()book:CreateBookDto):Promise<CreateBookResponse>{
        return await this.bookService.createBook(book)
    }

    //get book function

    @Get()
    async getBook():Promise<CreateBookDto[]>{
        return await this.bookService.getBook()
    }

    //search book function by title name using query params
    
    @Get("/bookSearch")
    async searchBookBytitle(@Query('title')title:string):Promise<CreateBookDto[]>{
        return await this.bookService.searchBookByTitle(title)
    }
    
}