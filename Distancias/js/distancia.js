


export function calcularDistancia(origen, destino) {
  const R = 6371; // km
  const dLat = toRad(destino.lat - origen.lat);
  const dLon = toRad(destino.lon - origen.lon);

  const lat1 = toRad(origen.lat);
  const lat2 = toRad(destino.lat);

  const a = Math.sin(dLat/2)**2 +
            Math.sin(dLon/2)**2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value) {
  return value * Math.PI / 180;
}
