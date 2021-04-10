const express = require('express')
const bodyParser = require('body-parser')
const http = require('request')

const app = express()

const PORT = process.env.port || 8080

app.use(bodyParser.json())
app.use(express.static('../Apartment-for-rent/dist'));
app.get('/', (req, res) => {
    res.sendFile(path.join("../Apartment-for-rent/dist/index.html"))
})
app.post('/', (req, res) => {
    // res.send(req.body)
    const name = JSON.stringify(req.body.name);
    const email = JSON.stringify(req.body.email);
    const phone = JSON.stringify(req.body.phone);
    const post = JSON.stringify(req.body.textarea);
    const msg = [
        '<b>name: </b>' + name,
        '<b>email: </b>' + email,
        '<b>phone: </b>' + phone,
        '<b>post: </b>' + post,

    ]
    const msgFormat = msg.join('\n');

    http.post(`https://api.telegram.org/{{APIToken}}/sendMessage?chat_id=-562218209&parse_mode=html&text=${msgFormat}`, function (error, response) {  
    if(response.statusCode===200){
      res.status(200).json({status: 'ok', message: 'Message sent!'});
    }
    if(response.statusCode!==200){
      res.status(400).json({status: 'error', message: '`Some Error`!'});
    }
  });
})

app.listen(PORT, () => {
    console.log('Server has been started on port ' + PORT)
})