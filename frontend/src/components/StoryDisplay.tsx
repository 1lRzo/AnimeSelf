import { StoryResponse, Anime, Protagonist, StoryMode } from '../types';

interface StoryDisplayProps {
  story: StoryResponse | null;
  isLoading: boolean;
  anime: Anime | null;
  protagonists: Protagonist[];
  mode: StoryMode;
}

const StoryDisplay = ({ story, isLoading, anime, protagonists, mode }: StoryDisplayProps) => {
  const getModeLabel = () => {
    switch (mode) {
      case 'original': return 'Original';
      case 'comedy': return 'Comédia';
      case 'adult': return '+18';
      default: return 'Original';
    }
  };

  const formatStory = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  if (isLoading) {
    return (
      <div className="story-container">
        <div className="loading">
          <div className="spinner"></div>
          <span style={{ marginLeft: '15px' }}>Gerando sua história...</span>
        </div>
      </div>
    );
  }

  if (!story && !isLoading) {
    return (
      <div className="story-container">
        <div className="empty-state">
          <h3>Nenhuma história gerada ainda</h3>
          <p>Selecione um anime, adicione protagonistas e clique em "Gerar História"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <div className="story-header">
        <h3>
          {anime?.title} - {getModeLabel()}
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap',
          marginTop: '10px'
        }}>
          <span style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-tertiary)'
          }}>
            {protagonists.length} protagonista(s)
          </span>
          {mode === 'adult' && (
            <span style={{ 
              fontSize: '0.85rem', 
              color: 'var(--accent)'
            }}>
              ✓ Conteúdo +18
            </span>
          )}
        </div>
      </div>

      <div className="story-content">
        {formatStory(story?.story || '')}
      </div>

      {story?.acts && story.acts.length > 0 && (
        <div className="acts-section">
          <h4>Atos</h4>
          <div className="act-list">
            {story.acts.map((act, index) => (
              <div key={index} className="act-item">
                <h5>Ato {index + 1}</h5>
                <p>{act}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '30px', 
        paddingTop: '20px', 
        borderTop: '1px solid var(--border)',
        fontSize: '0.8rem',
        color: 'var(--text-tertiary)'
      }}>
        <p>
          <strong>Nota:</strong> Esta história foi gerada por IA com base no anime original.
          Os personagens adicionados são fictícios e não fazem parte do anime original.
        </p>
      </div>
    </div>
  );
};

export default StoryDisplay;
