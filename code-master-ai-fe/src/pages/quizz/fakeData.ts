export const quizData = [
  {
    id: 1,
    question: "ReactJS là gì?",
    type: "single",
    options: [
      "Framework backend",
      "Thư viện UI",
      "Ngôn ngữ lập trình",
    ],
    correct: [1],
  },
  {
    id: 2,
    question: "JSX là gì?",
    type: "single",
    options: [
      "HTML trong JS",
      "CSS nâng cao",
      "Database",
    ],
    correct: [0],
  },
  {
    id: 3,
    question: "Hook nào dùng để quản lý state?",
    type: "single",
    options: ["useEffect", "useState", "useRef"],
    correct: [1],
  },
  {
    id: 4,
    question: "Chọn các hook đúng",
    type: "multiple",
    options: ["useState", "useEffect", "useHTML", "useContext"],
    correct: [0, 1, 3],
  },
  {
    id: 5,
    question: "React dùng gì để tối ưu?",
    type: "single",
    options: ["DOM thật", "Virtual DOM", "SQL"],
    correct: [1],
  },
];