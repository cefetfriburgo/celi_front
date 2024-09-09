import {rendeirizarHomeGeral} from './view_index/home.js';
import {rendeirizarPageGeral} from './view_index/page.js';
    
const content = document.querySelector(".content");
const linkHome = document.querySelector("#botaoHome");

linkHome.addEventListener('click', function (){
    home();
})

async function acessarId(){
    let atividadeDiv = this.closest('.atividade.mb');
    await rendeirizarPageGeral(atividadeDiv.id, content);
    document.querySelector(".botaoInscricaoDetalhes").addEventListener("click", ()=>{
        alert("Inscricao");
    })
}

async function home(){
    await rendeirizarHomeGeral(content);
    document.querySelectorAll(".linkDetalhes").forEach(element=>{
        element.addEventListener('click', acessarId);
    })

    document.querySelectorAll(".botaoInscricao").forEach(element=>{
        element.addEventListener('click', ()=>{
            if(confirm("Tem certeza que deseja se inscrever?")){
                alert("Inscrição concluída!");
            }else{
                alert("Inscrição cancelada");
            }
        })
    })
}

home();