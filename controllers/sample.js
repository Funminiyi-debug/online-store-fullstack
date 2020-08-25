const data = require("../mock");

const random = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const freshProduct = data.category.map(category => {
  return (product = category.goods.map(good => {
    good.category = category.type;
    good.subcategory = category.items[random(category.items.length - 1)];
    return good;
  }));
});

module.exports = freshProduct.flat(Infinity);
