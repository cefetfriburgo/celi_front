import {listarDados} from '../services/atividade/get.js';

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export async function rendeirizarPageGeral(atividadeId, content) {
    try {
	const dados = await listarDados(`https://celi.cefet-rj.br/eventos-testes/api/atividade_andamento/${atividadeId}`);
        //const dates = await listarDados(`https://celi.cefet-rj.br/coordenacao/api/atividade_andamento/${atividadeId}`);
        let inicio;
        let termino;

  	// --- 1. FORMATAÇÃO DE DATAS ---
        const formatarData = (dataString) => {
            if (!dataString) return 'Data a definir';
            const d = new Date(dataString);
            const dia = d.getDate();
            const mes = meses[d.getMonth()];
            const ano = d.getFullYear();
            const hora = d.getHours().toString().padStart(2, '0');
            const min = d.getMinutes().toString().padStart(2, '0');
            return `${dia} de ${mes} de ${ano} às ${hora}:${min}`;
        };

         inicio = formatarData(dados.data_inicio);
         termino = formatarData(dados.data_termino);

        // --- 2. ENDEREÇO E LOCAL ---
        const bairroNome = dados.endereco?.bairro?.nome || 'Bairro não informado';
        
        let enderecoCompleto = 'Endereço online ou não informado';
        if (dados.endereco) {
            enderecoCompleto = `${dados.endereco.logradouro}, ${dados.endereco.numero}`;
            if (dados.endereco.ponto_referencia) {
                enderecoCompleto += ` (${dados.endereco.ponto_referencia})`;
            }
        }

        // --- 3. RENDERIZAR HTML LIMPO ---
        content.innerHTML = `
            <div class="detalhes-atividade bb mb">
                
                <h1 class="mb">${dados.nome}</h1>
                <span class="status-badge">${dados.status || 'Status não definido'}</span>
                <div class="botoes-acao mb">
                    <button class="botaoInscricaoDetalhes">
                        Inscreva-se Agora
                    </button>
                </div>

                <div class="info-grid mb">
                    <div>
                        <strong>Início: </strong> ${inicio}
                    </div>
                    <div>
                        <strong>Término: </strong> ${termino}
                    </div>
                    <div>
                        <strong>Endereço: </strong>${bairroNome} -  ${enderecoCompleto}
                    </div>
                    <div>
                        <strong>Categoria:  </strong> ${dados.categoria?.nome || 'Geral'}
                    </div>
                    <div>
                        <strong>Público Alvo: </strong> ${dados.publico_alvo?.nome || 'Todos'}
                    </div>
                    <div>
                        <strong>Vagas Totais: </strong> ${dados.limite_participantes ? dados.limite_participantes + ' vagas' : 'Ilimitado'}
                    </div>
                </div>

                <h3 class="mb">Objetivo: </h3>
                <p class="mb">${dados.objetivo || 'O objetivo desta atividade será divulgado em breve.'}</p>

                <h3 class="mb">Sobre a Atividade: </h3>
                <div class="texto-atividade mb">
                    <p>${dados.descricao || 'Sem descrição disponível.'}</p>
                </div>

            </div>
        `;
    } catch (error) {
        console.error('Erro ao processar dados', error);
    }
}
