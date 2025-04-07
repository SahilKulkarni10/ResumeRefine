import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
        />
        <path d="M20 5L20 12M20 12L24 8M20 12L16 8M30 35H10C7.23858 35 5 32.7614 5 30V10C5 7.23858 7.23858 5 10 5H30C32.7614 5 35 7.23858 35 10V30C35 32.7614 32.7614 35 30 35Z" />
      </svg>
    ),
    title: "Resume Upload",
    paragraph:
      "Users can upload resumes in PDF or CSV format for skill filtration.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M27 30C33.0751 30 38 25.0751 38 19C38 12.9249 33.0751 8 27 8C20.9249 8 16 12.9249 16 19C16 25.0751 20.9249 30 27 30Z"
        />
        <path d="M37 37L30 30M15 8L7 16M7 8L15 16M27 15V23M23 19H31M5 32H15C16.1046 32 17 31.1046 17 30V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V30C3 31.1046 3.89543 32 5 32Z" />
      </svg>
    ),
    title: "Skill Search:",
    paragraph:
      "Search for specific skills in uploaded resumes and view relevant results.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M30 33L24 27H10C8.89543 27 8 26.1046 8 25V10C8 8.89543 8.89543 8 10 8H30C31.1046 8 32 8.89543 32 10V25C32 26.1046 31.1046 27 30 27V33Z"
        />
        <path d="M14 14L12 16L14 18M26 14L28 16L26 18M20 14L18 20M10 33H30C31.1046 33 32 32.1046 32 31V35C32 36.1046 31.1046 37 30 37H10C8.89543 37 8 36.1046 8 35V31C8 32.1046 8.89543 33 10 33Z" />
      </svg>
    ),
    title: "Real-Time Feedback:",
    paragraph:
      "Get immediate feedback on skill frequency and relevance in resumes..",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M5 10H35V30C35 31.1046 34.1046 32 33 32H7C5.89543 32 5 31.1046 5 30V10Z"
        />
        <path d="M5 8C5 6.89543 5.89543 6 7 6H33C34.1046 6 35 6.89543 35 8V10H5V8ZM10 16H30M10 21H25M10 26H20M3 14L8 19L3 24" />
      </svg>
    ),
    title: "Resume Results Page",
    paragraph:
      "Filter, sort, and paginate resumes based on skills or keywords.",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M10 5H30V35H10V5Z"
        />
        <path d="M30 5H10C8.89543 5 8 5.89543 8 7V33C8 34.1046 8.89543 35 10 35H30C31.1046 35 32 34.1046 32 33V7C32 5.89543 31.1046 5 30 5Z" />
        <path d="M16 20L19 23L26 16M14 10H26M14 14H22M14 28H26M14 32H22" />
      </svg>
    ),
    title: "Resume Score System",
    paragraph:
      "Evaluate resumes based on skill relevance using an ATS-like scoring system.",
      
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M8 5H32V35H8V5Z"
        />
        <path d="M32 5H8C6.89543 5 6 5.89543 6 7V33C6 34.1046 6.89543 35 8 35H32C33.1046 35 34 34.1046 34 33V7C34 5.89543 33.1046 5 32 5Z" />
        <path d="M14 10H26M14 14H26M14 18H22M17 23H27C28.1046 23 29 23.8954 29 25V29C29 30.1046 28.1046 31 27 31H17C15.8954 31 15 30.1046 15 29V25C15 23.8954 15.8954 23 17 23Z" />
      </svg>
    ),
    title: "Skill Highlighting",
    paragraph:
      "Displays the searched skills prominently within the resume text",
  },
];
export default featuresData;
