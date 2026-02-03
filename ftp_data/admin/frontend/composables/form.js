import axios from "axios";
import { useUserStore } from "#imports";
export const Formservice = () => {  
    const UserStore = useUserStore()


        const map = (name) => {
        return Object.entries(name).map(
            ([form_id, s]) => ({
                form_id: Number(form_id),
                score: s,
            })
        )
        }

    const saveform = async(p,f) => {
        const score = map(p)
        
        // UserStore.LoadUser()
        // const token = UserStore.token
        // try{
        //     const res = await axios.post("",{

        //     })
        // }catch(err){
        //     alert("Something Went Wrong")
        //     console.log(err)
        // }
    }

    return {
        saveform,
    }
}