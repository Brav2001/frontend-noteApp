import { useEffect, useState } from "react";
import TextButton from "./TextButton";
import { useLocation } from "react-router-dom";

const NavBarButton = ({ label, route }) => {
  const location = useLocation();
  return (
    <div className="w-full flex justify-center flex-col">
      <TextButton label={label} route={route} />
      <div
        className={`${
          location.pathname == route && "bg-text rounded-3xl"
        } w-full h-[7px] -mt-4`}
      ></div>
    </div>
  );
};

export default NavBarButton;
