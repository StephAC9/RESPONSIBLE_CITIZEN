var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var XMLHttpRequest = require('xhr2');
//var xhr = new XMLHttpRequest();

console.log("Hello");

var NodeGeocoder = require('node-geocoder');

var request = new XMLHttpRequest();
function getAddress(latitude, longitude) { 
    return new Promise(function (resolve, reject) { 
        var method = 'GET'; 
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCufF9iSBxmKKN0b5EgcjU18V3IDTIuUtE'; //'&sensor=true'; 
        
        var async = true;
 request.open(method, url, async); 
 request.onreadystatechange = function () { 
     if (request.readyState == 4) { 
         if (request.status == 200) { 
             var data = JSON.parse(request.responseText); 
             var address = data.results[0]; 
             resolve(address); console.log(address);
 } else { 
     reject(request.status);
     } 
    } 
}; 
request.send(); 
});
};
getAddress(56.049670, 14.146033)
.then(console.log)
.catch(console.error);

var options = { 
    provider: 'google', 
    httpAdapter: 'https', // Default 
    apiKey: 'AIzaSyCufF9iSBxmKKN0b5EgcjU18V3IDTIuUtE', // for Mapquest, OpenCage, Google Premier 
    formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

geocoder.reverse({ lat: 28.5967439, lon: 77.3285038 }, function (err, res) { 
    console.log(res);
});

var geocode = new google.maps.NodeGeocoder();

var location = new google.maps.LatLng(56.049670, 14.146033);

geocoder.geocode({ 'latlng': location }, function (results, status) {

 if (status == google.maps.GeocoderStatus.OK){ 
     
    var add = results[0].formatted_address;
    
    document.write(add);     
}
});