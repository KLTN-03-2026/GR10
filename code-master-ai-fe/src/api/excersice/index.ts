import {axiosInstance} from "../../utils/axios"; 
// TYPES

 interface SubmitCodePayload {
  assignmentId: string;
  language: string;
  sourceCode: string;
}

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
// API FUNCTIONS


/** Lấy thông tin đề bài theo assignmentId */
export const getExerciseById = async (assignmentId: string): Promise<ExerciseData> => {
  const res = await axiosInstance.get(`/exercises/${assignmentId}`);
  return res.data;
};

/** Nộp bài và chấm điểm */
export const submitCode = async (payload: SubmitCodePayload): Promise<SubmissionResult> => {
  const res = await axiosInstance.post("/submissions/submit", payload);
  return res.data;
};