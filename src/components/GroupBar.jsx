import React, { useState } from "react";
import TodoBar from "./TodoBar";
import TodoFormModal from "./TodoFormModal";
import { useDispatch } from "react-redux";
import {
  addTask,
  removeGroup,
  removeTask,
  updateTask,
  updateGroupName,
  toggleTask,
} from "../providers/todoReducer/todoSlice";
import { useDroppable } from "@dnd-kit/core";

const GroupBar = ({ group }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState(null);
  const [updateGroup, setUpdateGroup] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setAddTodo(false);
    setUpdateTodo(false);
    setUpdateGroup(false);
    setIsModalOpen(false);
  };

  const handleAddTodo = () => {
    setAddTodo(true);
    handleOpenModal();
  };

  const handleUpdateTodo = (taskId) => {
    setUpdateTodoId(taskId);
    setUpdateTodo(true);
    handleOpenModal();
  };

  const handleUpdateGroup = () => {
    setUpdateGroup(true);
    handleOpenModal();
  };

  const handleRemoveGroup = (groupId) => {
    dispatch(removeGroup({ groupId }));
  };

  // Add a task to the group
  const onAddTask = (text) => {
    const groupId = group.id;
    dispatch(
      addTask({
        groupId,
        task: { id: Date.now(), name: text, completed: false },
      })
    );
    handleCloseModal();
  };

  // Delete a task from the group
  const onDeleteTask = (taskId) => {
    const groupId = group.id;
    dispatch(removeTask({ groupId, taskId }));
  };

  // Update a task in the group
  const onUpdateTask = (taskName) => {
    const groupId = group.id;
    dispatch(updateTask({ groupId, updateTodoId, taskName }));
    handleCloseModal();
  };

  // Update the group name
  const onUpdateGroup = (groupName) => {
    const groupId = group.id;
    dispatch(updateGroupName({ groupId, groupName }));
    handleCloseModal();
  };

  const onToggleTask = (taskId, groupId) => {
    dispatch(toggleTask({ taskId, groupId }));
  };

  const { setNodeRef } = useDroppable({
    id: group.id.toString(), // Droppable area for this group
  });

  return (
    <div
      key={group.id}
      ref={setNodeRef}
      className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4 my-4"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {group.group}
      </h2>

      {/* Empty State */}
      {group.tasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks to show. Add some!</p>
      )}

      {/* Todo List */}
      {group.tasks.length > 0 &&
        group.tasks.map((todo) => {
          if (todo.completed) {
            dispatch(removeTask({ groupId: group.id, taskId: todo.id }));
            return null; // Skip rendering completed tasks
          }

          return (
            <TodoBar
              key={todo.id}
              id={todo.id}
              text={todo.name}
              group={group}
              onCheck={onToggleTask}
              onUpdate={handleUpdateTodo}
              onDelete={onDeleteTask}
            />
          );
        })}

      {/* Add Todo Button */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Add Todo
        </button>
        <button
          onClick={handleUpdateGroup}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Update Group
        </button>
        <button
          onClick={() => handleRemoveGroup(group.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Delete Group
        </button>
      </div>

      {isModalOpen && addTodo && (
        <TodoFormModal
          onOperation={onAddTask}
          group={group}
          formLabel="Add a Task to Group"
          formSubLabel={"Task"}
          formbutton={"Add Task"}
          onClose={handleCloseModal}
        />
      )}

      {isModalOpen && updateTodo && (
        <TodoFormModal
          onOperation={onUpdateTask}
          group={group}
          formLabel="Update a Task in Group"
          formSubLabel={"Task"}
          formbutton={"Update Task"}
          onClose={handleCloseModal}
        />
      )}

      {isModalOpen && updateGroup && (
        <TodoFormModal
          onOperation={onUpdateGroup}
          group={group}
          formLabel="Update Name of Group"
          formSubLabel={"Group"}
          formbutton={"Update Name"}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GroupBar;
