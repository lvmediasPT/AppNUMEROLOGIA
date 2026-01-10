/**
 * 💎 MÓDULO: PORTAL MENSAL
 * Objetivo: Entrega da vibração do Mês Pessoal + Calendário de 30 dias
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
        const { nome, dataNascimento } = req.body;
        
        if (!nome || !dataNascimento) {
            return res.status(400).json({ error: "Dados incompletos." });
        }

        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const dataHoje = new Date();
        
        // CÁLCULO DO MÊS PESSOAL
        const aP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(dataHoje.getFullYear()));
        const mP = reduzir(aP + reduzirEstrito(dataHoje.getMonth() + 1));
        
        const interpretacaoMes = await gerarInterpretacao('Mês Pessoal', mP, BIBLIOTECA.portal_mensal[String(mP)], nome);
        
        // GERAÇÃO DO CALENDÁRIO DE 30 DIAS
        const calendario = [];
        for (let i = 0; i < 30; i++) {
            let dLoop = new Date();
            dLoop.setDate(dLoop.getDate() + i);
            
            const apL = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(dLoop.getFullYear()));
            const mpL = reduzir(apL + reduzirEstrito(dLoop.getMonth() + 1));
            const dpL = reduzir(mpL + reduzirEstrito(dLoop.getDate()));

            calendario.push({
                data: dLoop.toLocaleDateString('pt-PT'),
                numero: dpL,
                significado: BIBLIOTECA.portal_diario[String(dpL)] || "Sabedoria em processamento..."
            });
        }

        return res.status(200).json({ 
            sucesso: true,
            tipo: 'portal-mensal', 
            titulo: 'Portal Mensal Sagrado',
            nomeUsuario: nome,
            resultadoMes: mP,
            interpretacaoMes,
            calendario,
            definicao: BIBLIOTECA.definicoes.portal_mensal
        });

    } catch (erro) {
        return res.status(500).json({ error: "O Oráculo do Portal Mensal está em silêncio." });
    }
}



