<template>
  <div>
    <div>
      <div class="flex justify-center">
        <label class="text-3xl px-2.5 py-2.5">จัดการข้อมูลผู้ประเมิน</label>
      </div>
      <div
       v-if="uswedate.length == 0"
        class="text-center border-2
         border-dashed text-gray-500 py-10 rounded-md">
        ไม่มีผู้ไช้
      </div>

      <div v-if="userdata.length >= 1" class="px-3 rounded-md">
        <div
          class="bg-white border mb-3 shadow-lg p-6"
          v-for="u in userdata"
          :key="u.id"> 
          <div class="flex w-full h-full">
            <div class="flex justify-start">
              {{ u.username }}
            </div>
            
            <div class="flex justify-end w-full">
              <button
                type="button"
                @click="openedit = true; editdata = { ...u, birthday: u.birthday?.slice(0,10) }">
                <i class="mdi mdi-account-edit text-yellow-500"></i>
              </button>
              <button type="button">
                <i class="mdi mdi-delete text-red-500"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
<div
  v-if="openedit"
 class="model-overlay"
  @click.self="openedit = false"
>
  <div class="bg-white rounded p-6 shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
    <h2 class="text-xl mb-4 text-center">แก้ไขข้อมูลผู้ประเมิน</h2>

    <div class="grid grid-cols-2 gap-3">  

      <!-- username -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">ชื่อผู้ใช้</label>
        <input v-model="editdata.username" class="border w-full p-2 rounded" />
      </div>

      <!-- email -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">อีเมล</label>
        <input v-model="editdata.email" class="border w-full p-2 rounded" />
      </div>

      <!-- password -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">รหัสผ่าน</label>
        <input v-model="editdata.password" class="border w-full p-2 rounded" />
      </div>

      <!-- czid -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">เลขบัตรประชาชน</label>
        <input v-model="editdata.czid" class="border w-full p-2 rounded" />
      </div>

      <!-- salary -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">เงินเดือน</label>
        <input type="number" v-model="editdata.salary" class="border w-full p-2 rounded" />
      </div>

      <!-- birthday -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">วันเกิด</label>
        <input type="date" v-model="editdata.birthday" class="border w-full p-2 rounded" />
      </div>

      <!-- department -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">แผนก</label>
        <select v-model="editdata.department" class="border w-full p-2 rounded">
          <option :value="1">IT</option>
          <option :value="2">ก่อสร้าง</option>
          <option :value="3">ไฟฟ้า</option>
        </select>
      </div>

      <!-- position -->
      <div class="px-2 py-2 ">
        <label class="block mb-1">ตำแหน่ง</label>
        <select v-model="editdata.position" class="border w-full p-2 rounded">
          <option :value="1">ครู</option>
          <option :value="2">ลูกจ้างประจำ</option>
        </select>
      </div>

      <!-- level -->
     

      <!-- role -->
  

    </div>

     <div class="px-2 py-2 ">
        <label class="block mb-1">วิทยฐานะ</label>
        <select v-model="editdata.level" class="border w-full p-2 rounded">
          <option :value="1">ไม่มี</option>
          <option :value="2">คศ.1</option>
          <option :value="3">คศ.2</option>
          <option :value="4">คศ.3</option>
          <option :value="5">คศ.4</option>
          <option :value="6">คศ.5</option>
        </select>
          
      </div>
    <!-- SAVE -->
    <div class="flex justify-end mt-4">
      <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="saveEdit">
        บันทึก
      </button>
    </div>
  </div>
</div>


    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue'
import { useService } from '../../../composables/services'
import { useRouter } from 'vue-router'

// ดึง service (เพิ่ม updateuser เข้ามา)
const { getalluser, updateuser } = useService()

const openedit = ref(false)
const userdata = ref([])
const editdata = ref(null)

// โหลดข้อมูล
const ld = async () => {
  const res = await getalluser()
  userdata.value = res
}

// ====== ฟังก์ชันบันทึก ======
const saveEdit = async () => {
  try {
    // 1. ส่งข้อมูลที่แก้ไป backend
    await updateuser(editdata.value)

    // 2. อัปเดตข้อมูลในหน้า (ไม่ต้องโหลดใหม่)
    const index = userdata.value.findIndex(
      u => u.id === editdata.value.id
    )

    if (index !== -1) {
      userdata.value[index] = { ...editdata.value }
    }

    // 3. ปิด modal
    openedit.value = false
  } catch (err) {
    console.error(err)
    alert('บันทึกข้อมูลไม่สำเร็จ')
  }
}

onMounted(() => {
  ld()
})
</script>


<style lang="scss" scoped>
</style>
