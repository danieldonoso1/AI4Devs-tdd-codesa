import React, { useState } from 'react';

interface AddCandidateFormProps {
  onSubmit: (candidate: {
    name: string;
    email: string;
    skills: string[];
    experience: number;
  }) => Promise<void>;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const AddCandidateForm: React.FC<AddCandidateFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: 0
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'el nombre es requerido';
    if (!formData.email) newErrors.email = 'el email es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      experience: Number(formData.experience)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="skills">Habilidades:</label>
        <input
          id="skills"
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="Separadas por comas"
        />
      </div>

      <div>
        <label htmlFor="experience">Experiencia (años):</label>
        <input
          id="experience"
          type="number"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default AddCandidateForm; 