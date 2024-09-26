import { useNavigate } from "react-router-dom";
import Button from "shared/Button";
import { PiSmileySadFill } from "react-icons/pi";


const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="relative h-screen">
      <PiSmileySadFill 
       className='bg-blue-800'
      
      />
      <div className="relative z-[2] h-full py-12 px-[112px] flex flex-col justify-center">
        <p className="text-primary-main font-[600] mb-1">404 error</p>
        <h1 className="text-[60px] font-[600]">We can’t find that page</h1>
        <p className="text-[20px] text-gray-400 mt-[12px] mb-[48px]">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Button
          className="w-max "
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound