import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Search from "./Search";


const Heddd = () => { 

return <>
    <header className="header col-12">
		<div className="wrapper col-12">
			<nav className="nav col-12">
				<div>
					<Link to="/" className="nav__logo col-1">Storyjoy</Link>
				</div>
				<Search/>	
				<Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
			</nav>
		</div>
	</header>
</>
};

export default Heddd;