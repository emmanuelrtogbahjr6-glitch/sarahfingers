// ===============================
// David Togbah Electronic
// FINAL CART SYSTEM
// ===============================

// Exchange rate (1 USD = LRD)
const exchangeRate = 190;

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// ADD TO CART
// ===============================
function addToCart(name, price) {

    let item = cart.find(p => p.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(name + " added to cart ✔");
}

// ===============================
// UPDATE CART COUNTER
// ===============================
function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    let counter = document.getElementById("cart-count");

    if (counter) {
        counter.innerText = totalItems;
    }
}

// ===============================
// DISPLAY CART TABLE
// ===============================
function displayCart() {

    let table = document.getElementById("cart-items");

    if (!table) return;

    table.innerHTML = "";

    let totalUSD = 0;

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;
        totalUSD += subtotal;

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal}</td>
            <td>
                <button onclick="removeItem(${index})">Remove</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("usd-total").innerText =
        "$" + totalUSD.toFixed(2);

    document.getElementById("lrd-total").innerText =
        "LRD " + (totalUSD * exchangeRate).toLocaleString();
}

// ===============================
// REMOVE ITEM
// ===============================
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    displayCart();
    updateCartCount();
}

// ===============================
// CLEAR CART
// ===============================
function clearCart() {

    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// ===============================
// CHECKOUT
// ===============================
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = `
Thank you for shopping with David Togbah Electronic!

ORDER DETAILS:
-------------------------
`;

    cart.forEach(item => {
        message += `${item.name} x${item.quantity} = $${item.price * item.quantity}\n`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    message += `
-------------------------
TOTAL: $${total.toFixed(2)}
LRD: ${(total * exchangeRate).toLocaleString()}

CONTACT US:
📞 0771718766
📧 emmanuelrtogbahjr6@gmail.com
📍 34th Camp Johnson Road, Monrovia

Please send this order via WhatsApp or call to confirm.
`;

    alert(message);
}

// ===============================
// SEARCH PRODUCTS
// ===============================
function searchProducts() {

    let input = document.getElementById("search");

    if (!input) return;

    let filter = input.value.toUpperCase();

    let products = document.querySelectorAll(".product");

    products.forEach(product => {

        let name = product.querySelector("h3").innerText;

        if (name.toUpperCase().includes(filter)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// ===============================
// INIT ON PAGE LOAD
// ===============================
window.onload = function () {

    updateCartCount();
    displayCart();
};

// Product list (must match your product names)
const productList = [
"iPhone 17 Pro",
"HP Laptop",
"Samsung Smart TV",
"Bluetooth Speaker",
"Wireless Headphones",
"PlayStation 5",
"MacBook Pro",
"Apple Watch",
"Canon Camera",
"Power Bank",
"Samsung Refrigerator",
"LG Washing Machine",
"Microwave Oven",
"Air Conditioner",
"Wi-Fi Router",
"HP Printer",
"Gaming Keyboard",
"Gaming Mouse",
"Bluetooth Earbuds",
"Standing Fan"
];

function liveSearch(){

    let input = document.getElementById("search");
    let box = document.getElementById("suggestions");

    let value = input.value.toLowerCase();

    box.innerHTML = "";

    if(value === ""){
        box.style.display = "none";
        return;
    }

    let results = productList.filter(item =>
        item.toLowerCase().includes(value)
    );

    if(results.length === 0){
        box.style.display = "none";
        return;
    }

    box.style.display = "block";

    results.forEach(item => {

        let div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = item;

        div.onclick = function(){
            input.value = item;
            box.style.display = "none";
            filterProducts(item);
        };

        box.appendChild(div);
    });
}
function filterProducts(value){

    let filter = value.toUpperCase();

    let products = document.querySelectorAll(".product");

    products.forEach(product => {

        let name = product.querySelector("h3").innerText;

        if(name.toUpperCase().includes(filter)){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }
    });
}