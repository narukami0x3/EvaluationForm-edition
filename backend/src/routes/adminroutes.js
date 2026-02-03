const express = require('express')
const router = express.Router()
const ctrl = require('../controller/admincontroller')

router.get('/time',ctrl.gettime)
router.get('/user',ctrl.getuser)
router.get('/indicator',ctrl.getindicator)
router.get('/section',ctrl.getsection)
router.get('/result',ctrl.getresult)

router.post('/group',ctrl.insertgroup)//  สร้างคณะกรรมการและมอบหมายกรรมการเ
router.post('/member',ctrl.insertmember)// มอบหมายกรรมการ
router.post('/indicator',ctrl.insertindicator)//เพิ่มตัวชี้วัดและน้ำหนักคะแนน
router.post('/section',ctrl.insertsection)// เพิ่มหัวข้อการประเมินและรายละเอียด

router.put('/edituser',ctrl.edituser)

router.delete('/group',ctrl.deletegroup)//ลบคณะกรรมการ
router.delete('/groupmember',ctrl.deletemember)//ลบกรรมการ
module.exports = router;