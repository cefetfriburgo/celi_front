# Organização das Pastas

* **index.html**: Arquivo HTML principal do sistema. É o arquivo onde os usuários normais interagem com o sistema.

* **adm.html**: Arquivo HTML onde os usuários administradores interagem com o sistema, realizando operações de CRUD.

* **sign_up.html**: Formulário para registro no sistema.
* **sign_in.html**: Formulário para realizar login no sistema.

* **Assets**
    * **CSS**: Folhas de estilo do sistema.
    * **Imagens**: Imagens e ícones do sistema.

* **Scripts**
    * **json**: Arquivos JSON de exemplo utilizados durante o desenvolvimento, mas não na versão final.
    * **services**: Pasta com scripts que realizam as principais funções de interação com o backend, incluindo operações de CRUD, login e logout.
        * **atividades**
            * **atividade_atualizar.js**: A função do arquivo é enviar dados de um formulário para atualizar uma atividade via requisição PUT, após a confirmação do usuário, e tratar a resposta ou erros da requisição.
            * **atividade_cadastrar.js**: A função do arquivo é coletar dados de um formulário, confirmar a ação do usuário e enviar esses dados para criar uma nova atividade via requisição POST, tratando a resposta e possíveis erros.
            * **atividade_deletar.js**: A função do arquivo é confirmar a exclusão de uma atividade e, se o usuário aceitar, enviar uma requisição DELETE para removê-la, redirecionando em seguida para a página de administração.
            * **atividade_inscricao.js**: A função do arquivo é verificar se o usuário está autenticado, solicitar confirmação para a inscrição em uma atividade e, se aceita, enviar uma requisição POST para registrar a inscrição, redirecionando após a confirmação.
            * **atividade_publicar.js**: A função do arquivo é solicitar uma confirmação para publicar uma atividade e, se confirmada, enviar uma requisição PUT para atualizar seu status, redirecionando o usuário para a página de administração após a ação.
            * **get.js**: A função do arquivo é realizar uma requisição fetch para uma URL especificada, tratando erros de rede e retornando os dados em formato JSON, se a resposta for bem-sucedida.
        * **button_switch.js**: Script que altera o botão de "Entrar" para "Sair" ao logar e o oposto ao sair do sistema.
        * **logout.js**: O código adiciona um evento de clique a um botão que, ao ser acionado, realiza uma requisição de logout para a API, limpa as chaves de autenticação armazenadas no localStorage e redireciona o usuário para a página inicial.
        * **sign_in.js**: Script responsável por pegar os dados de login do usuário, enviá-los como JSON para um servidor e, em caso de sucesso, armazenar o token e o ID do usuário no localStorage, redirecionando para a página inicial.
        * **sign_up.js**: Script responsável por enviar os dados do usuário para criar uma conta e, em seguida, fazer login com o e-mail e a senha, armazenando o token e o ID do usuário no localStorage e redirecionando para a página inicial em caso de sucesso.

    * **view_adm**
        * **home.js**: Arquivo responsável por renderizar a home dos administradores do sistema, incluindo um botão para abrir um formulário de cadastro de novas atividades.
        * **page.js**: Arquivo responsável por renderizar os detalhes de uma atividade para os administradores, listando também todos os inscritos na atividade específica.
        * **form.js**: Responsável por renderizar o formulário de cadastro de atividades e atualizar atividades existentes.

    * **view_index**
        * **home.js**: Arquivo responsável por renderizar a home dos usuários gerais do sistema, listando apenas as tarefas disponíveis e permitindo que o usuário se inscreva nelas.
        * **page.js**: Arquivo responsável por renderizar os detalhes de uma atividade para todos os usuários do sistema, oferecendo a opção de se cadastrar para participar da atividade. Caso o usuário não esteja logado, ele é redirecionado para uma página de login ao clicar em "se inscrever".

    * **app_adm.js**: Código JavaScript que gerencia uma página administrativa, renderizando diferentes seções e formulários, e adicionando funcionalidades para publicar, detalhar e atualizar atividades por meio de eventos em botões e formulários.
    * **app_index.js**: Código JavaScript que configura uma página inicial e de detalhes, renderizando conteúdo geral e adicionando funcionalidades para inscrições e navegação por meio de eventos em botões e links.
