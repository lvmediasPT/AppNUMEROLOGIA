/**
 * 💎 MÓDULO: PORTAL DO TEMPO
 * Objetivo: Entrega da vibração de uma data específica (Dia Pessoal)
 * STATUS: BLINDADO
 */

import { BIBLIOTECA } from './biblioteca/index.js';

function reduzir(num, mestres = [11, 22]) {
    if (mestres.includes(num)) return num;
    let s = num;
    while (s > 9) {
        s = s.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        if (mestres.includes(s)) return s;
    }
    return s;
}

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
        const { nome, dataNascimento, dataEspecifica } = req.body;
        
        if (!nome || !dataNascimento) {
            return res.status(400).json({ error: "Dados incompletos." });
        }

        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const dataObj = new Date(dataEspecifica || new Date());
        
        // CÁLCULO DO DIA PESSOAL
        const aP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(dataObj.getFullYear()));
        const mP = reduzir(aP + reduzirEstrito(dataObj.getMonth() + 1));
        const dP = reduzir(mP + reduzirEstrito(dataObj.getDate()));
        
        const interpretacao = await gerarInterpretacao('Dia Pessoal', dP, BIBLIOTECA.portal_diario[String(dP)], nome);

        return res.status(200).json({ 
            sucesso: true,
            tipo: 'portal-tempo', 
            titulo: `Portal do Tempo: ${dataObj.toLocaleDateString('pt-PT')}`, 
            nomeUsuario: nome,
            resultado: dP, 
            interpretacao,
            definicao: BIBLIOTECA.definicoes.portal_diario
        });

    } catch (erro) {
        return res.status(500).json({ error: "O Oráculo do Portal do Tempo está em silêncio." });
    }
}


