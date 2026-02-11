const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer')
const ctrl = require('../controller/usercontroller')
const {user} = require('../middleware/auth')

router.get('/usersign',user,ctrl.getusersign)
router.get('/time',user,ctrl.gettime)
router.get('/form',user,ctrl.getform)
router.get('/profile',user,ctrl.getprofile)

router.post('/result',user,multer.array('file'),ctrl.insertresult)

router.put('/profile',user,ctrl.editprofile)

module.exports = router;