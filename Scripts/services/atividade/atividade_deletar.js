export function atividadeDeletar(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
        fetch(`http://localhost:8000/api/atividade/${id}`, {
            method: 'DELETE'
        })
        alert(`Atividade ${id} eliminada`);
        window.location.assign('/adm.html');
    }
}