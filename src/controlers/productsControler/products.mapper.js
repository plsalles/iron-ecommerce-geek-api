class ProductsMapper {
  allProducts = products => products.map(product => ({
    productStock: product.stock,
    productImages: product.image,
    productId: product._id,
    productName: product.name,
    productPrice: `R$ ${product.price}`,
  }));
}

module.exports = new ProductsMapper();
