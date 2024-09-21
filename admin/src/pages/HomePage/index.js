/*
 *
 * HomePage
 *
 */

import React, { useEffect } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import Dropdown from "../../components/Dropdown";

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <h1>Custom Dropdown</h1>
      <Dropdown />
    </div>
  );
};

export default HomePage;
