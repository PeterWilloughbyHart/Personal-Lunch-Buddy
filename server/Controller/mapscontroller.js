
const storelocation = async (req, res) => {
        const db = req.app.get("db");
        const {lat, lng, id} = req.body;
        console.log(lat, lng, id);

        const results = await db.store_location([lat, lng, id]);

        return res.json(results);
}

const updatelocation = async (req, res) => {
        console.log("update update lat lng lt lng")
        const db = req.app.get("db");
        const {lat, lng, id} = req.body;
        console.log(lat, lng, id,"update")

        const results = await db.update_location([lat, lng, id]);
        console.log("location updated")
        return res.json(results);
}




module.exports = {
    storelocation,
    updatelocation
}