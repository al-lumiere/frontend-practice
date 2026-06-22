function groupBy(arr, key) {
  let result = {};

  for (let el of arr) {
    if (result[el[key]]) {
      result[el[key]].push(el);
    } else {
    result[el[key]] = [el]
    }
  }

  return result
}

const users = [
  { name: "Alex", role: "admin" },
  { name: "Kate", role: "user" },
  { name: "Max", role: "admin" },
];

console.log(groupBy(users, "role"))