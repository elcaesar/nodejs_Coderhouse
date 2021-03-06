import {ProductosDaoMemoria} from '../../dao/producto/daoProductoMemoria';
import {ContainerMemoria} from '../../containers/containerMemoria';
import {array_memoria} from "../../config/memoriaConfig";

class CarritosDaoMemoria extends ContainerMemoria {
    constructor() {
        super(array_memoria.carrito_mem);
    }

    async save() {
        try{
            let carrito = {};
            carrito.id = String(await this.__getNextId());
            carrito.timestamp = Date.now();
            const carritos = await this.getAll();
            carrito.productos = [];
            carritos.push(carrito);
            this.items = carritos;
            return carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const producto = new ProductosDaoMemoria();
            for(const p of products){
                const prod = await producto.getById(p.id);
                if (prod !== null){
                    carrito.productos.push(prod);
                }
            }
            await this.updateById(cart_id, carrito);
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }                                                                                   
    }

    async getProductsCart(cart_id){
        try{
            const carrito = await this.getById(cart_id);
            return carrito.productos;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }
    
    async deleteProductCart(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        let productos = carrito.productos;
        const index = productos.findIndex(p => p.id === product_id);
        productos.splice(index, 1);
        carrito.productos = productos;

        this.updateById(cart_id, carrito);
    }
}

export default CarritosDaoMemoria;