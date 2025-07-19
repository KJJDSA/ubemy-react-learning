import { useState } from "react";

import SideBar from "./components/SideBar";
import ProjectCreateForm from "./components/ProjectCreateForm";
import ProjectTodoList from "./components/ProjectTodoList";
import NoProjectSelected from "./components/NoProjectSelected";
function App() {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState(null); // 선택된 프로젝트의 넘버
  const [isCreateFormOn, setIsCreateFormOn] = useState(false);
  const [projectList, setPrejectList] = useState([]);

  // 스위치 모드를 넣는것이 좋을까(아래 조건으로 분기하는 handleSwich)? 아니면 저장란에 state를 변경하면 알아서 UI가 그려지게 하는게 좋을까.
  function handleSwich(mode) {
    if (mode === "create") {
      setIsCreateFormOn(true);
    }
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar />
        {/* selectedProjectNumber 가 null 이면 NoProjectSelected 를 보여준다*/}
        {selectedProjectNumber === null && !isCreateFormOn && (
          <NoProjectSelected onSwich={handleSwich} />
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
