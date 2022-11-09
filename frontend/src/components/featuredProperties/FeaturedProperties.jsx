import "./featuredProperties.css";

const FeaturedProperties = (props) => {
  return (
    <div className="fp">
      {props.rating.map(f => (
        <div className="fpItem" key={f._id}>
          <img
            src={f.photos[2]}
            alt={f.name}
            className="fpImg"
          />
          <span className="fpName"><a href="./hotels/0" target="_blank">{f.title}</a></span>
          <span className="fpCity">{f.city}</span>
          <span className="fpPrice">Starting from ${f.cheapestPrice}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
