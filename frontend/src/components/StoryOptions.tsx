import { StoryMode, ModelType, FREE_MODELS, ALL_FREE_MODELS } from '../types';

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
    // Mistral AI
    'mimo-v2.6-flash:free': 'Mimo v2.6 (Mistral)',
    'deepseek-v4.1-flash:free': 'DeepSeek v4.1 (Mistral)',
    
    // LM Studio
    'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q': 'LM Studio (Local)',
    
    // Hugging Face
    'NousResearch/Llama-2-7b-chat': 'Llama 2 7B (Hugging Face)',
    'mistralai/Mistral-7B-Instruct-v0.1': 'Mistral 7B (Hugging Face)',
    'microsoft/Phi-3-mini-4k-instruct': 'Phi-3 Mini (Hugging Face)',
    'google/gemma-7b-it': 'Gemma 7B (Hugging Face)',
    
    // OpenRouter
    'llama-2-7b-chat': 'Llama 2 7B (OpenRouter)',
    'phi-2': 'Phi-2 (OpenRouter)'
  };

  // Modelos com requerimentos
  const modelRequirements: Record<string, string> = {
    'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q': 'Requer LM Studio rodando localmente (localhost:1234)',
    'NousResearch/Llama-2-7b-chat': 'Requer Hugging Face API Key',
    'mistralai/Mistral-7B-Instruct-v0.1': 'Requer Hugging Face API Key',
    'microsoft/Phi-3-mini-4k-instruct': 'Requer Hugging Face API Key',
    'google/gemma-7b-it': 'Requer Hugging Face API Key',
    'llama-2-7b-chat': 'Requer OpenRouter API Key',
    'phi-2': 'Requer OpenRouter API Key'
  };

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
        <label>Modelo de IA (Provedor)</label>
        
        {/* Provedores organizados */}
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Mistral AI
          </strong>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="select-input"
            style={{ width: '100%', margin: '5px 0' }}
          >
            {FREE_MODELS.mistral.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelLabels[modelOption] || modelOption}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            LM Studio (Local)
          </strong>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="select-input"
            style={{ width: '100%', margin: '5px 0' }}
          >
            {FREE_MODELS.lmstudio.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelLabels[modelOption] || modelOption}
              </option>
            ))}
          </select>
          {model === FREE_MODELS.lmstudio[0] && (
            <small style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              ⚠️ {modelRequirements[model]}
            </small>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Hugging Face
          </strong>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="select-input"
            style={{ width: '100%', margin: '5px 0' }}
          >
            {FREE_MODELS.huggingface.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelLabels[modelOption] || modelOption}
              </option>
            ))}
          </select>
          {FREE_MODELS.huggingface.includes(model as string) && (
            <small style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              ⚠️ {modelRequirements[model]}
            </small>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            OpenRouter
          </strong>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="select-input"
            style={{ width: '100%', margin: '5px 0' }}
          >
            {FREE_MODELS.openrouter.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelLabels[modelOption] || modelOption}
              </option>
            ))}
          </select>
          {FREE_MODELS.openrouter.includes(model as string) && (
            <small style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              ⚠️ {modelRequirements[model]}
            </small>
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
