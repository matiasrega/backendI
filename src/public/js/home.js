const socket = io();

socket.emit("mensaje", "hola esto funciona");

socket.on("respuesta", (data) => {
  console.log(data);
});
