import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();

const prod = new ProductManager("./data/products.json");

router.get("/home", (req, res) => {
    const products = prod.getProducts();
    res.render("home", {products: products});
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const product = prod.getProducts();
        res.render("realTimeProducts", { products: product });
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;
