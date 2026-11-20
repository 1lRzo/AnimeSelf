import { StoryPart } from '../types';

interface StoryNavigationProps {
  currentPartIndex: number;
  totalParts: number;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const StoryNavigation = ({
  currentPartIndex,
  totalParts,
  onNext,
  onPrevious,
  isLoading,
  hasMore
}: StoryNavigationProps) => {
  return (
    <div style={{
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginTop: '30px',
      padding: '20px 0',
      borderTop: '1px solid var(--border)',
      flexWrap: 'wrap'
    }}>
      <button
        className="btn btn-secondary"
        onClick={onPrevious}
        disabled={currentPartIndex === 0}
        style={{ minWidth: '120px' }}
      >
        ← Voltar
      </button>

      <span style={{
        color: 'var(--text-secondary)',
        padding: '10px 15px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '4px',
        minWidth: '120px',
        textAlign: 'center'
      }}>
        Parte {currentPartIndex + 1} de {totalParts}
      </span>

      {hasMore && (
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={isLoading}
          style={{ minWidth: '120px' }}
        >
          {isLoading ? 'Gerando...' : 'Continuar História →'}
        </button>
      )}

      {!hasMore && totalParts > 1 && (
        <button
          className="btn btn-secondary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ minWidth: '120px' }}
        >
          Voltar ao Topo ↑
        </button>
      )}
    </div>
  );
};

export default StoryNavigation;
