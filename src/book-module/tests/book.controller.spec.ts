import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { CreateBookDto } from '../dto/book.dto';
import { CreateBookResponse } from '../interface/book.interface';
import { HttpStatus } from '@nestjs/common';
import { CREATED } from '../../common/constants';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            createBook: jest.fn(),
            getBook: jest.fn(),
            searchBookByTitle: jest.fn(),
          },
        },
      ],
    }).compile();

    bookController = moduleRef.get<BookController>(BookController);
    bookService = moduleRef.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book and return response', async () => {
      const dto: CreateBookDto = { title: 'NestJS Guide', author: 'John Doe', genre: 'Tech', publicationYear: 2023 };
      const response: CreateBookResponse = { success: true, statusCode: 201, message: 'Book created successfully' };

      jest.spyOn(bookService, 'createBook').mockResolvedValue(response);

      const result = await bookController.createBook(dto);
      expect(result).toEqual(response);
      expect(bookService.createBook).toHaveBeenCalledWith(dto);
    });
  });

  describe('getBook', () => {
    it('should return a success response with book data', async () => {
      const books: CreateBookDto[] = [{ title: 'NestJS Guide', author: 'John Doe', genre: 'Tech', publicationYear: 2023 }];
      const response = { success: true, statusCode: 201, message: 'Books retrieved successfully', data: books };

      jest.spyOn(bookService, 'getBook').mockResolvedValue(response);

      const result = await bookController.getBook();
      expect(result).toEqual(response);
      expect(bookService.getBook).toHaveBeenCalled();
    });
  });

  describe('searchBookByTitle', () => {
    it('should return a success response with books matching the given title', async () => {
      const title = 'NestJS Guide';
      const books: CreateBookDto[] = [
        { title, author: 'John Doe', genre: 'Tech', publicationYear: 2023 },
      ];
  
      const mockResponse: CreateBookResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: CREATED,
        data: books,
      };
  
      jest.spyOn(bookService, 'searchBookByTitle').mockResolvedValue(mockResponse);
  
      const result = await bookController.searchBookBytitle(title);
      
      expect(result).toEqual(mockResponse);
      expect(bookService.searchBookByTitle).toHaveBeenCalledWith(title);
    });
  });
});
