const socket = io(); // Configuracion del cliente

socket.emit("mensaje", "hola esto funciona");

socket.on("respuesta", (data) => {
  console.log(data);
});
