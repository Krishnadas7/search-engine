import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Book,BookDocument } from "src/schemas/book.schema";
import {Model} from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
import { CreateBookDto } from "./dto/book.dto";
import { CreateBookResponse } from "./interface/book.interface";
import { ALREADY_EXISTS, CREATED, FAILED, SEARCH_FAILED } from "src/common/constants";

@Injectable()
export class BookService{
    constructor(@InjectModel(Book.name) private bookModel:Model<BookDocument>){}
    
    // create book service

    async createBook(book: CreateBookDto): Promise<CreateBookResponse> {
      try {

        // Check if a book with the same title already exists

        const existingBook = await this.bookModel.findOne({ title: book.title });
        if (existingBook) {
          return {
            statusCode: HttpStatus.CONFLICT,
            message: ALREADY_EXISTS,
          };
        }
  
        // Create a new book if not exists

        const newBook = new this.bookModel(book);
        await newBook.save();
        return {
          statusCode: HttpStatus.CREATED,
          message: CREATED,
        };
      } catch (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: FAILED,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // get book service return all books from database

    async getBook():Promise<CreateBookDto[]>{
      return await this.bookModel.find()
    }

    // search book service by titile name

    async searchBookByTitle(title: string): Promise<CreateBookDto[]> {
      try {

        const regexPattern = new RegExp(`\\b${title}`, "i"); 
            
        const books = await this.bookModel.find({
          title: { $regex: regexPattern }, 
        });
         
        return books;
      } catch (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: SEARCH_FAILED,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
    
  
}