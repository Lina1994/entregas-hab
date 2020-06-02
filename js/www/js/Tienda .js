'use strict';

/* Crear un falso e - commerce.Por un lado tenemos todos los artículos que forman el stock de
la tienda. Tendremos también un usuario que añade cosas a su carrito, que es privado.
Los artículos cuando los metemos al carrito los convertimos un tipo de dato que guarda
las unidades que tiene el usuario de dicho artículo.
La tienda es la encargada de imprimir un ticket por la consola. */

const itemNames = ['Camisa', 'Pantalon', 'Calcetines'];
const itemPrices = [13, 27, 100];
let itemStock = [6, 13, 10];

class Store {
  buyCarrito(myUser) {
    let total = 0;
    const carrito = myUser.getCarrito();
    for (let i = 0; i < carrito.length; i++) {
      total += carrito[i].cantidad * carrito[i].item.price;
      console.log(
        carrito[i].cantidad +
          ' ' +
          carrito[i].item.name +
          ' ' +
          carrito[i].item.price +
          '€/Unid' +
          ' SubTotal ' +
          carrito[i].cantidad * carrito[i].item.price +
          '€'
      );
    }
    return 'Total a Pagar: ' + total + ' €';
  }
}

class Item {
  name;
  price;
  //stock;
  constructor(itemData) {
    this.name = itemData.name;
    this.price = itemData.price;
    //this.stock = itemData.stock;
  }
}

class User {
  #cart = [];
  #cantidad = 1;
  addCarrito(item) {
    let foundItem = this.#cart.find((cartItem) => {
      return cartItem.item.name === item.name;
    });
    if (foundItem) {
      foundItem.cantidad++;
    } else {
      this.#cart.push({ item: item, cantidad: this.#cantidad });
    }
  }
  getCarrito() {
    return this.#cart;
  }
  getCantidad() {
    return this.#cantidad;
  }
}

const myItems = itemNames.map((item, index) => {
  return new Item({ name: item, price: itemPrices[index] });
});

const myUser = new User();
myUser.addCarrito(myItems[0]);
myUser.addCarrito(myItems[0]);
myUser.addCarrito(myItems[2]);
myUser.addCarrito(myItems[1]);
myUser.addCarrito(myItems[0]);

console.log(myItems);

const myCompra = new Store();
console.log(myCompra.buyCarrito(myUser));
/* const myStock = itemNames.map((item, index) => {
    return { name: item, price: itemPrices[index], stock: itemStock[index] };
  }); */
