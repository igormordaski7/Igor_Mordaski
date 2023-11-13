/* Carrinho de compras */

/* addEventListener está capturando os eventos de clique nos botões que foram adicionados */

/* remover itens do carrinho */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const removeProductButtons = document.getElementsByClassName("remove");
    for (let i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct);
    }

    const quantifyButtons = document.querySelectorAll(".qty button");
    quantifyButtons.forEach((button) => {
        button.addEventListener("click", adjustQuantity);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart"); // Alteração aqui
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => addProductToCart(button));
    });
}

/* para adicionar produto - testando

function addProductToCart(event) {
    console.log("addProductToCart called");
    const button = event.target;

    // Busca pelo elemento .product mais próximo
    let productInfos = button.parentElement;

    // Continua subindo no DOM até encontrar o elemento .product
    while (productInfos && !productInfos.classList.contains("product")) {
        productInfos = productInfos.parentElement;
    }

    if (!productInfos) {
        console.error("Product information not found!");
        return;
    }

    // Encontra os elementos dentro de productInfos
    const productImage = productInfos.querySelector(".product-image");
    const productTitleElement = productInfos.querySelector(".product-name");
    const productPriceElement = productInfos.querySelector(".product-price");

    if (!productImage || !productTitleElement || !productPriceElement) {
        console.error("Product image, title, or price not found!");
        return;
    }

    const productTitle = productTitleElement.innerText;
    const productPrice = productPriceElement.innerText;

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML =
        `
        <td>
        <div class="product">
            <img src="${productImage.src}" alt="${productTitle}">
            <div class="info">
                <div class="name">${productTitle}</div>
                <div class="category">Categoria</div>
            </div>
        </div>
    </td>
    <td class="product-value">${productPrice}</td>
    <td>
        <div class="qty">
            <button><i class='bx bx-minus'></i></button>
            <span class="product-quantify">1</span>
            <button><i class='bx bx-plus'></i></button>
        </div>
    </td>
    <td class="product-total">R$ ${productPrice}</td>
    <td>
        <button class="remove"><i class="bx bx-x"></i></button>
    </td>
    `;

    const tableBody = document.querySelector(".cart-table tbody");

    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    tableBody.appendChild(newCartProduct);
}
*/


function removeProduct(event) {
    const productContainer = event.target.parentElement.parentElement.parentElement;
    productContainer.remove();
    updateTotal();
}

function adjustQuantity(event) {
    const button = event.target;
    const productContainer = button.closest(".cart-product");
    const quantityElement = productContainer.querySelector(".product-quantify");
    let quantity = parseInt(quantityElement.textContent, 10);

    if (button.classList.contains("bx-minus")) {
        quantity = Math.max(0, quantity - 1);
    } else if (button.classList.contains("bx-plus")) {
        quantity++;
    }

    quantityElement.textContent = quantity;

    if (quantity === 0) {
        productContainer.remove();
    }

    updateTotal();
}

function updateTotal() {
    const cartProducts = document.getElementsByClassName("cart-product");
    let totalAmount = 0;

    for (let i = 0; i < cartProducts.length; i++) {
        const productValueElement = cartProducts[i].querySelector(".product-value");
        const productValueText = productValueElement.innerText.replace("R$", "").replace(".", "").replace(",", ".");
        const productValue = parseFloat(productValueText);

        const productQuantifyElement = cartProducts[i].querySelector(".product-quantify");
        const productQuantifyText = productQuantifyElement.textContent.trim();
        const productQuantify = parseInt(productQuantifyText, 10);

        totalAmount += productValue * productQuantify;
    }

    const formattedTotalAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(totalAmount);

    console.log(formattedTotalAmount)

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")

    document.querySelector(".amount span").innerText = "R$" + totalAmount;

    document.querySelector(".info span").innerText = "R$" + totalAmount;
}


