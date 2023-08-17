var map = L.map('map').setView([38.7155, -9.1342], 12);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


coords = [[38.7900, -9.1252], [38.7033, -9.1979], [38.7459, -9.1033], [38.7988, -9.1688], [38.7267, -9.2334], [38.7050, -9.1791]];
cost = ['20 $/h', '35 $/h', '25 $/h', '30 $/h', '40 $/h', '20 $/h']
images = ["img/clif1.jpg", "img/clif2.jpg", "img/clif3.jpg", "img/clif4.jpg", "img/clif5.jpg", "img/clif6.jpg"]

let l = coords.length;

var location1 = document.querySelector('#location1');
var location2 = document.querySelector('#location2');
var location3 = document.querySelector('#location3');
var location4 = document.querySelector('#location4');
var location5 = document.querySelector('#location5');
var location6 = document.querySelector('#location6');

for (let i = 0; i < l; i++) {
    var marker = L.marker(coords[i]).addTo(map);
var toollip = L.tooltip({
permanent: true
}).setContent(cost[i]);
marker.bindTooltip(toollip);
};
