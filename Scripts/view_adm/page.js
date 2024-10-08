import {listarDados} from '../services/fetch.js';

const messes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function mostrarInscritos() {
    try {
        const user = await listarDados('./Scripts/json/01-user.json');
        let userList = user.users;
        let inscritos = '';
        userList.forEach(element => {
            inscritos += `<li>${element.name} - ${element.email}</li>`;
        });
        return inscritos;
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}

export async function rendeizarPage(atividadeId, content) {
    try {
        const dates = await listarDados('./Scripts/json/08-atividade.json');
        const inscritos = await mostrarInscritos();
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
                            <button>Publicar</button>
                            <button>Atualizar</button>
                            <button class="delete">Excluír</button>
                        </div>
                        <p class="date mb">Início: ${inicio}</p>
                        <p class="date mb">Término: ${termino}</p>
                        <div class="texto-atividade mb">
                            <p>${element.descricao}</p>
                        </div>
                        <h2 class="mb">Inscritos</h2>
                        <ul class="inscritos">
                            ${inscritos}
                        </ul>
                    </div>
                `
            }
        });
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}