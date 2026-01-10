/**
 * ⚙️ MOTOR DE CÁLCULO: PORTAL ANUAL
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

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST permitido' });
    try {
        const { dataNascimento } = req.body;
        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const anoAtual = new Date().getFullYear();
        const anoP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(anoAtual));
        
        return res.status(200).json({ sucesso: true, resultado: anoP });
    } catch (e) {
        return res.status(500).json({ error: "Erro no cálculo anual." });
    }
}


