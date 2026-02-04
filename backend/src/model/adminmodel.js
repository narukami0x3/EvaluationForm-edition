const {pool} = require('./conn')

async function getuser(id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT 
            u.id,
            u.username
            FROM users u
            WHERE u.id IN (SELECT user_id FROM result WHERE board_id IS NULL) AND id IN (SELECT user_id FROM groupmember WHERE user_id = u.id AND board_id = ?)
            `,
            [id]
        )
        return row1
    }finally{conn.release()}
}

async function getgroup() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM boardgroup
            `
        )
        const [row2] = await conn.query(
            `
            SELECT
            g.member_id,
            g.group_id,
            g.user_id,
            g.group_id,
            g.group_role,
            u.username
            FROM groupmember g
            JOIN users u ON u.id = g.user_id
            `
        )
        return [row1,row2]
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

async function insertsection(section,indicator,detail,file,type) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO section (section,indicator_id,detail,file,type) VALUES (?,?,?,?,?)
            `,
            [section,indicator,detail,file,type]
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

async function getresult() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT
            r.result_id,
            r.selfscore,
            r.boardscore,
            s.section_id,
            i.weight
            FROM result r
            JOIN section s ON s.section_id = r.section_id
            JOIN indicator i ON i.indicator_id = s.section_id
            `
        )
        return row1
    }finally{conn.release()}
}

module.exports = {gettime,insertgroup,insertmember,time,deletemember,insertsection,getuser,deletegroup,insertindicator,edituser,getindicator,getsection,getresult,getgroup,deletetime}
