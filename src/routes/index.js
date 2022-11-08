const router=require('express').Router();
const CustumersController=require('../controllers/customers');
const IndexController=require('../controllers/index');
//rotas
router.get('/', IndexController.index);

//registro
router.get('/register', CustumersController.index);
router.post('/register/add', CustumersController.add);

//Listar
router.get('/list',CustumersController.listUsers);


//editar
router.get('/edit',CustumersController.indexEdit);
router.post('/edit/:id',CustumersController.edit);

//remover
router.get('/remove/:id',CustumersController.remove);

module.exports=router;