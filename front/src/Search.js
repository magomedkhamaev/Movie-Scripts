import React from "react";
import { SearchContext } from "../src/App";
 const Search = () => {
   const {title, setTitle} = React.useContext(SearchContext)
    return <div>
       
        <input
        value={title}
        onChange={(event) => setTitle(event.target.value)} 
        className="input col-8" placeholder="Search pizzas..." />
        
        </div>
}

export default Search;