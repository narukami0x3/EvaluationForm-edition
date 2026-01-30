<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1
        class="text-2xl font-bold mb-6 text-red-900 border-l-4 border-red-800 pl-4"
      >
        จัดกลุ่มกรรมการ
      </h1>

      <!-- ฟอร์มเพิ่มสมาชิก (สร้างกลุ่มใหม่) -->
      <div
        class="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-red-800"
      >
        <h2 class="text-xl font-semibold mb-4 text-red-800">
          สร้างกลุ่มที่ {{ savedGroups.length + 1 }}
        </h2>

        <div class="space-y-3">
          <div
            v-for="(member, index) in newMembers"
            :key="index"
            class="flex gap-2 items-center"
          >
            <select name="" id="" v-model="member.user_id" class="border w-full rounded py-2.5 border-2">
              <option :value="u.id" v-for="u in user" :key="u.id" >{{ u.username }}</option>
            </select>
            <select
              v-model="member.role"
              class="w-40 rounded-md border-gray-300 p-2 border focus:ring-red-500 focus:border-red-500"
            >
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
            <button
              @click="removeRow(index)"
              class="text-red-500 hover:bg-red-50 p-1 rounded"
            >
              <span class="mdi mdi-delete text-xl"></span>
            </button>
          </div>

          <button
            @click="addRow"
            class="text-red-800 font-medium flex items-center gap-1 hover:underline"
          >
            <span class="mdi mdi-plus-circle"></span> เพิ่มรายชื่อ
          </button>

          <button
            @click="addgroup(newMembers)"
            class="w-full mt-4 bg-red-800 text-white font-bold py-2 rounded hover:bg-red-900 shadow-lg transition"
          >
            บันทึกกลุ่มที่ {{ savedGroups.length + 1 }}
          </button>
        </div>
      </div>

      <!-- รายการกลุ่มที่บันทึกแล้ว -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(group, gIndex) in savedGroups"
          :key="gIndex"
          class="bg-white p-4 rounded-lg shadow border-l-4 border-red-800"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-bold text-red-900">
              กลุ่มที่ {{ gIndex + 1 }}
            </h3>
            <button
              @click="deleteGroup(gIndex)"
              class="text-gray-400 hover:text-red-600"
            >
              <span class="mdi mdi-close-circle text-xl"></span>
            </button>
          </div>
          <div
            v-for="(m, mIndex) in group"
            :key="mIndex"
            class="flex justify-between text-sm py-1 border-b border-gray-50"
          >
            <span class="text-gray-700">{{ m.name }}</span>
            <span class="text-red-800 font-semibold">{{ m.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useService } from "../../../composables/services";

const { addgroup,getalluser } = useService()

const roles = ["ประธาน", "กรรมการร่วม", "กรรมการ", "เลขานุการ"];
const savedGroups = ref([]); 
const newMembers = ref([{ user_id: "", role: "กรรมการ" }]); 
const user = ref("")

const addRow = () => newMembers.value.push({ user_id: "", role: "กรรมการ" });
const removeRow = (index) => {
  if (newMembers.value.length > 1) newMembers.value.splice(index, 1);
};



// const saveGroup = () => {
//   const hasEmptyName = newMembers.value.some((m) => !m.name);
//   if (hasEmptyName) return alert("กรุณากรอกชื่อเข้คระ");



//   savedGroups.value.push([...newMembers.value]);


//   newMembers.value = [{ name: "", role: "กรรมการ" }];
// };


const deleteGroup = (index) => {
  if (confirm("ลบกลุ่มนี้ใช่หรือไม่?")) savedGroups.value.splice(index, 1);
};

const loaduser = async() => {
  const res = await getalluser()
  user.value = res
}

onMounted(() => {
  loaduser()
})

</script>

<style scoped>
.mdi {
  vertical-align: middle;
}
</style>
