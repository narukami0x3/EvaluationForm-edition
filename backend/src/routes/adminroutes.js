const express = require('express')
const router = express.Router()
const ctrl = require('../controller/admincontroller')

router.get('/time',ctrl.gettime)
router.get('/user',ctrl.getuser)

router.post('/group',ctrl.insertgroup)//  สร้างคณะกรรมการและมอบหมายกรรมการเ
router.post('/member',ctrl.insertmember)// มอบหมายกรรมการ
router.delete('/group',ctrl.deletegroup)//ลบคณะกรรมการ
router.delete('/groupmember',ctrl.deletemember)//ลบกรรมการ
router.post('/indicator',ctrl.insertindicator)//เพิ่มตัวชี้วัดและน้ำหนักคะแนน
router.post('/section',ctrl.insertsection)// เพิ่มหัวข้อการประเมินและรายละเอียด

router.get('/indicator',ctrl.getindicator)
router.get('/section',ctrl.getsection)

router.put('/edituser',ctrl.edituser)
module.exports = router;