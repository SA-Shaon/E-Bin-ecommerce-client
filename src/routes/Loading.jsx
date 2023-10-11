import loaderGif from "../assets/loaderGIf.gif";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={loaderGif} style={{ width: "400px" }} alt="Loading" />;
    </div>
  );
};

export default Loading;
