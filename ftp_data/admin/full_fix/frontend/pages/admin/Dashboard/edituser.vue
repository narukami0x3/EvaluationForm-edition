<template>
  <div>
    <div class="">
      <div class="flex justify-center">
        <label for="" class="text-3xl px-2.5 py-2.5">จัดการข้อมูลผู้ประเมิน</label>
      </div>

      <div v-if="userdata.length == 0" class="text-center border-2 border-dashed text-gray-500 py-10 rounded-md">
          ไม่มีผู้ไช้
      </div>


      <div v-if="userdata.length >= 1" class="">
        <div class="bg-white border mb-3 shadow-lg p-6" v-for="u in userdata" :key="u.id">
          <div class="flex w-full h-full">
            <div class="flex justify-start">
              {{ u.username }}
            </div>
            <div class="flex justify-end w-full">
              <button type="submit"><i class="mdi mdi-account-edit text-yellow-500" @click="openedit = !openedit"></i></button>
              <button type="submit"><i class="mdi mdi-delete text-red-500"></i></button>
            </div>
          </div>

          <div v-if="openedit" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="openedit = !openedit">
            <div class="bg-white rounded p-6 shadow-lg">
          <label for="">{{ u }}</label>
        </div>
      </div>

        </div>
      </div>

    </div> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useService } from '../../../composables/services';
import { useRouter } from 'vue-router';


const { getalluser } = useService()
const openedit = ref(false)


const userdata = ref("")
const ld = async() => {
  const res = await getalluser()
  userdata.value = res
}


onMounted(() => {
  ld()
})
</script>

<style lang="scss" scoped>

</style>
