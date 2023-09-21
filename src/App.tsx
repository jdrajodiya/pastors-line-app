import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PastorsApp from 'pages';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<PastorsApp />}></Route>
			</Routes>
		</>
	)
}

export default App;
