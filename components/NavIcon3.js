import React from "react";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import { Image } from "react-native";

const NAVERLOGO = "../assets/naverlogo.png";
const NAVERLOGO_G = "../assets/naverlogo-grayscale.png";
const DAUMLOGO = "../assets/daumlogo.png";
const DAUMLOGO_G = "../assets/daumlogo-grayscale.png";

const NavIcon3 = ({
  focused = false,
  name,
  color = styles.blackColor,
  size = 28,
}) => {
  return ( name == "naver" ?
    <Image
      resizeMode={"contain"}
      style={{ height: size, width: size }}
      source={focused ? require(NAVERLOGO) : require(NAVERLOGO_G)}
    /> :
    <Image
      resizeMode={"contain"}
      style={{ height: size, width: size }}
      source={focused ? require(DAUMLOGO) : require(DAUMLOGO_G)}
    />
  );
};

NavIcon3.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon3;

//              <Image
// resizeMode={"contain"}
// style={{ height: 30, width: 30 }}
// source={require("../assets/newspaper.png")}
// />
