// Imports
var mmdbreader = require('./node_modules/maxmind-db-reader');
var express = require('./node_modules/express');
var get_ip = require('./node_modules/ipware')().get_ip;


app = express();

  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

mmdbreader.open('./geo/GeoIP2-City.mmdb',function(err,countries){
    // get geodata
    countries.getGeoData(ip,function(err,geodata){
        // log data :D
		res.type('application/json');
		res.send(geodata);
    });
});

       // console.log(ip_info);

// res.type('application/json');
// res.send(ip.clientIp);


});

app.listen(process.env.PORT || 8888, '0.0.0.0' , function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});