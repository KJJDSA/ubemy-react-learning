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
   * 1. 리스트 관리의 용이성: id 가 있다면 filter 등을 통해 index 없이도 배열을 삭제할 수 있다. 사이드이펙트 없이 동시 삭제, 순차삭제가 가능하다.
   * 2. 순서가 바뀌어도 유지되는 고유성: 정렬 순서를 바꾸거나 중간에 요소를 삭제하여도 id 를 통해 필요한 요소에 바로 접근할 수 있다.
   * 3. 가장 직관적이고 고유한 key 지정: 리액트의 성능 최적화 및 불필요한 리렌더링 방지를 위해 key 는 고유한 값을 사용해야 하는데, 이때 id가 존재한다면 가장 직관적이고 중복되지 않는 key를 사용할 수 있음
   * 4. 유지보수성: 예측 가능하고 안정적인 식별요소는 유지보수성을 높인다. 식별요소로 index를 사용하는 것은 데이터변경에 취약하다.
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
