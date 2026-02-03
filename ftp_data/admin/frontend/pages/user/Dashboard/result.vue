<template>
  <div class="p-6 bg-gray-100 w-full h-full flex justify-center">
    <div class="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">

      <h1 class="text-2xl font-bold mb-6 text-center">
        ผลการประเมิน
      </h1>

      <table class="min-w-full border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border px-4 py-2 text-left w-12">#</th>
            <th class="border px-4 py-2 text-left">ชื่อผู้เข้าประเมิน</th>
            <th class="border px-4 py-2 text-left">ชื่อกรรมการผู้ประเมิน</th>
            <th class="border px-4 py-2 text-center">คะแนนตัวเอง</th>
            <th class="border px-4 py-2 text-center">คะแนนจากกรรมการ</th>
            <th class="border px-4 py-2 text-center">Comment จากกรรมการ</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in evaluationData"
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

            <td class="border px-4 py-2 text-center">
              {{ user.selfScore ?? 'ยังไม่ประเมิน' }}
            </td>

            <td class="border px-4 py-2 text-center">
              {{ user.judgeScore ?? 'ยังไม่ประเมิน' }}
            </td>

            <td class="border px-4 py-2 text-center">
              {{ user.comment ?? 'ยังไม่ประเมิน' }}
            </td>
          </tr>

          <tr>
            <td colspan="5" class="text-center py-6 text-gray-500">
              ไม่มีข้อมูลการประเมิน
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import axios from 'axios'
// import { useUserStorage } from '../../../composables/UserStore'
// import { jwtDecode } from 'jwt-decode'

// const UserStorage = useUserStorage()
// const evaluationData = ref([])

// onMounted(() => {
//   UserStorage.LoadUser()

//   const decode = jwtDecode(UserStorage.token)
//   const id = decode.id

//   axios
//     .get(`api/admin/getuserresult`,{
//       headers: {
//         token: UserStorage.token
//       }
//     })
//     .then(res => {
//       const rawData = res.data.data || []

//       evaluationData.value = rawData.map(item => ({
//         userName: item.user_username,
//         boardName: item.board_username,
//         selfScore: item.user_sum,
//         judgeScore: item.board_sum,
//         comment: item.board_comment
//       }))
//     })
//     .catch(err => {
//       console.error(err)
//       alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
//     })
// })
</script>
