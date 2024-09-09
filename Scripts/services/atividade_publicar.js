const formElement = document.querySelector('.form');

formElement.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => console.log())
})