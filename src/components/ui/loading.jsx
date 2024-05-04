import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#000" />
    </div>
  );
};

export { Loading };
