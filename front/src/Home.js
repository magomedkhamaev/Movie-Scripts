import React, { useState } from 'react';
import { Grid} from "@mui/material";
import { Link } from 'react-router-dom';
import Heddd from './Heddd';
import { SearchContext } from "./App";
import axios from 'axios';
const Home = () => { 
  const {title} = React.useContext(SearchContext)
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [dat,setDat] = useState("");
  
  const onLoad = () => {
    setLimit(limit +12)
    setLoading(true)
  }

  React.useEffect(() => {
    const search = title  ? `title=${title}` : '';
      axios.get(`http://localhost:4444/posts/?limit=${limit}&${search}`).then(({data}) => {
        setDat(data);
        setLoading(false)
      }).catch(err => {
        console.warn(err);
        alert();
      })
    
  }, [title,limit]);
 
    return (
        <>
        <Heddd/>
        <Grid container columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={0.5}>
        <Grid item style={{ marginTop: 15, padding: 15 }} container columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}  rowGap={4} columnGap={2}> 
            
              {dat && dat?.map((item,index)=> {
                return(
                  <Link to={`/posts/${item?._id}`}>
               
       <div id="list-th">
       <div className="book read">
        <div className="cover">
          <img src={`http://localhost:4444${item?.imageUrl}`}/>
        </div>
        <div className="description">
          <p className="title">{item?.title} <br/>
            <span className="author">{item?.genre.map((name) => (
            <li style={{listStyle:"none", marginRight: "4px",marginTop:"4px",fontWeight:"500"}} key={name}>
             #{name}
            </li>
          ))}</span></p>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",}}>
          <Link to={`/posts/${item?._id}/edit`}>
              <button className="buy-btn">Edit</button>
							</Link>
              <p style={{marginBottom:"6px",color: "black",fontWeight:"500",marginRight:"4px",fontSize:"17px"}}>{item?.author}</p>
            </div>
        </div>
      </div>
       </div>
               </Link>
                )   
              })}
      </Grid>
        <div style={{width: "800px",marginLeft:"6rem",marginBottom:"2rem",display:"flex",justifyContent:"center"}}>
           <button className='buy-btn' onClick={onLoad}>{loading? "loading...": "Load More"}</button>
        </div>
      </Grid>
        
        </>
    )
}

export default Home;

