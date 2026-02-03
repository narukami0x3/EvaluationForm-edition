<template>
    <div class="w-full h-full">
        <div class="bg-white shadow-lg w-full h-full ">
            <div class="flex justify-center">
                <label for="" class="text-3xl mt-3 font-bold">แก้ไขโปรไฟล์ส่วนตัว</label>
            </div>
            <form action="" ref="formref" @submit.prevent="editprofile">
                <div class="px-3">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="">ชื่อ</label>
                        <input type="text" v-model="user" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                    <div>
                        <label for="">email</label>
                        <input type="email" v-model="em" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                    <div>
                        <label for="">รหัสผ่าน</label>
                        <input type="password" v-model="pass" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                    <div>
                        <label for="">ยืนยันรหัสผ่าน</label>
                        <input type="password" v-model="conpass" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                    <div>
                        <label for="">เลขบัตรประชาชน</label>
                        <input type="text" v-model="czid" pattern="[0-9]{13}" maxlength="13" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                    <div>
                        <label for="">เลขโทรศัพท์</label>
                        <input type="text" v-model="ph" pattern="[0-9]{10}" maxlength="10" class="border focus:ring-blue-600 focus:ring-1 focus:outline-none rounded-md w-full px-2.5 py-2.5" required="">
                    </div>
                </div>
                <div class="mt-3">
                    <button type="submit" class="bg-red-800 hover:bg-red-950 w-full rounded-md px-2.5 py-2.5 text-white">บันทึก</button>
                </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useService } from '../../../composables/services';

const { editprofile } = useService()
const formref = ref(null)

const user = ref("")
const em = ref("")
const pass = ref("")
const conpass = ref("")
const ph = ref("")
const czid = ref("")


</script>

<style lang="scss" scoped>

</style>