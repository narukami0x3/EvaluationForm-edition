<template>
  <div class="p-6 font-sans">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">แบบฟอร์มการประเมิน</h1>
      <div>
        <button
          @click="mode = 'topic'"
          class="btn bg-green-600 hover:bg-green-700"
        >
          + เพิ่มหัวข้อ
        </button>
        <button
          @click="mode = 'form'"
          class="btn bg-blue-600 hover:bg-blue-700 ml-2"
        >
          + เพิ่มลงฟอร์ม
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="items.length === 0"
      class="text-center text-gray-500 py-10 border-2 border-dashed rounded"
    >
      ยังไม่มีข้อมูล
    </div>

    <!-- Modal Overlay -->
    <div
      v-if="mode"
      class="model-overlay"
      @click.self="mode = null"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">

        <!-- ================= Add Topic ================= -->
        <div v-if="mode === 'topic'">
          <h2 class="text-xl font-bold mb-4">เพิ่มหัวข้อใหม่</h2>

          <input
            v-model="newTopic"
            class="input-field mb-3"
            placeholder="ชื่อหัวข้อ (เช่น ความรับผิดชอบ)"
          />

          <input
            v-model="Topicweight"
            class="input-field mb-3"
            placeholder="น้ำหนักคะแนน"
          />

          <button
            @click="saveTopic"
            class="btn bg-green-600 hover:bg-green-700 w-full mt-4"
          >
            บันทึกหัวข้อ
          </button>
        </div>

        <!-- ================= Add Form Item ================= -->
        <div v-else-if="mode === 'form'">
          <h2 class="text-xl font-bold mb-4">เพิ่มลงแบบฟอร์ม</h2>

          <div class="space-y-3">
            <!-- topic -->
            <div>
              <label for="" class="label">เพิ่มตัวชี้วัด</label>
              <input type="text" name="" v-model="head" id="" class="input-field">
            </div>
            <div>
              <label class="label">หัวข้อ</label>
              <select v-model="indicator" class="input-field">
                <option value="" disabled>-- เลือกหัวข้อ --</option>
                <option
                  v-for="t in topics"
                  :key="t.indicator_id"
                  :value="t.indicator_id"
                >
                  {{ t.indicator }}
                </option>
              </select>

              <div v-if="topics.length === 0" class="text-red-500 text-xs mt-1">
                * กรุณาเพิ่มหัวข้อก่อน
              </div>
            </div>

            <!-- detail -->
            <div>
              <label class="label">รายละเอียด</label>
              <textarea
                v-model="detail"
                rows="3"
                class="input-field"
              ></textarea>
            </div>

            <!-- score type (placeholder) -->
            <div>
              <select class="input-field" v-model="type">
                <option value="1234">รูปแบบการให้คะแนนแบบ scale</option>
                <option value="yesno">แบบตัวเลือก มี / ไม่มี</option>
              </select>
            </div>

            <!-- evidence -->
            <div class="p-3 border rounded bg-gray-50">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="requireEvidence"
                  class="w-4 h-4 text-green-600"
                />
                <span class="font-medium">ต้องการหลักฐานประกอบ</span>
              </label>
            </div>
          </div>

          <button
            @click="addform(indicator,detail,type,requireEvidence,head)"
            class="btn bg-blue-600 hover:bg-blue-700 w-full mt-6"
          >
            เพิ่มลงฟอร์ม
          </button>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useService } from "../../../composables/services";

const { addhead, getindi, addform } = useService()

const mode = ref(null)
const topics = ref([])
const newTopic = ref("")
const Topicweight = ref("")
const items = ref([])

/* ===== form fields (ไม่ใช้ object) ===== */
const head = ref("")
const indicator = ref("")
const detail = ref("")
const type = ref("1234")
const requireEvidence = ref(false)

/* ===== actions ===== */
const saveTopic = async () => {
  if (!newTopic.value || !Topicweight.value) {
    return alert("ค่าว่าง new topic / topic weight")
  }
  await addhead(newTopic.value, Topicweight.value)
  newTopic.value = ""
  Topicweight.value = ""
}

// const saveFormItem = async () => {
//   if (!indicatorId.value) {
//     return alert("กรุณาเลือกหัวข้อ")
//   }

//   // const payload = {
//   //   indicator_id: indicatorId.value,
//   //   detail: detail.value,
//   //   hasScore: hasScore.value,
//   //   requireEvidence: requireEvidence.value,
//   // }

//   // console.log("ส่งข้อมูล:", payload)
//   // await addform(payload)

//   // reset
//   indicatorId.value = ""
//   detail.value = ""
//   hasScore.value = true
//   requireEvidence.value = false
//   mode.value = null
// }

const ld = async () => {
  topics.value = await getindi()
}

onMounted(ld)
</script>

<style>
</style>
