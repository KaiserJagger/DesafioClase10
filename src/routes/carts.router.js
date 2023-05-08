import { Router } from "express";
import { CartManager } from "../managers/CartManager.js";

const router = Router();

const carro = new CartManager("./data/carts.json");

router.get("/:cid", (req,res) =>{
    const cid = req.params.cid;
    (async () => {
        try {
            const result = await carro.getCartById(cid);
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
})

router.post("/", (req, res) => {
    //const cart = req.body;
    (async () => {
        try {
            const result = await carro.addCart();
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
});
router.post("/:cid/product/:pid", (req, res) => {
    const newCartProduct = {
        cid : parseInt(req.params.cid),
        pid : parseInt(req.params.pid)
    } ;
    (async () => {
        try {
            const result = await carro.addProduct(newCartProduct);
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
});

export default router;