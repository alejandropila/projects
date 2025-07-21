export async function obtenerUbicacionActual() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return reject(new Error("Geolocalización no soportada"));
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log("Ubicación obtenida:", pos.coords);
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      },
      err => {
        console.error("Error al obtener ubicación:", err);
        alert("Error al obtener ubicación: " + err.message);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
