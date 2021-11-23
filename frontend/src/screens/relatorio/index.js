import React, { useContext, useEffect, useState } from "react";

import { ImageBackground } from "react-native";

const Relatorio = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
};

export default Relatorio;
