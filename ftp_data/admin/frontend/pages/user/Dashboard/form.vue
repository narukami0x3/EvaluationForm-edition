<template>
    <div class="bg-blue-200 w-full min-h-full">
        <div class="flex justify-center">
            <div class="bg-white p-6 mt-3 rounded-md">
                <div class="border-l-blue font-bold text-3xl mb-3">
                    ระบบประเมินบุคลากรออนไลน์
                </div>
                <div v-if="open" class="">
                    <div class="">
                        <div v-for="f,i in form" :key="f.indicator_id" class="card">
                            <div class="mb-3">
                                <label for="" class="font-bold text-3xl"> {{ i + 1 }} . {{ f.indicator }}</label>
                            </div>
                            <div class="">
                                <div v-for="sec,j in f.sections" :key="sec.indicator_id" class="card-t-blue mb-2">
                                <label for="" class="font-semibold"> ตัวชี้วัดที่ {{ i + 1 }}.{{ j + 1 }} {{ sec.section }}</label>
                                <div>
                                    <label for="" class="label">{{ sec.detail }}</label>
                                </div>
                                <div v-if="sec.type == '1234'" class="mb-3">
                                    <select name="" class="input-field" v-model="payload[sec.section_id]">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div v-if="sec.type == 'yesno'">
                                    <div class="grid grid-cols-2">
                                        <div>
                                            <label for="" class="">มี : </label>
                                            <input type="radio" v-model="payload[sec.section_id]" value="yes" name="" id="">
                                        </div>
                                        <div>
                                            <label for="" class="">ไม่มี : </label>
                                            <input type="radio" name="" v-model="payload[sec.section_id]" value="no" id="">
                                        </div>
                                    </div>
                                </div>
                                <div v-if="sec.file == 1">
                                    <input type="file" name="" id="" class="input-field" @change="e => onchange(e, sec.section_id)">
                                    <label for="" class="text-red-600">*เอกสารเพิ่มเติม</label>
                                </div>
                                <div v-if="sec.file == 0">
                                    <input type="file" name="" id="" class="input-field" @change="e => onchange(e, sec.section_id)">
                                    <label for="" class="text-green-600">*แนบหลักฐานตัวชี้วัด</label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div @click="saveform(payload,files,time)" class="mt-3 flex justify-center">
                        <button type="submit" class="btn bg-blue-600 px-5">
                            บันทึก
                        </button>
                    </div>
                </div>

                <div v-if="!open">
                    <div class="broder border-2 border-dashed rounded-md py-2.5 px-2.5 text-center text-gray-600">
                        <label for="">ไม่มีแบบฟอร์มในขณะนี้</label>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useService } from '#imports'
import { ref,computed } from 'vue'
import { Formservice } from '../../../composables/form'

const { userform,checktime } = useService()
const { saveform } = Formservice()


const payload = ref({})

const score = ref({})
const episode = ref([])
const files = ref({})
const open = ref(false)
const time = ref({})
const form = ref([])

function test(){
    console.log(payload.value)
}

function onchange(e,section_id){
    files.value[section_id] = e.target.files[0]
}

// const totalscore = computed(() => {
//     let sum = 0
//     if(!Array.isArray(episode.value)) return 0

//     episode.value.forEach(ep => {
//         ep.indicators?.forEach(ind => {
//             ind.subs?.forEach(subs => {
//                 const s = Number(score.value[subs.form_id] || 0)
//                 sum += s * ep.weight
//             });
//         });
//     });

//     return sum
// })


const loadform = async() =>{
    const res = await checktime()
    time.value = res[0]
    if(res.length >= 1){
        const res = await userform(time.value.time_id)
        open.value = true
        form.value = mapdata(res[0],res[1])
    }
}

onMounted(() => {
    loadform()
})



const mapdata = (section,indicators) => {
   const epMap = {}

   indicators.forEach(ind => {
        epMap[ind.indicator_id] = {...ind,sections:[]}
   });
   section.forEach(sec => {
        epMap[sec.indicator_id]?.sections.push({...sec})
   });
    return Object.values(epMap)
}
</script>

<style lang="scss" scoped>

</style>