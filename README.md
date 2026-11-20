# Anime Story Maker

Um site minimalista para criar histórias personalizadas de animes.

## Funcionalidades

- 🔍 **Pesquisa de animes**: Encontre seus animes favoritos, incluindo hentai, animes famosos e muito mais
- 🎭 **Substituição de protagonistas**: Adicione um ou mais protagonistas para substituir o personagem principal
- 👥 **Histórias com amigos**: Crie uma história onde seus amigos (protagonistas adicionados) substituem o protagonista original
- 🔞 **+18 Mode**: Ative o modo adulto para incluir cenas de sexo e comédia em sua história
- 🎨 **Controle de intensidade**: Ajuste o nível de comédia da história
- 💾 **Salvar histórias**: Salve suas criações no navegador
- 📤 **Compartilhar**: Compartilhe suas histórias com amigos

## Como usar

1. **Pesquise um anime**: Digite o nome do anime na barra de pesquisa
2. **Selecione um anime**: Clique no card do anime desejado
3. **Adicione protagonistas**: Insira os nomes dos seus amigos ou personagens que irão substituir o protagonista
4. **Configure as opções**: 
   - Ative o toggle **+18** para conteúdo adulto
   - Ajuste a intensidade da comédia
5. **Gere a história**: Clique em "Gerar História"
6. **Salve ou compartilhe**: Salve sua criação ou compartilhe com amigos

## Estrutura do Projeto

```
anime-story-maker/
├── index.html    # Estrutura principal do site
├── style.css     # Estilos minimalistas
├── script.js     # Lógica da aplicação
└── README.md     # Este arquivo
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (Vanilla JS)
- LocalStorage para salvar histórias
- Web Share API para compartilhamento

## Animes Incluídos

O site vem com uma base de dados pré-definida contendo:
- Animes famosos (Naruto, One Piece, Attack on Titan, etc.)
- Hentais (Boku no Pico, Emergence, Bible Black, etc.)
- Outros animes populares

## Personalização

Você pode facilmente adicionar mais animes editando o array `animeDatabase` no arquivo `script.js`:

```javascript
const animeDatabase = [
    {
        id: 1,
        title: "Novo Anime",
        image: "URL_DA_IMAGEM",
        synopsis: "Descrição do anime...",
        protagonist: "Protagonista Original",
        tags: ["tag1", "tag2"],
        genre: "Gênero"
    },
    // ...
];
```

## Deploy

Para hospedar este site:

1. **GitHub Pages**: 
   - Crie um repositório no GitHub
   - Faça upload dos arquivos
   - Ative o GitHub Pages nas configurações

2. **Netlify/Vercel**:
   - Faça upload dos arquivos
   - O site será deployado automaticamente

3. **Servidor local**:
   - Basta abrir o `index.html` em um navegador

## Observações

- Este site é apenas para fins de diversão e entretenimento
- Todos os direitos dos animes pertence aos seus respectivos donos
- O conteúdo +18 é opcional e pode ser desativado

## Autor

Criado como um projeto de diversão para gerar histórias personalizadas de animes.
