import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCandidateForm from '../components/AddCandidateForm';

// Mock del servicio de API
jest.mock('../services/api', () => ({
  createCandidate: jest.fn()
}));

describe('AddCandidateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el formulario correctamente', () => {
    const mockSubmit = jest.fn();
    render(<AddCandidateForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experiencia/i)).toBeInTheDocument();
  });

  it('debería manejar el envío del formulario correctamente', async () => {
    const mockSubmit = jest.fn().mockResolvedValueOnce({
      success: true,
      data: {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        skills: ['JavaScript'],
        experience: 5
      }
    });

    render(<AddCandidateForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/habilidades/i), {
      target: { value: 'JavaScript' }
    });
    fireEvent.change(screen.getByLabelText(/experiencia/i), {
      target: { value: '5' }
    });

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        skills: ['JavaScript'],
        experience: 5
      });
    });
  });

  it('debería mostrar errores de validación', async () => {
    const mockSubmit = jest.fn();
    render(<AddCandidateForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
    });
  });
}); 