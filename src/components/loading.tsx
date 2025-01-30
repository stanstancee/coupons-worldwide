const Loading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <center className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4">
        <div className="custom-loader"></div>
      </center>
    </div>
  ) : null;
};

export default Loading;
