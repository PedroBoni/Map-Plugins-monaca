const mapDark = document.querySelector("#map-dark");
const mapLight = document.querySelector("#map-light");

const addMarkerDark = document.querySelector("#add-marker-dark");
const addMarkerLight = document.querySelector("#add-marker-light");
const viewCoordenadesDark = document.querySelector("#my-coordenades-dark");
const viewCoordenadesLight = document.querySelector("#my-coordenades-light");
const addMarkerBtn = document.querySelector("#add-marker");
const viewCoordenadesBtn = document.querySelector("#view-coordenades");

const switchTheme = document.querySelector(".switch input");
var latitudeGlobal;
var logitudeGlobal;

var checked = true;

var onSuccess = function(position) {
   showMap(position.coords.latitude, position.coords.longitude);
};
function onError(error) {
    alert('Dê permissão e habilite a localização para esse APP funcionar!');
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);

function showMap(latitude, longitude){
  latitudeGlobal = latitude;
  logitudeGlobal = longitude;
  L.mapquest.key = 'zP4xN3EHtd1jxCllqlVaaoGbPEFV0iHM';

  var mapDark = L.mapquest.map('map-dark', {
    center: [latitude, longitude],
    layers: L.mapquest.tileLayer('dark'),
    zoom: 14
  });
  var mapLight = L.mapquest.map('map-light', {
    center: [latitude, longitude],
    layers: L.mapquest.tileLayer('light'),
    zoom: 14
  });

  L.mapquest.textMarker([latitude, longitude], {
    text: 'Sua localização',
    position: 'bottom',
    type: 'circle',
    icon: {
      primaryColor: '#F9F9F9',
      secondaryColor: '#1d1d1d',
      size: 'sm'
    },
  }).addTo(mapDark);
  L.mapquest.textMarker([latitude, longitude], {
    text: 'Sua localização',
    position: 'bottom',
    type: 'circle',
    icon: {
      primaryColor: '#1d1d1d',
      secondaryColor: '#F9F9F9',
      size: 'sm'
    },
  }).addTo(mapLight);

}


//initialize theme
if (localStorage.getItem("theme") == null || localStorage.getItem("theme") == "dark") {
  mapDark.style.display = "block";
  mapLight.style.display = "none";
  addMarkerDark.style.display = "none";
  addMarkerLight.style.display = "block";
  viewCoordenadesDark.style.display = "none";
  viewCoordenadesLight.style.display = "block";
  addMarkerBtn.style.border = "0.5vw solid #F9F9F9";
  viewCoordenadesBtn.style.border = "0.5vw solid #F9F9F9";
  switchTheme.checked = true;
}
else if (localStorage.getItem("theme") == "light") {
  mapDark.style.display = "none";
  mapLight.style.display = "block";
  addMarkerDark.style.display = "block";
  addMarkerLight.style.display = "none";
  viewCoordenadesDark.style.display = "block";
  viewCoordenadesLight.style.display = "none";
  addMarkerBtn.style.border = "0.5vw solid #1d1d1d";
  viewCoordenadesBtn.style.border = "0.5vw solid #1d1d1d";
  switchTheme.checked = false;
}


switchTheme.addEventListener("click", () => {
  if (!switchTheme.checked) {
    mapDark.style.display = "none";
    mapLight.style.display = "block";
    addMarkerDark.style.display = "block";
    addMarkerLight.style.display = "none";
    viewCoordenadesDark.style.display = "block";
    viewCoordenadesLight.style.display = "none";
    addMarkerBtn.style.border = "0.5vw solid #1d1d1d";
    viewCoordenadesBtn.style.border = "0.5vw solid #1d1d1d";
    localStorage.setItem("theme", "light");
  }
  else {
    mapDark.style.display = "block";
    mapLight.style.display = "none";
    addMarkerDark.style.display = "none";
    addMarkerLight.style.display = "block";
    viewCoordenadesDark.style.display = "none";
    viewCoordenadesLight.style.display = "block";
    addMarkerBtn.style.border = "0.5vw solid #F9F9F9";
    viewCoordenadesBtn.style.border = "0.5vw solid #F9F9F9";
    localStorage.setItem("theme", "dark");
  }
})

viewCoordenadesBtn.addEventListener("click", () => {
  let message = "Latitude: "+latitudeGlobal+"\n"+"Longitude: "+ logitudeGlobal; 
  navigator.notification.alert(message, () => {},"Suas Coordenadas", "OK")
})
  var latitudeMarker, logitudeMarker;

addMarkerBtn.addEventListener("click", () => {
  navigator.notification.prompt("Latitude:", (results) => {
    latitudeMarker = parseInt(results.input1);
    navigator.notification.prompt("Logitude:", (result) => {
      logitudeMarker = parseInt(results.input1);
      navigator.notification.prompt("Titulo:", addMarker, "Titulo do novo marker", ["Adicionar", "Cancelar"]) 
      }, "Coordenadas do novo marker", ["Próximo", "Cancelar"])
  }, "Coordenadas do novo marker", ["Próximo", "Cancelar"]);
})

function addMarker(results){
  L.mapquest.textMarker([latitudeMarker, logitudeMarker], {
    text: results.input1,
    position: 'bottom',
    type: 'marker',
    icon: {
      primaryColor: '#F9F9F9',
      secondaryColor: '#1d1d1d',
      size: 'sm'
    }
  }).addTo(mapDark);

  L.mapquest.textMarker([latitudeMarker, longitudeMaker], {
    text: results.input1,
    position: 'bottom',
    type: 'marker',
    icon: {
      primaryColor: '#1d1d1d',
      secondaryColor: '#F9F9F9',
      size: 'sm'
    }
  }).addTo(mapLight);
}

  