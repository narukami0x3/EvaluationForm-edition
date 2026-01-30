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

    <!-- List -->
    <div
      v-for="(item, i) in items"
      :key="i"
      class="bg-white p-4 rounded shadow mb-3 border relative"
    >
      <button
        @click="deleteItem(i)"
        class="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
      >
        X
      </button>

      <div class="mb-2">
        <span class="badge bg-gray-200">ตอนที่ {{ item.section }}</span>
        <span class="font-bold text-lg ml-2">{{ item.topic }}</span>
      </div>
      <p class="text-gray-600 mb-2">{{ item.detail }}</p>

      <div class="text-sm space-x-3">
        <span class="text-blue-800 bg-blue-50 px-2 py-1 rounded">
          คะแนน: {{ item.hasScore ? `มี (${item.scoreLevel} ระดับ)` : "ไม่มี" }}
        </span>
        <span
          :class="
            item.requireEvidence
              ? 'text-green-800 bg-green-50'
              : 'text-gray-500 bg-gray-100'
          "
          class="px-2 py-1 rounded"
        >
          หลักฐาน: {{ item.requireEvidence ? "ต้องแนบ" : "ไม่ต้อง" }}
        </span>
      </div>
    </div>

    <div
      v-if="items.length === 0"
      class="text-center text-gray-500 py-10 border-2 border-dashed rounded"
    >
      ยังไม่มีข้อมูล
    </div>

    <!-- Unified Modal Overlay -->
    <div
      v-if="mode"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="mode = null"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <!-- 1. Add Topic Mode -->
        <div v-if="mode === 'topic'">
          <h2 class="text-xl font-bold mb-4">เพิ่มหัวข้อใหม่</h2>
          <input
            v-model="newTopic"
            class="input-field mb-3"
            placeholder="ชื่อหัวข้อ (เช่น ความรับผิดชอบ)..."
          />
          <input
            v-model="Topicweight"
            class="input-field mb-3"
            placeholder="น้ำหนักคะแนน"
          />
          <button
            @click="saveTopic(newTopic,Topicweight)"
            class="btn bg-green-600 hover:bg-green-700 w-full mt-4"
          >
            บันทึกหัวข้อ
          </button>
        </div>

        <!-- 2. Add Form Item Mode -->
        <div v-else-if="mode === 'form'">
          <h2 class="text-xl font-bold mb-4">เพิ่มลงแบบฟอร์ม</h2>

          <div class="space-y-3">
            <div>
              <label class="label">หัวข้อ</label>
              <select v-model="form.topic" class="input-field">
                <option value="" disabled>-- เลือกหัวข้อ --</option>
                <option v-for="t in topics" :key="t" :value="t">{{ t.indicator }}</option>
              </select>
              <div v-if="topics.length === 0" class="text-red-500 text-xs mt-1">
                * กรุณาเพิ่มหัวข้อก่อน
              </div>
            </div>

            <div>
              <label class="label">รายละเอียด</label>
              <textarea
                v-model="form.detail"
                rows="3"
                class="input-field"
              ></textarea>
            </div>

            <div>
              <select name="" class="input-field" id="">
                <option value="" class="input-field">รูปแบบการไห้คะแนนแบบ scale</option>
                <option value="" class="input-field">แบบตัวเลือก มี/ไม่มี</option>
              </select>
            </div>

            <div class="p-3 border rounded bg-gray-50">
              <label class="items-center flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.requireEvidence"
                  class="w-4 h-4 text-green-600"
                />
                <span class="font-medium">ต้องการหลักฐานประกอบ</span>
              </label>
            </div>
          </div>

          <button
            @click="saveFormItem"
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
import { ref } from "vue";
import { useService } from "../../../composables/services";

const { addhead,getindi } = useService()

const mode = ref(null); // null | 'topic' | 'form'
const topics = ref([]); // Default topics
const newTopic = ref("");
const Topicweight = ref("");
const items = ref([]);

const form = ref({
  topic: "",
  detail: "",
  hasScore: true,
  scoreLevel: "5",
  requireEvidence: false,
});

const saveTopic = async(h,w) => {
  if (newTopic.value == "" || Topicweight.value == ""){
    return alert("ค่าว่าง new topic topic weight")
  }
  const res = await addhead(h,w)
};

const saveFormItem = () => {
  if (!form.value.topic) return alert("กรุณาเลือกหัวข้อ");

  items.value.push({
    section: (items.value.length + 1).toString(),
    ...form.value,
  });

  // Create new object to reset
  form.value = {
    topic: "",
    detail: "",
    hasScore: true,
    scoreLevel: "5",
    requireEvidence: false,
  };
  mode.value = null;
};

const deleteItem = (i) => {
  if (confirm("ลบรายการนี้?")) {
    items.value.splice(i, 1);
    items.value.forEach((item, idx) => (item.section = (idx + 1).toString()));
  }
};

const ld = async() => {
  const res = await getindi()
  topics.value = res
}

onMounted(() => {
  ld()
})
</script>

<style>
.btn-blue {
  @apply text-white px-3 py-2 rounded-md w-full bg-blue-600 hover:bg-blue-800 transition-colors duration-200 
}
.btn {
  @apply text-white px-4 py-2 rounded shadow transition-colors;
}
.input-field {
  @apply w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none;
}
.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.badge {
  @apply px-2 py-1 text-xs font-bold rounded text-gray-700;
}
</style>
