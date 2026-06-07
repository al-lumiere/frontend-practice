function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  let fin = Array.isArray(value) ? [] : {};

  for (let key of Object.keys(value)) {
    fin[key] = deepClone(value[key]);
  }

  return fin;
}

const obj = {
  name: "Alice",
  address: {
    city: "Haifa",
  },
};

const copy = deepClone(obj);

copy.address.city = "Tel Aviv";

console.log(obj.address.city); // "Haifa"
console.log(copy.address.city); // "Tel Aviv"

function myMap(arr, callback) {
  let fin = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    fin[i] = callback(arr[i]);
  }

  return fin;
}

console.log(myMap([1, 2, 3], (x) => x * 2));
// [2, 4, 6]
