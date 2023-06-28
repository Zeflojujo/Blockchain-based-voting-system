import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Admin/login';
// import RegisterVoter from './components/Admin/Voter';
import Result from './components/Admin/result';
import ResultPresident from './components/Admin/resultPresident';
import ResultGovernor from './components/Admin/resultGovernor';
import ResultBlockLeader from './components/Admin/resultBlockLeader';
import Winners from './components/Admin/winners';
import ViewVoters from './components/Admin/ViewVoters';
// import Ballot from './components/Admin/ballot';
import Phase from './components/Admin/phase';
import Dashboard from './components/Admin/dashboard';

import UserSignIn from './components/User/login';
import UserDashboard from './components/User/dashboard';
import UserRegisterVoter from './components/User/register';
import UserCastVote from './components/User/castVote';
import UserResult from './components/User/result';
import { AuthProvider } from './components/User/AuthProvider';
import PageNotFound from './components/PageNotFound';

import Home from './components/Admin/home';
// import Web3 from 'web3';
// import contractAbi from "../../abi/VoterRegistry.json";

function App() {
  // const [web3, setWeb3] = useState(null);

  //   const sessionId = localStorage.getItem("sessionId");

  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => {
        
  //       const checkLoggedIn = async () => {
  //           const loggedIn = await web3.methods.isLoggedIn(sessionId).call();
  //           setIsLoggedIn(loggedIn);
  //       };
  //       checkLoggedIn();
  //   }, [web3, sessionId])

  return (
    <HashRouter>
      <AuthProvider>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin/auth" element={<SignIn/>} />
          <Route path="/user/regVoter" element={<UserRegisterVoter/>} />   


          <Route path="/user/login" element={<UserSignIn/>} />

            
          <Route path='/admin/dashboard' element={<Dashboard/>} />
          {/* <Route path="/admin/regVoter" element={<RegisterVoter/>} /> */}
          <Route path="/admin/listVoters" element={<Result/>} />
          <Route path="/admin/Voters" element={<ViewVoters/>} />
          <Route path="/admin/listPresident" element={<ResultPresident/>} />
          <Route path="/admin/listGovernor" element={<ResultGovernor/>} />
          <Route path="/admin/listBLs" element={<ResultBlockLeader/>} />
          <Route path="/admin/winners" element={<Winners/>} />
          <Route path="/admin/phase" element={<Phase/>} />

          <Route path='/user/dashboard' element={<UserDashboard/>} />
          <Route path="/user/castVote" element={<UserCastVote/>} />   
          <Route path="/user/result" element={<UserResult/>} />   
          <Route path="*" element={<PageNotFound/>} />   

        </Routes>
      </AuthProvider>

    </HashRouter>      
  );
}

export default App;
