<template>
    <div class="bg-gray-200 w-screen h-screen">
        <div class="flex bg-blue-700 h-60 w-screen">
            <div>
                <img class="flex w-20 h-20 rounded-full px-2 py-2 " src="" alt="">
            </div>
            <div class="flex justify-center text-center items-center w-full h-full text-white  text-3xl">
                <label for="">ระบบประเมินบุคลากรออนไลน์</label>
            </div>
        </div>
        <div class="grid grid-cols-2">
            <div class="px-2 py-2">
                <label class="font-bold text-2xl" for="">ข่าวสารและประกาศ</label>
                <div class="bg-white p-6 mt-2 mb-2 rounded-md shadow-lg" v-for="time in t" :key="time.time_id">
                    <div>
                        {{ time.time }}
                    </div>
                    <div>
                        <label for="">เริ่มการประเมิน {{ TH(time.start) }}</label>
                    </div>
                    <div>
                        <label for="">ปิดการประเมิน {{ TH(time.expire) }}</label>
                    </div>
                </div>
            </div>
            <div class="flex justify-end px-2 py-2 ">
                <div>
                    <div class="card-t-blue">
                        <div class="text-center">
                            <label class="font-bold " for="">LOGIN</label>
                        </div>
                        <div class="mt-2">
                            <label class="label" for="">Username</label>
                            <input class="input-field" type="text" name="" id="" v-model="u">
                        </div>
                         <div class="mt-2">
                            <label class="label" for="">Password</label>
                            <input class="input-field" type="password" name="" id="" v-model="p">
                        </div>
                        <div>
                            <button class="btn-blue mt-2" @click="login(u,p)">เข้าสู่ระบบ</button>
                        </div>
                        <div class="mt-2">
                            <nuxt-link class="text-blue-500" to="register">ลงทะเบียน</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useService } from '../composables/services';
import { ref } from 'vue';

const {login,time} = useService()

const u = ref("")
const p = ref("")
const t = ref([""])

// const formatDateTH = (dateStr) => {
//   const d = new Date(dateStr)

//   const day = d.getDate()
//   const month = d.getMonth() + 1
//   const year = d.getFullYear() + 543 // แปลงเป็น พ.ศ.

//   return `${day}/${month}/${year}`
// }

const TH = (datestr) => {
    return new Date(datestr).toLocaleDateString("th-TH")
}


const loadtime = async() => {
    const res = await time()
    t.value = res.data
}

onMounted(() => {
    loadtime()
})

</script>

<style>

</style>