import {rendeirizarHomeAdm} from './view_adm/home.js';
import {rendeirizarPageAdm} from './view_adm/page.js';
import {rendeirizarFormAtividade} from './view_adm/form.js';
import {atividadeCadastrar} from './services/atividade/atividade_cadastrar.js';
import {atividadeAtualizar} from './services/atividade/atividade_atualizar.js';
import {atividadePublicar} from './services/atividade/atividade_publicar.js';
import {atividadeDeletar} from './services/atividade/atividade_deletar.js';

const content = document.querySelector(".content");


function publicarAtividadeViaId(){
    let atividadeDiv = this.closest('.atividade.mb');
    atividadePublicar(atividadeDiv.id);
}

async function detalharAtividadeId(){
    //Rendeirizando a página de detalhes
    let atividadeDiv = this.closest('.atividade.mb');
    await rendeirizarPageAdm(atividadeDiv.id, content);

    // Essas informações irão ser inseridas no formulário de atualizar atividade
    let formValues = {
        name: localStorage.getItem('name'),
        limit: localStorage.getItem('limit'),
        activity: localStorage.getItem('activity'),
        startDate: localStorage.getItem('startDate'),
        endDate: localStorage.getItem('endDate')
    }

    //Publicar a atividade via aba de "Detalhes"
    document.querySelector(".botaoPublicar").addEventListener('click', ()=>{
        atividadePublicar(atividadeDiv.id);
    })

    //Excluír a atividade selecionada
    document.querySelector(".delete").addEventListener('click', ()=>{
        atividadeDeletar(atividadeDiv.id);
    })

    // Rendeirizar o formulário de inscrição na aitividade
    document.querySelector(".botaoAtualizar").addEventListener('click', ()=>{
        rendeirizarFormAtividade(content, formValues);
        setTimeout(() => {
            const formElement = document.querySelector("#main-form");
            formElement.addEventListener('submit', event => {
                event.preventDefault();
                atividadeAtualizar(formElement);
            });
        }, 0);
    })
}

function carregarForm(){
    // informações vazias, pois o form não deve estar vazio já ele será responsável apenas por criar uma atividade
    let formValues = {
        name: '',
        limit: 0,
        activity: ''
    }
    rendeirizarFormAtividade(content, formValues);

    setTimeout(() => {
        const formElement = document.querySelector("#main-form");
        formElement.addEventListener('submit', event => {
            event.preventDefault();
            atividadeCadastrar(formElement);
        });
    }, 0);
}

//Rendeirizar a Home do painel Administrativo
async function home(){
    await rendeirizarHomeAdm(content);

    // Botao para abrir uma nova atividade
    const formAtividade = document.querySelector(".form-atividade");
    formAtividade.addEventListener('click', carregarForm);

    // Eventos para carregar atividade específica
    const linkDetalhes = document.querySelectorAll(".linkDetalhes");
    linkDetalhes.forEach(element=>{
        element.addEventListener('click', detalharAtividadeId);
    })

    // Publicar atividade via listagem
    const botoesPublicar = document.querySelectorAll(".botaoPublicarListagem");
    botoesPublicar.forEach(element=>{
        element.addEventListener('click', publicarAtividadeViaId)
    })
}
document.querySelector("#botaoHome").addEventListener('click', function (){
    home();
})

home();