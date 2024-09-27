import {listarDados} from '../services/atividade/get.js';

const messes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export async function rendeirizarPageGeral(atividadeId, content) {
    try {
        const dates = await listarDados('http://localhost:8000/api/atividade_andamento');
        let inicio;
        let termino;
        dates.forEach(element=>{
            if(element.id==atividadeId){
                console.log(element);
                inicio = new Date(element.created_at).getDate();
                inicio += ` de ${messes[new Date(element.created_at).getMonth()]}`;
                inicio += ` de ${new Date(element.created_at).getFullYear()}`;

                termino = new Date(element.updated_at).getDate();
                termino += ` de ${messes[new Date(element.updated_at).getMonth()]}`;
                termino += ` de ${new Date(element.updated_at).getFullYear()}`;
                content.innerHTML = `
                    <div class="detalhes-atividade bb mb">
                        <h1 class="mb">${element.nome}</h1>
                        <div class="botoes-acao mb">
                            <button class="botaoInscricaoDetalhes">Inscreva-se</button>
                        </div>
                        <p class="date mb">Início: ${inicio}</p>
                        <p class="date mb">Término: ${termino}</p>
                        <div class="texto-atividade mb">
                            <p>${element.descricao}</p>
                        </div>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}