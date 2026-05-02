let products = document.getElementById('products');

async function getData() {
    let response = await fetch('http://127.0.0.1:8000/api/products/');
    let data = await response.json();
    data.forEach(
        i => {
            const imageUrl = i.picture
                ? (i.picture.startsWith('http') ? i.picture : `http://127.0.0.1:8000${i.picture}`)
                : '';
            let card = 
            `
            <div class="product-card">
            <div>
                ${imageUrl ? `<img src="${imageUrl}" alt="${i.name}">` : ''}
                <span class="id-badge">ID: ${i.id}</span>
                <h2>${i.name}</h2>
            </div>
            <p class="price">${i.price}</p>
        </div>
            `
            products.innerHTML += card;
        }
    )
}

getData();
