import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useImageStore = create( persist(
    (set) => ({
      images: [],
      setImage: (payload) => set((state) => ({
          images: [...state.images, payload],
        })),
        deleteImage: (id) => set((state) => ({
          images: state.images.filter((image) => image.id !== id)
        }))
    }),
    { name: "image-store" }
  )
);


