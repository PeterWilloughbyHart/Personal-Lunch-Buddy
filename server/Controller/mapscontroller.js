
const storelocation = async (req, res) => {
        const db = req.app.get("db");
        const {lat, lng} = req.body;
        console.log(lat, lng);

        const results = await db.store_location([lat, lng]);

        return res.json(results);

}


module.exports = {
    storelocation
}