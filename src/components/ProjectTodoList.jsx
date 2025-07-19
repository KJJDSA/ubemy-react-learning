import { useRef } from "react";
import Modal from "./Modal";
import Header from "./Header";
import Tasks from "./Tasks";

const ProjectTodoList = ({ project, onTaskSaveClick, onProjectDelete }) => {
  const newTaskInputRef = useRef();
  const deleteDialog = useRef();
  function handleAddTaskClick(task) {
    const newArray = [...project.tasks];
    newArray.push(task);
    onTaskSaveClick(newArray);
  }
  function handleDeleteTaskClick(index) {
    const newArray = [...project.tasks];
    newArray.splice(index, 1);
    onTaskSaveClick(newArray);
  }

  function handleDialogOpen() {
    deleteDialog.current.open();
  }

  return (
    <div className="mt-24 w-2/3">
      <Modal ref={deleteDialog} onProjectDelete={onProjectDelete}>
        프로젝트를 삭제하시겠습니까?
      </Modal>
      <Header project={project} onDialogOpen={handleDialogOpen} />
      <Tasks
        tasks={project.tasks}
        onAddTaskClick={handleAddTaskClick}
        onDeleteTaskClick={handleDeleteTaskClick}
      />
    </div>
  );
};

export default ProjectTodoList;
