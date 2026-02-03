<template>
  <div>
    <!-- ปุ่มเปิด -->
    <button
      @click="open = true"
      class="bg-red-950 text-white rounded-md px-4 py-2"
    >
      เพิ่มหัวข้อ
    </button>

    <!-- Modal -->
    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="open = false"
    >
      <div class="bg-white w-[500px] rounded-md p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">
          เพิ่มหัวข้อ
        </h2>

        <div class="space-y-3">
          <div>
            <label>ตอน</label>
            <input
              class="border py-2.5 px-3 w-full rounded-md"
            />
          </div>

          <div>
            <label>เกณฑ์การให้คะแนน</label>
            <input
              class="border py-2.5 px-3 w-full rounded-md"
            />
          </div>

          <button
            class="bg-red-950 text-white rounded-md w-full py-3 mt-3"
          >
            บันทึก
          </button>

          <button
            @click="open = false"
            class="bg-gray-300 rounded-md w-full py-3"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<style>

</style>
