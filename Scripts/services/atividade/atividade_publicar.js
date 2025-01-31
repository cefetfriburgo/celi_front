export async function atividadePublicar(id){
    if(confirm("Tem certeza que deseja Publicar?")){
        alert(`Atividade ${id} publicada`);

        await fetch(`https://celi.cefet-rj.br/coordenacao/api/atividade/${id}/status/`, {
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('chave')}`
            }
        })
        alert(`Atividade ${id} publicada`);

        window.location.assign('https://celi.cefet-rj.br/coordenacao/atividades/adm.html');
    }
}