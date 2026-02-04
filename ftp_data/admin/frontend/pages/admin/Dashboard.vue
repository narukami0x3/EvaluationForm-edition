<template>
  <div class="relative h-screen overflow-hidden">
    <div class="flex h-full">
      <div
        class="bg-gradient-to-r from-red-950 to-red-800 h-screen px-2.5 py-3"
      >
        <div
          v-if="menuui"
          class="bg-gradient-to-r from-red-950 to-red-800 h-screen px-2.5 py-3"
        >
          <div class="mb-10">
            <div class="flex gap-10">
              <label for="" class="text-white text-3xl flex justify-start"
                >ระบบประเมินบุคลากร</label
              >
              <i
                class="mdi mdi-menu-close flex justify-end text-white text-3xl"
                @click="menuui = !menuui"
              ></i>
            </div>
          </div>
          <div class="flex justify-center">
            <img
              src="../../assets/ตราสำนักงานคณะกรรมการการอาชีวศึกษา.svg"
              alt=""
              srcset=""
              class="w-20 h-20"
            />
          </div>
          <div class="flex justify-center">
            <label for="" class="text-white">Username</label>
          </div>
          <div class="flex justify-center">
            <label for="" class="text-white">Email@a.com</label>
          </div>
          <div class="flex justify-center">
            <label for="" class="text-white">093-123-1324</label>
          </div>
          <div class="flex justify-center">
            <button
              @click="logout"
              type="submit"
              class="text-white border rounded-lg px-2.5 py-1.5"
            >
              <i class="mdi mdi-logout"></i> ออกจากระบบ
            </button>
          </div>
          <div class="mt-10">
            <div class="flex justify-start">
              <i class="mdi mdi-home text-white"></i>
              <nuxt-link to="/admin/Dashboard/" class="text-white px-3 w-full"
                >หน้าแรก</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-account-multiple text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/group"
                class="text-white px-3 w-full"
                >กำหนดกรรมการ</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-clock-plus text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/round"
                class="text-white px-3 w-full"
                >กำหนดรอบการประเมิน</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-account text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/profile"
                class="text-white px-3 w-full"
                >แก้ไขโปรไฟล์ส่วนตัว</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-account text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/edituser"
                class="text-white px-3 w-full"
                >จัดการข้อมูลผู้ประเมิน</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-form-select text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/form"
                class="text-white px-3 w-full"
                >เพิ่มแบบประเมิน</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-form-select text-white"></i>
              <nuxt-link
                to="/admin/Dashboard/result"
                class="text-white px-3 w-full"
                >ผลการประเมิน</nuxt-link
              >
              <i
                class="mdi mdi-menu-right text-white w-full flex justify-end"
              ></i>
            </div>
          </div>
        </div>
        <div v-if="!menuui" class="">
          <i
            class="mdi mdi-menu-open flex justify-end text-3xl bg-red-950 rounded-md p-2 text-white"
            @click="menuui = !menuui"
          ></i>
          <div class="mt-3">
            <div class="flex justify-start">
              <i class="mdi mdi-logout text-white"></i>
              <i class="mdi mdi-menu-right text-white w-full"></i>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex justify-start">
              <i class="mdi mdi-home text-white"></i>
              <i class="mdi mdi-menu-right text-white w-full"></i>
            </div>
          </div>
          <div>
            <div class="mt-3">
              <div class="flex justify-start">
                <i class="mdi mdi-account text-white"></i>
                <i class="mdi mdi-menu-right text-white w-full"></i>
              </div>
            </div>
            <div class="mt-3">
              <div class="flex justify-start">
                <i class="mdi mdi-form-select text-white"></i>
                <i class="mdi mdi-menu-right text-white w-full"></i>
              </div>
            </div>
            <div class="mt-3">
              <div class="flex justify-start">
                <i class="mdi mdi-form-select text-white"></i>
                <i class="mdi mdi-menu-right text-white w-full"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../composables/UserStore";

const UserStore = useUserStore();

function logout() {
  UserStore.Logout();
  navigateTo("/");
}

const menuui = ref(false);
</script>

<style lang="scss" scoped></style>
