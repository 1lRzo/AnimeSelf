// Dados dos animes (simulando uma base de dados)
const animeDatabase = [
    {
        id: 1,
        title: "Naruto",
        image: "https://via.placeholder.com/250x180/ff7f00/ffffff?text=Naruto",
        synopsis: "Naruto Uzumaki, um jovem ninja, sonha em se tornar Hokage para ganhar o respeito de todos na aldeia.",
        protagonist: "Naruto Uzumaki",
        tags: ["famoso", "ação", "aventura"],
        genre: "Shonen"
    },
    {
        id: 2,
        title: "One Piece",
        image: "https://via.placeholder.com/250x180/4169e1/ffffff?text=One+Piece",
        synopsis: "Monkey D. Luffy e sua tripulação partem em busca do tesouro lendário, o One Piece, para se tornarem os Reis dos Piratas.",
        protagonist: "Monkey D. Luffy",
        tags: ["famoso", "ação", "aventura"],
        genre: "Shonen"
    },
    {
        id: 3,
        title: "Attack on Titan",
        image: "https://via.placeholder.com/250x180/8b0000/ffffff?text=AOT",
        synopsis: "A humanidade luta pela sobrevivência contra Titãs gigantes que devoram humanos.",
        protagonist: "Eren Yeager",
        tags: ["famoso", "ação", "drama"],
        genre: "Seinen"
    },
    {
        id: 4,
        title: "Death Note",
        image: "https://via.placeholder.com/250x180/000000/ffffff?text=Death+Note",
        synopsis: "Light Yagami encontra um caderno sobrenatural que pode matar qualquer pessoa cujo nome seja escrito nele.",
        protagonist: "Light Yagami",
        tags: ["famoso", "mistério", "psicológico"],
        genre: "Seinen"
    },
    {
        id: 5,
        title: "My Hero Academia",
        image: "https://via.placeholder.com/250x180/dc143c/ffffff?text=MHA",
        synopsis: "Em um mundo onde superpoderes são comuns, Izuku Midoriya sonha em se tornar o maior herói.",
        protagonist: "Izuku Midoriya",
        tags: ["famoso", "ação", "superpoderes"],
        genre: "Shonen"
    },
    {
        id: 6,
        title: "Demon Slayer",
        image: "https://via.placeholder.com/250x180/4b0082/ffffff?text=Demon+Slayer",
        synopsis: "Tanjiro Kamado se torna um caçador de demônios para vingar sua família e curar sua irmã Nezuko.",
        protagonist: "Tanjiro Kamado",
        tags: ["famoso", "ação", "sobrenatural"],
        genre: "Shonen"
    },
    {
        id: 7,
        title: "Jujutsu Kaisen",
        image: "https://via.placeholder.com/250x180/20b2aa/ffffff?text=JJK",
        synopsis: "Yuji Itadori engole um dedo amaldiçoado e se torna o hospedeiro de Sukuna, o Rei das Maldições.",
        protagonist: "Yuji Itadori",
        tags: ["famoso", "ação", "sobrenatural"],
        genre: "Shonen"
    },
    {
        id: 8,
        title: "Chainsaw Man",
        image: "https://via.placeholder.com/250x180/ff0000/ffffff?text=Chainsaw+Man",
        synopsis: "Denji, um caçador de demônios, funde seu corpo com seu cachorro demônio Pochita para se tornar o Homem Motoserra.",
        protagonist: "Denji",
        tags: ["famoso", "ação", "horror"],
        genre: "Seinen"
    },
    {
        id: 9,
        title: "Boku no Pico",
        image: "https://via.placeholder.com/250x180/ff69b4/ffffff?text=Boku+no+Pico",
        synopsis: "História de um menino que descobre o amor em um cruzeiro de verão.",
        protagonist: "Pico",
        tags: ["hentai", "BL"],
        genre: "Hentai",
        adult: true
    },
    {
        id: 10,
        title: "Emergence",
        image: "https://via.placeholder.com/250x180/ff1493/ffffff?text=Emergence",
        synopsis: "Um grupo de estudantes se envolve em situações íntimas durante um festival escolar.",
        protagonist: "Vários",
        tags: ["hentai", "ecchi"],
        genre: "Hentai",
        adult: true
    },
    {
        id: 11,
        title: "Bible Black",
        image: "https://via.placeholder.com/250x180/4b0082/ffffff?text=Bible+Black",
        synopsis: "Mistérios sobrenaturais e desejos proibidos em uma escola.",
        protagonist: "Takashiro",
        tags: ["hentai", "sobrenatural"],
        genre: "Hentai",
        adult: true
    },
    {
        id: 12,
        title: "Dragon Ball",
        image: "https://via.placeholder.com/250x180/ffa500/ffffff?text=Dragon+Ball",
        synopsis: "Goku e seus amigos protegem a Terra de diversos vilões poderosos.",
        protagonist: "Son Goku",
        tags: ["famoso", "ação", "aventura"],
        genre: "Shonen"
    },
    {
        id: 13,
        title: "Bleach",
        image: "https://via.placeholder.com/250x180/000000/ffffff?text=Bleach",
        synopsis: "Ichigo Kurosaki ganha poderes de Shinigami e protege humanos de espíritos malignos.",
        protagonist: "Ichigo Kurosaki",
        tags: ["famoso", "ação", "sobrenatural"],
        genre: "Shonen"
    },
    {
        id: 14,
        title: "Tokyo Revengers",
        image: "https://via.placeholder.com/250x180/8a2be2/ffffff?text=Tokyo+Revengers",
        synopsis: "Takemichi Hanagaki viaja no tempo para salvar sua namorada e mudar o futuro de sua gangue.",
        protagonist: "Takemichi Hanagaki",
        tags: ["famoso", "ação", "drama"],
        genre: "Shonen"
    },
    {
        id: 15,
        title: "Spy x Family",
        image: "https://via.placeholder.com/250x180/daa520/ffffff?text=Spy+x+Family",
        synopsis: "Um espião, uma assassina e uma menina telepatia formam uma família falsa cheia de situações cômicas.",
        protagonist: "Loid Forger",
        tags: ["famoso", "comédia", "ação"],
        genre: "Shonen"
    }
];

// Variáveis globais
let selectedAnime = null;
let customProtagonists = [];
let isAdultContent = false;
let comedyIntensity = 5;

// Elementos DOM
dconst animeGrid = document.getElementById('anime-grid');
dconst searchInput = document.getElementById('anime-search');
dconst searchBtn = document.getElementById('search-btn');
dconst showAllCheckbox = document.getElementById('show-all');
dconst filterHentai = document.getElementById('filter-hentai');
dconst filterFamous = document.getElementById('filter-famous');
dconst editModal = document.getElementById('edit-modal');
dconst closeModal = document.getElementById('close-modal');
dconst cancelBtn = document.getElementById('cancel-btn');
dconst selectedAnimeTitle = document.getElementById('selected-anime-title');
dconst selectedAnimeImg = document.getElementById('selected-anime-img');
dconst selectedAnimeSynopsis = document.getElementById('selected-anime-synopsis');
dconst originalProtagonist = document.getElementById('original-protagonist');
dconst newProtagonistInput = document.getElementById('new-protagonist');
dconst addProtagonistBtn = document.getElementById('add-protagonist-btn');
dconst protagonistsList = document.getElementById('protagonists-list');
dconst adultContentToggle = document.getElementById('adult-content-toggle');
dconst comedyIntensitySlider = document.getElementById('comedy-intensity');
dconst comedyValue = document.getElementById('comedy-value');
dconst generateBtn = document.getElementById('generate-btn');
dconst storySection = document.getElementById('story-section');
dconst storyTitle = document.getElementById('story-title');
dconst storyRating = document.getElementById('story-rating');
dconst protagonistsCount = document.getElementById('protagonists-count');
dconst storyContent = document.getElementById('story-content');
dconst backToEdit = document.getElementById('back-to-edit');
dconst saveStory = document.getElementById('save-story');
dconst shareStory = document.getElementById('share-story');

// Funções de inicialização
function init() {
    renderAnimeGrid(animeDatabase);
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    showAllCheckbox.addEventListener('change', handleSearch);
    filterHentai.addEventListener('change', handleSearch);
    filterFamous.addEventListener('change', handleSearch);
    
    closeModal.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    
    addProtagonistBtn.addEventListener('click', addProtagonist);
    newProtagonistInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') addProtagonist();
    });
    
    adultContentToggle.addEventListener('change', (e) => {
        isAdultContent = e.target.checked;
    });
    
    comedyIntensitySlider.addEventListener('input', (e) => {
        comedyIntensity = parseInt(e.target.value);
        comedyValue.textContent = comedyIntensity;
    });
    
    generateBtn.addEventListener('click', generateStory);
    backToEdit.addEventListener('click', () => {
        storySection.style.display = 'none';
        editModal.classList.add('active');
    });
    
    saveStory.addEventListener('click', saveStoryToLocalStorage);
    shareStory.addEventListener('click', shareGeneratedStory);
}

// Renderizar grid de animes
function renderAnimeGrid(animes) {
    animeGrid.innerHTML = '';
    
    if (animes.length === 0) {
        animeGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-light);">Nenhum anime encontrado.</p>';
        return;
    }
    
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-card-info">
                <h3>${anime.title}</h3>
                <p>${anime.synopsis.substring(0, 100)}...</p>
                <div class="anime-card-tags">
                    ${anime.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openEditModal(anime));
        animeGrid.appendChild(card);
    });
}

// Tratar pesquisa
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const showAll = showAllCheckbox.checked;
    const showHentai = filterHentai.checked;
    const showFamous = filterFamous.checked;
    
    let filteredAnimes = animeDatabase.filter(anime => {
        const matchesSearch = anime.title.toLowerCase().includes(searchTerm) ||
                             anime.synopsis.toLowerCase().includes(searchTerm);
        
        if (showAll) return matchesSearch;
        
        const hasHentaiTag = anime.tags.includes('hentai');
        const hasFamousTag = anime.tags.includes('famoso');
        
        let matchesFilter = true;
        
        if (showHentai && !showFamous) {
            matchesFilter = hasHentaiTag;
        } else if (showFamous && !showHentai) {
            matchesFilter = hasFamousTag;
        } else if (showHentai && showFamous) {
            matchesFilter = hasHentaiTag || hasFamousTag;
        }
        
        return matchesSearch && matchesFilter;
    });
    
    renderAnimeGrid(filteredAnimes);
}

// Abrir modal de edição
function openEditModal(anime) {
    selectedAnime = anime;
    customProtagonists = [];
    isAdultContent = false;
    comedyIntensity = 5;
    
    selectedAnimeTitle.textContent = anime.title;
    selectedAnimeImg.src = anime.image;
    selectedAnimeSynopsis.textContent = anime.synopsis;
    originalProtagonist.textContent = anime.protagonist;
    
    updateProtagonistsList();
    adultContentToggle.checked = false;
    comedyIntensitySlider.value = 5;
    comedyValue.textContent = '5';
    
    editModal.classList.add('active');
    storySection.style.display = 'none';
}

// Fechar modal de edição
function closeEditModal() {
    editModal.classList.remove('active');
    selectedAnime = null;
    customProtagonists = [];
}

// Adicionar protagonista
function addProtagonist() {
    const name = newProtagonistInput.value.trim();
    
    if (name === '') return;
    
    if (!customProtagonists.includes(name)) {
        customProtagonists.push(name);
        updateProtagonistsList();
    }
    
    newProtagonistInput.value = '';
}

// Atualizar lista de protagonistas
function updateProtagonistsList() {
    protagonistsList.innerHTML = '';
    
    customProtagonists.forEach((protagonist, index) => {
        const tag = document.createElement('div');
        tag.className = 'protagonist-tag';
        tag.innerHTML = `
            ${protagonist}
            <span class="remove" onclick="removeProtagonist(${index})">×</span>
        `;
        protagonistsList.appendChild(tag);
    });
}

// Remover protagonista
function removeProtagonist(index) {
    customProtagonists.splice(index, 1);
    updateProtagonistsList();
}

// Gerar história
function generateStory() {
    if (!selectedAnime || customProtagonists.length === 0) {
        alert('Por favor, adicione pelo menos um protagonista!');
        return;
    }
    
    const story = generateCustomStory();
    
    storyTitle.textContent = `${selectedAnime.title} - ${customProtagonists.join(' & ')} Edition`;
    storyRating.textContent = isAdultContent ? '+18' : 'Livre';
    protagonistsCount.textContent = `${customProtagonists.length} Protagonista(s)`;
    storyContent.innerHTML = story;
    
    editModal.classList.remove('active');
    storySection.style.display = 'block';
    
    // Rolar para a seção da história
    storySection.scrollIntoView({ behavior: 'smooth' });
}

// Gerar história personalizada
function generateCustomStory() {
    const originalProt = selectedAnime.protagonist;
    const newProtagonists = [...customProtagonists];
    const animeTitle = selectedAnime.title;
    
    let story = '';
    
    // Introdução
    story += `<p>Em um mundo alternativo de <strong class="highlight">${animeTitle}</strong>, a história toma um rumo inesperado quando...`;
    
    if (newProtagonists.length === 1) {
        story += ` <strong class="highlight">${newProtagonists[0]}</strong> assume o lugar de ${originalProt} como o novo protagonista!`;
    } else {
        story += ` <strong class="highlight">${newProtagonists.join(', ')}</strong> formam uma equipe para substituir ${originalProt}!`;
    }
    story += `</p>`;
    
    // Desenvolvimento da história
    story += `<p>A aventura começa quando ${newProtagonists.join(' e ')} ${getStoryOpening(selectedAnime)}`;
    
    if (isAdultContent) {
        story += `<p class="adult-content">🔥 <strong>Cena +18:</strong> ${getAdultScene(newProtagonists, selectedAnime)}</p>`;
    }
    
    // Comédia
    story += `<p>${getComedyScene(newProtagonists, selectedAnime)}`;
    
    // Clímax
    story += `<p>No clímax da história, ${getClimaxScene(newProtagonists, selectedAnime)}`;
    
    // Final
    story += `<p>${getEndingScene(newProtagonists, selectedAnime)}`;
    
    // Assinatura
    story += `<p><em>— Fim da história personalizada de ${animeTitle} —</em></p>`;
    
    return story;
}

// Funções para gerar cenas específicas
function getStoryOpening(anime) {
    const openings = {
        'Naruto': `se deparam com um desafio épico na Aldeia da Folha. Desta vez, eles precisam provar seu valor não apenas como ninjas, mas como uma equipe unida.`,
        'One Piece': `encontram um mapa antigo que pode levá-los ao One Piece. Mas o caminho está cheio de armadilhas e rivais inesperados.`,
        'Attack on Titan': `descobrem uma brecha nas paredes que pode ser a chave para a vitória contra os Titãs. Mas o preço a pagar é alto.`,
        'Death Note': `encontram um Death Note abandonado e precisam decidir como usá-lo sem se tornarem monstros.`,
        'My Hero Academia': `são aceitos na UA e precisam provar que merecem estar entre os melhores heróis do mundo.`,
        'Demon Slayer': `se juntam à corporação dos caçadores de demônios para vingar suas famílias e proteger os inocentes.`,
        'Jujutsu Kaisen': `são recrutados por Jujutsu High para combater maldições que ameaçam o mundo.`,
        'Chainsaw Man': `fazem um pacto com demônios para sobreviver em um mundo cheio de perigos sobrenaturais.`,
        'Dragon Ball': `partem em busca das Esferas do Dragão para realizar seus desejos mais prementes.`,
        'Bleach': `ganham poderes espirituais e precisam proteger o mundo dos humanos de espíritos malignos.`,
        'Tokyo Revengers': `viajam no tempo para mudar o futuro de sua gangue e salvar seus entes queridos.`,
        'Spy x Family': `formam uma família falsa e se veem envolvidos em missões secretas cheias de reviravoltas.`,
        'Boku no Pico': `embarcam em um cruzeiro de verão onde o amor e a amizade se misturam de maneiras inesperadas.`,
        'Emergence': `participam de um festival escolar onde segredos e desejos vêm à tona.`,
        'Bible Black': `descobrem um livro místico que desperta poderes e desejos proibidos.`
    };
    
    return openings[anime.title] || `embarcam em uma jornada cheia de desafios e descobertas.`;
}

function getAdultScene(protagonists, anime) {
    const scenes = {
        'Naruto': `Em um momento de tensão, ${protagonists.join(' e ')} se encontram em uma situação íntima durante uma missão noturna. As coisas esquentam quando ${protagonists[0]} acidentalmente usa um jutsu de transformação que revela mais do que o planejado!`,
        'One Piece': `Durante uma parada em uma ilha desertada, ${protagonists.join(' e ')} decidem relaxar em uma fonte termal. Mas quando Luffy acidentalmente olha, uma perseguição cômica (e sensual) começa!`,
        'Attack on Titan': `Em um refúgio seguro, ${protagonists.join(' e ')} compartilham um momento de vulnerabilidade. A tensão da batalha dá lugar a um desejo reprimido que explode em paixão.`,
        'Death Note': `Light e ${protagonists.join(' e ')} se envolvem em um jogo de sedução e manipulação. Quem será que vai dominar quem?`,
        'My Hero Academia': `Durante um treinamento noturno, ${protagonists.join(' e ')} acidentalmente ativam seus quirks de maneiras... interessantes. As roupas não resistem!`,
        'Demon Slayer': `Após uma batalha exaustiva, ${protagonists.join(' e ')} encontram refúgio em uma casa de banho tradicional. A água quente e o cansaço levam a situações imprevistas.`,
        'Jujutsu Kaisen': `Em uma missão de infiltração, ${protagonists.join(' e ')} precisam se disfarçar como um casal. O disfarce fica um pouco real demais!`,
        'Chainsaw Man': `Denji e ${protagonists.join(' e ')} têm um encontro inesperado em um quarto de hotel. As coisas ficam quentes quando o Motoserra... não, melhor não falarmos sobre isso.`,
        'Dragon Ball': `Após um treinamento exaustivo na sala do tempo, ${protagonists.join(' e ')} decidem relaxar. Mas com o ki tão alto, as coisas saem do controle!`,
        'Bleach': `Em uma missão no mundo espiritual, ${protagonists.join(' e ')} se perdem e encontram um lugar... privado. A tensão espiritual dá lugar a outro tipo de tensão.`,
        'Tokyo Revengers': `Em um beijo sob a chuva, ${protagonists.join(' e ')} rediscoverem sentimentos do passado. A gangue nunca foi tão... íntima.`,
        'Spy x Family': `Loid e Yor têm uma noite de casal, mas ${protagonists.join(' e ')} decidem participar. As missões secretas nunca foram tão... secretas.`
    };
    
    return scenes[anime.title] || `Em um momento de proximidade, ${protagonists.join(' e ')} exploram seus desejos mais profundos. A paixão e o humor se misturam em uma cena inesquecível.`;
}

function getComedyScene(protagonists, anime) {
    const intensity = Math.min(comedyIntensity, 10);
    const intensityText = ['leve', 'divertida', 'hilariante', 'absurda'][Math.floor(intensity / 3)];
    
    const scenes = {
        'Naruto': `Durante um exame chunin, ${protagonists.join(' e ')} acidentalmente liberam um jutsu que transforma todos em... porcos! A confusão é total e o riso é garantido.`,
        'One Piece': `Luffy e ${protagonists.join(' e ')} decidem fazer uma aposta: quem consegue comer mais comida. O resultado? Todos acabam... de uma maneira que ninguém esperava!`,
        'Attack on Titan': `Em um momento de tensão, ${protagonists[0]} tropeça e cai em cima de ${protagonists[1]}, que por sua vez esbarra em Levi. O resultado é uma pilha de corpos e um Levi extremamente irritado.`,
        'Death Note': `Light tenta explicar o Death Note para ${protagonists.join(' e ')}, mas acidentalmente escreve o nome errado. O resultado é uma situação tão absurda que até L ficaria confuso.`,
        'My Hero Academia': `${protagonists.join(' e ')} tentam criar um Quirk combinado, mas o resultado é um desastre cômico que deixa toda a classe rindo por dias.`,
        'Demon Slayer': `Durante uma batalha, ${protagonists.join(' e ')} usam a respiração errada e acabam... dançando! Os demônios não sabem se devem rir ou fugir.`,
        'Jujutsu Kaisen': `Gojo convida ${protagonists.join(' e ')} para um treinamento. O resultado? Todos acabam vestidos de... coelhinhos? Nem Megumi entende.`,
        'Chainsaw Man': `Denji e ${protagonists.join(' e ')} tentam cozinhar juntos. O resultado é uma cozinha destruída e um jantar... questionável.`
    };
    
    return scenes[anime.title] || `Em uma cena ${intensityText}, ${protagonists.join(' e ')} se envolvem em uma situação tão engraçada que até os personagens originais não conseguem parar de rir.`;
}

function getClimaxScene(protagonists, anime) {
    const scenes = {
        'Naruto': `No clímax, ${protagonists.join(' e ')} enfrentam o vilão principal. Com suas habilidades únicas e trabalho em equipe, eles provam que a amizade é a chave para a vitória.`,
        'One Piece': `No momento decisivo, ${protagonists.join(' e ')} usam o Gear 5 (ou algo parecido) para derrotar o inimigo e salvar seus amigos.`,
        'Attack on Titan': `No combate final, ${protagonists.join(' e ')} revelam um plano brilhante que muda o rumo da guerra contra os Titãs.`,
        'Death Note': `No duelo final, ${protagonists.join(' e ')} usam sua inteligência para desvendar o mistério por trás do Death Note e salvar o mundo.`,
        'My Hero Academia': `No torneio, ${protagonists.join(' e ')} mostram ao mundo que são os heróis que todos precisavam.`,
        'Demon Slayer': `Na batalha final, ${protagonists.join(' e ')} dominam a respiração do sol e derrotam o demônio mais poderoso.`
    };
    
    return scenes[anime.title] || `No clímax da história, ${protagonists.join(' e ')} enfrentam seu maior desafio e provam que juntos são imparáveis.`;
}

function getEndingScene(protagonists, anime) {
    const endings = {
        'Naruto': `No final, ${protagonists.join(' e ')} são reconhecidos como heróis da aldeia e celebram com um grande festival. A paz finalmente reina na Aldeia da Folha.`,
        'One Piece': `No final, ${protagonists.join(' e ')} encontram o One Piece e se tornam os Reis dos Piratas. A tripulação celebra com uma grande festa em um novo mundo de possibilidades.`,
        'Attack on Titan': `No final, ${protagonists.join(' e ')} conseguem a liberdade para a humanidade. O mundo finalmente conhece a paz.`,
        'Death Note': `No final, ${protagonists.join(' e ')} decidem destruir o Death Note e viver uma vida normal. O mundo volta à tranquilidade.`
    };
    
    return endings[anime.title] || `No final, ${protagonists.join(' e ')} celebram sua vitória e olham para o futuro com esperança, sabendo que juntos podem superar qualquer desafio.`;
}

// Salvar história no LocalStorage
function saveStoryToLocalStorage() {
    if (!selectedAnime || customProtagonists.length === 0) {
        alert('Não há história para salvar!');
        return;
    }
    
    const storyData = {
        anime: selectedAnime.title,
        protagonists: customProtagonists,
        isAdult: isAdultContent,
        comedyIntensity: comedyIntensity,
        story: storyContent.innerHTML,
        date: new Date().toISOString()
    };
    
    let savedStories = JSON.parse(localStorage.getItem('savedAnimeStories')) || [];
    savedStories.push(storyData);
    localStorage.setItem('savedAnimeStories', JSON.stringify(savedStories));
    
    alert('História salva com sucesso!');
}

// Compartilhar história
function shareGeneratedStory() {
    if (!selectedAnime || customProtagonists.length === 0) {
        alert('Não há história para compartilhar!');
        return;
    }
    
    const storyText = `Confira minha história personalizada de ${selectedAnime.title} com ${customProtagonists.join(', ')} como protagonistas! ${isAdultContent ? '(+18)' : ''}\n\n${storyContent.textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: `História de ${selectedAnime.title} - ${customProtagonists.join(' & ')}`,
            text: storyText,
            url: window.location.href
        }).catch(err => {
            console.error('Erro ao compartilhar:', err);
            fallbackShare(storyText);
        });
    } else {
        fallbackShare(storyText);
    }
}

function fallbackShare(text) {
    alert('Copie esta história para compartilhar:\n\n' + text);
}

// Inicializar a aplicação
init();
