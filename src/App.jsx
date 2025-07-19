import { useState } from "react";

import SideBar from "./components/SideBar";
import ProjectCreateForm from "./components/ProjectCreateForm";
import ProjectTodoList from "./components/ProjectTodoList";
import NoProjectSelected from "./components/NoProjectSelected";
function App() {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState(null); // 선택된 프로젝트의 넘버
  const [isCreateFormOn, setIsCreateFormOn] = useState(false);
  const [projectList, setPrejectList] = useState([]);

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar />
        {/* selectedProjectNumber 가 null 이면 NoProjectSelected 를 보여준다*/}
        {selectedProjectNumber === null && !isCreateFormOn && (
          <NoProjectSelected />
        )}
        {/* selectedProjectNumber 가 null 이 아니면 NoProjectSelected 를 보여준다*/}
        {selectedProjectNumber !== null && !isCreateFormOn && (
          <ProjectTodoList project={projectList[selectedProjectNumber]} />
        )}
        {/* isCreateFormOn 이 true 이면 항상 ProjectCreateForm 을 보여준다.*/}
        {isCreateFormOn && <ProjectCreateForm />}
      </main>
    </>
  );
}

export default App;
