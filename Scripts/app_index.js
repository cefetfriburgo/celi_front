import {rendeizarHome} from './view_index/home.js';
import {rendeizarPage} from './view_index/page.js';

const content = document.querySelector(".content");
const linkHome = document.querySelector("#botaoHome");

linkHome.addEventListener('click', function (){
    home();
})

function acessarId(){
    let atividadeDiv = this.closest('.atividade.mb');

    rendeizarPage(atividadeDiv.id, content);
}

async function home(){
    await rendeizarHome(content);
    const linkDetalhes = document.querySelectorAll(".linkDetalhes");
    linkDetalhes.forEach(element=>{
        element.addEventListener('click', acessarId);
    })
}

home();