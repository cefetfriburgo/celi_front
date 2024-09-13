# Versão 1.0
## Organização das pastas

* index.html: Arquivo HTML principal do sistema. É o arquivo onde os usuários normais irão interagir com o sistema.
* adm.html: Arquivo HTML onde os usuários administradores irão interagir com o sistema, realizando operações de CRUD.
* sign_up.html: Formulário para registrar-se no sistema.
* sign_in.html: Formulário para realizar login no sistema.

* Assets
    * CSS: Folhas de estilo do sistema.
    * Imagens: Imagens e ícones do sistema.

* Scripts
    * json: Arquivos JSON de exemplo utilizados durante o desenvolvimento, mas não na versão final.

    * services: Pasta com scripts que podem ser aproveitados por diversas funções no sistema.
        * fetch.js: Faz uma solicitação de rede para a URL fornecida, verifica se a resposta foi bem-sucedida, converte a resposta em JSON e retorna os dados.

    * view_adm
        * home.js: Arquivo responsável por renderizar a home dos administradores do sistema, incluindo um botão para abrir um formulário de cadastro de novas atividades.
        * page.js: Arquivo responsável por renderizar os detalhes de uma atividade para os administradores, listando também todos os inscritos na atividade específica.
        * form.js: Responsável por renderizar o formulário de cadastro de atividades e atualizar atividades existentes.

    * view_index
        * home.js: Arquivo responsável por renderizar a home dos usuários gerais do sistema, listando apenas as tarefas disponíveis e permitindo que o usuário se inscreva nelas.
        * page.js: Arquivo responsável por renderizar os detalhes de uma atividade para todos os usuários do sistema, oferecendo a opção de se cadastrar para participar da atividade. Caso o usuário não esteja logado, ele é redirecionado para uma página de login ao clicar em se inscrever.

    * app_adm.js: Código JavaScript que gerencia uma página administrativa, renderizando diferentes seções e formulários, e adiciona funcionalidades para publicar, detalhar e atualizar atividades por meio de eventos em botões e formulários.
    * app_index.js: Código JavaScript que configura uma página inicial e de detalhes, renderizando conteúdo geral e adicionando funcionalidades para inscrições e navegação por meio de eventos em botões e links.