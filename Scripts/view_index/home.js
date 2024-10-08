import {listarDados} from '../services/fetch.js';

export async function rendeizarHomeGeral(content) {
    try {
        const dates = await listarDados('./Scripts/json/08-atividade.json');
        content.innerHTML = '';
        let div = document.createElement("div");
        dates.forEach(element=>{
            div.innerHTML += `
                <div id="${element.id}" class="atividade mb">
                    <div class="texto-atividade">
                        <h2><a href="#" class="linkDetalhes">${element.nome}</a></h2>
                        <p>${element.descricao}</p>
                    </div>
                    <button>Inscreva-se</button>
                </div>
            `
        });

        content.appendChild(div);

    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}