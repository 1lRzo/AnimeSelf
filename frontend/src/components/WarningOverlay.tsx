interface WarningOverlayProps {
  onAccept: () => void;
}

const WarningOverlay = ({ onAccept }: WarningOverlayProps) => {
  return (
    <div className="warning-overlay">
      <div className="warning-box">
        <h1>⚠️ Aviso Importante</h1>
        
        <p>
          Este site permite a geração de histórias baseadas em animes, <strong>incluindo conteúdo +18 e hentai</strong>.
        </p>
        
        <p>
          <strong>Este site NÃO é adequado para menores de 18 anos.</strong>
        </p>
        
        <p>
          Ao continuar, você declara que tem mais de 18 anos e aceita que todo o conteúdo gerado
          é fictício e não deve ser levado a sério.
        </p>
        
        <p>
          O uso deste site é de sua inteira responsabilidade.
        </p>
        
        <button onClick={onAccept}>
          Tenho mais de 18 anos - Entrar
        </button>
        
        <p style={{ 
          marginTop: '20px', 
          fontSize: '0.85rem', 
          color: 'var(--text-tertiary)'
        }}>
          Se você é menor de 18 anos, por favor, feche esta página.
        </p>
      </div>
    </div>
  );
};

export default WarningOverlay;
