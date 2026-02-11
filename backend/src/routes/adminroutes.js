const express = require('express')
const router = express.Router()
const ctrl = require('../controller/admincontroller')
const {admin} = require('../middleware/auth')

router.get('/form',admin,ctrl.getform)
router.get('/result',admin,ctrl.getresult)
router.get('/user',admin,ctrl.getuser)
router.get('/usersign',admin,ctrl.getusersign)
router.get('/boardsign',admin,ctrl.getboardsign)
router.get('/time',admin,ctrl.time)

router.post('/section',admin,ctrl.insertsection)
router.post('/indicator',admin,ctrl.insertindicator)
router.post('/time',admin,ctrl.inserttime)
router.post('/usersign',admin,ctrl.insertusersign)
router.post('/boardsign',admin,ctrl.insertboardsign)

router.delete('/section/:id',admin,ctrl.deletesection)
router.delete('/indicator/:id',admin,ctrl.deleteindicator)
router.delete('/time/:id',admin,ctrl.deletetime)
router.delete('/usersign/:id',admin,ctrl.deleteusersign)
router.delete('/boardsign/:id',admin,ctrl.deleteboardsign)

module.exports = router;