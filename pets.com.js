fetch('https://fakestoreapi.com/products?limit=4')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const ul = document.getElementById('listaprodutos');
    data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = ` <a href="#" style="text-decoration: none; color: black;">
              <img src="${item.image}" alt="2" width="50" height="50">
              <span>${item.title}</span>
            </a>`;
      ul.appendChild(li);
    });
  });

  function filtrar() {
    var input, filter, ul, li, a, i, txtValue, count = 0;

  }