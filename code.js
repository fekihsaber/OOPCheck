class Product {
    constructor(id, name, price, imageLink) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
    }
}

class ShoppingCartItem {
    constructor(product, quantity = 0) { // start with 0 quantity
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.renderCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.renderCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0).toFixed(2);
    }

    renderCart() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = ''; // Clear the cart content before rendering

        for (const item of this.items) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.id = item.product.id;

            const imgElement = document.createElement('img');
            imgElement.src = item.product.imageLink;
            imgElement.alt = item.product.name;

            const itemNameElement = document.createElement('span');
            itemNameElement.textContent = item.product.name;

            const quantityIncBtn = this.createButton('+', () => this.adjustQuantity(item.product.id, 1));
            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;
            const quantityDecBtn = this.createButton('-', () => this.adjustQuantity(item.product.id, -1));

            const deleteBtn = this.createButton('Delete', () => this.removeItem(item.product.id));
            deleteBtn.classList.add('delete-btn');

            const itemPriceElement = document.createElement('span');
            itemPriceElement.textContent = `DT ${item.getTotalPrice().toFixed(2)}`;

            itemElement.appendChild(imgElement);
            itemElement.appendChild(itemNameElement);
            itemElement.appendChild(quantityIncBtn);
            itemElement.appendChild(quantityDisplay);
            itemElement.appendChild(quantityDecBtn);
            itemElement.appendChild(deleteBtn);
            itemElement.appendChild(itemPriceElement);

            cartElement.appendChild(itemElement);
        }

        const totalElement = document.createElement('div');
        totalElement.textContent = `Total: DT ${this.getTotal()}`;
        totalElement.classList.add('total');
        cartElement.appendChild(totalElement);
    }

    createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('quantity-btn');
        button.addEventListener('click', onClick);
        return button;
    }

    adjustQuantity(productId, amount) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = Math.max(0, item.quantity + amount);
            this.renderCart();
        }
    }
}

// Create products
const products = [
    new Product('item1', 'Farine', 0.9, 'http://lepidor.com.tn/wp-content/uploads/farine-patissiere-1.png'),
    new Product('item2', 'Semoule', 0.8, 'http://www.warda.tn/sites/default/files/2023-03/semoule-fine-list.png'),
    new Product('item3', 'Lait', 1.5, 'http://www.delice.tn/wp-content/uploads/2023/04/lait-demi-ecreme.png'),
    new Product('item4', 'Sucre', 1.2, 'http://www.espacemanager.com/sites/default/files/sucre-blanc_1607.jpg'),
    new Product('item5', 'Yaourt à boire', 1.15, 'http://courses.monoprix.tn/lac/131081-large_default/yaourt-%C3%A0-boire.jpg')
];

// Create a shopping cart
const cart = new ShoppingCart();

// Add items to the cart initially
products.forEach(product => cart.addItem(product, 0)); // start with 0 quantity

// Display the cart
cart.renderCart();
