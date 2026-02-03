const express = require('express')
const router = express.Router()
const ctrl = require('../controller/usercontroller')
const upload = require('../middleware/upload')

router.get('/form',ctrl.getform)
router.get('/time',ctrl.gettime)

router.post('/result',upload.fields('file'),ctrl.insertresult)

module.exports = router;