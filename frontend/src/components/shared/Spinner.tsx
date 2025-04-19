import { HashLoader } from "react-spinners";

type SpinnerProps = {
  isPageLoading?: boolean;
};

const Spinner = ({ isPageLoading = true }: SpinnerProps) => {
  return (
    <>
      {isPageLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <HashLoader />
        </div>
      ) : (
        <div className="z-50 mt-[10rem] flex justify-center">
          <HashLoader />
        </div>
      )}
    </>
  );
};

export default Spinner;
