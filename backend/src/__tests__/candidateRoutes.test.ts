import { Request, Response } from 'express';
import * as candidateController from '../controllers/candidateController';

// Mock del modelo de candidato
jest.mock('../models/Candidate', () => ({
  create: jest.fn(),
  findOne: jest.fn()
}));

describe('Candidate Routes Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        skills: ['JavaScript', 'TypeScript'],
        experience: 5
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createCandidate', () => {
    it('debería crear un candidato exitosamente', async () => {
      const expectedCandidate = {
        id: 1,
        ...mockRequest.body
      };

      (candidateController.createCandidate as jest.Mock).mockResolvedValueOnce(expectedCandidate);

      await candidateController.createCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: expectedCandidate
      });
    });

    it('debería manejar errores al crear un candidato', async () => {
      const errorMessage = 'Error al crear candidato';
      (candidateController.createCandidate as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await candidateController.createCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage
      });
    });
  });
}); 