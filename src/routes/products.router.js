import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();
const prod = new ProductManager("./data/products.json");

router.get("/", (req, res) => {
    let { limit } = req.query;
    if (limit) {
        res.status(200).send(prod.getProducts().slice(0, +limit));
    } else {
        res.status(200).send(prod.getProducts());
    }
});
router.get("/", async (req, res) => {
    let { limit } = req.query;
    try {
        const productos = await prod.getProducts();
        if (limit) {
            res.status(200).send(productos.slice(0, +limit));
        } else {
            res.status(200).send(productos);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const foundprod = await prod.getProductById(id);
        if (foundprod === false) {
            res.status(404).send({ error: "Producto no encontrado" });
        } else {
            res.status(200).send(foundprod);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/", async (req, res) => {
    const producto = req.body;
    try {
        const result = await prod.addProduct(producto);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(201).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
router.put("/", async (req, res) => {
    const producto = req.body;
    try {
        const result = await prod.updateProduct(producto);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const result = await prod.deleteProduct(id);
        if (result.error) {
            res.status(400).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;
