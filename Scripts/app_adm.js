import {rendeizarHome} from './view_adm/home.js';
import {rendeizarPage} from './view_adm/page.js';

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
    console.log("01")
    await rendeizarHome(content);
    const linkDetalhes = document.querySelectorAll(".linkDetalhes");
    linkDetalhes.forEach(element=>{
        element.addEventListener('click', acessarId);
    })
}

home();