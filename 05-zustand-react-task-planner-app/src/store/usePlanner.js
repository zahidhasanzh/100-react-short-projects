import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanner = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (paylod) =>
        set((state) => ({
          tasks: [...state.tasks, paylod],
        })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),
      updateStatus: (id, status) => set((state) => ({
           tasks: state.tasks.filter((task) => {
             if(task.id === id)
                task.status = status
              return task
           })
      })),
      deleteAllTask: ()=> set(()=> ({
        tasks: []
      }))
    }),
    {
      name: "planner"
    }
  )
);

// (set) => ({
//    tasks: [],
//    addTask: (paylod) => set((state) => ({
//       tasks: [...state.tasks, paylod]
//    }))
// })
