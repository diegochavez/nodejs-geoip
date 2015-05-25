// Imports
var mmdbreader = require('./node_modules/maxmind-db-reader');
var express = require('./node_modules/express');
var get_ip = require('./node_modules/ipware')().get_ip;


app = express();

  


app.get('/', function(req, res) {

	var ip = get_ip(req);
	var ip = ip.clientIp;

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

app.listen(process.env.PORT || 8888, '0.0.0.0');