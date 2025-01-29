const Loading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <center className="center h-screen bg-[rgab(0 , 0, 0, 0.5)] grid place-content-center place-items-center">
      <div className="custom-loader"></div>
    </center>
  ) : null;
};

export default Loading;
