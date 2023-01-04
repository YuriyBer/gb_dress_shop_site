"use strict";

// Находим элемент, куда надо вставить элементы.
const featuredItemsEl = document.querySelector(".products__cards");
// Вставляем все данные из массива, предварительно каждые данные превратив в
// html-разметки товаров, складывая все разметки в одну строку.
featuredItemsEl.innerHTML = getProductsList()
    .map((product) => renderProduct(product))
    .join("");

function getProductsList() {
    return JSON.parse(json).goods;
}

/**
 * Функция создает html товара.
 * @param {object} data - объект с информацией о товаре.
 * @returns разметку товара.
 */
function renderProduct(data) {
    return `
    <figure class="products__card">
        <div class="products__card-img-container">
            <img src="${data.img}" alt="${data.name}">
            <div class="products__add-to-cart">
                <button class="products__add-to-cart__button" data-id="${data.id}">
                    <img src="images/cart.svg" alt="" class="products__add-to-cart__button-img">
                    Add to Cart
                </button>
            </div>
        </div>
        <figcaption class="products__card-info">
            <h3 class="products__card-title">
                ${data.name}
            </h3>
            <p class="products__card-description">
                ${data.description}
            </p>
            <p class="products__card-price rose">
                ${data.price} руб.
            </p>
        </figcaption>
    </figure>
  `;
}