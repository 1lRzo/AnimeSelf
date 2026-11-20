import { StoryMode, ModelType, FREE_MODELS } from '../types';

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
  model,
  onModelChange,
  availableModels,
  includeActs,
  onIncludeActsChange,
  isAdultMode
}: StoryOptionsProps) => {
  const modes: { value: StoryMode; label: string; description: string; emoji: string }[] = [
    {
      value: 'original',
      label: 'Original',
      description: 'Mantém a história original, apenas adiciona os protagonistas',
      emoji: '📖'
    },
    {
      value: 'comedy',
      label: 'Comédia',
      description: 'Transforma a história em uma comédia',
      emoji: '😂'
    },
    {
      value: 'adult',
      label: '+18',
      description: 'Inclui cenas adultas e explícitas',
      emoji: '🔥'
    }
  ];

  // Modelos com labels amigáveis
  const modelLabels: Record<string, string> = {
    'mimo-v2.6-flash:free': 'Mimo v2.6 (Mistral)',
    'deepseek-v4.1-flash:free': 'DeepSeek v4.1 (Mistral)',
    'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q': 'LM Studio (Local)',
    'mistral-7b-instruct': 'Mistral 7B',
    'llama-2-7b-chat': 'Llama 2 7B',
    'phi-2': 'Phi-2'
  };

  // Modelos agrupados por provedor
  const groupedModels = [
    {
      provider: 'Mistral AI',
      models: ['mimo-v2.6-flash:free', 'deepseek-v4.1-flash:free']
    },
    {
      provider: 'LM Studio (Local)',
      models: ['lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q']
    },
    {
      provider: 'Outros Modelos',
      models: ['mistral-7b-instruct', 'llama-2-7b-chat', 'phi-2']
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
                <span>{m.emoji} {m.label}</span>
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
              checked={includeActs}
              onChange={(e) => onIncludeActsChange(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Incluir atos explícitos
          </label>
        </div>
      )}

      <div className="option-group">
        <label>Modelo de IA</label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value as ModelType)}
          className="select-input"
          style={{ width: '100%', marginBottom: '10px' }}
        >
          {FREE_MODELS.map((modelOption) => (
            <option key={modelOption} value={modelOption}>
              {modelLabels[modelOption] || modelOption}
            </option>
          ))}
        </select>
        
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--text-tertiary)',
          marginTop: '5px'
        }}>
          {model === 'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q' && (
            <span>⚠️ Requer LM Studio rodando localmente (localhost:1234)</span>
          )}
          {model.includes('openrouter') && (
            <span>⚠️ Requer chave da OpenRouter</span>
          )}
        </div>
      </div>

      <div className="option-group">
        <label>Estilo da História</label>
        <p style={{ 
          color: 'var(--text-tertiary)', 
          fontSize: '0.85rem',
          marginTop: '5px'
        }}>
          {mode === 'original' && 'A história será mantida fiel ao original, com seus amigos adicionados.'}
          {mode === 'comedy' && 'A história será transformada em uma comédia com situações engraçadas.'}
          {mode === 'adult' && 'A história incluirá cenas +18 com seus amigos como protagonistas (heterossexuais).'}
        </p>
      </div>
    </div>
  );
};

export default StoryOptions;
