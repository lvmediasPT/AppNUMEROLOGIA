/**
 * ⚙️ MOTOR DE CÁLCULO: PORTAL MENSAL
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

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST permitido' });
    try {
        const { dataNascimento } = req.body;
        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const dataHoje = new Date();
        
        const aP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(dataHoje.getFullYear()));
        const mP = reduzir(aP + reduzirEstrito(dataHoje.getMonth() + 1));
        
        return res.status(200).json({ sucesso: true, resultado: mP });
    } catch (e) {
        return res.status(500).json({ error: "Erro no cálculo mensal." });
    }
}


