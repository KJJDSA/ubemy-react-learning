import { useState } from "react";

import SideBar from "./components/SideBar";
import ProjectCreateForm from "./components/ProjectCreateForm";
import ProjectTodoList from "./components/ProjectTodoList";
import NoProjectSelected from "./components/NoProjectSelected";
function createInitialedProject(data) {
  return {
    ...data,
    tasks: [],
  };
}

function App() {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState(null); // 선택된 프로젝트의 넘버
  const [isCreateFormOn, setIsCreateFormOn] = useState(false);
  const [projectList, setProjectList] = useState([]);

  // 스위치 모드를 넣는것이 좋을까(아래 조건으로 분기하는 handleSwich)? << 역시만들어야 하지 않을까?
  function handleSwich(mode, ...arg) {
    if (mode === "create") {
      setIsCreateFormOn(true);
    }
    if (mode === "project") {
      const newSelectedProjectNumber = arg[0];
      setSelectedProjectNumber(newSelectedProjectNumber);
      setIsCreateFormOn(false);
    }
  }

  function handleProjectSave(inputData) {
    setProjectList((prev) => {
      const newArray = [...prev];
      newArray.push(createInitialedProject(inputData));
      return newArray;
    });
    setIsCreateFormOn(false);
    setSelectedProjectNumber((prev) =>
      prev === null ? 0 : projectList.length - 1
    );
  }

  function handleCancel() {
    setIsCreateFormOn(false);
  }

  function handleTaskSaveClick(tasks) {
    setProjectList((prev) => {
      // 2중배열 깊은복사
      const newPrev = JSON.parse(JSON.stringify(prev));
      newPrev[selectedProjectNumber].tasks = tasks;
      return newPrev;
    });
  }

  function handleProjectDelete() {
    setProjectList((prev) => {
      const newArray = [...prev];
      newArray.splice(selectedProjectNumber, 1);
      return newArray;
    });
    setSelectedProjectNumber((prev) => (prev === 0 ? null : prev - 1));
  }
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          projectList={projectList}
          onSwich={handleSwich}
          currentIndex={selectedProjectNumber}
        />
        {/* selectedProjectNumber 가 null 이면 NoProjectSelected 를 보여준다*/}
        {projectList.length === 0 &&
          selectedProjectNumber === null &&
          !isCreateFormOn && <NoProjectSelected onSwich={handleSwich} />}
        {/* selectedProjectNumber 가 null 이 아니면 NoProjectSelected 를 보여준다*/}
        {(projectList.length > 0 || selectedProjectNumber !== null) &&
          !isCreateFormOn && (
            <ProjectTodoList
              project={projectList[selectedProjectNumber ?? 0]}
              onTaskSaveClick={handleTaskSaveClick} // tesk 추가, 삭제
              onProjectDelete={handleProjectDelete}
            />
          )}
        {/* isCreateFormOn 이 true 이면 항상 ProjectCreateForm 을 보여준다.*/}
        {isCreateFormOn && (
          <ProjectCreateForm
            onSave={handleProjectSave}
            onCancel={handleCancel}
          />
        )}
      </main>
    </>
  );
}

export default App;
