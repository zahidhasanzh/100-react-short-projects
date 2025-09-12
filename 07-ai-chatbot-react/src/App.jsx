import { ExternalLink } from "lucide-react";
import "animate.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import moment from "moment/moment";

const API_KEY = "AIzaSyAWdTBfvZNmO7-MKXvlm37FkbQ5aqIcQVk";
const App = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const createChat = async (e) => {
    try {
      e.preventDefault();
      setChats((prev) => [
        ...prev,
        {
          sender: "me",
          message: message,
          createAt: new Date(),
        },
      ]);
      setMessage("");
      setIsTyping(true);
      const payload = {
        contents: {
          parts: {
            text: `Answer this in short - ${message}`,
          },
        },
      };
      const options = {
        headers: {
          "X-goog-api-key": API_KEY,
        },
      };
      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        payload,
        options
      );
      const aiResult = data.candidates[0].content.parts[0].text;
      setChats((prev) => [
        ...prev,
        {
          sender: "ai",
          message: aiResult,
          createAt: new Date(),
        },
      ]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="lg:w-9/12 mx-auto min-h-screen  bg-white pt-12 pb-48">
        <h1 className="text-3xl font-bold text-center">AI Chat</h1>
        <div className="p-8 space-y-6">
          {chats.map((item, index) => (
            <div key={index}>
              {item.sender === "me" && (
                <div className="flex flex-col gap-2 justify-start animate__animated animate__fadeIn">
                  <div className="bg-rose-200 text-black px-6 py-3 rounded-xl w-9/12  font-medium">
                    {item.message}
                    <div className="flex justify-end text-gray-900 text-xs">
                      <label>
                        {moment(item.createAt).format(
                          "MMM DD YYYY, hh:mm:ss A"
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {item.sender === "ai" && (
                <div className="flex flex-col gap-2 items-end animate__animated animate__fadeIn">
                  <div className="bg-green-200 text-black px-6 py-3 rounded-xl w-9/12  font-medium">
                    {item.message}
                    <div className="flex justify-end text-gray-900 text-xs">
                      <label>
                        {moment(item.createAt).format(
                          "MMM DD YYYY, hh:mm:ss A"
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {isTyping && (
          <div className="flex justify-end px-8">
            <small className="text-gray-500 text-sm font-medium animate__animated animate__fadeIn">
              Typing...
            </small>
          </div>
        )}
        <div className="bg-indigo-600 lg:p-8 p-4 fixed bottom-0 lg:w-9/12 w-full">
          <form className="flex gap-4" onSubmit={createChat}>
            <input
              type="text"
              required
              className="bg-white rounded-xl p-6 w-full"
              placeholder="Chat with ai from here"
              
              onChange={(e) => setMessage(e.target.value.trim())}
            />
            <button className="bg-yellow-500 hover:bg-green-400 transition-transform duration-300 px-12 rounded-xl text-white flex flex-col items-center justify-center cursor-pointer hover:scale-105">
              Send <ExternalLink />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
