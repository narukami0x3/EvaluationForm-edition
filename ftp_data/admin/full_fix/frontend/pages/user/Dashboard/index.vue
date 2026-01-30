<template>
    <div class="bg-gray-200 w-screen h-full">
        <div class="flex justify-center">
            <div class="bg-white p-6 mt-3 rounded-md">
                <div class="text-3xl font-bold mb-3">
                    ระบบประเมินบุคลากรออนไลน์
                </div>
                <div v-if="episode.length >= 1">
                    <div v-for="ep in episode" :key="ep.ep_id" class="border rounded-md px-3 py-3">
                    <div class="font-bold text-3xl">
                        {{ ep.ep }}
                    </div>
                    <div v-for="ind,i in ep.indicators" :key="ind.ep_id">
                        <div class="font-semibold px-5">
                            {{ i + 1 }}.{{ ind.indicator }}
                        </div>
                        <div v-for="f,j in ind.subs" :key="f.indicator_id">
                            <div class="px-10">
                                {{ i + 1 }}.{{ j + 1 }} {{ f.form }}
                            </div>
                            <div class="flex justify-end">
                                <select name="" id="" class="border rounded-md py-2.5 px-3" v-model="score[f.form_id]">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="file" name="" class="border rounded-md w-full px-2.5 py-3" id="" @change="onchange($event)">
                </div>
                <div @click="sent(score,file,totalscore)">
                    <button type="submit" class="bg-red-800 hover:bg-red-950 text-white py-2.5 px-2.5 rounded-md">
                        บันทึก
                    </button>
                </div>
                {{ totalscore }}
                </div>

                <div v-if="episode.length == 0">
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

const { userform,sent } = useService()

const score = ref({})
const episode = ref([])
const file = ref("")

function onchange(e){
    file.value = e.target.files[0]
}

const totalscore = computed(() => {
    let sum = 0
    if(!Array.isArray(episode.value)) return 0

    episode.value.forEach(ep => {
        ep.indicators?.forEach(ind => {
            ind.subs?.forEach(subs => {
                const s = Number(score.value[subs.form_id] || 0)
                sum += s * ep.weight
            });
        });
    });

    return sum
})

const mapdata = (ep,indicators,forms) => {
   const epMap = {}

   ep.forEach(e => {
        epMap[e.ep_id] = {...e,indicators:[]}
   });
   indicators.forEach(ind => {
        epMap[ind.ep_id]?.indicators.push({...ind,subs:[]})
   });
   forms.forEach(f => {
        Object.values(epMap).forEach(ep => {
            ep.indicators.find(i => (i.indicator_id == f.indicator_id))
            ?.subs.push({...f})
        });
    });
    return Object.values(epMap)
}

const loadform = async() =>{
    const res = await userform()
    const ep = res.data.data[0]
    const indicators = res.data.data[1]
    const forms = res.data.data[2]
    episode.value = mapdata(ep || [] , indicators || [] ,forms || [])
}

onMounted(() => {
    loadform()
})
</script>

<style lang="scss" scoped>

</style>