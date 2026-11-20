import { StoryMode, ModelType } from '../types';

interface StoryOptionsProps {
  mode: StoryMode;
  onModeChange: (mode: StoryMode) => void;
  model: ModelType;
  onModelChange: (model: ModelType) => void;
  availableModels: ModelType[];
  includeActs: boolean;
  onIncludeActsChange: (value: boolean) => void;
  isAdultMode: boolean;
}

const StoryOptions = ({
  mode,
  onModeChange,
  availableModels,
  isAdultMode
}: StoryOptionsProps) => {
  const modes: { value: StoryMode; label: string; description: string }[] = [
    {
      value: 'original',
      label: 'Original',
      description: 'Mantém a história original, apenas adiciona os protagonistas'
    },
    {
      value: 'comedy',
      label: 'Comédia',
      description: 'Transforma a história em uma comédia'
    },
    {
      value: 'adult',
      label: '+18',
      description: 'Inclui cenas adultas e explícitas'
    }
  ];

  return (
    <div className="options-section">
      <h2>Opções de História</h2>
      
      <div className="option-group">
        <label>Modo da História</label>
        <div className="radio-group">
          {modes.map((m) => (
            <label key={m.value} className="radio-label">
              <input
                type="radio"
                name="storyMode"
                value={m.value}
                checked={mode === m.value}
                onChange={() => onModeChange(m.value)}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{m.label}</span>
                <small style={{ 
                  fontSize: '0.7rem', 
                  color: 'var(--text-tertiary)',
                  marginTop: '2px'
                }}>
                  {m.description}
                </small>
              </div>
            </label>
          ))}
        </div>
      </div>

      {mode === 'adult' && (
        <div className="option-group">
          <label>
            <input
              type="checkbox"
              checked={isAdultMode}
              onChange={(e) => onModeChange(e.target.checked ? 'adult' : 'original')}
              style={{ marginRight: '8px' }}
            />
            Incluir atos explícitos
          </label>
        </div>
      )}

      <div className="option-group">
        <label>Estilo da História</label>
        <p style={{ 
          color: 'var(--text-tertiary)', 
          fontSize: '0.85rem',
          marginTop: '5px'
        }}>
          {mode === 'original' && 'A história será mantida fiel ao original, com seus amigos adicionados.'}
          {mode === 'comedy' && 'A história será transformada em uma comédia com situações engraçadas.'}
          {mode === 'adult' && 'A história incluirá cenas +18 com seus amigos como protagonistas.'}
        </p>
      </div>
    </div>
  );
};

export default StoryOptions;
