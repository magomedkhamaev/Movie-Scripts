import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Heddd from './Heddd';
const FullPost = () => {
    const [dat,setDat] = useState("");
    const {id} = useParams();
    React.useEffect(() => {
      
        axios.get(`https://movie-scripts.onrender.com/posts/${id}`).then(({data}) => {
          setDat(data);
          console.log(data);
        }).catch(err => {
          console.warn(err);
          alert();
        })
      
    }, []);
    if (dat?.text === undefined) {
      return <div style={{textAlign: "center", marginTop: "4rem", fontSize: "24px"}}>LOADING...</div>
    }  
    return <>
    <Heddd/>
    <div style={{padding:"2rem 1rem",display: "flex",justifyContent:"center",}}>
    <pre style={{fontSize:"14px",textWrap: "wrap",lineHeight:"23px",fontWeight: "normal",fontFamily: "sans-serif",}}>
        {`
            ${dat?.text}
          `}</pre>
    </div>
    
    </>
}
export default FullPost;