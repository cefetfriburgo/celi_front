# Versão 1.0

## Objetivos
* Login e Logout
* CRUD Atividade
* Listar nome e e-mail dos inscritos nas atividades

## Organização das pastas
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
    * view_index
        * home.js: Arquivo responsável por rendeirizar a home dos usuários gerais do sistema, listando apenas as tarefas que estão disponíveis, deixando a opção do usuário se inscrever nelas.
        * page.js: Arquivo responsável por rendeirizar os detalhes de uma atividade para todos os usuários do sistema. Dando a opção do usuário se cadastrar para participar da atividade, em caso dele não estar logado ao clicar em se inscrever ele é redirecionado para uma página de login.