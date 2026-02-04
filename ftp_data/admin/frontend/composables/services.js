import axios from "axios";
import { useUserStore } from "../composables/UserStore";
import { useRouter } from "vue-router";

export const useService = () =>{
    const UserStore = useUserStore()
    const navigate = useRouter()


//     const mapdata = (ep,indicators,forms) => {
//    const epMap = {}

//    ep.forEach(e => {
//         epMap[e.ep_id] = {...e,indicators:[]}
//    });
//    indicators.forEach(ind => {
//         epMap[ind.ep_id]?.indicators.push({...ind,subs:[]})
//    });
//    forms.forEach(f => {
//         Object.values(epMap).forEach(ep => {
//             ep.indicators.find(i => (i.indicator_id == f.indicator_id))
//             ?.subs.push({...f})
//         });
//     });
//     return Object.values(epMap)
// }

    const login = async(u,p) =>{
        if(u == "" || p == ""){
            alert("กรุณากรอกชื่อหรือรหัสผ่าน")
            return
        }

        try {
            const res = await axios.post("api/auth/login",{
                email: u,
                password: p,
            })
            alert(res.data.message)
            UserStore.SetUser(res.data.auth)
            UserStore.LoadUser()
            console.log(UserStore.user)
            if(UserStore.user.role == "1"){
                navigate.push("/admin/Dashboard/")
            }else{
                navigate.push("/user/Dashboard/")
            }
        }
        catch(err){
            console.log(err.response?.data.message)
        }
        
    }

    const register = async(u,p,email,czid,bdate,phone,sal,po,level,dep) => {
        try {
            const res = await axios.post("api/auth/register",{
                username: u,
                email: email,
                password: p,
                czid: czid,
                bdate: bdate,
                phone: phone,
                sal: sal,
                po: po,
                level: level,
                dep: dep,
            })
            alert(res.data.data.message)
        }
        catch(err){
            alert(err.response.data.message)
        }
    }

    const edituser = async(u,p,email,czid,bdate,phone,sal,po,level,dep) => {
        try {
            const res = await axios.put("api/admin/edituser",{
                username: u,
                email: email,
                password: p,
                czid: czid,
                bdate: bdate,
                phone: phone,
                sal: sal,
                po: po,
                level: level,
                dep: dep,
            })
            alert(res.data.data.message)
        }
        catch(err){
            alert(err.response.data.message)
        }
    }

    const deluser = async(id) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.delete(`/${id}`,{
                data: {
                    token: token,
                }
            })
            alert("Delete success")
            window.location.reload()
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    const userdata = async() => {
        UserStore.LoadUser()
        const token = UserStore.token
        try {
            const res = await axios.get("api/user/data",{
                headers: {
                    token: token,
                }
            })
            return res.data
        }catch(err){
            alert(err.response.data.message)
        }
    }

    const addhead = async(h,w) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.post("api/admin/indicator",{
                token: token,
                indicator: h,
                weight: w,
            })
            alert("เพิ่มสำเร็จ")
            window.location.reload()
        }catch(err){
            alert(err.response.data.message)
        }
    }

    const adddetail = async(id) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.post("",{
                token: token,
                detail: id,
            })

            alert(res.data.data.message)

        }catch(err){
            alert(err.response.data.message)
        }
    }

    // const deleteform = async() => {
    //     UserStore.LoadUser()
    //     const token = UserStore.token
    //     try{
    //         const res = await axios.delete("",{
    //             data: {
    //                 token: token,
    //             }
    //         })

    //         alert(res.response.data.message)

    //     }catch(err){
    //         alert(err.response.data.message)
    //     }
    // }
    const time = async() => {
        try{
            const res = await axios.get("api/admin/time")
            // console.log(res.data)
            return res.data
        }catch(err){
            alert(err.response.data.message)
        }
    }

    const addtime = async(t1,t2) => {
        UserStore.LoadUser()
        try{
            const res = await axios.post("api/admin/time",{
                token: UserStore.token,
                time1: t1,
                time2: t2
            })
            alert("Settime Success")
        }catch(err){
            alert(err.response.data.message)
        }
    }

    const addgroup = async(g) => {
        UserStore.LoadUser()
        const token = UserStore.token
        console.log(g)
        try{
            const res = await axios.post("api/admin/group",{
                token: token,
                member: g,
            })
            console.log(res)
        }catch(err){
            alert(err)
        }
    }

    const getgroup = async(g) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.get("api/admin/group",{
                token: token,
                member: g,
            })
            return res.data.data
        }catch(err){
            alert(err)
        }
    }

    const getalluser = async() => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.get("api/admin/user",{
                headers: {
                    token: token
                }
            }) 
            return res.data.data
        }catch(err){
            console.log(err.response?.data.message)
        }
    }

    const getindi = async() => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.get("api/admin/indicator",{
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

    const addform = async(ind,dt,type,req,head) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.post("api/admin/section",{
                section: head,
                token:  token,
                indicator_id: ind,
                detail: dt,
                type: type,
                file: req,
            })
            alert("เพิ่มแบบประเมินสำเร็จ")
            console.log(res)
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    const checktime = async() =>{
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.get("api/user/time",{
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

    const userform = async(tid) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.get("api/user/form",{
                headers: {
                    time: tid,
                    token: token,
                }
            })
            return res.data.data
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    const delgroup = async(id) => {
        UserStore.LoadUser()
        const token = UserStore.token
        try{
            const res = await axios.delete(`api/admin/group/${id}`,{
                data:{
                    token: token
                }
            })
            alert("ลบสำเร็จ")
            console.log(res)
            window.location.reload()
        }catch(err){
            alert("Something Went Wrong")
            console.log(err)
        }
    }

    return {
        delgroup,
        getgroup,
        checktime,
        userform,
        deluser,
        edituser,
        addform,
        getindi,
        getalluser,
        addgroup,
        addtime,
        time,
        addhead,
        adddetail,
        userdata,
        register,
        login,
    }

}