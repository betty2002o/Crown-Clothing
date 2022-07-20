import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';

function DirectoryItem({ category }) {
  const { imageUrl, title, route } = category;
  const nav = useNavigate();
  const upperCaseTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };

  const handleNavigate = () => nav(route);

  return (
    <div className="directory-item-container" onClick={handleNavigate}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-body-container">
        <h2>{upperCaseTitle(title)}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;
