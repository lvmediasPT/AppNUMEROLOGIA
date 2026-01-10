/**
 * 🛡️ MOTOR DE BLINDAGEM - A CIFRA DE KARNAK
 * Conteúdo Integral de Políticas e Lógica de Componentes
 */

const ID_PIXEL_META = '1579316702126374';

// 1. CARREGAR COMPONENTES
async function carregarComponentes() {
    const headerDestino = document.getElementById('header-shared');
    const footerDestino = document.getElementById('footer-shared');

    if (headerDestino) {
        const res = await fetch('/components/header.html');
        if (res.ok) headerDestino.innerHTML = await res.text();
    }
    if (footerDestino) {
        const res = await fetch('/components/footer.html');
        if (res.ok) {
            footerDestino.innerHTML = await res.text();
            verificarCookies();
        }
    }
}

// 2. PIXEL DO META
function ativarPixel() {
    if (window.fbq) return;

    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', ID_PIXEL_META);
    fbq('track', 'PageView');
}

// 3. GESTÃO DE COOKIES
function verificarCookies() {
    const consentimento = localStorage.getItem('cookieKarnak');
    const banner = document.getElementById('cookie-banner');
    if (!consentimento && banner) {
        banner.style.display = 'flex';
    } else if (consentimento === 'aceite') {
        ativarPixel();
    }
}

window.aceitarCookies = function() {
    localStorage.setItem('cookieKarnak', 'aceite');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
    ativarPixel();
};

// 4. TEXTOS LEGAIS INTEGRAIS
const TEXTOS_LEGAIS = {
    privacidade: `
        <h2>Política de Privacidade</h2>
        <p>A Cifra de Karnak respeita a sua privacidade. Esta política descreve como recolhemos, utilizamos e protegemos as suas informações pessoais ao utilizar o nosso site e serviços.</p>
        <h3>1. Informações que Recolhemos</h3>
        <p>Recolhemos apenas as informações necessárias para processar os seus cálculos numerológicos: nome completo e data de nascimento.</p>
        <h3>2. Uso das Informações</h3>
        <p>As informações fornecidas são processadas em tempo real para gerar as interpretações personalizadas. Não vendemos nem partilhamos os seus dados pessoais com terceiros para fins de marketing.</p>
        <h3>3. Segurança</h3>
        <p>Implementamos medidas de segurança adequadas para proteger os seus dados contra acesso não autorizado ou alteração.</p>
        <h3>4. Cookies</h3>
        <p>Utilizamos cookies técnicos e de desempenho (como o Pixel do Meta) para melhorar a sua experiência e medir a eficácia das nossas campanhas, sempre com base no seu consentimento.</p>
    `,
    termos: `
        <h2>Termos de Utilização</h2>
        <p>Ao aceder ao site A Cifra de Karnak, o utilizador concorda em cumprir estes termos de serviço:</p>
        <h3>1. Natureza do Serviço</h3>
        <p>O conteúdo fornecido é para fins de autoconhecimento, entretenimento e exploração espiritual. Não substitui aconselhamento médico, jurídico, financeiro ou psicológico profissional.</p>
        <h3>2. Propriedade Intelectual</h3>
        <p>Todo o conteúdo, incluindo textos, design e algoritmos de cálculo, é propriedade intelectual da Cifra de Karnak. A reprodução não autorizada é proibida.</p>
        <h3>3. Uso de Inteligência Artificial</h3>
        <p>O utilizador reconhece que as interpretações profundas são expandidas e interpretadas através de sistemas de inteligência artificial treinados com bases de conhecimento numerológico específicas.</p>
        <h3>4. Limitação de Responsabilidade</h3>
        <p>A Cifra de Karnak não se responsabiliza por decisões tomadas pelo utilizador com base nas interpretações fornecidas.</p>
    `,
    reembolsos: `
        <h2>Política de Reembolsos</h2>
        <p>De acordo com a legislação aplicável (Decreto-Lei n.º 24/2014), o direito de livre resolução não se aplica a conteúdos digitais personalizados cujo fornecimento tenha início após o consentimento do consumidor.</p>
        <p>Assim, <strong>não são efetuados reembolsos após a disponibilização do serviço</strong>, salvo em caso de erro técnico comprovado que impeça a leitura do conteúdo.</p>
        <h3>Aviso Legal</h3>
        <p>O conteúdo tem carácter informativo e simbólico. As interpretações não constituem garantias de resultados nem substituem aconselhamento profissional especializado.</p>
    `,
    contacto: `
        <h2>Contacto</h2>
        <p>Para qualquer questão relacionada com o site, serviços, dados pessoais ou pedidos de esclarecimento, poderá contactar-nos através do email:</p>
        <p style="color:#bf953f; font-weight:bold; font-size:1.2rem; margin-top:10px;">info.lvmedias@gmail.com</p>
    `
};

window.openModal = function(tipo) {
    const modalBody = document.getElementById('modalBody');
    const modal = document.getElementById('legalModal');
    if (modalBody && modal) {
        modalBody.innerHTML = TEXTOS_LEGAIS[tipo];
        modal.style.display = "block";
    }
};

window.closeModal = function() {
    const modal = document.getElementById('legalModal');
    if (modal) modal.style.display = "none";
};

window.onclick = function(event) {
    const modal = document.getElementById('legalModal');
    if (event.target == modal) modal.style.display = "none";
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', carregarComponentes);
