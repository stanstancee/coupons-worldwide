const Loading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>

      </div>
      <h2 className="pt-[5.8rem] text-[#FF9F29]">Please wait...</h2>
    </div>
  ) : null;
};

export default Loading;
