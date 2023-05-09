import './App.css';
import NavBarTop from './components/NavBarTop/NavBarTop';
// import CreateWorkoutMain from './components/CreateWorkoutMain/CreateWorkoutMain';
import MyWorkouts from './components/MyWorkouts/MyWorkouts';
import SingleWorkout from './components/SingleWorkout/singleWorkout';
import UpdateWorkoutPlan from './components/UpdateWorkoutPlan/UpdateWorkoutPlan';
import NewWorkoutPlan from './components/CreateNewWorkoutPlan/NewWorkoutPlan';
import WorkoutSession from './components/Session/Session';
import SessionDetails from './components/SessionDetails/SessionDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/NavBarTop/Navbar'

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
    {/* <NavBarTop/> */}
    <Routes>
    <Route path = "/" />
    {/* <Route path = "/CreateWorkout" element = {<CreateWorkoutMain/>}/> */}
    <Route path = "/MyWorkouts" element = {<MyWorkouts/>}/>
    <Route path = "/SingleWorkout/:id" element = {<SingleWorkout/>}/>
    <Route path = "/UpdateWorkout/:id" element = {<UpdateWorkoutPlan/>}/>
    <Route path = "/NewWorkoutPlan" element = {<NewWorkoutPlan/>}/>
    <Route path = "/Session/:id/:dayIndex" element = {<WorkoutSession/>}/>
    <Route path = "/SessionDetails/:id/:sessionNumber/:day" element = {<SessionDetails/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
