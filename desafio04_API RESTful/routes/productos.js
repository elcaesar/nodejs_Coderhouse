const { Router } = require('express')
const { productosGetAll,
        productosGet,
        productosPost,
        productosPut,
        productosDelete 
      } = require('../controllers/productos')

const router = Router()

router.get('/', productosGetAll) //listar todos los productos
router.get('/:id', productosGet) //listar un producto
router.post('/', productosPost) 
router.put('/:id', productosPut)
router.delete('/:id', productosDelete)

module.exports = router