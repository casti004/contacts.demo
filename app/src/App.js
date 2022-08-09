import React, { useEffect, useState } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import ContactCardList from './components/ContactCardList';
import ContactEdit from './components/ContactEdit';

const App = () => {

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/contacts' exact={true} element={<ContactCardList />} />
        <Route path='/contacts/:id' element={<ContactEdit />} />
      </Routes>

    </div>
  );
}

export default App;
