import React from 'react';
import './category-item.styles.scss';

function CategoryItem({ category }) {
  const { imageUrl, title } = category;
  const upperCaseTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{upperCaseTitle(title)}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default CategoryItem;
