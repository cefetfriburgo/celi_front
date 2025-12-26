// Arquivo: Scripts/services/pdf/gerarListaPresenca.js

export async function baixarListaPresenca(idAtividade, nomeAtividade, dataAtividade) {
    try {
        console.log(`Iniciando geração de PDF para atividade ${idAtividade}...`);

        // --- CORREÇÃO AQUI ---
        // Adicionamos o Token de autorização no cabeçalho
        const token = localStorage.getItem('chave'); // Pega a chave salva no login

        const response = await fetch(`/eventos-testes/api/participantes/${idAtividade}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // "Mostra o crachá" para o servidor
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Pede resposta em JSON para evitar redirecionamento HTML
            }
        });
        
        if (!response.ok) {
            // Se der erro 401 ou 403, já saberemos o motivo exato
            if (response.status === 401 || response.status === 403) {
                alert("Erro de Permissão: Você precisa estar logado como Administrador.");
            }
            throw new Error(`Erro na API: ${response.status}`);
        }

        const participantes = await response.json();

        // Verificações de segurança
        if (!Array.isArray(participantes)) {
            alert("Erro: O servidor não retornou uma lista válida.");
            console.error("Dados recebidos:", participantes);
            return;
        }

        if (participantes.length === 0) {
            alert("Esta atividade ainda não tem inscritos para gerar a lista.");
            return;
        }

        // --- GERADOR DE PDF (Manteve-se igual) ---
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const dataHoje = new Date().toLocaleDateString('pt-BR');

        doc.setFontSize(18);
        doc.text("Lista de Presença", 105, 20, null, null, "center");
        
        doc.setFontSize(12);
        doc.text(`Atividade: ${nomeAtividade}`, 14, 35);
        
        const dataFormatada = dataAtividade ? new Date(dataAtividade).toLocaleDateString('pt-BR') : 'A definir';
        doc.text(`Data: __/__/____`, 14, 42);
        doc.text(`Responsável: __________________________________________________`, 14, 49);

        const corpoTabela = participantes.map(p => {
            // Garante que pega o nome certo (name ou nome)
            return [p.nome || p.name || "Participante Sem Nome", ""]; 
        });

        doc.autoTable({
            startY: 55,
            head: [['Nome do Participante', 'Assinatura']],
            body: corpoTabela,
            theme: 'grid',
            styles: { 
                fontSize: 12, cellPadding: 4, minCellHeight: 15,
                lineColor: [0, 0, 0], lineWidth: 0.1 
            },
            headStyles: { 
                fillColor: [0, 95, 107], textColor: [255, 255, 255],
                lineColor: [0, 0, 0], lineWidth: 0.1 
            },
            columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 'auto' } },
            margin: { bottom: 20 },
            didDrawPage: function (data) {
                doc.setFontSize(10);
                const textoRodape = `Emitido em: ${dataHoje} | Página ${doc.internal.getNumberOfPages()}`;
                const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                doc.text(textoRodape, 14, pageHeight - 10);
            }
        });

        // Remove caracteres especiais para salvar o arquivo
        const nomeArquivo = nomeAtividade.replace(/[^a-zA-Z0-9]/g, '_');
        doc.save(`Lista_Presenca_${nomeArquivo}.pdf`);

    } catch (error) {
        console.error("Erro no PDF:", error);
        // Não usamos alert aqui para não travar a tela se for um erro silencioso
    }
}
