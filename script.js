const weatherApi={
	key:'9f23b56e8dcad8299bf4e5a2a3fc932b',baseUrl:'https://api.openweathermap.org/data/2.5/weather'
}
let searchinputbox=document.getElementById('input-box');
searchinputbox.addEventListener('keypress',(event)=>{
	if (event.keyCode == 13){
		getWeatherReport(searchinputbox.value);
	}
})
function getWeatherReport(city){
	fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
	.then(weather =>{
		return weather.json();
	}).then(showWeatherReport);
}
function showWeatherReport(weather){
	let city_code=weather.cod;
	if(city_code=='400'){
		swal("empty input","please enter any city","error");
		reset();
	}
	else if(city_code==='404'){
		swal("Bad Input","entered city didnot matched","warning");
	    
		reset();
		
	}
	else{
		let op=document.getElementById('weather-body');
		op.style.display = 'block';
		let todayDate = new Date();
		let parent=document.getElementById('parent');
		let weather_body = document.getElementById('weather-body');
		weather_body.innerHTML =`<div class="location-details">
		<div class="city" id="city">${weather.name},${weather.sys.country}</div>
		<div class="date" id="date">${dateManage(todayDate)}
		</div>
		</div>
		<div class="weather-status">
		<div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;c</div>
		<div class="weather" id="weather">
		${weather.weather[0].main} <i class=${getIconClass(weather.weather[0].main)}"></i>
		</div>
		<div class="min-max"id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min)/
		${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
		<div id="updated_on">updated as of 
		${getTime(todayDate)}</div>
		</div>
		<hr>
		<div class="day-details">
		<div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%<br>Pressure ${weather.main.pressure} mb | wind
		${weather.wind.speedf} kmph</div>
		</div>`;
		parent.append(weather_body);
		changeBg(weather.weather[0].main);
		resizeTo();
	}
}
function getTime(todayDate){
	let hour
	=addzero(todayDate.getHours());
	let minute
	=addzero(todayDate.getMinutes());
	return `${hour}:${minute}`;
}
function dateManage(dateArg){
	let days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
	let months=['january','february','march','april','may','june','july','august','september','october','november','december'];
	let year=dateArg.getFullYear();
	let month= months[dateArg.getMonth()];
	let day= days[dateArg.getDay()];
	let date= dateArg.getDate();
	return `${date} ${month}(${day}),${year}`
}
function changeBg(status){
	if(status === 'clouds'){
		document.body.style.backgroundImage=url('cloud.jpg');
	}
	else if(status === 'clear'){
		document.body.style.backgroundImage=url('clear.jpg');
	}
	else if(status === 'snow'){
		document.body.style.backgroundImage=url('snow.jpg');
	}
	else if(status === 'thunderstorm'){
		document.body.style.backgroundImage=url('thunder.jpg');
	}
	else if(status === 'drizzle'){
		document.body.style.backgroundImage=url('drizzle.jpg');
	}
	else if(status === 'mist' || status ==='haze' || status ==='fog'){
		document.body.style.backgroundImage=url('mist.jpg');
	}
	else {
		document.body.style.backgroundImage=url('weather.jpg');
	}
}
function getIconClass(classarg){
	if (classarg ==='Rain'){
		return 'fas fa-cloud-showers-heavy';
	}else if (classarg ==='Clouds'){
		return 'fas fa-cloud';
	}else if (classarg ==='Clear'){
		return 'fas fa-cloud-sun';
	}else if (classarg ==='Snow'){
		return 'fas fa-snowman';
	}else if (classarg ==='Mist'){
		return 'fas fa-smog';
	}else if (classarg ==='Thunderstorm' || classarg ==='Drizzle'){
		return 'fas fa-thundetstorm';

	}else {
		return 'fas fa-cloud-sun';
	}
}
function reset(){
	let input =document.getElementById('input-box');
	input.value = "";
}
function addzero(i){
	if(i < 10){
		i = "0" + i;
	}
	return i;
}
