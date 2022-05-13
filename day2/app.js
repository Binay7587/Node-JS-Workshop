console.log("hello from app.js");

export default function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a > b ? a - b : b - a;
}

export { add, sub};