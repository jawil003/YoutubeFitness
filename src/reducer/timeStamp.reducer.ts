import { useReducer } from "react";
import TimeConverterService from "src/services/frontend/timeConverter.service";

type Action =
  | {
      type: "ADD_SECONDS_BEGIN";
      value: number;
    }
  | {
      type: "ADD_SECONDS_END";
      value: number;
    }
  | {
      type: "ADD_FORMATTTED_BEGIN";
      value: string;
    }
  | {
      type: "ADD_FORMATTTED_END";
      value: string;
    };

export const initialState = {
  seconds: { begin: 0, end: 100 },
  timestamp: {
    begin: "00:00:00",
    end: "00:01:40",
  },
};

const reducer = (
  state: typeof initialState,
  action: Action,
) => {
  switch (action.type) {
    case "ADD_SECONDS_BEGIN": {
      return {
        ...state,
        seconds: {
          ...state.seconds,
          begin: action.value,
        },
        timestamp: {
          ...state.timestamp,
          begin: TimeConverterService.secondsToHHMMSS(
            action.value,
          ) as string,
        },
      };
    }
    case "ADD_SECONDS_END": {
      return {
        ...state,
        seconds: {
          ...state.seconds,
          end: action.value,
        },
        timestamp: {
          ...state.timestamp,
          end: TimeConverterService.secondsToHHMMSS(
            action.value,
          ) as string,
        },
      };
    }
    case "ADD_FORMATTTED_BEGIN": {
      return {
        ...state,
        seconds: {
          ...state.seconds,
          begin: TimeConverterService.HHMMSStoSeconds(
            action.value,
          ) as number,
        },
        timestamp: {
          ...state.timestamp,
          begin: action.value,
        },
      };
    }
    case "ADD_FORMATTTED_END": {
      return {
        ...state,
        seconds: {
          ...state.seconds,
          end: TimeConverterService.HHMMSStoSeconds(
            action.value,
          ) as number,
        },
        timestamp: {
          ...state.timestamp,
          end: action.value,
        },
      };
    }
  }
};

const useTimestampReducer = () =>
  useReducer(reducer, initialState);

export default useTimestampReducer;
