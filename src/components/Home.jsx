import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { addGroup, removeTask, addTask, moveTask } from "../providers/todoReducer/todoSlice";  // Ensure you have a moveTask action
import GroupBar from "./GroupBar";
import TodoFormModal from "./TodoFormModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allGroups = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddGroup = () => handleOpenModal();
  const onAddGroup = (groupName) => {
    dispatch(
      addGroup({
        group: { id: Date.now(), group: groupName, tasks: [] },
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const droppedTaskId = active.id;
      const targetGroupId = over.id;

      // Find source and target groups
      const sourceGroup = allGroups.find((group) => group.tasks.some((task) => task.id === droppedTaskId));
      const targetGroup = allGroups.find((group) => group.id === targetGroupId);

      if (sourceGroup && targetGroup) {
        // Find the task in the source group
        const task = sourceGroup.tasks.find((task) => task.id === droppedTaskId);
        
        if (task) {
          // Remove the task from the source group and add it to the target group
          dispatch(removeTask({ groupId: sourceGroup.id, taskId: droppedTaskId }));
          dispatch(addTask({ groupId: targetGroup.id, task }));
          // Dispatch the moveTask action
          dispatch(moveTask({ sourceGroupId: sourceGroup.id, targetGroupId: targetGroup.id, task }));
        }
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap min-h-screen bg-gray-100 items-center justify-center sm:text-sm">
        {allGroups.map((group) => (
          <GroupBar key={group.id} group={group} />
        ))}

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4 my-4">
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={handleAddGroup}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Add Group
            </button>
          </div>
        </div>

        {isModalOpen && (
          <TodoFormModal
            onOperation={onAddGroup}
            formLabel="Add a new Group"
            formSubLabel={"Group"}
            formbutton={"Add Group"}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </DndContext>
  );
};

export default Home;
