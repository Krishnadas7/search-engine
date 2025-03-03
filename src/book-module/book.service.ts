import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Book, BookDocument } from "../schemas/book.schema";
import {Model} from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
import { CreateBookDto } from "./dto/book.dto";
import { CreateBookResponse } from "./interface/book.interface";
import { ALL_BOOKS, ALREADY_EXISTS, CREATED, FAILED, SEARCH_FAILED } from "../common/constants";

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
            success:false,
            statusCode: HttpStatus.CONFLICT,
            message: ALREADY_EXISTS,
          };
        }
  
        // Create a new book if not exists

        const newBook = new this.bookModel(book);
        await newBook.save();
        return {
          success:true,
          statusCode: HttpStatus.CREATED,
          message: CREATED,
        };
      } catch (error) {
        return {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: FAILED,
          error: error.message,
        };
      }
    }

    // get book service return all books from database

    async getBook():Promise<CreateBookResponse>{
      try{
        const books = await this.bookModel.find()
        return {
          success:true,
          statusCode: HttpStatus.OK,
          message: ALL_BOOKS,
          data:books
        };
      }catch(error){
        return {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: FAILED,
          error: error.message,
        };
      }
      
    }

    // search book service by titile name

    async searchBookByTitle(title: string): Promise<CreateBookResponse> {
      try {

        const regexPattern = new RegExp(`\\b${title}`, "i"); 

        const books = await this.bookModel.find({
          title: { $regex: regexPattern }, 
        });
        return {
          success:true,
          statusCode: HttpStatus.OK,
          message: ALL_BOOKS,
          data:books
        };
  
      } catch (error) {
        return {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: FAILED,
          error: error.message,
        };
      }
    }
    
    
  
}