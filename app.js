window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{ 
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api =  `${proxy}https://api.darksky.net/forecast/a0657a2d45e31def8f5973443a607faf/${lat},${long}`;

            fetch(api )
            .then(response =>{
                return response.json();
            })
            .then(data=>{
                console.log(data);
                const {temperature, summary, icon}= data.currently;

                //set DOM elements from API
                temperatureDegree.textContent= temperature;
                temperatureDescription.textContent= summary;
                locationTimezone.textContent=data.timezone;

                //seet icon
                setIcons(icon,document.querySelector('.icon'));

        
            });
        });


    }

    function setIcons(icon,iconID){
        const skycons =  new skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});