import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Slider from "react-slick";
import './Pie.css';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();
  const [session, setSession] = useState([]);
  const [totalSessionsPerDay, setTotalSessionsPerDay] = useState();
  const [completedSessions, setCompletedSessions] = useState();

  useEffect(() => {
    function fetchWorkout() {
      axios
        .get(`http://localhost:8070/workoutPlan/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setWorkout(res.data);
          console.log(res.data.workoutDuration);
          console.log(res.data.workoutDuration * 4);
          setTotalSessionsPerDay(res.data.workoutDuration * 4);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchWorkout();
  }, [id]);

  useEffect(() => {
    function fetchSessions() {
      axios
        .get(`http://localhost:8070/workoutSession/${id}`)
        .then((res) => {
          console.log(id);
          console.log(res.data);
          setSession(res.data);
          let maxDay = 0;
          for (const [i] of res.data.entries()) {
            if (res.data[i].day > maxDay) {
              maxDay = res.data[i].day;
            }
          }
          function ascendingArray(num) {
            let arr = [];
            for (let i = 0; i <= num; i++) {
              arr.push(i);
            }
            return arr;
          }
          let dayArray = ascendingArray(maxDay);
          console.log(dayArray);

          const completedSessionsArr = Array(maxDay + 1).fill(0);
          for (const [i] of res.data.entries()) {
            if (dayArray.includes(res.data[i].day)) {
              completedSessionsArr[res.data[i].day] += 1;
            }
          }
          setCompletedSessions(completedSessionsArr);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchSessions();
  }, [id]);

  console.log(session);
  console.log(completedSessions);

  const data = (index) => {
    const chart = {
      labels: ["Completed Sessions", "Incomplete Sessions"],
      datasets: [
        {
          label: "Sessions",
          data: completedSessions
            ? [
              completedSessions[index],
              totalSessionsPerDay - completedSessions[index],
            ]
            : [],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return chart;
  };

  return (
    <>
      <div className="piechartdiv">
        <br />
        <h1 className="piechartheading">Progress Details</h1>
        <br/>
        <div className="piechart">
          <div className="piecontainer">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {completedSessions &&
                  completedSessions.map((item, index) => {

                    return (
                      <item>
                        <div key={index} className={`${"active" === index ? "active" : ""}`} style={{ width: "40%", height: "40%", border: "5px solid #99FF33", backgroundColor: "white" }}>
                          <p className="piechartpara">Day {index + 1} completed sessions</p>

                          <Pie data={data(index)} className="piechartWO" />
                          
                        </div>
                        <br/>
                      </item>
                    );

                  })}
              </div>
              {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </a> */}
            </div>
          </div>
        </div>
        <br />
      </div>

    </>
  );
}
