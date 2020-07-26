import React from "react";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon2 = ({ focused = false, name, color = styles.blackColor, size= 28 }) => (
  <Entypo name={name} color={focused? color: styles.darkGreyColor} size={size} />
);

NavIcon2.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

export default NavIcon2;