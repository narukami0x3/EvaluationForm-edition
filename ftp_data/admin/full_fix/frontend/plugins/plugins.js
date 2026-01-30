import axios from "axios";

export default defineNuxtPlugin(() => {
    axios.defaults.baseURL = "http://192.168.88.252:3000/"
})