export async function atividadeInscricao(idAtividade, idParticipante){
    if(localStorage.getItem('chave')==''){
        window.location.assign('sign_in.html');
    }else{
        if(confirm("Tem certezar que deseja se inscrever?")){
            alert(idAtividade);
            alert(idParticipante);

            await fetch(`https://celi.cefet-rj.br/coordenacao/api/participante`, {
                method: 'POST',
                headers:{
                    // 'Authorization': `Bearer ${localStorage.getItem('chave')}`
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "usuario_id": idParticipante,
                    "atividade_id": idAtividade
                })
            })
            alert(`Inscrição na atividade ${idAtividade} bem sucedidda`);

            window.location.assign('/');
        }
    }
}