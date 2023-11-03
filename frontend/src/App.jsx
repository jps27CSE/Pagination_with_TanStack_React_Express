import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
function App() {
  const [page, setPage] = useState(0);

  const {
    data: { result, postCount },
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () =>
      fetch(`http://localhost:5000/allUsers?page=${page}`).then((res) =>
        res.json()
      ),
    initialData: { result: [], postCount: 0 },
  });

  const totalPages = Math.ceil(postCount / 10);

  const pages = [...new Array(totalPages).fill(0)];

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col gap-5 mt-10">
        {result.map((post) => (
          <div
            key={post._id}
            className="p-5
          border-2 shadow-md rounded-md
          
          "
          >
            <h1 className="text-lg font-bold">
              {post._id} {post.name}
            </h1>
            <p>{post.email}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-5">
        {pages.map((item, index) => (
          <button
            className={`w-7 h-7 ${
              page == index ? "bg-black text-white" : "text-black"
            } `}
            key={index}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div>
        {pages.map((item, index) => (
          <button
            className={`join-item btn ${page === index ? "btn-active" : ""}`}
            key={index}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
