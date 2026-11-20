import { useState } from 'react';
import { Protagonist } from '../types';

interface AddProtagonistModalProps {
  onClose: () => void;
  onSave: (protagonist: Protagonist) => void;
}

const AddProtagonistModal = ({ onClose, onSave }: AddProtagonistModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    const newProtagonist: Protagonist = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      personality: personality.trim()
    };

    onSave(newProtagonist);
    
    setName('');
    setDescription('');
    setPersonality('');
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Protagonista</h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do personagem"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o personagem (ex: meu amigo do colégio, alto, loiro...)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="personality">Personalidade</label>
            <textarea
              id="personality"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="Descreva a personalidade (ex: brincalhão, tímido, corajoso...)"
            />
          </div>
          
          {error && (
            <div style={{ 
              color: 'var(--accent)', 
              fontSize: '0.9rem',
              marginTop: '-10px',
              marginBottom: '10px'
            }}>
              {error}
            </div>
          )}
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProtagonistModal;
