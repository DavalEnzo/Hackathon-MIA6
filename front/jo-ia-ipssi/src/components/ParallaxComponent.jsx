import React from "react";
import { Parallax } from "react-parallax";
import bg_paris from "../assets/img/background_paris.jpg";
import logojo from "../assets/img/logojo.png";
import ipssiLogo from "../assets/img/ipssi-logo.png";


const ParallaxComponent = () => {
  return (
    <div>
      <Parallax bgImage={bg_paris} strength={500}>
        <div style={{ width: "100vh", height: "700px" }}>
          <h1
            className="text-center text-light"
            style={{ paddingTop: "200px" }}
          >
            Paris 2024
          </h1>
          <div className="w-100 text-center pt-5">
            <img
            
              width={170}
              src={ipssiLogo}
              alt=""
            />
            <img
            
              width={170}
              src={logojo}
              alt=""
            />
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default ParallaxComponent;