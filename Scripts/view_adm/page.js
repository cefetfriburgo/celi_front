import {listarDados} from '../services/atividade/get.js';

const messes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function mostrarInscritos(listaInscritos, idAtividade) {
    try {
        const response = await fetch('./Scripts/json/01-user.json');
        const data = await response.json()
        let userList = data.users;
        userList.forEach(element => {
            listaInscritos.innerHTML += `<li>${element.name} - ${element.email}</li>`;
        });
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}

export async function rendeirizarPageAdm(atividadeId, content) {
    try {
        const dates = await listarDados('./Scripts/json/08-atividade.json');
        let inicio;
        let termino;
        dates.forEach(element=>{
            if(element.id==atividadeId){
                inicio = new Date(element.created_at).getDate();
                inicio += ` de ${messes[new Date(element.created_at).getMonth()]}`;
                inicio += ` de ${new Date(element.created_at).getFullYear()}`;

                termino = new Date(element.updated_at).getDate();
                termino += ` de ${messes[new Date(element.updated_at).getMonth()]}`;
                termino += ` de ${new Date(element.updated_at).getFullYear()}`;

                //Local Storage da Atividade
                localStorage.setItem('id', atividadeId);
                localStorage.setItem('name', element.nome);
                localStorage.setItem('limit', element.limite_participantes);
                localStorage.setItem('activity', element.descricao);
                localStorage.setItem('startDate', `${new Date(element.created_at).getFullYear()}-${((new Date(element.created_at).getMonth()) + 1).toString().padStart(2, '0')}-${new Date(element.created_at).getDate().toString().padStart(2, '0')}`)
                localStorage.setItem('endDate', `${new Date(element.updated_at).getFullYear()}-${((new Date(element.updated_at).getMonth()) + 1).toString().padStart(2, '0')}-${new Date(element.updated_at).getDate().toString().padStart(2, '0')}`)

                content.innerHTML = `
                    <div class="detalhes-atividade bb mb">
                        <h1 class="mb">${element.nome}</h1>
                        <div class="botoes-acao mb">
                            <button class="botaoPublicar">Publicar</button>
                            <button class="form-atividade mb botaoAtualizar">Atualizar</button>
                            <button class="delete">Excluír</button>
                        </div>
                        <p class="date mb">Início: ${inicio}</p>
                        <p class="date mb">Término: ${termino}</p>
                        <div class="texto-atividade mb">
                            <p>${element.descricao}</p>
                        </div>
                        <h2 class="mb">Inscritos</h2>
                        <ul class="inscritos">
                            
                        </ul>
                    </div>
                `
            }
        });
        const listaInscritos = document.querySelector('.inscritos');
        await mostrarInscritos(listaInscritos, localStorage.getItem('id'));
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}