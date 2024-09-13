import {rendeirizarHomeAdm} from './view_adm/home.js';
import {rendeirizarPageAdm} from './view_adm/page.js';
import {rendeirizarFormAtividade} from './view_adm/form.js';
import {atividadeCadastrar} from './services/atividade_cadastrar.js';
import {atividadeAtualizar} from './services/atividade_atualizar.js';
import {atividadePublicar} from './services/atividade_publicar.js';
import { atividadeDeletar } from './services/atividade_deletar.js';

    const content = document.querySelector(".content");


    function publicarAtividadeViaId(){
        let atividadeDiv = this.closest('.atividade.mb');
        atividadePublicar(atividadeDiv.id);
    }

    async function detalharAtividadeId(){
        //Rendeirizando a página de detalhes
        let atividadeDiv = this.closest('.atividade.mb');
        await rendeirizarPageAdm(atividadeDiv.id, content);

        // Area para atualizar tarefa
        let formValues = {
            name: localStorage.getItem('name'),
            limit: localStorage.getItem('limit'),
            activity: localStorage.getItem('activity'),
            startDate: localStorage.getItem('startDate'),
            endDate: localStorage.getItem('endDate')
        }
        
        document.querySelector(".botaoPublicar").addEventListener('click', ()=>{
            //publicar via detalhes
            atividadePublicar(atividadeDiv.id);
        })

        document.querySelector(".delete").addEventListener('click', ()=>{
            //delete
            atividadeDeletar(atividadeDiv.id);
        })
        
        document.querySelector(".botaoAtualizar").addEventListener('click', ()=>{
            rendeirizarFormAtividade(content, formValues);

            setTimeout(() => {
                // Adiciona o escutador de eventos ao botão submit
                const formElement = document.querySelector("#main-form");
                formElement.addEventListener('submit', event => {
                    event.preventDefault();
                    atividadeAtualizar(formElement);
                });
            }, 0);
        })
    }

    function carregarForm(){
        let formValues = {
            name: '',
            limit: 0,
            activity: ''
        }
        rendeirizarFormAtividade(content, formValues);

        setTimeout(() => {
            // Adiciona o escutador de eventos ao botão submit
            console.log("Chegou");
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