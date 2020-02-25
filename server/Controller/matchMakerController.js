const getmatch = async (req, res) => {
    const db = req.app.get('db');

    const userLocation = await db.get_user_location(req.session.user.id)
    const matches = await db.get_match([userLocation[0].lat,userLocation[0].lng, userLocation[0].user_id])

    const matchResults = {
    matchResults: matches
    }
    res.json(matchResults)
}

module.exports = {
    getmatch
}