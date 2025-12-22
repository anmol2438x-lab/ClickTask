import { getLocalStorage } from "../data/localStorage";

export const generateRelativeDates = (tasks) => {
  const { employeesData } = getLocalStorage();
  if (employeesData) return tasks;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return tasks.map((task) => {
    let dateOffset = 0;

    const taskDate = new Date(today);
    const createdDate = new Date(today);

    switch (task.status) {
      case "completed":
        dateOffset = -Math.floor(Math.random() * 5) - 1;
        createdDate.setDate(today.getDate() - Math.floor(Math.random() * 5) - 1);
        break;

      case "failed":
        dateOffset = Math.random() > 0.5 
          ? -Math.floor(Math.random() * 3) 
          : Math.floor(Math.random() * 2);
        createdDate.setDate(today.getDate() - Math.floor(Math.random() * 5) - 1);
        break;

      case "active":
        dateOffset = Math.floor(Math.random() * 3);
        createdDate.setDate(today.getDate() - Math.floor(Math.random() * 3) - 1);
        break;

      case "new_task":
        dateOffset = Math.floor(Math.random() * 5) + 1;
        createdDate.setDate(today.getDate() - 1);
        break;

      default:
        dateOffset = 0;
    }

    taskDate.setDate(today.getDate() + dateOffset);

    return {
      ...task,
      task_date: taskDate.toISOString(),    
      created_at: createdDate.toISOString(),
    };
  });
};
