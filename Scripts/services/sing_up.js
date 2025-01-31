const formSignUp = document.querySelector('.formularioResgistro');

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formSignUp);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    try {
        // Primeira requisição para criar o usuário
        const response1 = await fetch('https://celi.cefet-rj.br/coordenacao/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        const data1 = await response1.json();
        // lidar com a resposta da criação do usuário
        if (!response1.ok) {
            throw new Error('Erro ao criar o usuário');
        }

        // Remover a propriedade "nome" do objeto "data" antes de enviar novamente
        delete data.name;
        const updatedJsonData = JSON.stringify(data); // Criar uma nova string JSON
        console.log(updatedJsonData);

        // Segunda requisição para fazer login
        const response2 = await fetch('https://celi.cefet-rj.br/coordenacao/api/teste_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: updatedJsonData
        });

        if (!response2.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data2 = await response2.json();
        // Salvar o token recebido no localStorage
        localStorage.setItem('chave', data2.token);
        localStorage.setItem('id_user', data2.user_id);
        // Redirecionar ou realizar outra ação
        window.location.assign('/');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
    }
});