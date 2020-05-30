const app = require('./app');
const DB = require('./api/db');

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
//require('./socket')(server, app.uuid, app.DB);