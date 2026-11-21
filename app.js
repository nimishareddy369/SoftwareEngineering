// SmartClass - front-end classroom management demo
const students = [
  "Aarav Kumar","Ananya Rao","Bhavana Reddy","Charan Teja","Deepika S",
  "Gautham K","Harini P","Ishaan Varma","Jahnavi M","Karthik N",
  "Keerthana R","Lahari V","Manoj Kumar","Meghana P","Naveen R",
  "Nikhil S","Pallavi G","Pranav K","Priya M","Rahul V",
  "Sahithi N","Sanjay R","Sravya K","Tejaswi P","Uday K",
  "Varun M","Vasavi R","Vikram S","Yamini T","Abhinav G",
  "Akhila N","Amrutha P","Bharath R","Chandana S","Dinesh K",
  "Kavya M","Madhav T","Nandini V","Pavan S","Rithika G",
  "Sumanth P","Trisha K"
];
const defaultAssignments = [
  {title:"Java OOP mini project",subject:"Java Programming",due:"2026-11-25",status:"Pending"},
  {title:"SQL query practice",subject:"DBMS",due:"2026-11-27",status:"Pending"},
  {title:"Binary tree worksheet",subject:"Data Structures",due:"2026-11-22",status:"Completed"},
  {title:"Software requirements notes",subject:"Software Engineering",due:"2026-11-29",status:"Pending"}
];
const defaultAnnouncements = [
  {title:"Internal assessment reminder",detail:"Please revise the topics discussed this week. Bring your record books to the next class.",date:"Today"},
  {title:"Project submission update",detail:"Project groups should keep their source code and README file ready for review.",date:"Yesterday"},
  {title:"Library resources available",detail:"New programming reference books are available in the department library.",date:"2 days ago"},
  {title:"Lab schedule",detail:"Check the weekly timetable before attending your lab session.",date:"3 days ago"}
];
const timetable = [
  ["08:00 – 09:00","Java","DBMS","DSA","Java","COA"],
  ["09:00 – 10:00","DSA","COA","Java","DBMS","DSA"],
  ["10:15 – 11:15","DBMS","Java Lab","COA","DSA","Software Engg."],
  ["11:15 – 12:15","COA","Java Lab","DBMS","Quant Skills","Java"],
  ["01:00 – 02:00","Software Engg.","DSA","Quant Skills","COA","DBMS"],
  ["02:00 – 03:00","Quant Skills","Software Engg.","Library","Java","Lab Session"]
];
const scheduleToday = [
  ["08:00 – 09:00","Java Programming","Classroom 204",""],
  ["09:00 – 10:00","Data Structures","Classroom 204","green-line"],
  ["10:15 – 11:15","Computer Organization","Lab 1","orange-line"],
  ["11:15 – 12:15","Database Management","Classroom 204",""],
  ["01:00 – 02:00","Software Engineering","Classroom 204","green-line"]
];

let attendance = JSON.parse(localStorage.getItem("scAttendance") || "null") ||
  students.map((name,i)=>({name,roll:"AI"+String(i+1).padStart(3,"0"),present:i<38}));
let assignments = JSON.parse(localStorage.getItem("scAssignments") || "null") || defaultAssignments;
let announcements = JSON.parse(localStorage.getItem("scAnnouncements") || "null") || defaultAnnouncements;
let modalMode = "announcement";

const $ = (id) => document.getElementById(id);
const save = () => {
  localStorage.setItem("scAttendance",JSON.stringify(attendance));
  localStorage.setItem("scAssignments",JSON.stringify(assignments));
  localStorage.setItem("scAnnouncements",JSON.stringify(announcements));
};
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const niceDate = (value) => value ? new Date(value+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "Not set";

function showToast(message){
  $("toast").textContent=message; $("toast").classList.add("show");
  setTimeout(()=>$("toast").classList.remove("show"),2300);
}
function updateDate(){
  const now=new Date();
  $("todayLabel").textContent=now.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
  $("attendanceDate").textContent=now.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
}
function renderStats(){
  const present=attendance.filter(s=>s.present).length;
  $("studentCount").textContent=attendance.length;
  $("presentCount").textContent=present;
  $("presentPercent").textContent=(present/attendance.length*100).toFixed(1)+"%";
  $("pendingCount").textContent=assignments.filter(a=>a.status==="Pending").length;
  $("announcementCount").textContent=announcements.length;
  $("attendancePresent").textContent=present;
  $("attendanceAbsent").textContent=attendance.length-present;
  $("attendanceRate").textContent=(present/attendance.length*100).toFixed(1)+"%";
}
function renderAttendance(){
  $("attendanceRows").innerHTML=attendance.map((s,i)=>`
    <tr><td>${escapeHTML(s.roll)}</td><td>${escapeHTML(s.name)}</td><td>
    <button class="attendance-toggle ${s.present?"present":"absent"}" data-attendance="${i}">${s.present?"✓ Present":"× Absent"}</button>
    </td></tr>`).join("");
  renderStats();
}
function renderAssignments(){
  const rows=assignments.map((a,i)=>`<tr><td>${escapeHTML(a.title)}</td><td>${escapeHTML(a.subject)}</td><td>${niceDate(a.due)}</td><td><span class="status ${a.status.toLowerCase()}">${a.status}</span></td><td><button class="small-action" data-toggle-task="${i}">${a.status==="Pending"?"Mark done":"Reopen"}</button></td></tr>`).join("");
  $("assignmentRows").innerHTML=rows;
  $("overviewAssignments").innerHTML=assignments.slice(0,3).map(a=>`<tr><td>${escapeHTML(a.title)}</td><td>${escapeHTML(a.subject)}</td><td>${niceDate(a.due)}</td><td><span class="status ${a.status.toLowerCase()}">${a.status}</span></td><td></td></tr>`).join("");
  $("assignmentTotal").textContent=assignments.length+" TASKS";
  renderStats();
}
function renderAnnouncements(){
  const html=announcements.map(a=>`<div class="announcement-item"><span class="announcement-dot"></span><div><strong>${escapeHTML(a.title)}</strong><p>${escapeHTML(a.detail||"")}</p><small>${escapeHTML(a.date||"Recently")}</small></div></div>`).join("");
  $("announcementList").innerHTML=html;
  $("allAnnouncements").innerHTML=html;
  renderStats();
}
function renderSchedule(){
  $("todaySchedule").innerHTML=scheduleToday.map((s,i)=>`<div class="schedule-item"><span class="schedule-time">${s[0]}</span><span class="schedule-color ${s[3]}"></span><div class="schedule-info"><strong>${s[1]}</strong><small>${s[2]}</small></div><span class="schedule-room">${i===0?"NEXT": "CLASS"}</span></div>`).join("");
  $("timetableRows").innerHTML=timetable.map(row=>`<tr>${row.map((cell,i)=>`<td>${escapeHTML(cell)}</td>`).join("")}</tr>`).join("");
}
function switchView(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  $(name+"View").classList.add("active");
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
  const titles={overview:["Overview","Good day, Class Admin ✦","Here's what's happening in your classroom today."],attendance:["Attendance","Attendance management","Record and review student attendance."],timetable:["Timetable","Weekly timetable","Plan lessons and keep the week organized."],assignments:["Assignments","Assignment tracker","Keep track of classwork and upcoming deadlines."],resources:["Resources","Classroom resources","Announcements and learning materials in one place."]};
  $("pageCrumb").textContent=titles[name][0]; $("pageTitle").textContent=titles[name][1]; $("pageSubtitle").textContent=titles[name][2];
  $("sidebar").classList.remove("open");
}
function openModal(mode){
  modalMode=mode; $("entryForm").reset(); $("modalBackdrop").classList.add("open"); $("modalBackdrop").setAttribute("aria-hidden","false");
  const isTask=mode==="assignment";
  $("modalEyebrow").textContent=isTask?"LEARNING TASK":"CLASSROOM UPDATE";
  $("modalTitle").textContent=isTask?"Add assignment":"Create announcement";
  $("assignmentFields").classList.toggle("hidden",!isTask);
  $("entryTitle").focus();
}
function closeModal(){ $("modalBackdrop").classList.remove("open"); $("modalBackdrop").setAttribute("aria-hidden","true"); }

document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.goto)));
$("mobileMenu").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("quickAddButton").addEventListener("click",()=>openModal("announcement"));
$("addAnnouncementButton").addEventListener("click",()=>openModal("announcement"));
$("addAssignmentButton").addEventListener("click",()=>openModal("assignment"));
$("closeModal").addEventListener("click",closeModal);
$("modalBackdrop").addEventListener("click",e=>{if(e.target===$("modalBackdrop"))closeModal();});
$("notificationButton").addEventListener("click",()=>showToast("You're all caught up!"));
$("resetAttendance").addEventListener("click",()=>{
  attendance=students.map((name,i)=>({name,roll:"AI"+String(i+1).padStart(3,"0"),present:i<38}));
  save();renderAttendance();showToast("Sample attendance restored.");
});
$("attendanceRows").addEventListener("click",e=>{
  const button=e.target.closest("[data-attendance]"); if(!button)return;
  const i=Number(button.dataset.attendance); attendance[i].present=!attendance[i].present;
  save();renderAttendance();
});
document.addEventListener("click",e=>{
  const button=e.target.closest("[data-toggle-task]"); if(!button)return;
  const i=Number(button.dataset.toggleTask); assignments[i].status=assignments[i].status==="Pending"?"Completed":"Pending";
  save();renderAssignments();showToast("Assignment status updated.");
});
$("entryForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title=$("entryTitle").value.trim(); const detail=$("entryDetail").value.trim();
  if(!title)return;
  if(modalMode==="assignment"){
    assignments.unshift({title,subject:$("entrySubject").value.trim()||"General",due:$("entryDue").value,status:"Pending"});
    renderAssignments();showToast("Assignment added.");
  }else{
    announcements.unshift({title,detail,date:"Just now"});
    renderAnnouncements();showToast("Announcement published.");
  }
  save();closeModal();
});
updateDate();renderSchedule();renderAttendance();renderAssignments();renderAnnouncements();
