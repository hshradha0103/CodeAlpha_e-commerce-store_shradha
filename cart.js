console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: Rs ' + ob.price);
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);

    return cartContainer;
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount);
    totalh4Text.id = 'toth4';
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
    console.log(totalh4);
}

// Function to add a product to the cart
function addToCart(productId, quantity) {
    $.ajax({
        url: 'http://localhost:5000/api/cart', // Adjust this URL to your backend endpoint
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ productId, quantity }),
        success: function(response) {
            alert('Product added to cart successfully!');
            // Update the UI to reflect the addition
        },
        error: function(error) {
            console.error('Error adding product to cart:', error);
        }
    });
}

// Function to place an order
function placeOrder(orderData) {
    $.ajax({
        url: 'http://localhost:5000/api/orders',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(orderData),
        success: function(response) {
            alert('Order placed successfully!');
            window.location.href = 'orderPlaced.html'; // Redirect to order placed page
        },
        error: function(error) {
            console.error('Error placing order:', error);
        }
    });
}

// Example of adding an event listener to a button to add a product to the cart
$('#addToCartButton').click(function(event) {
    event.preventDefault();

    const productId = $(this).data('id'); // Assuming your button has a data-id attribute with the product ID
    const quantity = 1; // Example: adding one item to the cart

    addToCart(productId, quantity);
});

// Example of adding an event listener to a button to place an order
$('#placeOrderButton').click(function(event) {
    event.preventDefault();

    const orderData = {
        products: [{ productId: 'exampleProductId', quantity: 2 }], // Replace with actual cart data
        total: 100, // Replace with actual total
        customerName: $('#customerName').val(),
        customerEmail: $('#customerEmail').val()
    };

    placeOrder(orderData);
});

