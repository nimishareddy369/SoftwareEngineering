# SmartClass – Smart Classroom System

A responsive front-end classroom management application built with **HTML, CSS and vanilla JavaScript**. It is designed as a student software-project demonstration.

## 1. Features

- Dashboard with student, attendance, pending-task and announcement summaries
- Attendance management: mark students present/absent
- Weekly timetable view
- Assignment tracker: add assignments and change their status
- Announcements: create and display classroom updates
- Learning resources section with sample resource entries
- Responsive layout for desktop, tablet and mobile
- Browser `localStorage` so changes remain after refreshing the page

## 2. Folder structure

```text
smart-classroom-system/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── assets/
    └── (keep images or icons you add here)
```

### What each file does

| File | Purpose |
|---|---|
| `index.html` | Page structure, navigation, dashboard sections, tables and modal form |
| `css/style.css` | Colors, layout, cards, tables, responsive design and modal styling |
| `js/app.js` | Sample data, navigation, attendance actions, assignments, announcements and local storage |
| `README.md` | Project overview and instructions |
| `assets/` | Optional folder for images, logos or other static assets |

## 3. How to run in VS Code

1. Extract the ZIP file.
2. Open the `smart-classroom-system` folder in Visual Studio Code.
3. Open `index.html`.
4. Run it using the **Live Server** extension (right-click `index.html` → **Open with Live Server**).
5. You can also open `index.html` directly in a browser, but Live Server is recommended.

No npm installation, database or build step is required for this demo.

## 4. How to use

- Use the left navigation to open Overview, Attendance, Timetable, Assignments and Resources.
- In Attendance, click a student's status to switch between Present and Absent.
- In Assignments, use **Add assignment** to create a task. Use the action button to mark it done or reopen it.
- Use **Quick announcement** or **New update** to publish an announcement.
- Refresh the page: data is stored in the current browser using `localStorage`.

## 5. Technologies used

- HTML5 – semantic page structure
- CSS3 – styling, grid/flex layouts and responsive design
- JavaScript (ES6) – UI interactions and application logic
- Web Storage API (`localStorage`) – browser-side persistence

## 6. Important project scope / limitations

This version is a **front-end prototype**. It uses sample students and sample timetable entries. Data is stored only in the browser where the app is opened.

It does **not** currently include:
- A real server or shared database
- Real student/teacher accounts or secure login
- Live classroom hardware, IoT sensors or automated face recognition
- Cross-device synchronization

Do not describe those features as implemented. They can be proposed as future enhancements.

## 7. Suggested future enhancements

1. Add a backend using Java Spring Boot, Node.js or Python Flask.
2. Connect a database such as MySQL to store students, users, attendance and assignments.
3. Add role-based login for Admin, Teacher and Student.
4. Allow teachers to upload notes and students to download them.
5. Add email or in-app reminders for assignment deadlines.
6. Add attendance reports with date filters and CSV export.
7. Add classroom IoT integrations, such as sensor-based room monitoring, as a separate future module.

## 8. Suggested project description

**SmartClass – Smart Classroom System** is a web-based classroom management prototype developed using HTML, CSS and JavaScript. The application provides a centralized dashboard for viewing classroom information, recording student attendance, checking a weekly timetable, tracking assignments and publishing announcements. The prototype uses browser local storage to retain user changes and demonstrates how common classroom activities can be organized through a simple, responsive interface.

## 9. Before submission

- Replace the sample class name, section, student list and timetable with details approved by your faculty.
- Test every navigation item and button.
- Take screenshots of the dashboard, attendance, timetable and assignments pages.
- Be ready to explain that this is a front-end prototype and describe the future backend/database plan.
- Add your name, roll number, department and guide details to your report if your faculty requires them.
