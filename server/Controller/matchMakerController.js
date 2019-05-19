const getmatch = async (req, res) => {
    const db = req.app.get('db');

    const userLocation = await db.get_user_location(req.session.user.id)
    const buddies = await db.get_match([userLocation[0].lat,userLocation[0].lng, userLocation[0].user_id])
    console.log(buddies);
    const pairedBuddy = {
    //    pairedName: buddy[0].name,
    //    pairedID: buddy[0].user_id,
    //    pairedEmail: buddy[0].email, 
    //    pairedImg: buddy[0].img,
    //    pairedDistance: buddy[0].distance_in_miles
    pairedBuddy: buddies
    }
    res.json(pairedBuddy)
}

module.exports = {
    getmatch
}