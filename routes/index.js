const router = require('express').Router();
const request = require('request');


router.post('/', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // validate form
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    // construct data
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    // convert to string
    const postData = JSON.stringify(data);

    const options = {
        url: "https://us5.api.mailchimp.com/3.0/lists/161a6040c3",
        method: "POST",
        headers: {
            Authorization: "auth 0f394978f9ce2035b2272be3d2961756-us5"
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
        }
    });


});


module.exports = router;