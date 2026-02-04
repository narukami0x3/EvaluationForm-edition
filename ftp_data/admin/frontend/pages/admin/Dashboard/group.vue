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
            <select name="" id="" v-model="member.user_id" class="input-field">
              <option :value="u.id" v-for="u in user" :key="u.id" >{{ u.username }}</option>
            </select>
            <select
              v-model="member.role"
              class="input-field"
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
          v-for="(g, i) in group.value"
          :key="g.group_id"
          class="bg-white p-4 rounded-lg shadow border-l-4 border-red-800"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-bold text-red-900">
              กลุ่มที่ {{ i + 1 }}
            </h3>
            <button
              @click="delgroup(g.group_id)"
              class="text-gray-400 hover:text-red-600"
            >
              <span class="mdi mdi-close-circle text-xl"></span>
            </button>
          </div>
          <div v-for="t in g.datas" :key="t.group_id">
            <div class="grid grid-cols-2">
              <div>
                {{ t.username }}
              </div>
              <div>
                {{ t.group_role }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useService } from "../../../composables/services";

const { delgroup,getgroup,addgroup,getalluser } = useService()

const roles = ["ประธาน", "กรรมการร่วม", "กรรมการ", "เลขานุการ","ผู้รับการประเมิน"];
const savedGroups = ref([]); 
const newMembers = ref([{ user_id: "", role: "กรรมการ" }]); 
const user = ref("")

const addRow = () => newMembers.value.push({ user_id: "", role: "กรรมการ" });
const removeRow = (index) => {
  if (newMembers.value.length > 1) newMembers.value.splice(index, 1);
};
const group = ({})


// const saveGroup = () => {
//   const hasEmptyName = newMembers.value.some((m) => !m.name);
//   if (hasEmptyName) return alert("กรุณากรอกชื่อเข้คระ");



//   savedGroups.value.push([...newMembers.value]);


//   newMembers.value = [{ name: "", role: "กรรมการ" }];
// };

const map = (id,d) => {
  const mapdata = {}

  id.forEach(idg => {
    mapdata[idg.group_id] = {...idg,datas:[]}
  });
  d.forEach(da => {
    mapdata[da.group_id]?.datas.push({...da})
  });
  return Object.values(mapdata)
}


const loaduser = async() => {
  const u = await getalluser()
  const g = await getgroup()
  group.value = map(g[0],g[1])
  user.value = u
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
