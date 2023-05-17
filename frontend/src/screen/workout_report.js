import jsPDF from "jspdf";
import "jspdf-autotable";
 

const generatePDF = Workout => {
  const doc = new jsPDF();
  const tableColumn = ["Exercise ID",	"Exercise Name",	"Effected Body Part",	"Published Date",	"Likes",	"Dislikes"	];
  const tableRows = [];

  Workout.forEach(element => {
    const WorkoutData = [
      element._id,
      element.workoutName,
      element.mainBodyPart,
      element.createdAt,
      element.likes,
      element.dislike,
      ];
      tableRows.push(WorkoutData);  
    console.log(WorkoutData)
  });
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] ;
  // ticket title. and margin-top + margin-left
  doc.text("Workout details.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`Exercise_${dateStr}.pdf`);
};
export default generatePDF;