import './App.css';
// import CreateWorkoutMain from './components/CreateWorkoutMain/CreateWorkoutMain';
import MyWorkouts from './components/MyWorkouts/MyWorkouts';
import SingleWorkout from './components/SingleWorkout/singleWorkout';
import UpdateWorkoutPlan from './components/UpdateWorkoutPlan/UpdateWorkoutPlan';
import NewWorkoutPlan from './components/CreateNewWorkoutPlan/NewWorkoutPlan';
import WorkoutSession from './components/Session/Session';
import SessionDetails from './components/SessionDetails/SessionDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//user management
import Index from "./components/index/index";
import Adduser from './components/create_user/adduser';
import Addpayment from './components/create_payment/addpayment';
import Login from './components/login_page/login';
import Home from './components/Home_page/home';
import Seller_home from './components/Seller_home_page/seller_page';
import Trainer_home from './components/Trainer_home_page/trainer_page';
import Update from './components/Update_user/Update_user';
import ViewProfile from './components/View_user/view_user';
import Other_users from './components/Other_users/other_users';

import All_users from './components/All_users/all_user';
import Generate_Report from './components/Generate Report/generate_report';
import AdminHome from "./components/adminHome/adminHome";

//financial management
import AdminHeader from "./components/FNHeader/FNheader";
import FNDashboard from "./components/FNDashboard/dashboard";
import CreateTransaction from "./components/createTransaction/createTransaction";
import ViewAllTransaction from "./components/readAllTransaction/readAllTransaction";
import UpdateTransaction from "./components/updateTransaction/updateTransaction";
import AdminFooter from "./components/FNFooter/FNfooter";
import FinancialP from "./components/financialPerformance/financialPerf";
import Calculate from "./components/calculations/calculations";
import UserPaymentsViewAll from "./components/ReadAlluserPayments/readAllUserPayments"
import FNFaq from "./components/FNFaqPage/FNFaq"

import NavigationBarB from './components/NavigationBarB/NavigationBarB'
import React, { useState, useEffect } from "react";
import UserContext from "./components/ContextComponent/ContextComponent";

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);



  return (
    
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
      
        {user?.UserType ==='Registered User' ? <NavigationBarB/> : <AdminHeader/>}
        <Routes>
          {/* <Route path="/" /> */}
          {/* <Route path = "/CreateWorkout" element = {<CreateWorkoutMain/>}/> */}
          <Route path="/MyWorkouts" element={<MyWorkouts />} />
          <Route path="/SingleWorkout/:id" element={<SingleWorkout />} />
          <Route path="/UpdateWorkout/:id" element={<UpdateWorkoutPlan />} />
          <Route path="/NewWorkoutPlan" element={<NewWorkoutPlan />} />
          <Route path="/Session/:id/:dayIndex" element={<WorkoutSession />} />
          <Route path="/SessionDetails/:id/:sessionNumber/:day" element={<SessionDetails />} />

          {/* user management */}
          <Route path='' element={<Index />} />
          <Route path='/add' element={<Adduser />} />
          <Route path='/addpayment' element={<Addpayment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home/:id' element={<Home />} />
          <Route path='/users' element={<Other_users />} />
          <Route path='/profile/:id' element={<ViewProfile />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/seller_home/:id' element={<Seller_home />} />
          <Route path='/trainer_home/:id' element={<Trainer_home />} />
          <Route path='/adminHome' element={<AdminHome/>}/>
          <Route path='/allusers' element={<All_users />} />
          <Route path='/report' element={<Generate_Report />} />

          {/* financial management */}
            <Route path='/finance' element={<FNDashboard/>}/>
            <Route path='/addTransaction' element={<CreateTransaction/>}/>
            <Route path='/viewTransaction' element={<ViewAllTransaction/>}/>
            <Route path='/updateTransaction/:id' element={<UpdateTransaction/>}/>
            <Route path='/financialperformance' element={<FinancialP/>}/>
            <Route path='/calculate' element={<Calculate/>}/>
            <Route path="/alluserpaymentsFN" element={<UserPaymentsViewAll/>}/>
            <Route path="/fnfaq" element={<FNFaq/>}/>
        </Routes>
        
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
