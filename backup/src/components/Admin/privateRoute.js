// import React, {useState, useEffect} from 'react';
// import {Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({component: Component}) => {
//     const [web3, setWeb3] = useState(null);

//     const sessionId = localStorage.getItem("sessionId");

//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
        
//         const checkLoggedIn = async () => {
//             const loggedIn = await web3.methods.isLoggedIn(sessionId).call();
//             setIsLoggedIn(loggedIn);
//         };
//         checkLoggedIn();
//     }, [web3, sessionId])

//     return (
//         <Route
//             render={(props) => 
//             isLoggedIn ? (
//                 <Component {...props} />
//             ) : (
//                 <Redirect to={{pathname: "/admin/login"}} />
//             )}
//         />
//     )
// }

// export default PrivateRoute;