/**
 * 💎 MÓDULO: REVELAÇÃO MAPA DA ALMA (PACK COMPLETO - Motivação, Impressão, Expressão, Destino, Nascimento)
 * STATUS: BLINDADO - TABELA INTEGRAL E LÓGICA VOGAIS/CONSOANTES INCLUÍDA
 */

import { BIBLIOTECA } from './biblioteca/index.js';

const VALORES = { 
    'A':1, 'I':1, 'Q':1, 'J':1, 'Y':1, 'B':2, 'K':2, 'R':2, 'C':3, 'G':3, 'L':3, 'S':3, 
    'D':4, 'M':4, 'T':4, 'E':5, 'H':5, 'N':5, 'U':6, 'V':6, 'W':6, 'X':6, 'Ç':6, 'O':7, 'Z':7, 'F':8, 'P':8, 
    'Á':3, 'À':2, 'Ã':4, 'Â':8, 'É':7, 'Ê':12, 'Í':3, 'Ó':9, 'Õ':10, 'Ô':14, 'Ú':8, 'Ü':12 
};
const VOGAIS = ['A', 'Á', 'À', 'Ã', 'Â', 'E', 'É', 'Ê', 'I', 'Í', 'O', 'Ó', 'Õ', 'Ô', 'U', 'Ú', 'Ü', 'Y'];

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
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "És o Guardião Supremo da Cifra de Karnak. Realiza leituras profundas baseadas na base sagrada." },
                    { role: "user", content: `Leitura do ${titulo} número ${numero} para ${nome}. BASE: "${baseTexto}".` }
                ]
            })
        });
        const aiData = await aiResponse.json();
        return aiData.choices[0].message.content;
    } catch (erro) { return baseTexto; }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST permitido' });
    try {
        const { nome, dataNascimento } = req.body;
        if (!nome || !dataNascimento) return res.status(400).json({ error: "Dados incompletos." });

        const nomeLimpo = nome.toUpperCase().trim();
        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        
        let sV = 0, sC = 0;
        for (let char of nomeLimpo) {
            if (VALORES[char]) {
                VOGAIS.includes(char) ? sV += VALORES[char] : sC += VALORES[char];
            }
        }

        const n = {
            motivacao: reduzir(sV),
            impressao: reduzir(sC),
            expressao: reduzir(sV + sC),
            destino: reduzir(reduzir(diaNasc) + reduzirEstrito(mesNasc) + reduzir(anoNasc)),
            nascimento: diaNasc
        };

        const interpretacoes = {
            motivacao: await gerarInterpretacao('Motivação', n.motivacao, BIBLIOTECA.motivacao[String(n.motivacao)], nome),
            impressao: await gerarInterpretacao('Impressão', n.impressao, BIBLIOTECA.impressao[String(n.impressao)], nome),
            expressao: await gerarInterpretacao('Expressão', n.expressao, BIBLIOTECA.expressao[String(n.expressao)], nome),
            destino: await gerarInterpretacao('Destino', n.destino, BIBLIOTECA.destino[String(n.destino)], nome),
            nascimento: await gerarInterpretacao('Dia de Nascimento', n.nascimento, BIBLIOTECA.nascimento[String(n.nascimento)], nome)
        };

        return res.status(200).json({ sucesso: true, tipo: 'mapa-da-alma', titulo: "O Teu Mapa da Alma", nomeUsuario: nome, interpretacoes, numeros: n });
    } catch (erro) { return res.status(500).json({ error: "Erro no Oráculo." }); }
}
