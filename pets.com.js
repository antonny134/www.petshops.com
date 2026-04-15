fetch('https://fakestoreapi.com/products?limit=5')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const ul = document.getElementById('listaprodutos');
    data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = ` <a href="https://www.google.com/maps/@-3.6114971,-45.3463498,15z?entry=ttu" style="text-decoration: none; color: black;">
              <img src="${item.image}" alt="2" width="50" >
              <span>${item.title}</span>
            </a>`;
      ul.appendChild(li);
    });
  });

  function filtrar() {
    var input, filter, ul, li, a, i, txtValue,span;count = 0;

    input = document.getElementById('myinput');
    ul = document.getElementById('listaprodutos');

    //filtrar o valor do input
    filter = input.value.toUpperCase();

    //pegar os itens da lista (li)
    li = ul.getElementsByTagName('li');
    //loop para comparar o valor do input com os itens da lista
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
        count++;
      } else {
        li[i].style.display = 'none';
      }
      count++;
    }

    if (count === 0) {
      ul.style.display = 'none';
    } else {
      ul.style.display = 'block';
    }
   
  }