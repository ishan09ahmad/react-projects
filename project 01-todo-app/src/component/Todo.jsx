import { FaCheckCircle } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import todoImage from "../assets/note_13650723.png";
import { MdEdit, MdDelete } from "react-icons/md";
import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";

export default function Todo() {
  const { state, dispatch } = useContext(TodoContext);

  return (
    <main className="flex items-start justify-center w-full min-h-screen bg-[var(--primary-bg)] py-8 px-4">
      <section className="w-full max-w-125 shadow-2xl px-4 py-6 pb-4 rounded-2xl bg-[var(--secondary-bg)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-bold tracking-wide font-headings text-[var(--primary-text)]">
              Todo List
            </h1>

            <img
              src={todoImage}
              alt="todo app icon"
              className="w-6.25 h-6.25"
            />
          </div>

          {state.darkMode ? (
            <FiSun
              role="button"
              aria-label="Switch to light mode"
              className="size-9 cursor-pointer text-[var(--primary-text)]"
              onClick={() =>
                dispatch({ type: "TOGGLE_THEME", payload: false })
              }
            />
          ) : (
            <IoMoon
              role="button"
              aria-label="Switch to dark mode"
              className="size-7 cursor-pointer text-[var(--primary-text)]"
              onClick={() =>
                dispatch({ type: "TOGGLE_THEME", payload: true })
              }
            />
          )}
        </div>

        <form
          className="flex gap-4 justify-between mb-5"
          onSubmit={(e) => {
            e.preventDefault();

            if (state.input.length > 0) {
              dispatch({
                type: "ADD_TODO",
                payload: {
                  text: state.input,
                  id: Date.now(),
                  completed: false,
                  editing: false,
                  editingText: state.input,
                },
              });
            }
          }}
        >
          <input
            className="border-2 border-gray-300 p-2.5 pl-3 rounded-md w-full text-md bg-[var(--secondary-bg)] text-[var(--primary-text)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-400"
            placeholder="Enter todo Item"
            type="text"
            maxLength={50}
            value={state.input}
            onChange={(e) =>
              dispatch({
                type: "ENTER_INPUT",
                payload: e.target.value,
              })
            }
          />

          <button className="bg-green-500 text-white py-2 px-3.5 rounded-md cursor-pointer hover:bg-green-700 tracking-wide active:scale-90">
            Add
          </button>
        </form>

        <div className="flex gap-4 item-center justify-start font-medium tracking-wide p-3.5 mb-8 bg-[var(--primary-bg)] rounded-lg shadow-xl">
          <button
            className={`${
              state.filter === "all" &&
              "text-black font-semibold bg-red-600 border-2"
            } cursor-pointer text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-lg bg-red-400 text-white active:scale-90`}
            onClick={() => {
              dispatch({ type: "CHANGE_FILTER", payload: "all" });
            }}
          >
            All
          </button>

          <button
            className={`${
              state.filter === "active" &&
              "text-black font-semibold bg-red-600 border-2"
            } cursor-pointer text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-lg bg-red-400 text-white active:scale-90`}
            onClick={() => {
              dispatch({ type: "CHANGE_FILTER", payload: "active" });
            }}
          >
            Active
          </button>

          <button
            className={`${
              state.filter === "completed" &&
              "text-black font-semibold bg-red-600 border-2"
            } cursor-pointer text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-lg bg-red-400 text-white active:scale-90`}
            onClick={() => {
              dispatch({
                type: "CHANGE_FILTER",
                payload: "completed",
              });
            }}
          >
            Completed
          </button>
        </div>

        <ul>
          {state.todos
            .filter((todo) => {
              if (state.filter === "all") return true;
              else if (state.filter === "active") return !todo.completed;
              else return todo.completed;
            })
            .map((item) => (
              <li
                key={item.id}
                className="mb-4 rounded-lg bg-[var(--primary-bg)] py-2.5 px-2 flex items-center justify-between gap-2 border border-gray-300 text-[var(--primary-text)]"
              >
                <div className="w-full flex items-center gap-2">
                  {item.completed ? (
                    <FaCheckCircle
                      className="h-5 min-w-5 text-yellow-300 cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_TODO",
                          payload: item.id,
                        })
                      }
                    />
                  ) : (
                    <div
                      className="h-5 min-w-5 rounded-full border-2 border-yellow-500 cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_TODO",
                          payload: item.id,
                        })
                      }
                    ></div>
                  )}

                  {item.editing ? (
                    <input
                      type="text"
                      className="border-2 border-gray-300 pl-2 rounded-md w-full bg-[var(--secondary-bg)] text-[var(--primary-text)]"
                      maxLength={50}
                      value={item.editingText}
                      onChange={(e) =>
                        dispatch({
                          type: "EDIT_TODO",
                          payload: {
                            id: item.id,
                            text: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <p className="break-all">
                      {item.completed ? (
                        <del className="text-[var(--secondary-text)]">
                          {item.text}
                        </del>
                      ) : (
                        item.text
                      )}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 self-start">
                  {item.editing ? (
                    <button
                      className="bg-blue-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-blue-700 tracking-wide text-sm active:scale-90"
                      disabled={item.completed}
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_EDITING",
                          payload: item.id,
                        })
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-blue-700 tracking-wide text-sm active:scale-90"
                      disabled={item.completed}
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_EDITING",
                          payload: item.id,
                        })
                      }
                    >
                      <span className="hidden sm:inline">Edit</span>
                      <MdEdit className="sm:hidden size-4" />
                    </button>
                  )}

                  <button
                    className="bg-red-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-red-700 tracking-wide text-sm active:scale-90"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_TODO",
                        payload: item.id,
                      })
                    }
                  >
                    <span className="hidden sm:inline">Delete</span>
                    <MdDelete className="sm:hidden size-4" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}