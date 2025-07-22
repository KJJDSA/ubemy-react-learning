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
  /** ⭐️ 프로젝트 인식을 number 이 아닌 id 를 꼭! 사용해야하는 이유 ⭐️ : 
   * 1. id를 사용해 filter를 사용할 수 있게 된다. index를 통해 splice 혹은 filter 하는 것 보다 더욱 정확하다.
   * 2. 정렬 순서를 바꾸거나 중간에 요소를 삭제하여도 id 를 통해 필요한 요소에 바로 접근할 수 있다. 또한 동적인 배열의 변경에도 강하다.
   * 3. index 를 조합해 key를 만드는 대신 id 를 사용하면 리스트 요소를 리액트가 재사용할 수 있다.(최적화)
   * 4. 예측 가능하고 안정적인 식별요소는 개발 및 유지보수성을 높인다.
   * 
   * TODO id 를 속성에 추가하고 index 를 사용하는 부분을 교체해보기
   */
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
      prev === null ? 0 : projectList.length
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

  // return문 길이를 짧게 줄일 수 있다.
  let content;
  if (isCreateFormOn) {
    content = (
      <ProjectCreateForm onSave={handleProjectSave} onCancel={handleCancel} />
    );
  } else if (projectList.length > 0) {
    content = (
      <ProjectTodoList
        project={projectList[selectedProjectNumber ?? 0]}
        onTaskSaveClick={handleTaskSaveClick} // tesk 추가, 삭제
        onProjectDelete={handleProjectDelete}
      />
    );
  } else {
    content = <NoProjectSelected onSwich={handleSwich} />;
  }

  console.log(selectedProjectNumber);

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          projectList={projectList}
          onSwich={handleSwich}
          currentIndex={selectedProjectNumber}
        />
        {content}
      </main>
    </>
  );
}

export default App;
