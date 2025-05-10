const locationQuery = document.getElementById('map').dataset.location;
const map = L.map('map').setView([20.5937, 78.9629], 5); // Default: India center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

async function geocodeAndPlaceMarker(query) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await res.json();
  
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      L.marker([lat, lon]).addTo(map)
        .bindPopup(query)
        .openPopup();
      map.setView([lat, lon], 13);
    } else {
      console.error("Location not found");
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
  }
}

if(locationQuery) {
  geocodeAndPlaceMarker(locationQuery);
} else {
  console.error("No location data provided on the map element.");
}
