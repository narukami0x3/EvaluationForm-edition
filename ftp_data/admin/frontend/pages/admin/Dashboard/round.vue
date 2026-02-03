<template>
    <div class="bg-white w-full h-full">
        <div class="justify-center mt-3 w-full h-full">
            <div class="text-center mb-2">
                <label for="" class="text-3xl font-bold text-red-800">กำหนดรอบการประเมิน</label>
            </div>
            <div class="grid grid-cols-2 gap-4 px-3">
                <div class="bg-white rounded-md shadow-lg border-t-4 border-red-800">
                    <div class="text-center mt-3">
                        <label for="" class="text-2xl font-bold">เพิ่มรอบการประเมินรอบที่1</label>
                    </div>
                    <div class="mt-3 px-3 mb-3">
                        <label for="">เปิดประเมิน</label>
                        <input type="datetime-local" name="" id="" class="w-full text-center border rounded-md px-3 py-3" v-model="time1.start">
                    </div>
                    <div class="mt-3 px-3 mb-3">
                        <label for="">ปิดประเมิน</label>
                        <input type="datetime-local" name="" id="" class="w-full text-center border rounded-md px-3 py-3" v-model="time1.end">
                    </div>
                </div>
                <div class="bg-white rounded-md shadow-lg border-t-4 border-red-800">
                    <div class="text-center mt-3">
                        <label for="" class="text-2xl font-bold">เพิ่มรอบการประเมินรอบที่2</label>
                    </div>
                    <div class="mt-3 px-3 mb-3">
                        <label for="">เปิดประเมิน</label>
                        <input type="datetime-local" name="" id="" class="w-full text-center border rounded-md px-3 py-3">
                    </div>
                    <div class="mt-3 px-3 mb-3">
                        <label for="">ปิดประเมิน</label>
                        <input type="datetime-local" name="" id="" class="w-full text-center border rounded-md px-3 py-3">
                    </div>
                </div>
            </div>
            <div class="mt-3 px-2.5">
                <button type="submit" class="bg-red-800 rounded-md w-full px-2.5 py-3 text-white hover:bg-red-950" @click="test">
                    บันทึก
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useService } from '../../../composables/services';

function test(){
    
}

const { addtime } = useService()
const time1 = ref({start : "" , end : ""})
const time2 = ref({start : "" , end : ""})

</script>

<style lang="scss" scoped>

</style>