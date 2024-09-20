export function atividadeCadastrar(formElement) {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    if (confirm("Tem certeza que deseja prosseguir?")) {
        console.log(data);

        fetch('http://localhost:8000/api/atividade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                window.location.assign('/adm.html');
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Ocorreu um erro, tente novamente.");
            });
    }
}