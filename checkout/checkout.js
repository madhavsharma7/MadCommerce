document.addEventListener("DOMContentLoaded", function () {
    // Fetch products from localStorage
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the cart list to avoid duplicates
    const cartList = document.getElementById('cart-products');
    cartList.innerHTML = '';

    let totalPrice = 0; // Initialize total price

    // Populate cart items
    cartProducts.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Create product image element
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        // Create product title element
        const title = document.createElement('h2');
        title.textContent = product.name;

        // Create product quantity element
        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${product.quantity}`;

        // Create product price element
        const price = document.createElement('p');
        price.textContent = `Price: Rs ${product.price}`;

        // Calculate total price
        totalPrice += product.price * product.quantity;

        // Append all elements to the list item
        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(quantity);
        li.appendChild(price);

        // Append the list item to the cart list
        cartList.appendChild(li);
    });

    // Display the total price on the checkout page
    const totalPriceElement = document.createElement('h4');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.textContent = `Total Price: Rs ${totalPrice.toFixed(2)}`;

    // Add the total price element after the "Add More Address" button
    const addAddressButton = document.getElementById('add-address');
    addAddressButton.insertAdjacentElement('afterend', totalPriceElement);

    // Handle adding new addresses dynamically
    const addressList = document.getElementById('address-list');
    document.getElementById('add-address').addEventListener('click', function () {
        const newAddress = document.createElement('div');
        newAddress.classList.add('form');
        newAddress.innerHTML = `
            <input type="radio" name="selected-address" value="New Address" required>
            <input type="text" name="new-address" placeholder="Enter new address" required>
            <button class="delete-address" id="dlt" type="button">Delete Address</button>
            <span class="delete-address" id="delicon">
            <i class="fa fa-trash" aria-hidden="true"></i>
            </span>

        `;
        addressList.appendChild(newAddress);

        // Add delete address functionality
        newAddress.querySelector('.delete-address').addEventListener('click', function () {
            newAddress.remove();
        });
        newAddress.querySelector('#delicon').addEventListener('click', function () {
            newAddress.remove();
        });
    });

    // Handle the Place Order button click
    document.getElementById('place-order').addEventListener('click', function () {
        const selectedAddress = document.querySelector('input[name="selected-address"]:checked');
        const firstName = document.getElementById('firstname').value.trim();
        const lastName = document.getElementById('lastname').value.trim();
        const phoneNumber = document.getElementById('phonenumber').value.trim();

        // Validate that an address is selected
        if (!selectedAddress) {
            alert('Please select an address before placing the order.');
            return;
        }

        // Validate that the first name, last name, and phone number fields are filled
        if (!firstName || !lastName || !phoneNumber || !email) {
            alert('Please fill your details');
            return;
        }

        sendMail();

        // Additional logic for placing the order can be added here
        alert('Order placed successfully!');

        // Clear the cart from localStorage after placing the order
        localStorage.removeItem('cart');

        // Redirect to index.html after the alert is dismissed
        // window.location.href = '../index.html';
    });
});

// Dropdown toggle logic
document.querySelector('.dropdown-btn').addEventListener('click', function () {
    document.querySelector('.dropdown-content').classList.toggle('show');
});


function sendMail() {
    // Gather form data
    var params = {
        name: document.getElementById("firstname").value,
        email: document.getElementById("email").value,
    };

    // EmailJS Service and Template IDs (ensure they are correct)
    const serviceID = "service_2n0ancc";
    const templateID = "template_n3izgq1";

    // Input validation: Ensure that all fields are filled
    if (!params.name || !params.email) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, params)
        .then(res => {
            // Clear form fields after successful email sending
            document.getElementById("firstname").value = "";
            document.getElementById("email").value = "";
            // document.getElementById("phoneNumber").value = "";
            // document.getElementById("message").value = "";

            // Log the response and show success alert
            console.log("Email sent successfully:", res);

            alert("Your message was sent successfully!");
            // Redirect to index.html after the alert is dismissed
            window.location.href = '../index.html';

        })
        .catch(err => {
            // Log the error for debugging
            console.error("Failed to send email. Error details:", err);

            // Display an error message to the user
            alert("Failed to send message. Please try again.");
        });
}
