var map = L.map("map").setView([38.7643, -9.2649], 11);

var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

coords = [
  [38.79, -9.1252], //climbing wall 20
  [38.7459, -9.1033],//Vertigo Climbing Wall 25
  [38.7988, -9.1688],//Vertical Wall Climbing Lisbon 30
  [38.7267, -9.2334],//up 40
  [38.705, -9.1791],//Escala25 20
];
cost = ["20 $/h", "35 $/h", "25 $/h", "30 $/h", "40 $/h", "20 $/h"];
sites = ["Vertical  Climbing",  "Vertigo Climbing", "Gravity Climbing", "Climb UP Lisbon", "Escala25 Climbing"];
images = [
  "/images/clif1.jpg",
  "/images/clif3.jpg",
  "/images/clif4.jpg",
  "/images/clif5.jpg",
  "/images/clif6.jpg",
];
locations = [
        "https://www.google.com/maps/place/Vertical+Wall+Climbing+Lisbon/@38.7665933,-9.193281,12.87z/data=!4m19!1m12!4m11!1m3!2m2!1d-9.1676254!2d38.7911921!1m6!1m2!1s0xd19329f629df6d9:0xeea4d1e6c0db26fa!2sVertical+Wall+Climbing+Lisbon,+Edif%C3%ADcio+Lobo+Rua+Angola+1+Frente,+2620-036+Olival+Basto!2m2!1d-9.1677207!2d38.7908045!3m5!1s0xd19329f629df6d9:0xeea4d1e6c0db26fa!8m2!3d38.7907943!4d-9.1677204!16s%2Fg%2F11bv2lttmp?entry=ttu" ,
        "https://www.google.com/maps/place/Vertigo+Climbing+Wall/@38.7399754,-9.184418,12z/data=!4m19!1m12!4m11!1m3!2m2!1d-9.1009905!2d38.7449293!1m6!1m2!1s0xd1933df7a049b51:0x91a99459fa54c8fc!2sEdif%C3%ADcio+Beira+Rio,+Av.+Infante+Dom+Henrique+Fra%C3%A7%C3%A3o+S,+1950-408+Lisboa!2m2!1d-9.1019972!2d38.7399967!3m5!1s0xd1933df7a049b51:0x91a99459fa54c8fc!8m2!3d38.7400043!4d-9.102017!16s%2Fg%2F11b6gq7ff_?entry=ttu",
        "https://www.google.com/maps/place/9.8+Gravity+Climbing+Lisbon/@38.7840463,-9.2076319,12z/data=!4m19!1m12!4m11!1m3!2m2!1d-9.1252344!2d38.7839125!1m6!1m2!1s0xd19331945928cc3:0xaa8f6a15692c297c!2sAvenida+Severiano+Falc%C3%A3o,+3B,+2685-379+Prior+Velho!2m2!1d-9.1252309!2d38.7840752!3m5!1s0xd19331945928cc3:0xaa8f6a15692c297c!8m2!3d38.7840752!4d-9.1252309!16s%2Fg%2F11t8ncp8ys?entry=ttu",
        "https://www.google.com/maps/place/Climb+UP/@38.7164866,-9.2674201,12z/data=!3m1!5s0xd1ecc89f6015281:0x8baafaf8ccee5a5d!4m19!1m12!4m11!1m3!2m2!1d-9.2327445!2d38.7259957!1m6!1m2!1s0xd1ecd63396795ff:0xc9362d2feb9f39ba!2sClimb+UP,+R.+de+Nossa+Sra.+da+Concei%C3%A7%C3%A3o+n%C2%BA3+armaz%C3%A9m+L,+2790-111+Carnaxide!2m2!1d-9.2330328!2d38.7218207!3m5!1s0xd1ecd63396795ff:0xc9362d2feb9f39ba!8m2!3d38.7218207!4d-9.2330328!16s%2Fg%2F11fhz57fzm?entry=ttu",
        "https://www.google.com/maps/place/Escala25/@38.7003973,-9.2610385,12z/data=!4m19!1m12!4m11!1m3!2m2!1d-9.1793277!2d38.7053539!1m6!1m2!1s0xd19355f5c1fbd45:0x57d9cd8724094895!2sEscala25,+Avenida+da+%C3%8Dndia,+Pte.+25+de+Abril+52+Pilar+7,+1300-299+Lisboa!2m2!1d-9.178636!2d38.7002922!3m5!1s0xd19355f5c1fbd45:0x57d9cd8724094895!8m2!3d38.7002922!4d-9.178636!16s%2Fg%2F11s3rbcjgh?entry=ttu",
         ]

         websites = [
            "https://business.google.com/v/9-8-gravity-climbing-lisbon/05029728756280361031/c633/_?caid=18259669883&agid=140947790556&gclid=CjwKCAjw5_GmBhBIEiwA5QSMxHsp0RQ5IdKGrznr1EYfKTtgNhQJALmUrU8DGo9ZcnJjDjNGn6JJrBoCtoYQAvD_BwE",
            "https://lisbonquake.com/en-GB?gclid=CjwKCAjwivemBhBhEiwAJxNWNwr4aHqXzHHU7R2nMdHyfGyFMEfmB44C90b64tKtmgqmbqkiPDl9xBoC-b8QAvD_BwE&utm_medium=cpc&keyword=lisbon%20activities&campaignid=15640790368&utm_source=google&gad=1",
            "https://vertigoclimbing.pt/en/home/",
            "https://verticalwall.pt/",
            "https://www.climbup.pt/",
            "https://escala25.com/en/",
         ]




let l = coords.length;

var location1 = document.querySelector("#location1");
var location2 = document.querySelector("#location2");
var location3 = document.querySelector("#location3");
var location4 = document.querySelector("#location4");
var location5 = document.querySelector("#location5");
var location6 = document.querySelector("#location6");

for (let i = 0; i < l; i++) {
  var marker = L.marker(coords[i]).addTo(map);
  var toollip = L.tooltip({
    permanent: false,
  }).setContent(cost[i]);
  marker.bindTooltip(toollip);
  marker
    .bindPopup(
      `<div>
<img src=${images[i]} width="150" height="150"/>

<p>${sites[i]}</p>
<a href=${locations[i]} target="_blank"/>Direction</a>
<a href=${websites[i]}  target="_blank"/>LearnMore</a>

</div>`
    )
    .openPopup();
}
