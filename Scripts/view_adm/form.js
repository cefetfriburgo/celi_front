export function rendeirizarFormAtividade(content, value){
    content.innerHTML = `
        <form id="main-form">
            <div class="activity-form">

                <input type="hidden" name="realizador_id" id="realizador_id" value="${localStorage.getItem('id_user')}">
                <div class="activity-input">
                    <label for="activity-name">Nome da Atividade</label>
                    <input type="text" name="nome" id="nome" placeholder="Nome da atividade..." value="${value.name}">
                </div>
                
                <div class="activity-input">
                    <label for="limit">Limite de Participantes</label>
                    <input type="number" name="limite_participantes" id="limite_participantes" placeholder="Quantos poderão participar?" value="${value.limit}">
                </div>

                <div class="activity-input">
                    <label for="activity">Descrição da Atividade</label>
                    <textarea id="descricao" name="descricao" rows="4" placeholder="Descreva a atividade aqui...">${value.activity}</textarea>
                </div>

                <div class="activity-input">
                    <label for="data-inicio">Data de Início</label>
                    <input type="date" name="data_inicio" id="data_inicio" value="${value.startDate}">
                </div>

                <div class="activity-input">
                    <label for="data-termino">Data de Termino</label>
                    <input type="date" name="data_termino" id="data_termino" value="${value.endDate}">
                </div>

                <input type="submit" value="Cadastrar" id="submit-button">
            </div>
        </form>
    `;
}