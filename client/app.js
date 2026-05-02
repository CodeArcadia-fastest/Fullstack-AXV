const API_URL = 'http://127.0.0.1:8000/api';

const products = document.getElementById('products');
const filter = document.getElementById('category-filter');

function getImageUrl(picture) {
    if (!picture) {
        return '';
    }

    return picture.startsWith('http') ? picture : `http://127.0.0.1:8000${picture}`;
}

function renderProducts(data) {
    products.innerHTML = '';

    if (!data.length) {
        products.innerHTML = '<p class="empty-message">Bu kategoriyada mahsulot yoq</p>';
        return;
    }

    data.forEach(i => {
        const imageUrl = getImageUrl(i.picture);
        const card = `
            <div class="product-card">
                <div>
                    ${imageUrl ? `<img src="${imageUrl}" alt="${i.name}">` : ''}
                    <span class="id-badge">ID: ${i.id}</span>
                    <h2>${i.name}</h2>
                    <p class="category">${i.category_name}</p>
                </div>
                <p class="price">${i.price}</p>
            </div>
        `;

        products.innerHTML += card;
    });
}

async function getData() {
    const params = new URLSearchParams();
    const categoryId = filter.value;
    const query = searchInput.value.trim();

    if (categoryId) {
        params.append('category', categoryId);
    }

    if (query) {
        params.append('search', query);
    }

    const url = `${API_URL}/products/${params.toString() ? `?${params}` : ''}`;

    const response = await fetch(url);
    const data = await response.json();

    renderProducts(data);
}

async function getCategories() {
    const response = await fetch(`${API_URL}/categories/`);
    const data = await response.json();

    data.forEach(i => {
        const option = `<option value="${i.id}">${i.name}</option>`;
        filter.innerHTML += option;
    });
}

filter.addEventListener('change', () => {
    getData();
});

let searchTimeout = null;
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        getData();
    }, 300);
});
getCategories();
getData();
