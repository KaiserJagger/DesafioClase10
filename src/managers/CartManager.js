import * as fs from "fs";

import { ProductManager } from "../managers/ProductManager.js";

const prod = new ProductManager("./data/products.json");

class CartManager {
    #Carts;
    #path; // ruta del archivo
    constructor(path = "./data/carts.json") {
        this.#path = path;
        this.#Carts = [];
        const loadCarts = async () => {
            try {
                // Si el archivo existe copio los datos del archivo a #Carts.
                this.#Carts = JSON.parse(
                    await fs.promises.readFile(this.#path, "utf-8")
                );
            } catch {
                // Si el archivo no existe inicializo #Carts con un array vacio.
                this.#Carts = [];
            }
        };
        loadCarts();
    }
    getCarts = () => {
        return this.#Carts;
    };

    getCartById = (cid) => {
        // busco el indice del Carro
        const cartfound = this.#Carts.findIndex(
            (Carro) => Carro.id === parseInt(cid)
        );
        // Si no existe devuelvo el error
        if (cartfound < 0) {
            return { error: 2, errortxt: "el Carro no existe" };
        }
        const Carro = this.#Carts[cartfound];
        const productosCompleto = Carro.products.map((producto) => {
            // busco el id del producto en la lista de productos
            const prodexists = prod.getProductById(producto.id);
            // Si no existe agrego el error al producto, sino agrego los datos faltantes al producto
            if (prodexists.id === undefined) {
                return {
                    ...producto,
                    error: 2,
                    errortxt: "el Producto ya no esta disponible",
                };
            } else {
                return { ...producto, ...prodexists };
            }
        });
        return {id: Carro.id, products: productosCompleto};
    };

    // Metodo para obtener la ruta al archivo
    getPath = () => {
        return this.#path;
    };

    addCart = () => {
        const id =
            this.#Carts.length === 0
                ? 1
                : this.#Carts[this.#Carts.length - 1].id + 1;
        const products = [];
        const Cart = {
            id,
            products,
        };
        this.#Carts.push(Cart);
        const saveCarts = async () => {
            try {
                const filewriten = await fs.promises.writeFile(
                    this.#path,
                    JSON.stringify(this.#Carts)
                );
                return Cart;
            } catch (err) {
                return err;
            }
        };
        return saveCarts();
    };

    addProduct = ({ cid, pid }) => {
        // busco el indice del Carro
        const cartfound = this.#Carts.findIndex(
            (Carro) => Carro.id === parseInt(cid)
        );
        // Si no existe devuelvo el error
        if (cartfound < 0) {
            return { error: 2, errortxt: "el Carro no existe" };
        }
        const Carro = this.#Carts[cartfound];
        // busco el id del producto en la lista de productos
        const prodexists = prod.getProductById(pid);
        // Si no existe devuelvo el error
        if (prodexists.id === undefined) {
            return { error: 2, errortxt: "el Producto no existe" };
        }
        // busco el id del producto dentro del carro
        const prodfound = Carro.products.findIndex(
            (product) => product.id === parseInt(pid)
        );
        // Si no existe devuelvo sumo el producto al carro, sino sumo 1 en quantity
        if (prodfound < 0) {
            Carro.products.push({ id: pid, quantity: 1 });
        } else {
            Carro.products[prodfound].quantity++;
        }
        // grabo los carros
        const saveCarts = async () => {
            try {
                const filewriten = await fs.promises.writeFile(
                    this.#path,
                    JSON.stringify(this.#Carts)
                );
                return Carro;
            } catch (err) {
                return err;
            }
        };
        return saveCarts();
    };
   
}

export { CartManager };
