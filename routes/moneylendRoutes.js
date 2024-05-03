const express=require('express');
const router=express.Router();
const {getmoneylends,createmoneylend,updatemoneylend,deleteAllmoneylends}=require('../controllers/moneylendController');
const validateTokenHandler=require('../middleware/validateTokenHandler');

router.use(validateTokenHandler);

//router.route('/').get(getmoneylends, validateTokenHandler); and so on

router.route('/:id').get(getmoneylends);

router.route('/').post(createmoneylend);

router.route('/:id').put(updatemoneylend);

router.route('/:id').delete(deleteAllmoneylends);


module.exports=router;