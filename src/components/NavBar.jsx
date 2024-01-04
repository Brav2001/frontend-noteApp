import NavBarButton from "./NavBarButton";
import SearchBar from "./SearchBar";
import Title from "./Title";
import LogOutButton from "./LogOutButton";

const NavBar = ({ children }) => {
  return (
    <div className=" relative w-11/12 sm:w-2/5 lg:w-1/3">
      <div className="fixed w-11/12 sm:w-2/5 lg:w-1/3 z-10 bg-background">
        <div className="w-full">
          <div className="flex flex-row w-full  items-center">
            <div className="mb-4 flex w-full justify-center">
              <Title title={"My Notes"} />
            </div>
            <div className="absolute h-[40px] w-full flex justify-end">
              <LogOutButton />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-4 flex justify-center flex-row">
            <div className="w-1/2 flex justify-center">
              <NavBarButton label={"Active"} route={"/"} />
            </div>
            <div className="w-1/2 flex justify-center">
              <NavBarButton label={"Archived"} route={"/archived"} />
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <SearchBar />
        </div>
      </div>
      <div className="absolute top-[200px] w-full pb-6 ">{children}</div>
    </div>
  );
};

export default NavBar;
