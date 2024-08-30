document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    const fileListTitle = document.getElementById('file-list-title');
    
    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        fileList.innerHTML = '';

        if (files.length > 0) {
            fileListTitle.style.display = 'block';
        } else {
            fileListTitle.style.display = 'none';
        }
        
        Array.from(files).forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;

            const viewButton = document.createElement('button');
            viewButton.textContent = 'Visualizar';
            viewButton.addEventListener('click', function() {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const url = e.target.result;
                    const popup = document.createElement('div');
                    popup.style.position = 'fixed';
                    popup.style.top = '50%';
                    popup.style.left = '50%';
                    popup.style.transform = 'translate(-50%, -50%)';
                    popup.style.backgroundColor = '#fff';
                    popup.style.border = '1px solid #ccc';
                    popup.style.padding = '1rem';
                    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
                    popup.style.zIndex = '1000';
                    popup.style.overflow = 'auto';
                    popup.style.maxWidth = '90vw';
                    popup.style.maxHeight = '80vh';

                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = url;
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        img.style.objectFit = 'contain';
                        popup.appendChild(img);
                    } else {
                        const iframe = document.createElement('iframe');
                        iframe.src = url;
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        popup.appendChild(iframe);
                    }

                    document.body.appendChild(popup);
                    
                    popup.addEventListener('click', function() {
                        document.body.removeChild(popup);
                    });
                };

                reader.readAsDataURL(file);
            });

            listItem.appendChild(viewButton);
            fileList.appendChild(listItem);
        });
    });
});