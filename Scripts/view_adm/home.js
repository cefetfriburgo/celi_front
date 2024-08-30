import {listarDados} from '../services/fetch.js';

export async function rendeizarHome(content) {
    try {
        const dates = await listarDados('./Scripts/json/08-atividade.json');
        content.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML = `<a class="nova-atividade mb" href="./Forms">Nova Atividade</a>`;

        dates.forEach(element=>{
            div.innerHTML += `
                <div id="${element.id}" class="atividade mb">
                    <div class="texto-atividade">
                        <h2><a href="#" class="linkDetalhes">${element.nome}</a></h2>
                        <p>${element.descricao}</p>
                    </div>
                    <button>Publicar</button>
                </div>
            `
        });

        content.appendChild(div);

    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}