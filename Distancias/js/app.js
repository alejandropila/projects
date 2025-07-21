import { obtenerUbicacionActual } from './location.js';
import { geocodificarDireccion } from './geocodificacion.js';
import { calcularDistancia } from './distancia.js';

document.getElementById('calcularBtn').addEventListener('click', async () => {
  const destino = document.getElementById('destinoInput').value.trim();
  if (!destino) {
    alert('Introduce una dirección de destino');
    return;
  }

  try {
    // Obtener ubicación actual justo aquí
    const origen = await obtenerUbicacionActual();
    if (!origen) throw new Error('No se pudo obtener la ubicación actual');

    // Geocodificar destino
    const destinoCoords = await geocodificarDireccion(destino);
    if (!destinoCoords) throw new Error('No se pudo geocodificar el destino');

    // Calcular distancia
    const distanciaKm = calcularDistancia(origen, destinoCoords);
    document.getElementById('resultado').textContent = `Distancia: ${distanciaKm.toFixed(2)} km`;
  } catch (err) {
    alert('Error: ' + err.message);
    console.error(err);
  }
  const destinoCoords = await geocodificarDireccion(destino);
if (!destinoCoords) throw new Error('No se pudo geocodificar el destino');

console.log('Destino:', destinoCoords.nombre);
console.log('Coordenadas destino:', { lat: destinoCoords.lat, lon: destinoCoords.lon });

});
