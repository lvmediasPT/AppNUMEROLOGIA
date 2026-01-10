/**
 * ⚙️ MOTOR DE CÁLCULO: PORTAL DO TEMPO
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
        const { dataNascimento, dataEspecifica } = req.body;
        const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
        const dataObj = new Date(dataEspecifica || new Date());
        
        const aP = reduzirEstrito(reduzirEstrito(diaNasc) + reduzirEstrito(mesNasc) + reduzirEstrito(dataObj.getFullYear()));
        const mP = reduzir(aP + reduzirEstrito(dataObj.getMonth() + 1));
        const dP = reduzir(mP + reduzirEstrito(dataObj.getDate()));
        
        return res.status(200).json({ sucesso: true, resultado: dP });
    } catch (e) {
        return res.status(500).json({ error: "Erro no cálculo do tempo." });
    }
}


