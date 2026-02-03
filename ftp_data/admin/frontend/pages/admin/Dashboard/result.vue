<template>
  <div class="bg-gray-100 w-full h-full p-6 flex justify-center">
    <div class="bg-white shadow p-6 rounded-xl">
    <h1 class="font-bold text-center text-blue-800 mb-6 text-2xl">ผลการประเมิน</h1>
    <table class="border border-gray-300">
      <thead class="bg-blue-500 ">                                          
        <tr class="text-white">
          <th class="border px-4 py-2 text-center w-12">#</th>
          <th class="border px-4 py-2 text-center">ชื่อผู้เข้าร่วมการประเมิน</th>
          <th class="border px-4 py-2 text-center">ชื่อกรรมการผู้ประเมิน</th>
          <th class="border px-4 py-2 text-center">คะแนนตัวเอง</th>
          <th class="border px-4 py-2 text-center">คะแนนจากกรรมการ</th>
          <th class="border px-4 py-2 text-center">Comment จากกรรมการ</th>
        </tr>
      </thead>

      <tbody>
        <tr 
        v-for="(user,index) in data"
        :key="index"
        class="hover:bg-gray-50"
        >
          <td class="border px-4 py-2">
            {{ index + 1 }}
          </td>
          <td class="border px-4 py-2">
            {{ user.userName }}
          </td>
          <td class="border px-4 py-2">
            {{ user.boardName ?? 'ยังไม่ระบุกรรมการ' }}
          </td>
          <td>
            {{ user.selfscore ?? 'ยังไม่ประเมิน' }}
          </td>
          <td class="border px-4 py-2">
            {{ user.judgeScore ?? 'ยังไม่ประเมิน' }}
          </td>
          <td class="border px-4 py-2">
            {{ user.comment ?? 'ยังไม่ประเมิน' }}
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center py-6 text-gray-500">
            ไม่มีข้อมูลการประเมิน
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>