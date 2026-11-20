import { Protagonist } from '../types';

interface ProtagonistListProps {
  protagonists: Protagonist[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const ProtagonistList = ({ protagonists, onAdd, onRemove }: ProtagonistListProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="protagonists-section">
      <h2>Protagonistas</h2>
      
      <div className="protagonist-list">
        {protagonists.map(protagonist => (
          <div key={protagonist.id} className="protagonist-item">
            <div className="protagonist-avatar">
              {getInitials(protagonist.name)}
            </div>
            <div className="protagonist-info">
              <h5>{protagonist.name}</h5>
              <p>{protagonist.personality}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onRemove(protagonist.id)}
              style={{ 
                padding: '4px 8px', 
                fontSize: '0.75rem',
                minWidth: 'auto'
              }}
            >
              X
            </button>
          </div>
        ))}
        
        {protagonists.length === 0 && (
          <div style={{ 
            color: 'var(--text-tertiary)', 
            fontSize: '0.9rem',
            textAlign: 'center',
            padding: '20px 0'
          }}>
            Nenhum protagonista adicionado
          </div>
        )}
      </div>
      
      <button className="add-protagonist-btn" onClick={onAdd}>
        + Adicionar Protagonista
      </button>
    </div>
  );
};

export default ProtagonistList;
