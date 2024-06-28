/*const saludar = (nombre) => {
  console.log(`Hola, ${nombre}!`);
};

saludar("Matias");

//2.

/*const sumar = (a, b) => {
  console.log(a + b);
};

sumar(10, 22);

//3.
function elevar(numero, exponente = 2) {
  return numero ** exponente;
}

console.log(elevar(10));

console.log(elevar(2, 10));

console.log(elevar(2, 0));

//4.
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor;
  };
}

const resultado = crearMultiplicador(8);
console.log(resultado(10));

//5.

function filtrarPares(arrayDeNumeros) {
  return arrayDeNumeros.filter((numero) => numero % 2 === 0);
}

console.log(filtrarPares([10, 5, 2, 1, 2, 2, 6, 6, 18, 14, 36, 50, 22]));

//6.
function aplicarOperacion(arrayNumeros, operacion) {
  return arrayNumeros.map(operacion);
}

const operacionParaNumero = (numero) => numero * 2;

console.log(aplicarOperacion([1, 2, 6, 12], operacionParaNumero));

//8
const restar = (a, b) => {
  return a - b;
};

console.log(restar(100, 50));

/*const sumar = (a, b) => {
  console.log(a + b);
};

sumar(10, 22);

const sumar = (a, b) => a + b;

console.log(sumar(6, 4));

//10

function imprimirElementos(array) {
  array.forEach((element) => {
    console.log(element);
  });
}

imprimirElementos([1, 2, 3, 4, 5, 6, 4, 7, 5, 8, 6]);*/

/*function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

const objeto1 = { a: 1, b: 2, 3: 3, d: "puto" };
const objeto2 = { 3: 14, d: "no soy puto" };

console.log(mergeObjects(objeto1, objeto2));*/

//Escribe una función chunkArray que divida un array en subarrays de longitud fija.

function chunkArray(array, size) {
  let resultado = [];
  for (i = 0; i < array.length; i += size) {
    resultado.push(array.slice(i, (i += size)));
  }
  return resultado;
}

console.log(chunkArray([1, 2, 3, 6, 78, 99, 100, 25, 255555, 36], 1));
