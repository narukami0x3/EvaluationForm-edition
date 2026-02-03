<template>
  <div class="flex justify-center items-center bg-red-950 min-h-screen p-4">
    <div class="bg-white rounded-md p-6 w-full max-w-4xl">
      <div class="text-3xl font-bold mb-6 text-center">
        ลงทะเบียนผู้รับการประเมิน
      </div>

      <!-- FORM -->
      <form ref="formRef" @submit.prevent="regis">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- ชื่อ -->
          <div>
            <label class="font-semibold">ชื่อ :</label>
            <input
              type="text"
              v-model="username"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="ชื่อผู้ใช้"
            />
          </div>

          <!-- password -->
          <div>
            <label class="font-semibold">Password :</label>
            <input
              type="password"
              v-model="password"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="password"
            />
          </div>

          <!-- email -->
          <div>
            <label class="font-semibold">Email :</label>
            <input
              type="email"
              v-model="email"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="email"
            />
          </div>

          <!-- วันเกิด -->
          <div>
            <label class="font-semibold">วันเกิด :</label>
            <input
              type="date"
              v-model="date"
              required
              class="border rounded-md py-2.5 px-3 w-full"
            />
          </div>

          <!-- เลขบัตรประชาชน -->
          <div>
            <label class="font-semibold">เลขบัตรประชาชน :</label>
            <input
              type="text"
              v-model="czid"
              @input="onlyNumber"
              maxlength="13"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="เลขบัตรประชาชน"
            />
          </div>

          <!-- เบอร์โทร -->
          <div>
            <label class="font-semibold">เบอร์โทร :</label>
            <input
              type="text"
              v-model="phone"
              maxlength="10"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="เบอร์โทร"
            />
          </div>

          <!-- เงินเดือน -->
          <div>
            <label class="font-semibold">เงินเดือน :</label>
            <input
              type="number"
              v-model="sal"
              required
              class="border rounded-md py-2.5 px-3 w-full"
              placeholder="เงินเดือน"
            />
          </div>

          <!-- วันที่เริ่มทำงาน -->
          <div>
            <label class="font-semibold">วันที่เริ่มทำงาน :</label>
            <input
              type="date"
              v-model="start"
              required
              class="border rounded-md py-2.5 px-3 w-full"
            />
          </div>

          <!-- แผนก -->
          <div class="md:col-span-2">
            <select
              v-model="newdepartment"
              required
              class="border rounded w-full py-2.5 px-3"
            >
              <option value="" disabled>---- แผนก ----</option>
              <option
                v-for="dep in department"
                :key="dep.department_id"
                :value="dep.department_id"
              >
                {{ dep.department }}
              </option>
            </select>
          </div>

          <!-- ระดับ -->
          <div>
            <select
              v-model="newlevel"
              required
              class="border rounded w-full py-2.5 px-3"
            >
              <option value="" disabled>---- ระดับ ----</option>
              <option
                v-for="le in level"
                :key="le.level_id"
                :value="le.level_id"
              >
                {{ le.level }}
              </option>
            </select>
          </div>

          <!-- ตำแหน่ง -->
          <div>
            <select
              v-model="newposition"
              required
              class="border rounded w-full py-2.5 px-3"
            >
              <option value="" disabled>---- ตำแหน่ง ----</option>
              <option
                v-for="po in position"
                :key="po.position_id"
                :value="po.position_id"
              >
                {{ po.position }}
              </option>
            </select>
          </div>
        </div>

        <!-- SUBMIT -->
        <div class="mt-6">
          <button
            type="submit"
            class="text-white bg-red-950 rounded-md py-2.5 px-3 w-full"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>

      <div class="mt-3 text-blue-700 text-center">
        <nuxt-link to="/">เข้าสู่ระบบ</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const formRef = ref(null)

const username = ref("")
const password = ref("")
const email = ref("")
const date = ref("")
const czid = ref("")
const phone = ref("")
const sal = ref("")
const start = ref("")
const newdepartment = ref("")
const newlevel = ref("")
const newposition = ref("")

const position = ref([])
const level = ref([])
const department = ref([])

onMounted(() => {
  axios.get("api/auth/getregisdata").then(res => {
    position.value = res.data.data[0] || []
    level.value = res.data.data[1] || []
    department.value = res.data.data[2] || []
  })
})


function regis () {
  if (!formRef.value.checkValidity()) {
    formRef.value.reportValidity()
    return
  }

  axios.post("api/auth/register", {
    username: username.value,
    password: password.value,
    email: email.value,
    date: date.value,
    czid: czid.value,
    phone: phone.value,
    salary: sal.value,
    start: start.value,
    department: newdepartment.value,
    level: newlevel.value,
    position: newposition.value,
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
</script>