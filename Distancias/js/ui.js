export function mostrarResultado(texto) {
  document.getElementById('resultado').innerText = texto;
}

export function obtenerDestino() {
  return document.getElementById('inputDestino').value;
}

export function alertar(mensaje) {
  alert(mensaje);
}
export function mostrarLoading() {
  const resultado = document.getElementById('resultado');
  resultado.innerText = 'Calculando...';
}
