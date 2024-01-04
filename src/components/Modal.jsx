import { IoClose } from "react-icons/io5";
const Modal = ({ hidden, onclose, children }) => {
  return (
    <>
      {hidden && (
        <div className="fixed top-0 z-20 left-0 w-full h-full bg-background opacity-95 "></div>
      )}
      <div
        aria-hidden="true"
        className={`${
          !hidden && "hidden"
        }  fixed overflow-y-auto top-0 right-0 bottom-0  z-20 left-0 flex items-center justify-center `}
      >
        <div className="relative p-4 w-full max-w-5xl max-h-full">
          <div className="relative bg-color3 rounded-3xl ">
            <div className="flex items-center justify-end p-4 pb-0   ">
              <button
                type="button"
                className="bg-color3 border-2 border-color3 hover:border-text h rounded-3xl p-2.5 justify-end items-center duration-200"
                onClick={onclose}
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className="px-4 pb-4  space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
