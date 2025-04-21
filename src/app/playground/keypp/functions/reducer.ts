type TestStatus = "idle" | "running" | "paused" | "finished";

type State = {
  input: string;
  quote: string;
  startTime: number | null;
  endTime: number | null;
  status: TestStatus;
  errors: number[];
  elapsedTime: number;
};

type Action =
  | { type: "SET_INPUT"; payload: string }
  | { type: "SET_STATUS"; payload: TestStatus }
  | { type: "SET_START_TIME"; payload: number }
  | { type: "SET_END_TIME"; payload: number }
  | { type: "SET_ELAPSED_TIME"; payload: number }
  | { type: "ADD_ERROR"; payload: number }
  | { type: "REMOVE_ERROR"; payload: number }
  | { type: "RESTART"; payload: string }
  | { type: "RESET"; payload: string };

export const initialState: State = {
  input: "",
  quote: "",
  startTime: null,
  endTime: null,
  status: "idle",
  errors: [],
  elapsedTime: 0,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_START_TIME":
      return { ...state, startTime: action.payload };
    case "SET_END_TIME":
      return { ...state, endTime: action.payload };
    case "SET_ELAPSED_TIME":
      return { ...state, elapsedTime: action.payload };
    case "ADD_ERROR":
      return { ...state, errors: [...state.errors, action.payload] };
    case "REMOVE_ERROR":
      return { ...state, errors: state.errors.filter((i) => i !== action.payload) };
    case "RESTART":
      return {
        ...initialState,
        quote: action.payload,
        status: "idle",
      };
    case "RESET":
      return {
        ...initialState,
        quote: action.payload,
        status: "idle",
      };
    default:
      return state;
  }
}
