import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia"


export const useUserStore = defineStore("Userstore",{
    state:() => {
        token: ""
        id: null
        user: null
    },
    actions: {
        SetUser(token){
            this.token = token
            if(typeof window !== "undefined"){
                localStorage.setItem("token",token)
            }
            this.user = jwtDecode(this.token)
            this.id = this.user.id
        },
        LoadUser(){
            if(typeof window !== "undefined"){
                this.token = localStorage.getItem("token")
            }
            this.user = jwtDecode(this.token)
            this.id = this.user.id
        },
        Logout(){
            if(typeof window !== "undefined"){
                localStorage.removeItem("token")
            }
            this.token = ""
            this.user = null
            this.id = null
        }
    }
})