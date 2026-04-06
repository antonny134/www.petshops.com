document.getElementById('name').addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase(); // Captura e converte p/ minúsculas
    const items = document.getElementsByClassName('item');
    
    Array.from(items).forEach(function(item) {
        const itemName = item.textContent.toLowerCase();
        // Verifica se o item contém o texto pesquisado
        if (itemName.indexOf(term) != -1) {
            item.style.display = 'block'; // Mostra
        } else {
            item.style.display = 'none'; // Oculta
        }
    });
});