// import { useState, useEffect, useRef } from "react";
// import Editor from "@monaco-editor/react";
// import { useParams, useNavigate } from "react-router-dom";

// // 🚨 ĐÃ THÊM: Import axiosInstance để tự động lo vụ Cookie
// import { axiosInstance } from "../../utils/axios"; 

// // =============================================
// // TYPES
// // =============================================
// interface SubmissionResult {
//   message: string;
//   submission: {
//     _id: string;
//     user_id: string;
//     assignment_id: string;
//     language: string;
//     code: string;
//     status: string;
//     score: number;
//     ai_hint: string | null;
//   };
//   passedCases: number;
//   totalCases: number;
//   compileError: string | null;
// }

// interface ExerciseData {
//   _id: string;
//   title: string;
//   difficulty: "Dễ" | "Trung bình" | "Khó";
//   description: string;
//   requirements: string[];
//   examples: { input: string; output: string }[];
//   note?: string;
//   default_code?: Record<string, string>;
// }

// // =============================================
// // LANGUAGE CONFIG
// // =============================================
// const LANGUAGES = [
//   { value: "javascript", label: "JavaScript", monaco: "javascript" },
//   { value: "typescript", label: "TypeScript", monaco: "typescript" },
//   { value: "python", label: "Python", monaco: "python" },
//   { value: "java", label: "Java", monaco: "java" },
//   { value: "cpp", label: "C++", monaco: "cpp" },
// ];

// const DEFAULT_CODES: Record<string, string> = {
//   javascript: `import React from 'react';\n\nfunction Greeting({ name = 'Khách' }) {\n  return (\n    <h1>Xin chào, {name}!</h1>\n  );\n}\n\nexport default Greeting;`,
//   typescript: `import React from 'react';\n\ninterface Props {\n  name?: string;\n}\n\nconst Greeting: React.FC<Props> = ({ name = 'Khách' }) => {\n  return <h1>Xin chào, {name}!</h1>;\n};\n\nexport default Greeting;`,
//   python: `def greeting(name="Khách"):\n    return f"Xin chào, {name}!"\n\nif __name__ == "__main__":\n    print(greeting("An"))`,
//   java: `public class Solution {\n    public static String greeting(String name) {\n        if (name == null || name.isEmpty()) name = "Khách";\n        return "Xin chào, " + name + "!";\n    }\n}`,
//   cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring greeting(string name = "Khách") {\n    return "Xin chào, " + name + "!";\n}\n\nint main() {\n    cout << greeting("An") << endl;\n    return 0;\n}`,
// };

// // =============================================
// // DIFFICULTY BADGE CONFIG
// // =============================================
// const DIFFICULTY_STYLE: Record<string, string> = {
//   "Dễ": "bg-emerald-900/60 text-emerald-400 border border-emerald-700/50",
//   "Trung bình": "bg-yellow-900/60 text-yellow-400 border border-yellow-700/50",
//   "Khó": "bg-red-900/60 text-red-400 border border-red-700/50",
// };

// const STATUS_STYLE: Record<string, string> = {
//   ACCEPTED: "bg-emerald-900/60 text-emerald-400 border border-emerald-700/50",
//   COMPILATION_ERROR: "bg-yellow-900/60 text-yellow-400 border border-yellow-700/50",
//   WRONG_ANSWER: "bg-red-900/60 text-red-400 border border-red-700/50",
//   TIME_LIMIT_EXCEEDED: "bg-orange-900/60 text-orange-400 border border-orange-700/50",
//   RUNTIME_ERROR: "bg-red-900/60 text-red-400 border border-red-700/50",
// };

// // =============================================
// // MAIN COMPONENT
// // =============================================
// export default function ExercisePage() {
//   const { assignmentId } = useParams<{ assignmentId: string }>();
//   const navigate = useNavigate();

//   const [exercise, setExercise] = useState<ExerciseData | null>(null);
//   const [loadingExercise, setLoadingExercise] = useState(true);

//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState(DEFAULT_CODES.javascript);

//   const [activeTab, setActiveTab] = useState<"console" | "result">("console");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [consoleOutput, setConsoleOutput] = useState('Nhấn "Nộp bài" để chạy và chấm bài...');
//   const [result, setResult] = useState<SubmissionResult | null>(null);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const editorRef = useRef<any>(null);

//   // =============================================
//   // FETCH ĐỀ BÀI 
//   // =============================================
//   useEffect(() => {
//     if (!assignmentId) return;

//     const fetchExercise = async () => {
//       try {
//         const res = await axiosInstance.get(`/code-assignments/65e000000000000000000001`);
        
//         const data: ExerciseData = res.data;
//         setExercise(data);
        
//         if (data.default_code?.[language]) {
//           setCode(data.default_code[language]);
//         }
//       } catch (error) {
//         console.error("Lỗi lấy đề bài:", error);
//       } finally {
//         setLoadingExercise(false);
//       }
//     };

//     fetchExercise();
//   }, [assignmentId]);

// //   useEffect(() => {
// //     if (exercise?.default_code?.[language]) {
// //       setCode(exercise.default_code[language]);
// //     } else {
// //       setCode(DEFAULT_CODES[language] || "// Nhập code của bạn tại đây");
// //     }
// //   }, [language]);

//   // =============================================
//   // HANDLERS
//   // =============================================
//   const handleEditorDidMount = (editor: any) => {
//     editorRef.current = editor;
//   };

//   const handleReset = () => {
//     if (exercise?.default_code?.[language]) {
//       setCode(exercise.default_code[language]);
//     } else {
//       setCode(DEFAULT_CODES[language] || "");
//     }
//   };

//   const handleSubmit = async () => {
//     const sourceCode = code.trim();
//     if (!sourceCode) {
//       setConsoleOutput("Vui lòng nhập code trước khi nộp bài.");
//       setActiveTab("console");
//       return;
//     }

//     setIsSubmitting(true);
//     setIsSuccess(false);
//     setResult(null);
//     setActiveTab("console");

//     const ts = new Date().toLocaleTimeString();
//     setConsoleOutput(`[${ts}] Đang biên dịch và chạy test cases...`);

//     try {
//      const testAssignmentId = "65e000000000000000000001";
//       const res = await axiosInstance.post('/submissions/submit', {
//         assignmentId:testAssignmentId,
//         language,
//         sourceCode,
//       });

//       const data: SubmissionResult = res.data;
//       const ts2 = new Date().toLocaleTimeString();

//       if (data.compileError) {
//         setConsoleOutput(`[${ts2}] Biên dịch thất bại.\n\nLỗi biên dịch:\n${data.compileError}`);
//       } else {
//         setConsoleOutput(`[${ts2}] Biên dịch thành công.\n✓ Passed ${data.passedCases}/${data.totalCases} test cases.`);
//       }

//       setResult(data);
//       setActiveTab("result");

//       if (data.submission?.status === "ACCEPTED") {
//         setIsSuccess(true);
//       }
//     } catch (err: any) {
//       // Axios trả về lỗi trong err.response
//       if (err.response?.status === 401) {
//         // Interceptor thường tự xử lý vụ đá về login, nhưng ta cứ in ra đây cho chắc
//         setConsoleOutput("Phiên đăng nhập hết hạn. Hệ thống đang chuyển hướng...");
//       } else {
//         setConsoleOutput(
//           `Lỗi từ server: ${err.response?.data?.message || err.message}`
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const pct = result && result.totalCases > 0
//       ? Math.round((result.passedCases / result.totalCases) * 100)
//       : 0;

//   const title = exercise?.title ?? "Xây dựng Component Greeting";
//   const difficulty = exercise?.difficulty ?? "Dễ";

//   // =============================================
//   // RENDER (Phần giao diện giữ nguyên 100%)
//   // =============================================
//   return (
//     <div className="flex h-screen bg-[#0d1117] text-sm overflow-hidden select-none">
//       {/* ===== LEFT PANEL: ĐỀ BÀI ===== */}
//       <div className="w-[38%] min-w-[300px] border-r border-gray-800 flex flex-col overflow-hidden">
//         <div className="px-4 py-3 border-b border-gray-800 bg-[#161b22] flex items-start gap-2 flex-shrink-0">
//           <div className="flex-1 min-w-0">
//             <h1 className="text-sm font-semibold text-white leading-snug">{title}</h1>
//             <div className="flex items-center gap-2 mt-1.5">
//               <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLE[difficulty]}`}>
//                 {difficulty}
//               </span>
//               <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-blue-900/60 text-blue-400 border border-blue-700/50">
//                 Daily
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117]">
//           {loadingExercise ? (
//             <div className="space-y-2">
//               {[80, 60, 90, 50].map((w, i) => (
//                 <div key={i} className={`h-3 bg-gray-800 rounded animate-pulse`} style={{ width: `${w}%` }} />
//               ))}
//             </div>
//           ) : (
//             <>
//               <p className="text-gray-400 text-xs leading-relaxed">
//                 {exercise?.description ?? `Trong bài tập này, bạn sẽ tạo một functional component đơn giản có tên là `}
//                 {!exercise?.description && (
//                   <>
//                     <code className="bg-gray-800 px-1 py-0.5 rounded text-emerald-400 font-mono">Greeting</code>
//                     {". Component này nhận prop "}
//                     <code className="bg-gray-800 px-1 py-0.5 rounded text-emerald-400 font-mono">name</code>
//                     {" và hiển thị lời chào tương ứng."}
//                   </>
//                 )}
//               </p>

//               <div>
//                 <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Yêu cầu</h3>
//                 <ul className="space-y-1.5">
//                   {(exercise?.requirements ?? [
//                     "Component phải được đặt tên là Greeting",
//                     "Sử dụng cấu trúc Functional Component của React",
//                     'Hiển thị "Xin chào, [name]!" bên trong thẻ h1',
//                     'Nếu không có prop name, mặc định hiển thị "Khách"',
//                   ]).map((req, i) => (
//                     <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
//                       <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
//                       <span>{req}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Ví dụ</h3>
//                 <div className="space-y-2">
//                   {(exercise?.examples ?? [
//                     { input: '<Greeting name="An" />', output: "<h1>Xin chào, An!</h1>" },
//                     { input: "<Greeting />", output: "<h1>Xin chào, Khách!</h1>" },
//                   ]).map((ex, i) => (
//                     <div key={i} className="bg-[#161b22] border border-gray-800 rounded-lg p-3 font-mono text-xs space-y-1">
//                       <div className="text-blue-400">{ex.input}</div>
//                       <div className="text-gray-500">→ {ex.output}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {(exercise?.note || true) && (
//                 <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-lg p-3">
//                   <p className="text-xs text-yellow-500/80">
//                     {exercise?.note ?? "Phải sử dụng cú pháp JSX hợp lệ. Không được dùng class component."}
//                   </p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* ===== RIGHT PANEL: EDITOR + OUTPUT ===== */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 bg-[#161b22] flex-shrink-0">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="text-xs px-2.5 py-1.5 rounded-md border border-gray-700 bg-[#0d1117] text-gray-300 cursor-pointer focus:outline-none focus:border-gray-500 hover:border-gray-600 transition-colors"
//           >
//             {LANGUAGES.map((l) => (
//               <option key={l.value} value={l.value}>{l.label}</option>
//             ))}
//           </select>
//           <div className="flex-1" />
//           <button
//             onClick={handleReset}
//             className="text-xs px-3 py-1.5 rounded-md border border-gray-700 bg-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-colors"
//           >
//             Đặt lại
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="text-xs px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center gap-1.5 min-w-[90px] justify-center"
//           >
//             {isSubmitting ? (
//               <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang chấm...</>
//             ) : ("Nộp bài")}
//           </button>
//         </div>

//         <div className="flex-1 min-h-0">
//           <Editor
//             height="100%"
//             language={LANGUAGES.find((l) => l.value === language)?.monaco ?? "javascript"}
//             value={code}
//             onChange={(val) => setCode(val || "")}
//             onMount={handleEditorDidMount}
//             theme="vs-dark"
//             options={{
//               fontSize: 13,
//               fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
//               fontLigatures: true,
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               lineNumbers: "on",
//               lineNumbersMinChars: 3,
//               renderLineHighlight: "line",
//               padding: { top: 14, bottom: 14 },
//               automaticLayout: true,
//               tabSize: 2,
//               wordWrap: "on",
//               smoothScrolling: true,
//               cursorBlinking: "smooth",
//               cursorSmoothCaretAnimation: "on",
//               formatOnPaste: true,
//               bracketPairColorization: { enabled: true },
//               suggest: { showKeywords: true },
//               quickSuggestions: true,
//             }}
//           />
//         </div>

//         <div className="h-52 border-t border-gray-800 flex flex-col flex-shrink-0 bg-[#0d1117]">
//           <div className="flex bg-[#161b22] border-b border-gray-800 flex-shrink-0">
//             {(["console", "result"] as const).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`text-xs px-4 py-2.5 border-b-2 transition-colors font-medium ${
//                   activeTab === tab ? "border-emerald-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"
//                 }`}
//               >
//                 {tab === "console" ? "Console output" : "Kết quả"}
//                 {tab === "result" && result && (
//                   <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
//                     result.submission?.status === "ACCEPTED" ? "bg-emerald-900/60 text-emerald-400" : "bg-red-900/60 text-red-400"
//                   }`}>
//                     {result.submission?.status === "ACCEPTED" ? "AC" : "WA"}
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>

//           {activeTab === "console" && (
//             <div className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
//               <span className={
//                 consoleOutput.includes("Lỗi") || consoleOutput.includes("thất bại")
//                   ? "text-red-400"
//                   : consoleOutput.includes("thành công") || consoleOutput.includes("Passed")
//                   ? "text-emerald-400"
//                   : consoleOutput.includes("Đang")
//                   ? "text-blue-400"
//                   : "text-gray-500"
//               }>
//                 {consoleOutput}
//               </span>
//             </div>
//           )}

//           {activeTab === "result" && (
//             <div className="flex-1 overflow-y-auto p-3 text-xs">
//               {!result ? (
//                 <span className="text-gray-600">Chưa có kết quả.</span>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-400">Trạng thái:</span>
//                       <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
//                         STATUS_STYLE[result.submission?.status] ?? "bg-gray-800 text-gray-400"
//                       }`}>
//                         {result.submission?.status?.replace(/_/g, " ")}
//                       </span>
//                     </div>
//                     <span className="text-gray-400">
//                       Điểm: <span className="text-white font-semibold text-sm">{result.submission?.score?.toFixed(1)}<span className="text-gray-500 text-xs font-normal">/10</span></span>
//                     </span>
//                   </div>

//                   <div>
//                     <div className="flex justify-between text-gray-500 mb-1.5">
//                       <span>Test cases</span>
//                       <span className="text-gray-400">
//                         <span className="text-white font-medium">{result.passedCases}</span>
//                         /{result.totalCases} ({pct}%)
//                       </span>
//                     </div>
//                     <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
//                       <div
//                         className={`h-full rounded-full transition-all duration-700 ${
//                           pct === 100 ? "bg-emerald-500" : pct > 50 ? "bg-yellow-500" : "bg-red-500"
//                         }`}
//                         style={{ width: `${pct}%` }}
//                       />
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-800 pt-2.5 grid grid-cols-2 gap-1">
//                     {Array.from({ length: result.totalCases }).map((_, i) => {
//                       const passed = i < result.passedCases;
//                       return (
//                         <div key={i} className="flex items-center gap-1.5">
//                           <span className={`w-2 h-2 rounded-full flex-shrink-0 ${passed ? "bg-emerald-500" : "bg-red-500"}`} />
//                           <span className="text-gray-400">
//                             Test #{i + 1}: <span className={passed ? "text-emerald-400" : "text-red-400"}>{passed ? "Passed" : "Failed"}</span>
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {isSuccess && (
//           <div className="flex items-center gap-3 px-4 py-2.5 border-t border-emerald-900/50 bg-emerald-900/20 flex-shrink-0">
//             <span className="text-xs text-emerald-400 flex-1 font-medium">
//               ✓ Tuyệt vời! Bạn đã hoàn thành bài tập này.
//             </span>
//             <button
//               onClick={() => navigate(-1)}
//               className="text-xs px-4 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-semibold transition-colors"
//             >
//               Bài tập tiếp theo →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios"; 


//Kết hợp cả cũ và thêm AiTutorResult
interface SubmissionResult {
  message: string;
  submission: {
    _id: string;
    user_id: string;
    assignment_id: string;
    language: string;
    code: string;
    status: string;
    score: number;
    ai_hint: string | null;
  };
  passedCases: number;
  totalCases: number;
  compileError: string | null;
}

interface AiTutorResult {
  ai_hint: string;
  message: string;
}

interface ExerciseData {
  _id: string;
  title: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  description: string;
  requirements: string[];
  examples: { input: string; output: string }[];
  note?: string;
  default_code?: Record<string, string>;
}


// Giữ nguyên từ code cũ

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", monaco: "javascript" },
  { value: "typescript", label: "TypeScript", monaco: "typescript" },
  { value: "python", label: "Python", monaco: "python" },
  { value: "java", label: "Java", monaco: "java" },
  { value: "cpp", label: "C++", monaco: "cpp" },
];

const DEFAULT_CODES: Record<string, string> = {
  javascript: `import React from 'react';\n\nfunction Greeting({ name = 'Khách' }) {\n  return (\n    <h1>Xin chào, {name}!</h1>\n  );\n}\n\nexport default Greeting;`,
  typescript: `import React from 'react';\n\ninterface Props {\n  name?: string;\n}\n\nconst Greeting: React.FC<Props> = ({ name = 'Khách' }) => {\n  return <h1>Xin chào, {name}!</h1>;\n};\n\nexport default Greeting;`,
  python: `def greeting(name="Khách"):\n    return f"Xin chào, {name}!"\n\nif __name__ == "__main__":\n    print(greeting("An"))`,
  java: `public class Solution {\n    public static String greeting(String name) {\n        if (name == null || name.isEmpty()) name = "Khách";\n        return "Xin chào, " + name + "!";\n    }\n}`,
  cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring greeting(string name = "Khách") {\n    return "Xin chào, " + name + "!";\n}\n\nint main() {\n    cout << greeting("An") << endl;\n    return 0;\n}`,
};

const DIFFICULTY_STYLE: Record<string, string> = {
  "Dễ": "bg-emerald-900/60 text-emerald-400 border border-emerald-700/50",
  "Trung bình": "bg-yellow-900/60 text-yellow-400 border border-yellow-700/50",
  "Khó": "bg-red-900/60 text-red-400 border border-red-700/50",
};

const STATUS_STYLE: Record<string, string> = {
  ACCEPTED: "bg-emerald-900/60 text-emerald-400 border border-emerald-700/50",
  COMPILATION_ERROR: "bg-yellow-900/60 text-yellow-400 border border-yellow-700/50",
  WRONG_ANSWER: "bg-red-900/60 text-red-400 border border-red-700/50",
  TIME_LIMIT_EXCEEDED: "bg-orange-900/60 text-orange-400 border border-orange-700/50",
  RUNTIME_ERROR: "bg-red-900/60 text-red-400 border border-red-700/50",
};


//  AI TUTOR MODAL (Từ code mới)

function AiTutorModal({ isOpen, onClose, aiHint, isLoading }: { isOpen: boolean; onClose: () => void; aiHint: string | null; isLoading: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg mx-4 bg-[#161b22] border border-gray-700 rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-violet-900/60 border border-violet-700/50 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Gia Sư AI</h2>
            <p className="text-[11px] text-gray-500">Phân tích lỗi và gợi ý cải thiện</p>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-600 hover:text-gray-300 transition-colors p-1 rounded">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="p-5 max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-xs text-gray-300 leading-relaxed">
          {isLoading ? (
            <div className="space-y-3">
               <div className="flex items-center gap-2 mb-4">
                 <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                 <span className="text-xs text-violet-400">Gia sư AI đang phân tích code của bạn...</span>
               </div>
               {[100, 85, 92, 70].map((w, i) => <div key={i} className="h-2.5 bg-gray-800 rounded animate-pulse" style={{ width: `${w}%` }} />)}
            </div>
          ) : aiHint ? aiHint : <p className="text-gray-500">Không có gợi ý.</p>}
        </div>
        {!isLoading && (
          <div className="px-5 py-3 border-t border-gray-800 flex justify-end">
            <button onClick={onClose} className="text-xs px-4 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700">Đóng</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExercisePage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [loadingExercise, setLoadingExercise] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODES.javascript);
  const [activeTab, setActiveTab] = useState<"console" | "result">("console");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('Nhấn "Nộp bài" để chạy và chấm bài...');
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const editorRef = useRef<any>(null);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);

  useEffect(() => {
    if (!assignmentId) return;
    const fetchExercise = async () => {
      try {
        // Code cũ của bạn đang fix cứng ID hoặc dùng assignmentId, mình giữ logic axiosInstance
        const res = await axiosInstance.get(`/code-assignments/65e000000000000000000001`);
        const data: ExerciseData = res.data;
        setExercise(data);
        if (data.default_code?.[language]) setCode(data.default_code[language]);
      } catch (error) {
        console.error("Lỗi lấy đề bài:", error);
      } finally {
        setLoadingExercise(false);
      }
    };
    fetchExercise();
  }, [assignmentId]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleReset = () => {
    if (exercise?.default_code?.[language]) {
      setCode(exercise.default_code[language]);
    } else {
      setCode(DEFAULT_CODES[language] || "");
    }
  };

  const handleSubmit = async () => {
    const sourceCode = code.trim();
    if (!sourceCode) {
      setConsoleOutput("Vui lòng nhập code trước khi nộp bài.");
      setActiveTab("console");
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setResult(null);
    setAiHint(null); // Reset gợi ý AI mỗi lần nộp mới
    setActiveTab("console");
    const ts = new Date().toLocaleTimeString();
    setConsoleOutput(`[${ts}] Đang biên dịch và chạy test cases...`);

    try {
      const testAssignmentId = "65e000000000000000000001";
      const res = await axiosInstance.post('/submissions/submit', {
        assignmentId: testAssignmentId,
        language,
        sourceCode,
      });

      const data: SubmissionResult = res.data;
      const ts2 = new Date().toLocaleTimeString();

      if (data.compileError) {
        setConsoleOutput(`[${ts2}] Biên dịch thất bại.\n\nLỗi biên dịch:\n${data.compileError}`);
      } else {
        setConsoleOutput(`[${ts2}] Biên dịch thành công.\n✓ Passed ${data.passedCases}/${data.totalCases} test cases.`);
      }

      setResult(data);
      setActiveTab("result");
      
      // Nếu server trả về hint sẵn trong result thì lưu lại
      if (data.submission?.ai_hint) setAiHint(data.submission.ai_hint);
      if (data.submission?.status === "ACCEPTED") setIsSuccess(true);

    } catch (err: any) {
      setConsoleOutput(`Lỗi từ server: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler hỏi AI 
  const handleAskAiTutor = async () => {
    if (!result?.submission?._id) return;
    setIsAiModalOpen(true);
    if (aiHint) return; // Nếu đã có hint thì không gọi API nữa

    setIsAiLoading(true);
    try {
      const res = await axiosInstance.post(`/submissions/${result.submission._id}/ask-ai-tutor`);
      const data: AiTutorResult = res.data;
      setAiHint(data.ai_hint);
    } catch (err: any) {
      setAiHint(`Lỗi kết nối: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const pct = result && result.totalCases > 0 ? Math.round((result.passedCases / result.totalCases) * 100) : 0;
  const showAiTutorBtn = result !== null && result.submission?.status !== "ACCEPTED";

  return (
    <>
      <AiTutorModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} aiHint={aiHint} isLoading={isAiLoading} />

      <div className="flex h-screen bg-[#0d1117] text-sm overflow-hidden select-none">
        {/* LEFT PANEL (Giữ nguyên code cũ) */}
        <div className="w-[38%] min-w-[300px] border-r border-gray-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 bg-[#161b22] flex items-start gap-2 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-white leading-snug">{exercise?.title ?? "Xây dựng Component Greeting"}</h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLE[exercise?.difficulty || "Dễ"]}`}>
                  {exercise?.difficulty || "Dễ"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117]">
            {loadingExercise ? (
              <div className="space-y-2">
                {[80, 60, 90, 50].map((w, i) => <div key={i} className="h-3 bg-gray-800 rounded animate-pulse" style={{ width: `${w}%` }} />)}
              </div>
            ) : (
              <div className="text-gray-400 text-xs leading-relaxed">
                {exercise?.description || "Mô tả bài tập đang được cập nhật..."}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (Editor + Output) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 bg-[#161b22]">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs px-2.5 py-1.5 rounded-md border border-gray-700 bg-[#0d1117] text-gray-300">
              {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <div className="flex-1" />
            <button onClick={handleReset} className="text-xs px-3 py-1.5 text-gray-400 hover:text-gray-200">Đặt lại</button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="text-xs px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold disabled:opacity-50">
              {isSubmitting ? "Đang chấm..." : "Nộp bài"}
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={LANGUAGES.find((l) => l.value === language)?.monaco ?? "javascript"}
              value={code}
              onChange={(val) => setCode(val || "")}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{ fontSize: 13, minimap: { enabled: false }, automaticLayout: true, tabSize: 2 }}
            />
          </div>

          <div className="h-52 border-t border-gray-800 flex flex-col bg-[#0d1117]">
            <div className="flex bg-[#161b22] border-b border-gray-800 items-center">
              {(["console", "result"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-xs px-4 py-2.5 border-b-2 transition-colors ${activeTab === tab ? "border-emerald-500 text-white" : "border-transparent text-gray-500"}`}>
                  {tab === "console" ? "Console output" : "Kết quả"}
                </button>
              ))}
              
              <div className="flex-1" />

              {/* Nút Hỏi Gia Sư AI */}
              {showAiTutorBtn && (
                <button onClick={handleAskAiTutor} className="flex items-center gap-1.5 text-xs px-3 py-1.5 mr-2 rounded-md bg-violet-900/40 hover:bg-violet-800/60 border border-violet-700/50 text-violet-300 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Hỏi Gia Sư AI
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
              {activeTab === "console" ? (
                <div className={consoleOutput.includes("Lỗi") ? "text-red-400" : "text-emerald-400 whitespace-pre-wrap"}>{consoleOutput}</div>
              ) : (
                <div className="space-y-3">
                  {result ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded-full ${STATUS_STYLE[result.submission.status]}`}>{result.submission.status}</span>
                        <span className="text-white font-bold">{result.submission.score}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-gray-400">Passed {result.passedCases}/{result.totalCases} cases</div>
                    </>
                  ) : <span className="text-gray-600">Chưa có kết quả.</span>}
                </div>
              )}
            </div>
          </div>

          {isSuccess && (
            <div className="flex items-center gap-3 px-4 py-2.5 border-t border-emerald-900/50 bg-emerald-900/20">
              <span className="text-xs text-emerald-400 flex-1">✓ Bạn đã hoàn thành bài tập này.</span>
              <button onClick={() => navigate(-1)} className="text-xs px-4 py-1.5 rounded-md bg-emerald-700 text-white font-semibold">Bài tập tiếp theo →</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}