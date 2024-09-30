import {listarDados} from '../services/atividade/get.js';

const messes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export async function rendeirizarPageGeral(atividadeId, content) {
    try {
        const dates = await listarDados(`http://localhost:8000/api/atividade_andamento/${atividadeId}`);
        let inicio;
        let termino;

        console.log(dates);
        inicio = new Date(dates.created_at).getDate();
        inicio += ` de ${messes[new Date(dates.created_at).getMonth()]}`;
        inicio += ` de ${new Date(dates.created_at).getFullYear()}`;

        termino = new Date(dates.updated_at).getDate();
        termino += ` de ${messes[new Date(dates.updated_at).getMonth()]}`;
        termino += ` de ${new Date(dates.updated_at).getFullYear()}`;
        content.innerHTML = `
            <div class="detalhes-atividade bb mb">
                <h1 class="mb">${dates.nome}</h1>
                <div class="botoes-acao mb">
                    <button class="botaoInscricaoDetalhes">Inscreva-se</button>
                </div>
                <p class="date mb">Início: ${inicio}</p>
                <p class="date mb">Término: ${termino}</p>
                <div class="texto-atividade mb">
                    <p>${dates.descricao}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}