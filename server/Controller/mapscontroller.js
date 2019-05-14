
const storelocation = async (req, res) => {
        const db = req.app.get("db");
        const {lat, lng, id} = req.body;
        console.log(lat, lng, id);

        const results = await db.store_location([lat, lng, id]);

        return res.json(results);

}


module.exports = {
    storelocation
}