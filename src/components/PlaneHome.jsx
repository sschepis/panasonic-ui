import React from 'react';
import Header from './Header';
import SearchContainer from './SearchContainer';
import FAQ from './FAQ';
import Categories from './Categories';

import "../App.css";

const PlaneHome = () => {
  return (
    <div>
      <Header />
      <main>
        <SearchContainer />
        <FAQ />
        <Categories />
      </main>
    </div>
  );
};

export default PlaneHome;
