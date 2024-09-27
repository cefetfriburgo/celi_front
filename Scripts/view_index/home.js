import {listarDados} from '../services/atividade/get.js';

export async function rendeirizarHomeGeral(content) {
    try {
        const dates = await listarDados('http://localhost:8000/api/atividade_andamento');
        content.innerHTML = '';
        let div = document.createElement("div");
        dates.forEach(element=>{
            div.innerHTML += `
                <div id="${element.id}" class="atividade mb">
                    <div class="texto-atividade">
                        <h2><a href="#" class="linkDetalhes">${element.nome}</a></h2>
                        <p>${element.descricao}</p>
                    </div>
                    <button class="botaoInscricao" id="${element.id}">Inscreva-se</button>
                </div>
            `
        });

        content.appendChild(div);

    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}