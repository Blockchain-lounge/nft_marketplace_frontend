import "./loader-styles.scss";

const Loader = () => {
  return (
    <div className="loader-body">
      <div className="loader">
        <span className="loader-child"></span>
        <span className="loader-child-2"></span>
        <span className="loader-child-3"></span>
      </div>
    </div>
  );
};

export default Loader;
