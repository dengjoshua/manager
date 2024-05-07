export const projects = [
  {
    project_id: "87144a64-4d2a-4373-b9dc-c2635edc6ea7",
    name: "todo-app",
    description:
      "This app helps users manage and control their todos and finish them on time.",
    finish: false,
    date_start: "2024-04-28T00:00:00",
    date_end: "2024-05-10T00:00:00",
    priority: "urgent",
    assignees: [
      {
        name: "John Doe",
        duty: "Frontend Developer",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        avatar: "https://example.com/avatar1.jpg",
      },
      {
        name: "Jane Smith",
        duty: "Full Stack Developer",
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Node.js",
          "Express",
          "MongoDB",
        ],
        avatar: "https://example.com/avatar2.jpg",
      },
      {
        name: "Peter Jacob",
        duty: "Web Developer",
        skills: ["JavaScript", "Node.js", "Express"],
        avatar: "https://example.com/avatar3.jpg",
      },
    ],
    tags: [
      { name: "frontend", color: "bg-blue-200" },
      { name: "backend", color: "bg-green-200" },
      { name: "api", color: "bg-teal-200" },
    ],
    tasks: [
      {
        task_id: "2c3dfad0-b763-42fa-940f-e1995b041950",
        name: "Project Initialization",
        description:
          "Set up the project using create-react-app or Vite and install necessary dependencies such as react-router-dom for routing, Firebase or other backend service for user authentication and data storage.",
        finished: false,
        date: "2024-05-24T00:00:00",
        time: "7:30 - 9:30 AM",
        tag: { name: "backend", color: "bg-green-200" },
        assignees: [
          {
            name: "John Doe",
            duty: "Frontend Developer",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            avatar: "https://example.com/avatar1.jpg",
          },
          {
            name: "Peter Jacob",
            duty: "Web Developer",
            skills: ["JavaScript", "Node.js", "Express"],
            avatar: "https://example.com/avatar3.jpg",
          },
        ],
      },
      {
        task_id: "1c2d3a4b-5e6f-78g9-1011-12131415161h",
        name: "User Sign-Up and Authentication",
        description:
          "Implement user registration and login functionality using Firebase authentication or another authentication service, and test to ensure that registration and login are working.",
        finished: true,
        date: "2024-05-22T00:00:00",
        time: "7:30 - 9:30 AM",
        tag: { name: "backend", color: "bg-green-200" },
        assignees: [
          {
            name: "Peter Jacob",
            duty: "Web Developer",
            skills: ["JavaScript", "Node.js", "Express"],
            avatar: "https://example.com/avatar3.jpg",
          },
        ],
      },
      {
        task_id: "1i2j3k4l-5m6n-7o8p-9101-1q2r3s4t5u6v",
        name: "Implement Main Layout",
        description:
          "Create the Main layout of the application, including Navbar and routing setup.",
        finished: false,
        date: "2024-05-02T00:00:00",
        time: "7:30 - 9:30 AM",
        tag: { name: "frontend", color: "bg-blue-200" },
        assignees: [
          {
            name: "John Doe",
            duty: "Frontend Developer",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            avatar: "https://example.com/avatar1.jpg",
          },
        ],
      },
      {
        task_id: "2x3y4z-5a6b-7c8d-9e0f-1g2h3i4j5k6l",
        name: "Implement ToDo List Display",
        description:
          "Implement the main Todo list display, and ensure that it correctly fetches and displays data from the backend server.",
        finished: false,
        date: "2024-05-05T00:00:00",
        time: "8:00 - 8:30 AM",
        tag: { name: "frontend", color: "bg-blue-200" },
        assignees: [
          {
            name: "John Doe",
            duty: "Frontend Developer",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            avatar: "https://example.com/avatar1.jpg",
          },
        ],
      },
      {
        task_id: "1m2n3o-4p5q-6r7s-8t9u-0v1w2x3y4z5a",
        name: "Implement Adding New ToDos",
        description:
          "Implement functionality to add new tasks to the Todo list and save them to the backend server.",
        finished: true,
        date: "2024-05-06T00:00:00",
        time: "9:30 - 10:30 AM",
        tag: { name: "backend", color: "bg-green-200" },
        assignees: [
          {
            name: "Peter Jacob",
            duty: "Web Developer",
            skills: ["JavaScript", "Node.js", "Express"],
            avatar: "https://example.com/avatar3.jpg",
          },
        ],
      },
      {
        task_id: "1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
        name: "Implement Updating and Deleting ToDos",
        description:
          "Implement functionality to update and delete existing tasks on the ToDo list, and make sure changes reflect on the backend server.",
        finished: false,
        date: "2024-04-28T00:00:00",
        time: "8:00 - 9:00 AM",
        tag: { name: "backend", color: "bg-green-200" },
        assignees: [
          {
            name: "Jane Smith",
            duty: "Full Stack Developer",
            skills: [
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
            ],
            avatar: "https://example.com/avatar2.jpg",
          },
        ],
      },
    ],
  },
];
