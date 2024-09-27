# Back-End
//* 01 ID: do usuario recebido pelo login.
//* 02 Publicar: Receber o id da atividade e mudar o status Dela.
//* 03 Inscrição: Receber o id do usuário e da atividade, para criar um participante
//* 04 Selecionar os inscritos em uma atividade. Criar uma Controladora que recebe o id de uma atividade específica e pega os "participantes" que possuem esse id no campo de atividade_id e depois pegue todos os usuario_id dos "participantes" e depois retorne todos os usuários que correspondem aos IDs.

* Fazer as alterações no Participante, trocar diario por atividade_id, 

* Configurar as permissões para que apenas os gestores tenham acesso a certas controladoras
    * Prompt do GPT: Estou criando uma api em laravel, para alguns cruds quero que apenas usuário gestores tenham acesso, como posso fazer isso? Observação: Estou usando laravel sanctum.
    * Na tabela de user do laravel que criar um campo chamado adm que receberá os valores 0 ou 1, para representar false e true, por padrão sempre que um usuário for criado o campo receberá o valor 0, além disso será impossível alterar de 0 para 1, sem tem acesso ao banco de dados.
    * Além disso quero proteger algumas rotas de minha api para que apenas usuários que possuem 1 no adm tenham acesso.