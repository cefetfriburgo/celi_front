
import {listarDados} from '../services/atividade/get.js';
import { baixarListaPresenca } from '../services/atividade/gerarListaPresenca.js';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function mostrarInscritos(listaInscritos, idAtividade) {
    try {
	const response = await fetch(`https://celi.cefet-rj.br/eventos-testes/api/participantes/${idAtividade}`, {
        //const response = await fetch(`https://celi.cefet-rj.br/coordenacao/api/participantes/${idAtividade}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('chave')}`  
            }
        });
        const data = await response.json()

        data.forEach(element => {
            listaInscritos.innerHTML += `<li>${element.name} - ${element.email}</li>`;
        });
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}

export async function rendeirizarPageAdm(atividadeId, content) {
    try {
        const dados = await listarDados(`https://celi.cefet-rj.br/eventos-testes/api/atividade/${atividadeId}`);
	//const dates = await listarDados(`https://celi.cefet-rj.br/coordenacao/api/atividade/${atividadeId}`);
        let inicio;
        let termino;


	  const formatarDataExtenso = (dataString) => {
            const d = new Date(dataString);
            return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()} às ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        };

         inicio = formatarDataExtenso(dados.data_inicio);
         termino = formatarDataExtenso(dados.data_termino);  
//        inicio = new Date(dates.data_inicio).getDate();
//        inicio += ` de ${meses[new Date(dates.data_inicio).getMonth()]}`;
//        inicio += ` de ${new Date(dates.data_inicio).getFullYear()}`;

//        termino = new Date(dates.data_termino).getDate();
//        termino += ` de ${meses[new Date(dates.data_termino).getMonth()]}`;
//        termino += ` de ${new Date(dates.data_termino).getFullYear()}`;

	// --- 2. PREPARAÇÃO DO ENDEREÇO (Objeto -> String) ---
        // O formulário espera "Rua, Num, Ref", mas o banco manda objeto. Vamos montar a string:
        let enderecoString = '';
        if (dados.endereco) {
            enderecoString = `${dados.endereco.logradouro}, ${dados.endereco.numero}`;
            if (dados.endereco.ponto_referencia) {
                enderecoString += `, ${dados.endereco.ponto_referencia}`;
            }
        }
	
	const nomeBairro = dados.endereco?.bairro?.nome || 'Não informado';
        //Local Storage da Atividade
        localStorage.setItem('id', atividadeId);
        localStorage.setItem('name', dados.nome);
        localStorage.setItem('limit', dados.limite_participantes);
        localStorage.setItem('activity', dados.descricao);
	localStorage.setItem('objetivo', dados.objetivo || '');
        localStorage.setItem('status', dados.status);

	localStorage.setItem('startDate', dados.data_inicio); 
        localStorage.setItem('endDate', dados.data_termino); 

	localStorage.setItem('categoria', dados.categoria ? dados.categoria.nome : '');
        localStorage.setItem('metodologia', dados.metodologia?.nome || '');
        localStorage.setItem('public_alvo',  dados.publico_alvo?.nome || ''); // publico_alvo no banco vs plubAlvo no form
        localStorage.setItem('linha_extensao', dados.linha_extensao?.nome || '');
        localStorage.setItem('area_tematica', dados.area_tematica?.nome || '');
        localStorage.setItem('bairro', nomeBairro);
        
        // Salvamos a string montada do endereço
        localStorage.setItem('endereco', enderecoString);

        content.innerHTML = `
            <div class="detalhes-atividade bb mb">
                <h1 class="mb">${dados.nome}</h1>
		<span class="status-badge">${dados.status || 'Status não definido'}</span>
                <div class="botoes-acao mb">
                    <button class="botaoPublicar">Publicar</button>
                    <button class="form-atividade mb botaoAtualizar">Atualizar</button>
                    <button class="delete">Excluír</button>
		    <button id="btn-lista-presenca" style="background-color: #005f6b; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        📄 Lista de Presença
                    </button>
                </div>
                <div class="info-grid mb">
                    <p><strong>Início:</strong> ${inicio}</p>
                    <p><strong>Término:</strong> ${termino}</p>
                    <p><strong>Categoria:</strong> ${dados.categoria?.nome || 'Não informada'}</p>
                    <p><strong>Público Alvo:</strong> ${dados.publico_alvo?.nome || 'Não informado'}</p>
                    <p><strong>Local:</strong> ${nomeBairro} - ${enderecoString || 'Sem endereço'}</p>
                    <p><strong>Limite:</strong> ${dados.limite_participantes || 'Sem limite'}</p>
                </div>
                
                <h3 class="mb">Objetivo:</h3>
                <p class="mb">${dados.objetivo || 'Não informado.'}</p>

                <h3 class="mb">Descrição / Resumo:</h3>
                <div class="texto-atividade mb">
                    <p>${dados.descricao || 'Sem descrição.'}</p>
                </div>
			
                </div>
                <h2 class="mb">Inscritos:</h2>
                <ul class="inscritos">
                    
                </ul>
            </div>
        `;

	// 3. ATIVANDO O BOTÃO
        const btnPdf = content.querySelector('#btn-lista-presenca');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                // Chama a função que criamos no outro arquivo
                baixarListaPresenca(atividadeId, dados.nome, dados.data_inicio);
            });
        }
        const listaInscritos = document.querySelector('.inscritos');
        await mostrarInscritos(listaInscritos, atividadeId);
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}
