import {listarDados} from '../services/atividade/get.js';

export async function rendeirizarHomeAdm(content) {
    try {
        const dates = await listarDados('https://celi.cefet-rj.br/coordenacao/api/atividade');
        content.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML = `<button class="form-atividade mb">Nova Atividade</button>`;

        dates.forEach(element=>{
            div.innerHTML += `
                <div id="${element.id}" class="atividade mb">
                    <div class="texto-atividade">
                        <h2><a href="#" class="linkDetalhes">${element.nome}</a></h2>
                        <p>${element.descricao}</p>
                    </div>
                    <button class="botaoPublicarListagem">Publicar</button>
                </div>
            `
        });

        content.appendChild(div);

    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}