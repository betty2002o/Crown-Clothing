import './shop.styles.scss';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/productContext';
import ProductCard from '../../components/product-card/ProductCard';

function Shop() {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Shop;
