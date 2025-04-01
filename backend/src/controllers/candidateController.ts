import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { name, email, skills, experience } = req.body;

    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        skills,
        experience
      }
    });

    res.status(201).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear candidato'
    });
  }
}; 