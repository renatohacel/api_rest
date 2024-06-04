const app = require('./app')

app.listen(app.get('port'), () =>{
    console.log('Listen port', app.get('port'))
})