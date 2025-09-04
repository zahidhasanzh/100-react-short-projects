import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const API_KEY = "vKjbzRILUDGaiBbYPRh78EApXuitfrdrEzXXvPi0q0jTLBeNFpBu5QLH";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("flower");

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      );
      setPhotos([...photos, ...res.data.photos]);
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const search = (e) => {
    e.preventDefault();
    const q = e.target[0].value.trim();
    setPhotos([]);
    setQuery(q);
  };

  useEffect(() => {
    fetchImage();
  }, [page, query]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12">
      <h1 className="text-4xl font-bold text-indigo-600">Image Gallery</h1>
      <form onSubmit={search}>
        <input
          type="text"
          className="focus:outline-indigo-500  p-3 bg-white rounded-l-lg w-[400px]"
          placeholder="Search image here"
        />
        <button className="bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-r-lg hover:scale-105 transition-transform">
          Search
        </button>
      </form>
      {photos.length === 0 && (
        <h1 className="text-4xl font-bold text-center">
          Search result not found
        </h1>
      )}

      <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12">
        {photos.map((item, index) => (
          <div key={index} className="bg-white rounded-xl">
            <img
              src={item.src.medium}
              alt={item.alt}
              className="rounded-t-lg w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
            />
            <div className="p-3">
              <h1 className="text-lg font-medium text-gray-600 capitalize">
                {item.photographer}
              </h1>
              <a
                href={item.src.original}
                target="_blank"
                className="mt-3 block bg-green-400 font-bold py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-gray-400 mt-4">Loading...</p>}

      {photos.length > 0 && (
        <button
          onClick={loadMore}
          className="bg-rose-500 py-3 px-16 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-300"
        >
          Load More
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
