// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});
// Categories have many Products
Category.hasMany(Post, {
  foreignKey: 'category_id'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tags, {
  through: ProductTag,
  as: 'product_tag',
  foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Product, {
  through: ProductTag,
  as: 'product_tag',
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
