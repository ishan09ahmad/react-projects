import Todo from "./component/Todo";
import TodoProvider from "./context/TodoProvider";

export default function App()
{
  return(
   <TodoProvider>
    <Todo></Todo>
   </TodoProvider>
  )
}