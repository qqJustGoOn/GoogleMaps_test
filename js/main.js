const map_Id = document.getElementById("map");
const searchInput = document.getElementById("search-map");
const filter = document.getElementById("map-filter");
const navigation = document.getElementById("map-navigation");
const zoomPlus = document.getElementById("map-zoom-plus");
const zoomMinus = document.getElementById("map-zoom-minus");
const expand = document.getElementById("map-expand");
const panelLeft = document.querySelector(".control-panel__left");
const panelRight = document.querySelector(".control-panel__right");

//Для иконок
const icons = [
  {
    "Hotel with restaurant": "hotel",
    Restaurant: "restaurant",
    Pizzeria: "pizza",
    Cafe: "cafe",
    Bar: "bar",
    "Anti-cafe": "anti-cafe",
    Bakery: "bakery",
  },
];

// Данные для заведений
const places = [
  {
    name: "Bill`s Baker Street",
    type: "Restaurant",
    rating: 4.5,
    price: 28,
    lat: 53.91079,
    lng: 27.529136,
  },
  {
    name: "Alley Cats Pizza",
    type: "Pizzeria",
    rating: 4.2,
    price: 14,
    lat: 53.9102365,
    lng: 27.5347025,
  },
  {
    name: "Chiltern Firehouse",
    type: "Hotel with restaurant",
    rating: 4.8,
    price: 44,
    lat: 53.908794,
    lng: 27.533013,
  },
  {
    name: "Carlotta",
    type: "Restaurant",
    rating: 4.2,
    price: 32,
    lat: 53.909179,
    lng: 27.539402,
  },
  {
    name: "Fischer`s",
    type: "Cafe",
    rating: 4.8,
    price: 24,
    lat: 53.910883,
    lng: 27.535852,
  },
  {
    name: "The Jackalope",
    type: "Bar",
    rating: 4.7,
    price: 13,
    lat: 53.911723,
    lng: 27.538951,
  },
  {
    name: "Sixes Social Cricket",
    type: "Bar",
    rating: 4.8,
    price: 26,
    lat: 53.910016,
    lng: 27.54018,
  },
  {
    name: "Caravan Fitzrovia",
    type: "Restaurant",
    rating: 4.4,
    price: 14,
    lat: 53.910669,
    lng: 27.537843,
  },
  {
    name: "Java Whiskers Cat Cafe Marylybone",
    type: "Anti-cafe",
    rating: 4.6,
    price: 44,
    lat: 53.910839,
    lng: 27.532624,
  },
  {
    name: "B Bagel Tottenham Court Road",
    type: "Bakery",
    rating: 4.4,
    price: 17,
    lat: 53.909555,
    lng: 27.531233,
  },
  {
    name: "ICCO — «The People`s Pizzeria»",
    type: "Pizzeria",
    rating: 4.6,
    price: 16,
    lat: 53.908719,
    lng: 27.535805,
  },
];

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(map_Id, {
    center: { lat: 53.910082, lng: 27.535885 },
    zoom: 17,
    disableDefaultUI: true,
    mapId: "DEMO_MAP_ID",
  });

  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(panelLeft);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(panelRight);

  zoomPlus.addEventListener("click", () => {
    map.setZoom(map.getZoom() + 1);
  });

  zoomMinus.addEventListener("click", () => {
    map.setZoom(map.getZoom() - 1);
  });

  expand.addEventListener("click", () => {
    const mapDiv = map.getDiv();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      mapDiv.requestFullscreen();
    }
  });

  for (const place of places) {
    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: place.lat, lng: place.lng },
      content: showBigMarker(place),
      title: place.name,
    });
  }
}

// Создание большого маркера
function showBigMarker(place) {
  const content = `
            <span class="marker-big__icon">
              <svg>
                <use
                  xlink:href="./img/markers/markers_sprite.svg#pizza"
                ></use>
              </svg>
            </span>
            <div class="marker-big__body">
              <h2 class="marker-big__title">${place.name}</h2>
              <div class="marker__descr">
                <span class="marker__type">${place.type}</span>
                <span class="marker-big__dot">🞄</span>
                <span class="marker-big__price">£${place.price}</span>
              </div>
            </div>
`;

  const markerElement = document.createElement("div");
  markerElement.innerHTML = content;
  markerElement.className = "marker marker-big";

  return markerElement;
}

initMap();

/* Нерабочие наработки...

// Инициализация карты
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(map_Id, {
    center: { lat: 53.910082, lng: 27.535885 },
    zoom: 17,
    disableDefaultUI: true,
    mapId: "DEMO_MAP_ID",
  });

  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(panelLeft);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(panelRight);

  zoomPlus.addEventListener("click", () => {
    map.setZoom(map.getZoom() + 1);
  });

  zoomMinus.addEventListener("click", () => {
    map.setZoom(map.getZoom() - 1);
  });

  expand.addEventListener("click", () => {
    const mapDiv = map.getDiv();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      mapDiv.requestFullscreen();
    }
  });

  // Создание маркеров
  function createMarkers(restaurants, map) {
    const markers = [];
    const smallMarkers = [];
    //изменить переменную в зависимости от viewport
    let maxBigMarkers = 10;

    // Сортировка заведений по рейтингу
    restaurants.sort((a, b) => b.rating - a.rating);

    // Создание больших маркеров
    for (let i = 0; i < maxBigMarkers; i++) {
      const restaurant = restaurants[i];
      const marker = new AdvancedMarkerElement({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        content: `
          <div class="marker marker-big">
              <span class="marker-big__icon">
                <svg>
                  <use
                    xlink:href="./img/markers/markers_sprite.svg#${
                      icons[restaurant.type]
                    }"
                  ></use>
                </svg>
              </span>
              <div class="marker-big__body">
                <h2 class="marker-big__title">${restaurant.name}</h2>
                <div class="marker__descr">
                  <span class="marker__type"> ${restaurant.type}</span>
                  <span class="marker-big__dot">🞄</span>
                  <span class="marker-big__price">${restaurant.price}</span>
                </div>
              </div>
            </div>
        `,
      });
      markers.push(marker);
    }

    // Создание маленьких маркеров
    for (let i = maxBigMarkers; i < restaurants.length; i++) {
      const restaurant = restaurants[i];
      const smallMarker = new AdvancedMarkerElement({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        content: `
          <div class="marker marker-small">
              <span class="marker-small__icon">
                <svg>
                  <use
                    xlink:href="./img/markers/markers_sprite.svg#${
                      icons[restaurant.type]
                    }"
                  ></use>
                </svg>
              </span>
            </div>
        `,
      });
      smallMarkers.push(smallMarker);
    }

    markers.setZIndex(1000);
    smallMarkers.setZIndex(1000);

    return { markers, smallMarkers };
  }

  // Создание маркеров при инициализации карты
  let { markers, smallMarkers } = createMarkers(places, map);

  // Обновление маркеров при изменении вьюпорта
  google.maps.event.addListener(map, "bounds_changed", () => {
    // Удаление старых маркеров
    markers.forEach((marker) => marker.setMap(null));
    smallMarkers.forEach((smallMarker) => smallMarker.setMap(null));

    // Получение видимых заведений
    const visiblePlaces = places.filter((place) => {
      const latLng = new google.maps.LatLng(place.lat, place.lng);
      return map.getBounds().contains(latLng);
    });

    // Создание обновленных маркеров
    ({ markers, smallMarkers } = createMarkers(visiblePlaces, map));
  });
}

// Инициализация карты при загрузке страницы
initMap();
*/
