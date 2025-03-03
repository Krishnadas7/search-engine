import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookService } from '../book.service';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from '../dto/book.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { ALREADY_EXISTS, CREATED, FAILED, SEARCH_FAILED } from '../../common/constants';
import { CreateBookResponse } from '../interface/book.interface';

// Mock Data
const mockBook: CreateBookDto = {
  title: 'NestJS Guide',
  author: 'John Doe',
  genre: 'Tech',
  publicationYear: 2023,
};

const mockBookDocument = {
  _id: new mongoose.Types.ObjectId(),
  title: 'NestJS Guide',
  author: 'John Doe',
  genre: 'Tech',
  publicationYear: 2023,
  description: 'A complete guide to NestJS',
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
} as unknown as BookDocument;

// Mock implementation for MongoDB Model
class MockModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(mockBookDocument);
  static findOne = jest.fn();
  static find = jest.fn();
}

describe('BookService', () => {
  let bookService: BookService;
  let model: Model<BookDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          // This is the key - using a class instead of an object
          useValue: MockModel,
        },
      ],
    }).compile();

    bookService = moduleRef.get<BookService>(BookService);
    model = moduleRef.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book successfully', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null); // No existing book

      const result = await bookService.createBook(mockBook);
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: CREATED,
      });
    });

    it('should return conflict if book already exists', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockBookDocument);

      const result = await bookService.createBook(mockBook);
      expect(result).toEqual({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: ALREADY_EXISTS,
      });
    });

    it('should throw an error if createBook fails', async () => {
      jest.spyOn(model, 'findOne').mockRejectedValue(new Error('Database error'));

      await expect(bookService.createBook(mockBook)).rejects.toThrow(HttpException);
    });
  });

  describe('getBook', () => {
    it('should return an object with an array of books', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockBookDocument]);
  
      const result = await bookService.getBook();
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: CREATED,
        data: [mockBookDocument], // Ensure the books are inside the "data" field
      });
    });
  
    it('should return an object with an empty array if no books are found', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([]);
  
      const result = await bookService.getBook();
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: CREATED,
        data: [], // Ensure empty data array is returned
      });
    });
  
    it('should throw an error if getBook fails', async () => {
      jest.spyOn(model, 'find').mockRejectedValue(new Error('Database error'));
  
      await expect(bookService.getBook()).rejects.toThrow(HttpException);
    });
  });

  describe('searchBookByTitle', () => {
    it('should return a success response with books matching the title', async () => {
      const mockBookDocument = {
        title: 'NestJS Guide',
        author: 'John Doe',
        genre: 'Tech',
        publicationYear: 2023,
      };
  
      const mockResponse: CreateBookResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: CREATED,
        data: [mockBookDocument],
      };
  
      jest.spyOn(model, 'find').mockResolvedValue([mockBookDocument]);
  
      const result = await bookService.searchBookByTitle('NestJS');
  
      expect(result).toEqual(mockResponse);
      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: expect.any(RegExp) },
      });
    });
  
    it('should throw an HttpException if search fails', async () => {
      jest.spyOn(model, 'find').mockRejectedValue(new Error('Search error'));
  
      await expect(bookService.searchBookByTitle('NestJS')).rejects.toThrow(HttpException);
      await expect(bookService.searchBookByTitle('NestJS')).rejects.toThrowError(
        new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: SEARCH_FAILED,
            error: 'Search error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});