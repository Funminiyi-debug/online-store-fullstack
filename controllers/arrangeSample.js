const data = require("./sample");

const categoryList = [
  "Toiletries",
  "Household",
  "Fresh Foods",
  "Naija Food",
  "Food Cupboard",
  //   "Cooking Oil",
];

const categories = categoryList.map(category => {
  return {
    name: category,
    goods: data.filter(element => element.category === category),
  };
});

console.log(categories);
