const key = "QDNBJNIZRYOQ";
const gkey = "0dbb0bd1e6ac4be09b4b2b65a221bcc8";

document.getElementById('sub').onclick = () => {
	const loc = encodeURIComponent(document.getElementById('search').value);

	console.log(loc)

	getTimeZone(loc);
	//getLocation(14.4834869,121.0340788).then(document.getElementById('time').innerHTML)
}

async function getTimeZone(loc){
	//const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${gkey}`);
	const r = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${gkey}&q=${loc}`);

	const res = await r.json();

	lat = res.results[0].geometry.lat;
	lng = res.results[0].geometry.lng;
	
	getLocation(lat,lng).then(res => {
		document.getElementById('time').innerHTML = res;
	});
	
	
}

async function getLocation(lat,lng){
	const res = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lat}&lng=${lng}`);

	const result = await res.json();

	return result.formatted;
}