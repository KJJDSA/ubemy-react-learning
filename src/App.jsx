import { useState } from "react";

import SideBar from "./components/SideBar";
import ProjectCreateForm from "./components/ProjectCreateForm";
import ProjectTodoList from "./components/ProjectTodoList";
import NoProjectSelected from "./components/NoProjectSelected";
function App() {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState(null); // 선택된 프로젝트의 넘버
  const [projectList, setPrejectList] = useState([]);
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar />
        <NoProjectSelected />
        <ProjectCreateForm />
        <ProjectTodoList />
      </main>
    </>
  );
}

export default App;
