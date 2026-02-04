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
                                <div v-for="score in sec.scores" :key="score.section_id">
                                    <div class="">
                                        <div class="grid grid-cols-2">
                                            <div>
                                                <label class="label" for="">คะนแนนที่ประเมินตนเอง</label>
                                            </div>
                                            <div>
                                                {{ score.selfscore }}
                                            </div>
                                        </div>
                                        <div>
                                            <div v-if="score.filename">
                                                <div class="">
                                                    <a :href="`http://192.168.88.252:3000/file/${encodeURIComponent(score.filename)}`"><i class=" mdi mdi-file-document text-blue-600 text-3xl"></i></a>
                                                </div>
                                            </div>
                                            <div v-if="!score.filename">
                                                    <nuxt-link to=""><i class=" mdi mdi-file-document text-red-600 text-3xl"></i></nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <input class="input-field" type="file" name="" id="" @change="onchange">
                    </div>
                    <div class="mt-3">
                        <input class="input-field" type="text" name="" id="" v-model="comment" placeholder="comment">
                    </div>
                    <div class="mt-3 flex justify-center">
                        <button type="submit" class="btn bg-blue-600 px-5" @click="sfb(payload,files,time.time_id,userid,comment)">
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
import { useService } from '../../../../composables/services'
import { ref,computed } from 'vue'
import { Formservice } from '../../../../composables/form'
import { useRoute } from 'vue-router/auto-routes'


const { userform,checktime } = useService()

const { sfb,boardform } = Formservice()

const route = useRoute()
const payload = ref({})
const userid = route.params.id

const comment = ref("")
const files = ref({})
const open = ref(false)
const time = ref({})
const form = ref([])

function test(){
    console.log(files)
}

function onchange(e){
    files.value = e.target.files[0]
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
        const f = await boardform(userid,time.value.time_id)
        open.value = true
        form.value = mapdata(f[0] , f[1] , f[2])
        console.log(form.value)
    }
}

onMounted(() => {
    loadform()
})



const mapdata = (section,indicators,score) => {
   const epMap = {}
   indicators.forEach(ind => {
        epMap[ind.indicator_id] = {...ind,sections:[]}
   });
   section.forEach(sec => {
        epMap[sec.indicator_id]?.sections.push({...sec,scores:[]})
   });
   score.forEach(sc => {
        Object.values(epMap).forEach(section => {
            section.sections.find(i => (i.section_id == sc.section_id))
            ?.scores.push({...sc})
        });
   });
    return Object.values(epMap)
}


// const mapdata = (ep,indicators,forms) => {
//    const epMap = {}

//    ep.forEach(e => {
//         epMap[e.ep_id] = {...e,indicators:[]}
//    });
//    indicators.forEach(ind => {
//         epMap[ind.ep_id]?.indicators.push({...ind,subs:[]})
//    });
//    forms.forEach(f => {
//         Object.values(epMap).forEach(ep => {
//             ep.indicators.find(i => (i.indicator_id == f.indicator_id))
//             ?.subs.push({...f})
//         });
//     });
//     return Object.values(epMap)
// }
</script>

<style lang="scss" scoped>

</style>