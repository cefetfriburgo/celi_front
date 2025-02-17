export function atividadeAtualizar(formElement){
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    if (confirm("Tem certeza que deseja prosseguir?")) {
        console.log(data);

        fetch(`https://celi.cefet-rj.br/coordenacao/api/atividade/${localStorage.getItem('id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('chave')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erro na requisição: ' + res.status);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                alert("Confirmado");
                window.location.assign('https://celi.cefet-rj.br/coordenacao/atividades/adm.html');
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Ocorreu um erro, tente novamente.");
            });
    }
}