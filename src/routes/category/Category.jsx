import './category.styles.scss';
import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/ProductCard';

function Category() {
  const { categoriesMap } = useContext(CategoriesContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
}

export default Category;
