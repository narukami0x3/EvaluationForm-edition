import axios from "axios";
import { useUserStore } from "#imports";
export const Formservice = () => {  
    const UserStore = useUserStore()


        const map = (name) => {
        return Object.entries(name).map(
            ([form_id,s]) => ({
                section_id: form_id,
                score: s,
            })
        )
        }


    const saveform = async(p,f,t) => {
        const score = map(p)
        const fd = new FormData()
        const id = UserStore.id
        UserStore.LoadUser()

        fd.append("user_id",id)
        fd.append("time_id",t.time_id)
        fd.append("score",JSON.stringify(score))

        Object.entries(f).forEach(([section_id, file]) => {
            fd.append("file_id",(section_id))
            fd.append("file", file || [])
        })

        for (const [key, value] of fd.entries()) {
        console.log(key, value)
        }

        const token = UserStore.token
        try{
            const res = await axios.post("api/user/result",fd)
            console.log(res)
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    const sfb = async(p,f,t,uid,c) => {
        UserStore.LoadUser()
        const score = map(p)
        const fd = new FormData()
        const id = UserStore.id
        fd.append("board_id",id)
        fd.append("user_id",uid)
        fd.append("time_id",t)
        fd.append("comment",c)
        fd.append("score",JSON.stringify(score))
        fd.append("file",f)

        for (const [key, value] of fd.entries()) {
        console.log(key, value)
        }

        const token = UserStore.token
        try{
            const res = await axios.post("api/board/result",fd)
            console.log(res)
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    const userresult = async() => {
        UserStore.LoadUser()
        const token =UserStore.token
        try{
            const res = await axios.get("api/user/result",{
                headers: {
                    token: token
                }
            })
            return res
        }catch(err){
            alert("Something went wrong")
            console.log(err)
        }
    }

    const boarddata = async() => {
        UserStore.LoadUser()
        const token = UserStore.token
        const id = UserStore.id
        try{
            const res = await axios.get(`api/board/user/${id}`,{
                headers: {
                    token: token
                }
            })
            return res.data.data
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }
    
    const boardform = async(uid,tid) => {
        UserStore.LoadUser()
        try{
            const res = await axios.get("api/board/form",{
                headers: {
                    token: UserStore.token,
                    user_id: uid,
                    time_id: tid
                }
            })
            return res.data.data
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    return {
        sfb,
        boardform,
        boarddata,
        userresult,
        saveform,
    }
}