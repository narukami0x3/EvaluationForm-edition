const { time } = require('./adminmodel')
const {pool} = require('./conn')

async function getuser(id) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
`
SELECT 
  u.id,
  u.username,
  MAX(r.time_id) AS time_id
FROM users u
JOIN result r ON r.user_id = u.id
WHERE r.board_id IS NULL
  AND u.id IN (
    SELECT gm.user_id
    FROM groupmember gm
    WHERE gm.user_id = ?
      AND gm.group_role IN ('ประธาน','กรรมการ')
  )
GROUP BY u.id, u.username
`,
[id]
)

return row1

    }finally{conn.release()}
}


async function getform(user_id,time) {
    let conn = await pool.getConnection()
    try{
        let row1
        [row1] = await conn.query(
            `
            SELECT 
            i.indicator_id,
            s.section_id,
            s.section,
            s.detail,
            s.file,
            s.type
            FROM indicator i
            JOIN section s on s.indicator_id = i.indicator_id
            `
        )
        const [row2] = await conn.query(
            `
            SELECT 
            i.indicator_id,
            i.indicator
            FROM indicator i
            JOIN section s on s.indicator_id = i.indicator_id
            `
        )
        console.log(user_id,time)
        const [row3] = await conn.query(
            `
            SELECT *
            FROM result 
            WHERE user_id = ? AND board_id IS NULL AND time_id = ?
            `,
            [user_id,time]
        )
        return [row1,row2,row3]
    }finally{conn.release()}
}

async function gettime() {
    let conn = await pool.getConnection()
    const time = new Date()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM time WHERE ? > start AND ? < expire
            `,
            [time,time]
        )
        return row1
    }finally{conn.release()}
}

async function insertresult(board_id,boardscore,section_id,user_id,time_id) {
    let conn = await pool.getConnection()
    try{
        row1 = await conn.query(
            `UPDATE result SET board_id =? ,boardscore = ? WHERE section_id = ? AND user_id = ? AND time_id = ?`,
        [board_id,boardscore,section_id,user_id,time_id]
        )
        return row1
    }finally{conn.release()}
}

async function insertattachment(board_id,comment,sinature,user_id,time_id) {
    let conn = await pool.getConnection()
    try{
        row1 = await conn.query(
            `UPDATE attachment SET board_id = ?,comment_board = ? ,signature_board = ? WHERE user_id = ? AND time_id = ?`,
        [board_id,comment,sinature,user_id,time_id]
        )
        return row1
    }finally{conn.release()}
}




module.exports = {getform,gettime,insertresult,getuser,insertattachment}