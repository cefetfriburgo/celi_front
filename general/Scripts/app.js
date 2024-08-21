import {rendeizarHome} from './views/home.js';
import {rendeizarPage} from './views/page.js'

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