document.addEventListener('DOMContentLoaded', function () {
  const productQuantityControls = document.querySelectorAll('.product__quantity-control');
  const productAddButtons = document.querySelectorAll('.product__add');

  const cartProducts = document.querySelector('.cart__products');

  function handleQuantityControl(event) {
    const quantityValue = event.target.parentElement.querySelector('.product__quantity-value');
    let quantity = parseInt(quantityValue.textContent);

    if (event.target.classList.contains('product__quantity-control_dec')) {
      quantity = Math.max(1, quantity - 1);
    } else if (event.target.classList.contains('product__quantity-control_inc')) {
      quantity += 1;
    }

    quantityValue.textContent = quantity;
  }

  function handleAddToCart(event) {
    const product = event.target.closest('.product');
    const productId = product.dataset.id;
    const productImageSrc = product.querySelector('.product__image').src;
    const productCount = parseInt(product.querySelector('.product__quantity-value').textContent);
    const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`);

    if (existingCartItem) {
      const existingProductCount = parseInt(existingCartItem.querySelector('.cart__product-count').textContent);
      existingCartItem.querySelector('.cart__product-count').textContent = existingProductCount + productCount;
    } else {
      const cartProduct = document.createElement('div');
      cartProduct.classList.add('cart__product');
      cartProduct.dataset.id = productId;
      cartProduct.innerHTML = `
        <img class="cart__product-image" src="${productImageSrc}">
        <div class="cart__product-count">${productCount}</div>
      `;
      cartProducts.appendChild(cartProduct);
    }
  }

  productQuantityControls.forEach(control => {
    control.addEventListener('click', handleQuantityControl);
  });

  productAddButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
});
