/**
 * ⚙️ MOTOR DE CÁLCULO: MISSÃO DE VIDA (GRATUITO)
 * STATUS: BLINDADO - TABELA INTEGRAL INCLUÍDA
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

async function expandirComIA(missao, baseTexto, nome) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return baseTexto;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "És o Guardião Supremo da Cifra de Karnak. Realiza leituras profundas baseadas na base sagrada." },
                    { role: "user", content: `Leitura da Missão ${missao} para ${nome}. BASE: "${baseTexto}".` }
                ]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (e) { return baseTexto; }
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

        const exp = reduzir(sV + sC);
        const dest = reduzir(reduzir(diaNasc) + reduzirEstrito(mesNasc) + reduzir(anoNasc));
        const miss = reduzir(exp + dest);

        const baseTexto = BIBLIOTECA[String(miss)] || "Sabedoria em processamento...";
        const interpretacaoIA = await expandirComIA(miss, baseTexto, nome);

        return res.status(200).json({
            sucesso: true,
            nomeUsuario: nome,
            missao: miss,
            interpretacaoIA: interpretacaoIA
        });
    } catch (e) {
        return res.status(500).json({ error: "Erro no Oráculo." });
    }
}


