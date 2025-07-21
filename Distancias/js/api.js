const API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkzMGUwOGQ5ZTY0YzRmM2I4MDhlZTFhNTA5NjYxYzc4IiwiaCI6Im11cm11cjY0In0=';

export async function geocodificarDireccion(direccion) {
  const direccionCompleta = `${direccion}, Cantabria, España`;
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(direccionCompleta)}&limit=5`;
  
  console.log('URL API geocodificación:', url);  // <--- aquí
  
  const resp = await fetch(url);
  const data = await resp.json();

  if (!data.features || !data.features.length) return null;

  const feature = data.features[0];
  const [lon, lat] = feature.geometry.coordinates;

  return { lat, lon };
}




export async function obtenerRutaCarretera(origen, destino) {
  const body = {
    coordinates: [
      [origen.lon, origen.lat],
      [destino.lon, destino.lat]
    ]
  };

  const resp = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
    method: 'POST',
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await resp.json();
  return data.routes[0].summary.distance / 1000;
}
