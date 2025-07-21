export async function geocodificarDireccion(direccion) {
  // Agrega Cantabria, España al final, separado por coma y espacio
  const consulta = `${direccion} Cantabria España`;
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(consulta)}&limit=5`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (!data.features || !data.features.length) return null;

  const feature = data.features[0];
  const [lon, lat] = feature.geometry.coordinates;

  return { lat, lon };
}
