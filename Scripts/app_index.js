import {rendeirizarHomeGeral} from './view_index/home.js';
import {rendeirizarPageGeral} from './view_index/page.js';
import {atividadeInscricao} from './services/atividade/atividade_inscricao.js';

const content = document.querySelector(".content");
const linkHome = document.querySelector("#botaoHome");

linkHome.addEventListener('click', function (){
    home();
})

async function acessarId(){
    let atividadeDiv = this.closest('.atividade.mb');
    await rendeirizarPageGeral(atividadeDiv.id, content);
    document.querySelector(".botaoInscricaoDetalhes").addEventListener("click", ()=>{
        atividadeInscricao(atividadeDiv.id, localStorage.getItem('id_user'));
    })
}

async function home(){
    await rendeirizarHomeGeral(content);
    document.querySelectorAll(".linkDetalhes").forEach(element=>{
        element.addEventListener('click', acessarId);
    })

    document.querySelectorAll(".botaoInscricao").forEach(element=>{
        element.addEventListener('click', function(){   
            atividadeInscricao(this.id, localStorage.getItem('id_user'));
        })
    })
}

home();