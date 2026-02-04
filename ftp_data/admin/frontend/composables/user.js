import axios from "axios";
import { useUserStore } from "#imports";
export const Formservice = () => {  
    const UserStore = useUserStore()


        const map = (name) => {
        return Object.entries(name).map(
            ([form_id,s]) => ({
                file_id: form_id,
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
            fd.append("section_id",Number(section_id))
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

    return {
        saveform,
    }
}