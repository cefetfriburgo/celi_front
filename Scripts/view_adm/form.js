export function rendeirizarFormAtividade(content, value){
    content.innerHTML = `
        <form id="main-form">
            <div class="activity-form">
                <div class="activity-input">
                    <label for="activity-name">Nome da Atividade</label>
                    <input type="text" name="activity-name" id="activity-name" placeholder="Nome da atividade..." value="${value.name}">
                </div>
                
                <div class="activity-input">
                    <label for="limit">Limite de Participantes</label>
                    <input type="number" name="limit" id="limit" placeholder="Quantos poderão participar?" value="${value.limit}">
                </div>

                <div class="activity-input">
                    <label for="activity">Descrição da Atividade</label>
                    <textarea id="activity" name="activity" rows="4" placeholder="Descreva a atividade aqui...">${value.activity}</textarea>
                </div>

                <div class="activity-input">
                    <label for="data-inicio">Data de Início</label>
                    <input type="date" name="data-inicio" id="data-inicio" value="${value.startDate}">
                </div>

                <div class="activity-input">
                    <label for="data-termino">Data de Termino</label>
                    <input type="date" name="data-termino" id="data-termino" value="${value.endDate}">
                </div>

                <input type="submit" value="Cadastrar" id="submit-button">
            </div>
        </form>
    `;
}