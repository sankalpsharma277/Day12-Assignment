const apiURL = 'https://fakestoreapi.com/products';
let products = [];
let loadedCount = 0;
const loadStep = 5;

const productContainer = document.getElementById('productContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    products = data;
    loadProducts();
  });

function loadProducts() {
  const toLoad = products.slice(loadedCount, loadedCount + loadStep);
  toLoad.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
    `;
    productContainer.appendChild(card);
  });
  loadedCount += loadStep;
  if (loadedCount >= products.length) loadMoreBtn.style.display = 'none';
}

loadMoreBtn.addEventListener('click', loadProducts);

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  productContainer.innerHTML = '';
  const filtered = products.slice(0, loadedCount).filter(p =>
    p.title.toLowerCase().includes(term)
  );
  if (filtered.length === 0) {
    productContainer.innerHTML = '<p>No products found</p>';
  } else {
    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.onclick = () => {
        window.location.href = `product.html?id=${product.id}`;
      };
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
      `;
      productContainer.appendChild(card);
    });
  }
});
