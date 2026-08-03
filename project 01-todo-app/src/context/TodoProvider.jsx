import { createContext, useEffect, useReducer } from "react";

export const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos") ?? "[]"),
  darkMode: JSON.parse(localStorage.getItem("darkMode") ?? "false"),
  filter: "all",
  input: "",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        input: "",
        filter: "all",
        todos: [...state.todos, action.payload],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "TOGGLE_EDITING":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                editing: !todo.editing,
                text: todo.editing
                  ? todo.editingText.length > 0
                    ? todo.editingText
                    : todo.text
                  : todo.text,
                editingText:
                  todo.editingText.length > 0 ? todo.editingText : todo.text,
              }
            : todo,
        ),
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, editingText: action.payload.text }
            : todo,
        ),
      };

    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: action.payload,
      };

    case "ENTER_INPUT":
      return {
        ...state,
        input: action.payload,
      };

    default:
      return state;
  }
}

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem("darkMode", state.darkMode);
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
