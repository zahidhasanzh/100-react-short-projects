import React from "react";

import { Download, Trash2, Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useImageStore } from "./zustand/useImageStore";

const FIVE_MB = 5 * 1024 * 1024;

const App = () => {
  const { images, setImage, deleteImage } = useImageStore();
  const chooseFile = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }
    if (file.size > FIVE_MB) {
      return toast.error("File size too large upload less than 5mb");
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage({
        id: Date.now(),
        name: file.name,
        size: file.size,
        binary: fileReader.result,
        createdAt: new Date(),
      });
      toast.success("New Image Added");
    };
  };
  const downloadImage = (item) => {
    const a = document.createElement("a");
    a.href = item.binary;
    a.download = item.name;
    a.click();
    a.remove();
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-9/12 mx-auto py-10 space-y-8">
        <h1 className="text-4xl font-bold text-center">Image Storage</h1>
        <button className="relative cursor-pointer hover:scale-110 transition-transform duration-300 hover:shadow-lg border border-dashed w-8/12 mx-auto flex flex-col items-center gap-3 p-16 px-16 py-10 bg-blue-500 rounded-xl text-white">
          <Upload className="w-16 h-16" />
          <h1 className="text-xl font-medium">Click me to add an image</h1>
          <input
            onChange={chooseFile}
            type="file"
            className="absolute opacity-0 top-0 left-0 w-full h-full rounded-xl"
          />
        </button>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-8">
          {images.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <img src={item.binary} className="hover:scale-105  transition-transform duration-300 shadow-lg w-full h-[150px] object-cover rounded-t-xl"/>
              <div className="bg-white  p-3 rounded-b-xl">
                <h1 className="font-semibold">{item.name}</h1>
                <p className="text-gray-500">{((item.size/1024)/1024).toFixed(1)}mb</p>
                <div className="mt-3 flex  items-end justify-between">
                  <button onClick={() => downloadImage(item)} className="w-8 h-8 cursor-pointer bg-green-400 rounded flex items-center justify-center">
                     <Download className="w-4 h-4"/>
                  </button>
                  <button onClick={() => deleteImage(item.id)} className="w-8 h-8 bg-rose-400 rounded flex items-center justify-center">
                     <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
