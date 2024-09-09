# Versão 1.0
## Organização das pastas

* index.html: Arquivo html principal do sistema ele é o arquivo onde os usuários normais irão fazer suas interações com o sistema.
* adm.html: Arquivo html onde os usuário administrados irão interagir com o sistema, fazendo o crud de at
* sing_up.html: Formulário para se Registrar no sistema
* sing_in.html: Formulário para realizar login no sistema

* Assets
    * CSS: Folhas de estilo do sistema.
    * Imagens: Imagens e Ícones do sistema.

* Scripts
    * json: Arquivos json de exemplo utilizado durante o desenvolvimento, mas não na versão final.

    * services: Pasta com scripts que podem ser aproveitados por diversas funções no sistema.
        * fetch.js: faz uma solicitação de rede para a URL fornecida, verifica se a resposta foi bem-sucedida, converte a resposta em JSON e retorna os dados.

    * view_adm
        * home.js: Arquivo responsável por rendeirizar a home dos administradores do sistema, deixando um botão para abrir um formulário para cadastrar novas atividades.
        * page.js: Arquivo responsável por rendeizirar os detalhes de um atividade para os administradores. Listando também todos os inscritos na atividade específica.
        * form.js: Responsável por rendeirizar o formulário de Cadastro de atividades e atualizar atividades

    * view_index
        * home.js: Arquivo responsável por rendeirizar a home dos usuários gerais do sistema, listando apenas as tarefas que estão disponíveis, deixando a opção do usuário se inscrever nelas.
        * page.js: Arquivo responsável por rendeirizar os detalhes de uma atividade para todos os usuários do sistema. Dando a opção do usuário se cadastrar para participar da atividade, em caso dele não estar logado ao clicar em se inscrever ele é redirecionado para uma página de login.

    * app_adm.js: O código JavaScript gerencia uma página administrativa, renderizando diferentes seções e formulários, e adiciona funcionalidades para publicar, detalhar e atualizar atividades através de eventos em botões e formulários.
    * app_index.js: O código JavaScript configura uma página inicial e de detalhes, renderizando conteúdo geral, e adiciona funcionalidades para inscrições e navegação por meio de eventos em botões e links.

* Prioridade
1. Enviar e-mail de confirmação de inscrição para o participante
2. Enviar e-mail para os inscritos quando houver atualização na atividade
3. Trocar de "Inscreva-se" para "Cancelar Inscrição"
4. Esconder botão do painel administrativo para visitantes
5. Autenticação de dois fatores

* Back End
1. Preparar Rotina de testes unitários