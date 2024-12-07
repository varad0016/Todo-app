import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    group: "Group 1",
    tasks: [
      { id: 1, name: "Task 1", completed: false },
      { id: 2, name: "Task 2", completed: false },
    ],
  },
  {
    id: 2,
    group: "Group 2",
    tasks: [
      { id: 3, name: "Task 3", completed: false },
      { id: 4, name: "Task 4", completed: false },
    ],
  },
];

const todoSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addTask(state, action) {
      const { groupId, task } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.tasks.push(task);
      }
    },
    removeTask(state, action) {
      const { groupId, taskId } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.tasks = group.tasks.filter((task) => task.id !== taskId);
      }
    },
    updateTask(state, action) {
      const { groupId, updateTodoId, taskName } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.tasks = group.tasks.map((task) =>
          task.id === updateTodoId ? { ...task, name: taskName } : task
        );
      }
    },
    toggleTask(state, action) {
      const { taskId, groupId } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.tasks = group.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      }
    },
    addGroup(state, action) {
      const { group } = action.payload;
      state.push(group); // Adds a new group
    },
    removeGroup(state, action) {
      const { groupId } = action.payload;
      return state.filter((group) => group.id !== groupId); // Removes a group by ID
    },
    updateGroupName(state, action) {
      const { groupId, groupName } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.group = groupName; // Updates the group name
      }
    },
    moveTask(state, action) {
      const { sourceGroupId, targetGroupId, task } = action.payload;

      // Remove task from source group
      const sourceGroup = state.find((group) => group.id === sourceGroupId);
      const targetGroup = state.find((group) => group.id === targetGroupId);

      if (sourceGroup && targetGroup) {
        // Remove task from source group
        sourceGroup.tasks = sourceGroup.tasks.filter((t) => t.id !== task.id);
        
        // Add task to target group
        targetGroup.tasks.push(task);
      }
    },
  },
});

export const {
  addGroup,
  addTask,
  toggleTask,
  updateGroupName,
  updateTask,
  removeGroup,
  removeTask,
  moveTask,  // Export the moveTask action
} = todoSlice.actions;

export default todoSlice.reducer;
