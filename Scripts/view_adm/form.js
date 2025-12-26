export function rendeirizarFormAtividade(content, value){

    const formatarDataParaInput = (data) => {
        if (!data) return '';
        return data.replace(' ', 'T').slice(0, 16); 
    };

    content.innerHTML = `
        <form id="main-form">
            <div class="activity-form">

                <input type="hidden" name="realizador_id" id="realizador_id" value="${localStorage.getItem('id_user')}">

                <div style="border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 15px; text-align: right;">
                    <button type="button" id="btn-importar-excel" style="background-color: #217346; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                        📂 Importar Tabela (Excel)
                    </button>
                    <input type="file" id="inputExcel" accept=".xlsx, .xls, .csv" style="display: none;">
                    <p style="font-size: 12px; color: #666; margin-top: 5px;">Use o modelo padrão .xlsx ou .csv</p>
                </div>

                <div class="activity-input">
                    <label for="nome">Nome da Atividade</label>
                    <input type="text" name="nome" id="nome" placeholder="Nome da atividade..." value="${value.name || ''}" required>
                </div>
                
                <div class="activity-input">
                    <label for="status">Estado (Status)</label>
                    <select name="status" id="status">
                        <option value="Em avaliação" ${value.status === 'Em avaliação' ? 'selected' : ''}>Em avaliação</option>
                        <option value="Aprovado" ${value.status === 'Aprovado' ? 'selected' : ''}>Aprovado</option>
                        <option value="Recusado" ${value.status === 'Recusado' ? 'selected' : ''}>Recusado</option>
                        <option value="Andamento" ${value.status === 'Andamento' ? 'selected' : ''}>Andamento</option>
                        <option value="Concluído" ${value.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                    </select>
                </div>

                <div class="activity-input">
                    <label for="limite_participantes">Limite de Participantes</label>
                    <input type="number" name="limite_participantes" id="limite_participantes" placeholder="0" value="${value.limit || ''}" min="0">
                </div>

                <div class="activity-input">
                    <label for="data_inicio">Data e Hora de Início</label>
                    <input type="datetime-local" name="data_inicio" id="data_inicio" value="${formatarDataParaInput(value.startDate)}">
                </div>

                <div class="activity-input">
                    <label for="data_termino">Data e Hora de Término</label>
                    <input type="datetime-local" name="data_termino" id="data_termino" value="${formatarDataParaInput(value.endDate)}">
                </div>

                <div class="activity-input">
                    <label for="objetivo">Objetivo</label>
                    <textarea id="objetivo" name="objetivo" rows="2" placeholder="Qual o objetivo principal?">${value.objetivo || ''}</textarea>
                </div>

                <div class="activity-input">
                    <label for="descricao">Resumo da Atividade (+ Observações)</label>
                    <textarea id="descricao" name="descricao" rows="4" placeholder="Descrição completa...">${value.activity || ''}</textarea>
                </div>

                <div class="activity-input">
                    <label for="metodologia">Metodologia</label>
                    <input type="text" name="metodologia" id="metodologia" placeholder="Ex: Aula Prática" value="${value.metodologia || ''}">
                </div>

                <div class="activity-input">
                    <label for="publico_alvo">Público Alvo</label>
                    <input type="text" name="publico_alvo" id="publico_alvo" placeholder="Ex: Alunos de Engenharia" value="${value.publico_alvo || ''}">
                </div>

                <div class="activity-input">
                    <label for="categoria">Categoria</label>
                    <input type="text" name="categoria" id="categoria" placeholder="Ex: Tecnologia" value="${value.categoria || ''}">
                </div>

                <div class="activity-input">
                    <label for="linha_extensao">Linha de Extensão</label>
                    <input type="text" name="linha_extensao" id="linha_extensao" placeholder="Ex: Educação Profissional" value="${value.linha_extensao || ''}">
                </div>

<!--                <div class="activity-input">
                    <label for="area_tematica">Área Temática</label>
                    <input type="text" name="area_tematica" id="area_tematica" placeholder="Ex: Educação" value="${value.area_tematica || ''}">
                </div>
-->
                <div class="activity-input">
                    <label for="bairro">Bairro</label>
                    <input type="text" name="bairro" id="bairro" placeholder="Ex: Maracanã" value="${value.bairro || ''}">
                </div>

                <div class="activity-input">
                    <label for="endereco">Endereço Completo</label>
                    <input type="text" name="endereco" id="endereco" 
                           placeholder="Rua, Número, Ponto de Referência" 
                           value="${value.endereco || ''}">
                    <small style="color: #666;">Separe por vírgulas (ex: Av. Brasil, 500, Ao lado do Posto)</small>
                </div>

                <input type="submit" value="Cadastrar" id="submit-button">
            </div>
        </form>
    `;


// 2. LIGANDO O BOTÃO DE IMPORTAR (JavaScript do Botão)
    const btnImportar = document.getElementById('btn-importar-excel');
    const inputExcel = document.getElementById('inputExcel');

    if (btnImportar && inputExcel) {
        // Quando clicar no botão verde, clica no input escondido
        btnImportar.addEventListener('click', (e) => {
            e.preventDefault(); // Evita recarregar a tela
            inputExcel.click();
        });

        // Quando o usuário escolhe o arquivo, inicia o processamento
        inputExcel.addEventListener('change', () => {
            processarExcel();
        });
    }
}

// ==========================================================
// FUNÇÕES DE LÓGICA DO EXCEL
// ==========================================================

async function processarExcel() {
    const input = document.getElementById('inputExcel');
    const file = input.files[0];

    if (!file) {
        alert("Por favor, selecione um arquivo.");
        return;
    }

    if (typeof XLSX === 'undefined') {
        alert("Erro: A biblioteca SheetJS não foi carregada no adm.html.");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // raw: false tenta formatar tudo como texto, mas para datas as vezes é melhor raw: true.
        // Vamos usar o padrão e tratar na função de formatação.
        const jsonDados = XLSX.utils.sheet_to_json(worksheet);

        console.log("Dados brutos do Excel:", jsonDados);

        // Mapeamento EXATO conforme o HEAD que você mandou
        const atividadesFormatadas = jsonDados.map(row => ({
            // Campos de Texto Simples
            nome: row['Nome Da  Atividade'] || row['nome'], // Atenção ao espaço duplo se houver no arquivo
            descricao: row['Resumo da Atividade'] || row['descricao'],
            objetivo: row['Objetivo'] || '',
            status: row['Estado'] || 'Em Análise', 
            limite_participantes: row['Limite de Participantes'] || 0,
            
            observacoes: row['Observações'],

            // Identificação do Responsável (CRÍTICO)
            realizador_email: row['E-mail do Orientador(Cadastrado)'] || row['realizador_email'],

            // Datas com HORA (DateTime)
            data_inicio: formatarDataHoraExcel(row['Data e Hora De Inicio']),
            data_termino: formatarDataHoraExcel(row['Data e Hora De Termino']),
            
            // Campos Relacionados (Texto que vira ID no Back-end)
            categoria: row['Categoria'],
            metodologia: row['Metodologia'],
            publico_alvo: row['Publico Alvo'], // Sem acento no seu HEAD
            linha_extensao: row['Extensão'],   // Mapeando "Extensão" para Linha de Extensão
            
            // Endereço e Bairro (Novos campos separados)
            endereco: row['Endereço'],
            bairro: row['Bairro'] 
        }));

        // Validar se pegou o email (item obrigatório)
        if(atividadesFormatadas.length > 0 && !atividadesFormatadas[0].realizador_email){
             alert("Atenção: Não consegui ler a coluna 'E-mail do Orientador(Cadastrado)'. Verifique se o nome está idêntico no arquivo.");
        }

        enviarParaApi(atividadesFormatadas);
    };

    reader.readAsArrayBuffer(file);
}

// NOVA FUNÇÃO: Mantém a HORA e formata para MySQL (YYYY-MM-DD HH:mm:ss)
function formatarDataHoraExcel(valor) {
    if (!valor) return null;

    // Caso 1: Já é texto (ex: "2025-12-01 14:00")
    if (typeof valor === 'string') {
        // Se o Excel mandou formato brasileiro "01/12/2025 14:00", o JS pode se confundir.
        // O ideal é que o SheetJS converta, mas se vier string crua, retornamos ela.
        return valor; 
    }
    
    // Caso 2: Número Serial do Excel (ex: 44560.58333)
    // O número decimal representa a HORA.
    if (typeof valor === 'number') {
        // Conversão exata de Excel para JS Date
        const date = new Date(Math.round((valor - 25569) * 86400 * 1000));
        
        // Ajuste de fuso horário (UTC para Local) para não errar a hora
        // Removemos o 'Z' do ISOString para o MySQL aceitar como "Local Time" ou formatamos manual
        const isoString = date.toISOString(); 
        // Exemplo saída: 2025-12-01T14:30:00.000Z
        
        // Retorna: 2025-12-01 14:30:00 (Substitui T por espaço e remove milissegundos)
        return isoString.replace('T', ' ').split('.')[0];
    }

    return valor; 
}

async function enviarParaApi(listaAtividades) {
    const token = localStorage.getItem('chave');
    const btn = document.getElementById('btn-importar-excel');
    
    // Feedback visual
    if(btn) {
        btn.innerText = "⏳ Processando...";
        btn.disabled = true;
    }

    try {
        const response = await fetch('/eventos-testes/api/atividade/importar', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ atividades: listaAtividades })
        });

        const resultado = await response.json();

        if (response.ok) {
            let msg = `✅ Processo Finalizado!\n\nImportados: ${resultado.total_importados}`;
            if (resultado.erros && resultado.erros.length > 0) {
                msg += `\n\n⚠️ Alguns erros ocorreram:\n` + resultado.erros.join('\n');
            }
            alert(msg);
            // Recarrega a página para limpar e mostrar novos dados
            window.location.reload(); 
        } else {
            alert("Erro no servidor: " + (resultado.message || response.statusText));
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão ao tentar importar.");
    } finally {
        if(btn) {
            btn.innerText = "📂 Importar Tabela (Excel)";
            btn.disabled = false;
        }
        document.getElementById('inputExcel').value = ""; 
    }

}


