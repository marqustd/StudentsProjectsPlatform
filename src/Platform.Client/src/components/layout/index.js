import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/index';
import AppBar from '../appBar';
import Breadcrumb from '../common/breadcrumb';
import './style.scss';

const Router = ({ routes, navigationList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  function openDrawer() {
    setIsDrawerOpen(true);
  }
  return (
    <div className="main-container">
      <AppBar
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <Navigation
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        additionalNavi={navigationList}
      />
      <section className="main-section">
        <Breadcrumb />
        {routes}
      </section>
    </div>
  );
};
Router.propTypes = {
  routes: PropTypes.node.isRequired,
  navigationList: PropTypes.node.isRequired,
};
export default Router;
