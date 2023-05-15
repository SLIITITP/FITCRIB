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


//Blog Management
import BView from "./components/BlogViews/View"
import TView from "./components/BlogViews/TView"
import BCreate from "./components/BlogCreate/Create"
import MyBlogs from "./components/MyBlogs/MyBlogs"
import Blog from "./components/SingleBlog/Blog"
import TBlog from "./components/SingleBlog/Tblog"
import UpdateBlogs from "./components/BlogUpdate/Update"
import Modal from "./components/Review/ReviewModal"
import Approve from "./components/ApproveBlog/appArticle"

//nutrition tracking

import NTAddDietPlan from './components/AddDietPlan_folder/AddDietPlan';
import NTAllDietPlans from './components/AllDietPlans_folder/AllDietPlans';
import NTAppbmi from './components/Appbmi_folder/Appbmi';
import SearchBar from './components/SearchBar_folder/SearchBar ';
import NTGoalUpdate from './components/GoalUpdate_folder/GoalUpdate'
import NTGoalsetting from './components/Goalsetting_folder/Goalsetting';
import NTViewGoal from './components/ViewGoal_folder/ViewGoal';
import NTMain from './components/Main_folder/Main';
// import NTSearchGoals from './components/SearchGoal_folder/SearchGoal';
import NTEditDietPlan from './components/EditDietPlan_folder/EditDietPlan';

//recipe management
import AddRecipe from './components/addrecipe/addrecipe';
import AllRecipes from './components/AllRecipes/AllRecipes';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import UpdateRecipe from './components/UpdateRecipe/UpdateRecipe';
import RUVAComponent from './components/RUVA/RUVA';
import RURDComponent from './components/RURD/RURD';

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

          {user?.UserType === 'Registered User' || 'Seller' || 'Trainer' ? <NavigationBarB /> : <AdminHeader />}
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
            <Route path='/adminHome' element={<AdminHome />} />
            <Route path='/allusers' element={<All_users />} />
            <Route path='/report' element={<Generate_Report />} />

            {/* financial management */}
            <Route path='/finance' element={<FNDashboard />} />
            <Route path='/addTransaction' element={<CreateTransaction />} />
            <Route path='/viewTransaction' element={<ViewAllTransaction />} />
            <Route path='/updateTransaction/:id' element={<UpdateTransaction />} />
            <Route path='/financialperformance' element={<FinancialP />} />
            <Route path='/calculate' element={<Calculate />} />
            <Route path="/alluserpaymentsFN" element={<UserPaymentsViewAll />} />
            <Route path="/fnfaq" element={<FNFaq />} />

            {/*Blog Management*/}
            <Route exact path='/tBView' element={<TView />} />
            <Route exact path='/Bview' element={<BView />} />
            <Route exact path='/Bcreate' element={<BCreate />} />
            <Route exact path='/myBlogs' element={<MyBlogs />} />
            <Route exact path='/blog/:id' element={<Blog />} />
            <Route exact path='/bUpdate/:id' element={<UpdateBlogs />} />
            <Route exact path='/bReview/:id' element={<Modal />} />
            <Route exact path='/tBlog/:id' element={<TBlog />}/>
            <Route exact path='/bApprove' element={<Approve/>}/>

            {/*Nutrition tracking*/}
            <Route exact path='/addDietPlan' element={<NTAddDietPlan />} />
            <Route exact path='/allDietPlans' element={<NTAllDietPlans />} />
            <Route exact path='/appBMI' element={<NTAppbmi />} />
            <Route exact path='/dietSearchBar' element={<SearchBar />} />
            <Route exact path='/updateGoal' element={<NTGoalUpdate />} />
            <Route exact path='/goalSetting' element={<NTGoalsetting />} />
            <Route exact path='/viewGoal' element={<NTViewGoal />} />
            <Route exact path='/mainNT' element={<NTMain />} />
            {/* <Route exact path='/searchGoal' element={<NTSearchGoals />} /> */}
            <Route exact path='/editDietplan/:id' element={<NTEditDietPlan />} />

            {/*Recipe Management */}
            <Route path='/allrecipes' element={<AllRecipes />} />
            <Route path='/addRecipe' element={<AddRecipe />} />
            <Route path='/recipe/:id' element={<RecipeDetails />} />
            <Route path='/updateRecipe/:id' element={<UpdateRecipe />} />
            <Route path='/RUVA' element={<RUVAComponent />} />
            <Route path='/RURD/recipe/:id' element={<RURDComponent />} />
          </Routes>
          {user?.UserType === 'Admin' && <AdminFooter />}

        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
