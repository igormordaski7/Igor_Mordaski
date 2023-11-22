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

}

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


