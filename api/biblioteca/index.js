Diferença
Original
Modificado
// api/biblioteca/index.js
import { alma } from './alma.js';
import { tempo } from './tempo.js';
// Os ficheiros abaixo serão criados futuramente
// import { redencao } from './redencao.js'; 
// import { vida } from './vida.js';          
// import { coracao } from './coracao.js';    
// import { fortuna } from './fortuna.js';    

export const BIBLIOTECA = {
    ...alma,     // Puxa todos os significados do Mapa da Alma
    ...tempo,    // Puxa todos os significados dos Portais
    // ...redencao, 
    // ...vida,      
    // ...coracao,   
    // ...fortuna,   

    // DEFINIÇÕES GERAIS (As tuas explicações místicas)
    definicoes: {
        // --- Mapa da Alma ---
        missao: "Este número assume um papel de destaque absoluto. Ele não é apenas um dado; é o reflexo da sua essência e define a missão específica que veio cumprir nesta existência.",
        motivacao: "Este número descreve o que motiva as suas decisões e o seu comportamento. Representa a ação e a maneira como você age para realizar as coisas.",
        impressao: "É o número que mostra o lado oculto da sua personalidade e a imagem que tem de si mesma/o, muitas vezes sem perceber. Revela a primeira impressão que causa nos outros antes de se conhecerem de verdade, ou seja, como é julgada/o à primeira vista.",
        expressao: "Este número descreve a forma como você interage com as outras pessoas. Revela os seus verdadeiros talentos e qual a melhor maneira de os demonstrar.",
        destino: "Este é um dos números mais importantes do seu Mapa Pessoal. Descreve a sua personalidade e mostra as oportunidades e os obstáculos que vai encontrar ao longo da vida. Além disso, aponta os caminhos que pode escolher e o que provavelmente resultará de cada um deles. Este número indica o caminho que a vida lhe reservou e as oportunidades que surgirão.",
        nascimento: "Entre os três elementos que compõem a data de nascimento — o dia, o mês e o ano —, o dia do nascimento assume o papel de maior destaque e importância. Este representa a sua vibração mais direta e pessoal, influenciando de forma decisiva a sua personalidade, os seus talentos inatos e a maneira como se apresenta ao mundo.",      

        // --- Subscrições e Consulta Data específica ---
        portal_anual: "A vida humana desenvolve-se em ciclos imutáveis de nove anos, onde cada ano (de 1 a 9) possui uma vibração numérica única que estabelece um conjunto específico de influências, oportunidades e obstáculos. Entender antecipadamente o que cada um desses anos sucessivos reserva é crucial...",
        portal_mensal: "O Portal Mensal é um estudo numerológico que analisa a vibração do mês pessoal em conjunto com a sequência dos números pessoais diários, calculados a partir da data de nascimento...",
        portal_diario: "Este estudo permite calcular o número pessoal que rege a vibração de um dia específico, a partir da data de nascimento e da data escolhida...",
        portal_tempo: "O Portal do Tempo é o acesso exclusivo ao seu mapa vibracional diário. Inclui a análise do Mês Pessoal e o acompanhamento detalhado dos seus Números Pessoais Diários para os próximos 30 dias.", // VÍRGULA CORRIGIDA AQUI

        // --- Mapa da Vida (Placeholders) ---
        ciclo_1: "",
        ciclo_2: "",
        ciclo_3: "",
        desafios_vida: "",
        momentos_decisivos: "",

        // --- Caminho da Redenção (Placeholders) ---
        tendencias_ocultas: "",
        resposta_subconsciente: "",
        licoes_carmicas: "",
        dividas_carmicas: "",
        grau_ascensao: "",

        // --- Chaves da Fortuna (Placeholders) ---
        numeros_afortunados: "",

        // --- Mapa do Coração (Placeholders) ---
        amor_pessoal: "",
        vibram_consigo: "",
        nao_vibram: "",
        desafios_coracao: "",
        alma_gemea: "",
        sinestesia_amor: ""
    }
};


