const markup = 0.10; // +10% preț
const apiBase = "https://tehnomir.com.ua/index.php?r=api/v1/products"; // endpoint API
const productList = document.getElementById("product-list");

// Netlify Identity setup
const loginBtn = document.getElementById("login-btn");
netlifyIdentity.init();
loginBtn.addEventListener("click", () => netlifyIdentity.open());

netlifyIdentity.on("login", user => {
    console.log("Logged in as:", user.email);
    netlifyIdentity.close();
    fetchProducts();
});

function fetchProducts() {
    fetch(apiBase)
        .then(res => res.json())
        .then(data => {
            productList.innerHTML = "";
            data.forEach(p => {
                const price = (p.price * (1 + markup)).toFixed(2);
                const div = document.createElement("div");
                div.className = "product";
                div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>Preț client: ${price} lei</p>
          <a href="https://tehnomir.com.ua/product/${p.id}" target="_blank">Vezi produsul</a>
        `;
                productList.appendChild(div);
            });
        })
        .catch(err => console.error(err));
}