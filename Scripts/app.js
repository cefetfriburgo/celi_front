import {rendeizarHomeGeral} from './view_index/home.js';
import {rendeizarPageGeral} from './view_index/page.js';

const content = document.querySelector(".content");
const linkHome = document.querySelector("#botaoHome");

linkHome.addEventListener('click', function (){
    home();
})

function acessarId(){
    let atividadeDiv = this.closest('.atividade.mb');

    rendeizarPageGeral(atividadeDiv.id, content);
}

async function home(){
    await rendeizarHomeGeral(content);
    const linkDetalhes = document.querySelectorAll(".linkDetalhes");
    linkDetalhes.forEach(element=>{
        element.addEventListener('click', acessarId);
    })
}

home();