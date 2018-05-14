const express = require('express')
const app = express()
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser')
const { matchedData, sanitize } = require('express-validator/filter');

app.use(bodyParser.json({ extended: false }))
app.use(express.static('dist'))


app.post('/wordcount', [
    check('wordcount_content')
        .trim()
        .isLength({ min: 1 }),
    sanitize('wordcount_content')
        .trim()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const reqData = matchedData(req);

    res.send({ wordcount: reqData.wordcount_content.split(/\s+/).length })
}
)

app.listen(3000, () => console.log('Running... + listening on 3000'))