<template>
    <div class="min-h-screen">
        <div class="px-3">
            <div class="mt-3 border-l-blue">
                <label for="" class="text-3xl font-bold">หน้าแรก</label>
                <i class="mdi mdi-home font-blld text-3xl px-3"></i>
            </div>
        </div>
        <div class="mt-3 px-3">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="" class="text-2xl">แบบฟอร์มการประเมินตนเอง</label>
                    <div class="card-t-blue">
                        <div v-if="time">
                            <div>
                                <nuxt-link to="form" class="hover:text-blue-500">ทำแบบประเมิน</nuxt-link>
                            </div>
                        </div>
                        <div v-if="!time">
                            <div class="border border-dashed p-6 text-center text-gray-500">
                                ยังไม่เปิดไห้ทำแบบฟอร์มในเวลานี้
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="" class="text-2xl">แบบฟอร์มสำหรับกรรมการผู้ประเมิน</label>
                    <div class="card-t-blue">
                        <div v-if="time">
                            <div v-for="d in user" :key="d.id">
                                <nuxt-link :to="`user/${d.id}`" class="hover:text-blue-500">{{ d.username }}</nuxt-link>
                            </div>
                        </div>
                        <div v-if="!time">
                            <div class="border border-dashed p-6 text-center text-gray-500">
                                ยังไม่เปิดไห้ทำแบบฟอร์มในเวลานี้
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useService } from '../../../composables/services'
import { Formservice } from '../../../composables/form'

const { boarddata } = Formservice()
const { userform,checktime } = useService()
const open = ref(false)
const form = ref([])
const time = ref("")
const user = ref("")

const loadform = async() =>{
    const res = await checktime()
    const h = await boarddata()
    user.value = h
    time.value = res[0]
    console.log(user)
}

onMounted(() => {
    loadform()
})
</script>

<style lang="scss" scoped>

</style>