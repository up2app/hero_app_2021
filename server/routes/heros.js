//load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)

//create the router
let herosRoute = express.Router()

herosRoute.get(`/`, async (req, res) => {

    //טיפול בשגיאות
    sql.on(`error`, (error) => res.send(error))

    //connect to the DB
    let db = await sql.connect(config.db)

    //run a query --> run the "select_heros" proc from the db
    let query = await db.request().execute(`select_heros`)

    //get the data 
    let data = await query.recordset

    //close the server
    await db.close()

    //send the data to the client via the api
    res.send(data)

})

herosRoute.get(`/all`, async (req, res) => {

    //טיפול בשגיאות
    sql.on(`error`, (error) => res.send(error))

    //connect to the DB
    let db = await sql.connect(config.db)

    //run a query --> simple sql seelct sentence
    let query = await db.query(`select * from heros`)

    //get the data 
    let data = await query.recordset

    //close the server
    await db.close()

    //send the data to the client via the api
    res.send(data)

})

herosRoute.get(`/:id`, async (req, res) => {

    //get the params from the request
    let params = req.params

    //טיפול בשגיאות
    sql.on(`error`, (error) => res.send(error))

    //connect to db
    let db = await sql.connect(config.db)

    //run the query
    let query = await db.request()
        .input(`hero_id`, sql.Int, params.id)
        .execute(`select_hero_by_id`)

    //get the data 
    let data = await query.recordset

    //close the connection
    await db.close()

    //return to the client via api
    //מפני שהנתונים הם רשומות אפשר לגשת לרשומה הראשונה ולקבל את האובייקט עצמו
    res.send(data[0])

})

herosRoute.post(`/add`, async (req, res) => {

    //get the request body
    let body = req.body

    //טיפול בשגיאות
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`full_name`, sql.NVarChar(150), body.full_name)
        .input(`hero_name`, sql.NVarChar(150), body.hero_name)
        .input(`photo_url`, sql.Text, body.photo_url)
        .output(`hero_id`, sql.Int)
        .execute(`add_hero`)

    let data = await query

    await db.close()

    res.send(data)

})

herosRoute.delete(`/delete/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`hero_id`, sql.Int, params.id)
        .execute(`delete_hero`)
    let data = await query
    await db.close()
    res.send(data)
})

herosRoute.put(`/update/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`hero_id`, sql.Int, params.id)
        .input(`full_name`, sql.NVarChar(150), body.full_name)
        .input(`hero_name`, sql.NVarChar(150), body.hero_name)
        .input(`photo_url`, sql.Text, body.photo_url)
        .execute(`update_hero`)
    let data = await query
    await db.close()
    res.send(data)

})

herosRoute.put(`/reactivate/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error)=>res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`hero_id`, sql.Int, params.id)
        .execute(`reactivate_hero`)
    let data = await query
    await db.close()
    res.send(data)
})

//export the router
module.exports = herosRoute



