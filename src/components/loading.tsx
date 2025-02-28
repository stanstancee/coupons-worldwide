const Loading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
      <div className="custom-loader"></div>
      
    </div>
  ) : null;
};

export default Loading;
