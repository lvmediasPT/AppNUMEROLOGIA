/**
 * 💎 MÓDULO: PORTAL ANUAL
 * Objetivo: Entrega da vibração do Ano Pessoal
 * STATUS: BLINDADO
 */

import { BIBLIOTECA } from './biblioteca/index.js';

function reduzirEstrito(num) {
    let s = num;
    while (s > 9) {
        s = s.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return s;
}

async function gerarInterpretacao(titulo, numero, baseTexto, nome) {
    if (!baseTexto) return "A sabedoria para este número está a ser canalizada pelo Oráculo.";
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return baseTexto;

    try {
        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { 
                        role: "system", 
                        content: "És o Guardião Supremo da Cifra de Karnak. Realiza leituras profundas, místicas e espirituais baseadas rigorosamente na base sagrada fornecida. Expande o significado mantendo a essência, sem resumir, divagar ou alucinar. Usa <br> para parágrafos." 
                    },
                    { 
                        role: "user", 
                        content: `Realiza uma leitura profunda do ${titulo} número ${numero} para ${nome}. BASE SAGRADA: "${baseTexto}". Expande mantendo fidelidade total.` 
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!aiResponse.ok) return baseTexto;

        const aiData = await aiResponse.json();
        return aiData.choices[0].message.content;
    } catch (erro) {
        return baseTexto; 
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST permitido' });

    try {
        const { nome, dataNascimento } = req.body;
        
        if (!nome || !dataNascimento) {
            return res.status(400).json({ error: "Dados incompletos." });
        }

        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const anoAtual = new Date().getFullYear();
        
        // CÁLCULO DO ANO PESSOAL: Dia + Mês + Ano de Referência
        const anoP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(anoAtual));
        
        const interpretacao = await gerarInterpretacao('Ano Pessoal', anoP, BIBLIOTECA.portal_anual[String(anoP)], nome);

        return res.status(200).json({ 
            sucesso: true,
            tipo: 'portal-anual', 
            titulo: 'Portal Anual', 
            nomeUsuario: nome,
            resultado: anoP, 
            interpretacao,
            definicao: BIBLIOTECA.definicoes.portal_anual
        });

    } catch (erro) {
        return res.status(500).json({ error: "O Oráculo do Portal Anual está em silêncio." });
    }
}


