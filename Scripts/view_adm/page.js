import {listarDados} from '../services/atividade/get.js';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function mostrarInscritos(listaInscritos, idAtividade) {
    try {
        const response = await fetch(`https://celi.cefet-rj.br/coordenacao/api/participantes/${idAtividade}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('chave')}`  
            }
        });
        const data = await response.json()

        data.forEach(element => {
            listaInscritos.innerHTML += `<li>${element.name} - ${element.email}</li>`;
        });
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}

export async function rendeirizarPageAdm(atividadeId, content) {
    try {
        const dates = await listarDados(`https://celi.cefet-rj.br/coordenacao/api/atividade/${atividadeId}`);
        let inicio;
        let termino;


    
        inicio = new Date(dates.data_inicio).getDate();
        inicio += ` de ${meses[new Date(dates.data_inicio).getMonth()]}`;
        inicio += ` de ${new Date(dates.data_inicio).getFullYear()}`;

        termino = new Date(dates.data_termino).getDate();
        termino += ` de ${meses[new Date(dates.data_termino).getMonth()]}`;
        termino += ` de ${new Date(dates.data_termino).getFullYear()}`;

        //Local Storage da Atividade
        localStorage.setItem('id', atividadeId);
        localStorage.setItem('name', dates.nome);
        localStorage.setItem('limit', dates.limite_participantes);
        localStorage.setItem('activity', dates.descricao);
        localStorage.setItem('startDate', `${new Date(dates.data_inicio).getFullYear()}-${((new Date(dates.data_inicio).getMonth()) + 1).toString().padStart(2, '0')}-${new Date(dates.data_inicio).getDate().toString().padStart(2, '0')}`)
        localStorage.setItem('endDate', `${new Date(dates.data_termino).getFullYear()}-${((new Date(dates.data_termino).getMonth()) + 1).toString().padStart(2, '0')}-${new Date(dates.data_termino).getDate().toString().padStart(2, '0')}`)

        content.innerHTML = `
            <div class="detalhes-atividade bb mb">
                <h1 class="mb">${dates.nome}</h1>
                <div class="botoes-acao mb">
                    <button class="botaoPublicar">Publicar</button>
                    <button class="form-atividade mb botaoAtualizar">Atualizar</button>
                    <button class="delete">Excluír</button>
                </div>
                <p class="date mb">Início: ${inicio}</p>
                <p class="date mb">Término: ${termino}</p>
                <div class="texto-atividade mb">
                    <p>${dates.descricao}</p>
                </div>
                <h2 class="mb">Inscritos</h2>
                <ul class="inscritos">
                    
                </ul>
            </div>
        `
        const listaInscritos = document.querySelector('.inscritos');
        await mostrarInscritos(listaInscritos, atividadeId);
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}