import { useState, useEffect } from 'react';
import { Anime, Protagonist, StoryMode, ModelType, StoryRequest, StoryResponse } from './types';
import AnimeSearch from './components/AnimeSearch';
import ProtagonistList from './components/ProtagonistList';
import StoryOptions from './components/StoryOptions';
import StoryDisplay from './components/StoryDisplay';
import WarningOverlay from './components/WarningOverlay';
import AddProtagonistModal from './components/AddProtagonistModal';

const App = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [protagonists, setProtagonists] = useState<Protagonist[]>([]);
  const [storyMode, setStoryMode] = useState<StoryMode>('original');
  const [selectedModel, setSelectedModel] = useState<ModelType>('mimo-v2.6-flash:free');
  const [includeActs, setIncludeActs] = useState(false);
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<ModelType[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/story/models');
        const data = await response.json();
        setAvailableModels(data.models || ['mimo-v2.6-flash:free', 'deepseek-v4.1-flash:free']);
      } catch (err) {
        setAvailableModels(['mimo-v2.6-flash:free', 'deepseek-v4.1-flash:free']);
      }
    };
    fetchModels();
  }, []);

  const handleAcceptWarning = () => {
    setShowWarning(false);
  };

  const handleSelectAnime = (anime: Anime) => {
    setSelectedAnime(anime);
    setError(null);
  };

  const handleAddProtagonist = (protagonist: Protagonist) => {
    setProtagonists([...protagonists, protagonist]);
    setShowModal(false);
  };

  const handleRemoveProtagonist = (id: string) => {
    setProtagonists(protagonists.filter(p => p.id !== id));
  };

  const handleGenerateStory = async () => {
    if (!selectedAnime) {
      setError('Selecione um anime primeiro');
      return;
    }

    if (protagonists.length === 0) {
      setError('Adicione pelo menos um protagonista');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: StoryRequest = {
        anime: selectedAnime,
        protagonists,
        mode: storyMode,
        model: selectedModel,
        includeActs: includeActs && storyMode === 'adult'
      };

      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar a história');
      }

      const data: StoryResponse = await response.json();
      setStory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = selectedAnime && protagonists.length > 0 && !isLoading;

  return (
    <div className="app-container">
      {showWarning && <WarningOverlay onAccept={handleAcceptWarning} />}
      
      {showModal && (
        <AddProtagonistModal
          onClose={() => setShowModal(false)}
          onSave={handleAddProtagonist}
        />
      )}

      <header className="header">
        <h1>AnimeSelf</h1>
        <p>Reformule histórias de anime com seus amigos</p>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <AnimeSearch 
            onSelectAnime={handleSelectAnime} 
            selectedAnime={selectedAnime}
          />
          
          <ProtagonistList
            protagonists={protagonists}
            onAdd={() => setShowModal(true)}
            onRemove={handleRemoveProtagonist}
          />
          
          <StoryOptions
            mode={storyMode}
            onModeChange={setStoryMode}
            model={selectedModel}
            onModelChange={setSelectedModel}
            availableModels={availableModels}
            includeActs={includeActs}
            onIncludeActsChange={setIncludeActs}
            isAdultMode={storyMode === 'adult'}
          />
          
          <button
            className="generate-btn"
            onClick={handleGenerateStory}
            disabled={!canGenerate || isLoading}
          >
            {isLoading ? 'Gerando...' : 'Gerar História'}
          </button>
          
          {error && (
            <div style={{ 
              color: '#ff4444', 
              marginTop: '10px', 
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
        </aside>

        <main className="content-area">
          <div className="content-header">
            <h2>História Gerada</h2>
            <div className="model-selector">
              <label>Modelo:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                className="select-input"
              >
                {availableModels.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <StoryDisplay
            story={story}
            isLoading={isLoading}
            anime={selectedAnime}
            protagonists={protagonists}
            mode={storyMode}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
