// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];


function printProduct(product) {
  var nums = document.createElement("p");
  nums.setAttribute("class", "nums");
  nums.innerHTML = (i + 1) + '. ';

  var descrip = document.createElement("p");
  descrip.setAttribute("class", "descrip");
  descrip.innerHTML = product.description + '-' + product.price + '€/ud.';

  var input = document.createElement("input");
  input.setAttribute("class", "product-unit");
  input.setAttribute("id", "product-input" + (i + 1));
  input.setAttribute("type", "number");
  input.setAttribute("value", 0);
  // var inputvalue = document.getElementById('product-input' + (i+1));
  
  input.addEventListener('change', event => {
    product.units = parseInt(event.target.value);
    console.log(event);
    if(product.units == 0){
      document.getElementById("button").disabled = true;
    }else{
      document.getElementById("button").disabled = false;
    }
  });

  

  


  var main = document.getElementById("products");
  main.appendChild(nums);
  main.appendChild(descrip);
  main.appendChild(input);
}

for(i = 0; i < products.length; i++){
  printProduct(products[i]);
  // Comprueba que todos los elementos están a cero cuando se crean los productos
  // y desabilita el boton calcular.
  if(products[i].units == 0){
    document.getElementById("button").disabled = true;
  }
}


// Calculo del Subtotal

var sub = (price, units) => price * units;

function subTotal(product){
  var subTotal = 0;
  for(prod of product){
    subTotal += sub(prod.price, prod.units);
  }
  return +(Math.round(`${subTotal}e+2`)  + "e-2"); // Preguntar a Antonio redondea a 2 cifras pero no se por qué xD. no se lo que quiere decir e+2
}


// Calculo del Tax

var tax = (product) => {
  var totalTax = 0;
  for(i = 0; i < product.length; i++){
    if(product[i].units && product[i].tax > 0){
      if(product[i].tax == REGULAR_TYPE){
        totalTax += sub(product[i].price, product[i].units) * product[i].tax/100;
      } else if(product[i].tax == LOWER_TYPE){
        totalTax += sub(product[i].price, product[i].units) * product[i].tax/100;
      } else if(product[i].tax == EXEMPT_TYPE){
        totalTax += sub(product[i].price, product[i].units) * product[i].tax/100;
      }
    }
  
  }
  return +(Math.round(`${totalTax}e+2`)  + "e-2"); 
}

// Calcular el total;

var totalPrice = (product) => {
  var total = 0;
  for(i = 0; i < product.length; i++){
    total = subTotal(product) + tax(product);
    return total.toFixed(2);
  }
}

// 
var subTotalResult = document.createElement("h2");
subTotalResult.setAttribute("id", "subtotal");

var taxResult = document.createElement("h2");
taxResult.setAttribute("id", "tax");

var totalResult = document.createElement("h2");
totalResult.setAttribute("id", "total");
  
var resultado = document.getElementById("result");
resultado.appendChild(subTotalResult);  
resultado.appendChild(taxResult);  
resultado.appendChild(totalResult);  


function buttonPrice(){
  
  document.getElementById('subtotal').innerHTML = `Subtotal: ${subTotal(products)}€`;
  document.getElementById('tax').innerHTML = `Tax: ${tax(products)}€`;
  document.getElementById('total').innerHTML = `Total: ${totalPrice(products)}€`;

  
}


var button = document.getElementById('button');

button.addEventListener('click', buttonPrice);






