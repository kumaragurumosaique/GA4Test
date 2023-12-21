document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
  
    let cartItems = [];
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productElement = button.closest('.product');
        const productId = productElement.dataset.productId;
        const productName = productElement.dataset.productName;
        const productPrice = parseFloat(productElement.dataset.productPrice);
  
        const cartItem = {
          id: productId,
          name: productName,
          price: productPrice
        };
  
        cartItems.push(cartItem);
        updateCart();
      });
    });
  
    function updateCart() {
      // Clear cart items and update total
      cartItemsElement.innerHTML = '';
      let total = 0;
  
      // Update cart items list and calculate total
      cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(listItem);
  
        total += item.price;
      });
  
      // Update total in the cart
      cartTotalElement.textContent = total.toFixed(2);
  
      // Track cart updates using Google Analytics 4 (GA4)
      gtag('event', 'add_to_cart', {
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.name,
          quantity: 1,
          price: item.price
        })),
        value: total
      });
    }
  });
  