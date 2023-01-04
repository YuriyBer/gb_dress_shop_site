"use strict";

const basket = {};

const products = getProductsObject();

function getProductsObject() {
    return JSON.parse(json).goods.reduce((acc, product) => {
        return {...acc, [product.id]: product };
    }, {});
}

const basketEl = document.querySelector(".basket");

const basketListEl = document.querySelector(".basket-list");

const basketCounterEl = document.querySelector(".items__number");

const basketTotalValueEl = document.querySelector(".basket-total-value");

document.querySelector(".cart").addEventListener("click", () => {
    basketEl.classList.toggle("hidden");
});

document
    .querySelector(".products__cards")
    .addEventListener("click", (event) => {
        const addToCartEl = event.target.closest(".products__add-to-cart__button");

        if (!addToCartEl) {
            return;
        }

        addToCart(addToCartEl.dataset.id);
    });

basketEl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("product-remove")) {
        return;
    }

    removeFromCart(event.target.closest(".basket-row").dataset.id);
});

function addToCart(id) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: products[id].name,
            price: products[id].price,
            count: 0,
        };
    }
    basket[id].count++;
    renderBasketContent();
}

function removeFromCart(id) {
    if (basket[id].count <= 1) {
        delete basket[id];
    } else {
        basket[id].count--;
    }

    renderBasketContent();
}

function renderBasketContent() {
    basketListEl.innerHTML = Object.values(basket).reduce(
        (acc, product) => acc + getBasketProductMarkup(product),
        ""
    );
    basketCounterEl.textContent = getTotalBasketCount().toString();

    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
}

function getBasketProductMarkup(product) {
    return `
      <div class="basket-row" data-id="${product.id}">
        <div>${product.name}</div>
        <div>
          <span class="product-count">${product.count}</span> шт.
        </div>
        <div>${product.price} ₽</div>
        <div>
          <span class="product-total-row">
            ${(product.price * product.count).toFixed(2)} ₽
          </span>
        </div>
        <div><button class="product-remove">-</button></div>
      </div>
    `;
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce(
        (acc, product) => acc + product.price * product.count,
        0
    );
}