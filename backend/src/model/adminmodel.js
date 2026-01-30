const {pool} = require('./conn')

async function getuser() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM users
            `
        )
        return row1
    }finally{conn.release()}
}

async function gettime() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM time
            `
        )
        return row1
    }finally{conn.release()}
}

async function time(time,start,expire,admin_id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO time (time,start,expire,admin_id) VALUES (?,?,?,?)
            `,
            [time,start,expire,admin_id]
        )
        return row1
    }finally{conn.release()}
}

async function deletetime(time,start,expire,admin_id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO time (time,start,expire,admin_id) VALUES (?,?,?,?)
            `,
            [time,start,expire,admin_id]
        )
        return row1
    }finally{conn.release()}
}

async function insertgroup(member) {
    console.log(member)
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO boardgroup () VALUES ()
            `,
            []
        )
        for (item of member){
        const [row2] = await conn.query(
            `
            INSERT INTO groupmember (group_id,user_id,group_role) VALUES (?,?,?)
            `,
            [row1.insertId,item.user_id,item.role,]
        )
        }
        return row1.insertId || null
    }finally{conn.release()}
}


async function insertmember(group_id,user_id,group_role) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO groupmember (group_id,user_id,group_role) VALUES (?,?,?)
            `,
            [group_id,user_id,role]
        )
        return row1.insertId || null
    }finally{conn.release()}
}

async function deletemember(user_id,group_id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            DELETE FROM groupmember WHERE user_id = ? and group_id = ?
            `,
            [user_id,group_id]
        )
        return row1.affectedRows || null
    }finally{conn.release()}
}

async function deletegroup(user_id,group_id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            DELETE FROM boardgroup WHERE group_id = ?
            `,
            [user_id,group_id]
        )
        return row1.affectedRows || null
    }finally{conn.release()}
}

async function insertindicator(indicator,weight ) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO indicator (indicator,weight) VALUES (?,?)
            `,
            [indicator,weight]
        )
        return row1.insertId || null
    }finally{conn.release()}
}

async function getindicator() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM indicator
            `
        )
        return row1
    }finally{conn.release()}
}
async function getsection() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM section
            `
        )
        return row1
    }finally{conn.release()}
}

async function insertsection(section,detail,type) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO section (section,detail,type) VALUES (?,?,?)
            `,
            [section,detail,type]
        )
        return row1.affectedRows || null
    }finally{conn.release()}
}



async function edituser(username,password,email,czid,salary,birthday,department,level,position,id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            UPDATE users SET username = ? ,password=?,email=?,czid=?,salary=?,birthday=?,department=?,level=?,position=? WHERE id=?
            `,
            [username,password,email,czid,salary,birthday,department,level,position,id]
        )
        return row1.affectedRows || null
    }finally{conn.release()}
}


module.exports = {gettime,insertgroup,insertmember,time,deletemember,insertsection,getuser,deletegroup,insertindicator,edituser,getindicator,getsection}
