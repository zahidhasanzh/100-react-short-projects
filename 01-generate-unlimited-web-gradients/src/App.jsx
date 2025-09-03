import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const hexColor = hexCode.padStart(6, "0");

    return `#${hexColor}`;
  };

  const generateGradient = () => {
    const colors = [];

    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: 'radial-gradient(circle, ${color1}, ${color2})'`,
        });
      }
    }
    console.log(colors);
    setGradients(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied", { position: "top-center" });
  };
  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-9/12 mx-auto space-y-8">
        <div className="flex justify-between p-6 rounded-xl" style={{background: getHexColorCode()}}>
          <h1 className="text-3xl font-bold">Gradient Generator</h1>
          <div className="flex gap-4">
            <input
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
              type="text"
              placeholder="12"
              className="border bg-white borde border-slate-300 rounded-lg w-[100px] p-2 outline-none"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border bg-white borde border-slate-300 rounded-lg w-[100px] p-2 outline-none"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button onClick={generateGradient} className="bg-rose-500 text-white rounded px-16 py-2 font-medium">Generate</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {gradients?.map((item, index) => (
            <div
              key={index}
              className="h-[180px] rounded-lg relative"
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className="text-white bg-black/55 hover:bg-black px-2 py-2 text-[10px] rounded absolute right-3 bottom-3 cursor-pointer uppercase"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
