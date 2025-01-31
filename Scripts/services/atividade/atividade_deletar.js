export function atividadeDeletar(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
        fetch(`https://celi.cefet-rj.br/coordenacao/api/atividade/${id}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('chave')}`
            }
        })
        alert(`Atividade eliminada`);
        window.location.assign('https://celi.cefet-rj.br/coordenacao/atividades/adm.html');
    }
}