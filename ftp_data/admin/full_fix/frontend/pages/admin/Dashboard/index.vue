<template>
  <div class="p-5">
    <h1 class="text-xl font-bold mb-5 text-red-800">จับคู่ผู้ประเมิน</h1>

    <div class="bg-white p-5 rounded shadow">
      <!-- 1. เลือกคนที่จะถูกประเมิน -->
      <div class="mb-4">
        <label class="block font-bold mb-2"
          >1. เลือกผู้ที่จะถูกประเมิน (คนที่ประเมินตัวเองแล้ว):</label
        >
        <select v-model="selectedUser" class="w-full p-2 border rounded">
          <option value="" disabled>--- กรุณาเลือกคน ---</option>
          <option v-for="user in users" :key="user" :value="user">
            {{ user }}
          </option>
        </select>
      </div>

      <!-- 2. เลือกกลุ่มกรรมการ -->
      <div class="mb-4">
        <label class="block font-bold mb-2"
          >2. เลือกกลุ่มกรรมการที่จะให้ไปประเมิน:</label
        >
        <select v-model="selectedGroup" class="w-full p-2 border rounded">
          <option value="" disabled>--- กรุณาเลือกกลุ่ม ---</option>
          <option
            v-for="(group, index) in groups"
            :key="index"
            :value="index + 1"
          >
            กลุ่มที่ {{ index + 1 }} ({{ group.join(", ") }})
          </option>
        </select>
      </div>

      <!-- ปุ่มกดยืนยัน -->
      <button
        @click="save"
        class="w-full bg-red-800 text-white py-2 rounded font-bold hover:bg-red-900"
      >
        บันทึกการส่งไปประเมิน
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ข้อมูลจำลองแบบง่ายๆ
const users = ref(["นายสมชาย ใจดี", "นางสาวสมหญิง มีสุข", "นายวิชาญ เรียนรู้"]);
const groups = ref([
  ["กรรมการ 1", "กรรมการ 2", "กรรมการ 3"],
  ["กรรมการ A", "กรรมการ B"],
]);

const selectedUser = ref("");
const selectedGroup = ref("");

const save = () => {
  if (selectedUser.value && selectedGroup.value) {
    alert(
      `ส่งให้ กลุ่มที่ ${selectedGroup.value} ประเมินคุณ ${selectedUser.value} เรียบร้อย!`,
    );
    // ล้างค่า
    selectedUser.value = "";
    selectedGroup.value = "";
  } else {
    alert("กรุณาเลือกข้อมูลให้ครบถ้วน");
  }
};
</script>

<style scoped>
/* เขียนสไตล์ง่ายๆ */
</style>
