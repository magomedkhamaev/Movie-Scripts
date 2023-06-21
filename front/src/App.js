import React from 'react';
import './App.css';
 import { Routes, Route } from "react-router-dom";
import Home from './Home';
import FullPost from './FullPost';
import { AddPost } from './Add';


export const SearchContext = React.createContext();

function App() {
  const [title, setTitle] = React.useState();
  return (
    <SearchContext.Provider value={{title, setTitle}}>
       <Routes>
           <Route path="/" element= {<Home />} />
           <Route path="/posts/:id" element= {<FullPost/>} />
           <Route path="/posts/create" element= {<AddPost/>} />
           <Route path="/posts/:id/edit" element={<AddPost />} />   
           </Routes>  
    </SearchContext.Provider>
                 
  );
}

export default App;
