import React from 'react';

function Reminder({timestamp, name, clickHandler }) {
		
	return (
		<div>
	    	<p>Date: {timestamp}, Topic: {name}<button onClick={clickHandler}>Delete</button></p>
	    </div>
	)
	
}

export default Reminder