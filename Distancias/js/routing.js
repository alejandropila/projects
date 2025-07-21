import { geocodificarDireccion, obtenerRutaCarretera } from './api.js';

export async function obtenerCoordenadasDestino(direccion) {
  const coords = await geocodificarDireccion(direccion);
  if (!coords) throw new Error("No se encontró el destino");
  return coords;
}

export async function calcularRuta(origen, destino) {
  const distancia = await obtenerRutaCarretera(origen, destino);
  return distancia;
}
