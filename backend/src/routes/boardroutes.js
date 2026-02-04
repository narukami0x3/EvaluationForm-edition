const express = require('express')
const router = express.Router()
const ctrl = require('../controller/boardcontroller')
const upload = require('../middleware/upload')

router.get('/user/:id',ctrl.getuser)
router.get('/form',ctrl.getform)
router.get('/time',ctrl.gettime)

router.post('/result',upload.any(),ctrl.insertresult)

module.exports = router;