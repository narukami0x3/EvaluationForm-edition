const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer')
const ctrl = require('../controller/boardcontroller')
const {user} = require('../middleware/auth')

router.get('/user',user,ctrl.getuser)
router.get('/form',user,ctrl.getform)

router.post('/result',user,multer.single('file'),ctrl.insertresult)

module.exports = router;