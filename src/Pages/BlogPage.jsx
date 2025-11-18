import React, { useMemo, useState } from "react";
import blogData from "../data/blogData.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BlogPage() {
  const data = blogData;
  const posts = data.posts || [];
  const categories = data.categories || [];
  const perPage = data.site?.perPage || 5; // matches your screenshot layout

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const parseDate = (iso) => new Date(iso).getTime();

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (!q) return true;
      const hay = (
        p.title +
        " " +
        (p.excerpt || "") +
        " " +
        (p.content || "")
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query, selectedCategory]);

  const newestPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => parseDate(b.date) - parseDate(a.date))
      .slice(0, 5);
  }, [posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage));
  if (currentPage > totalPages) setCurrentPage(1);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredPosts.slice(start, start + perPage);
  }, [filteredPosts, currentPage, perPage]);

  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Blog posts */}
        <main className="lg:col-span-2 space-y-8">
          {paginated.map((post) => (
            <article key={post.id} className="">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h2 className="text-5xl font-thin mb-2">{post.title}</h2>
              <p className="text-[#6B7280] text-base my-4">{post.excerpt}</p>
              <p
                className="text-[#6B7280] text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></p>
            </article>
          ))}

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </main>

        {/* Right column: Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Search */}
          <div className="bg-white rounded-4xl p-2 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search"
              className="w-full h-14 px-4 rounded-full bg-[#EEEEEE] outline-none"
            />
          </div>

          {/* Newest Posts */}
          <div className="">
            <h3 className="text-xl font-medium mb-4">Newest Posts</h3>
            <ul className="space-y-3">
              {newestPosts.map((p) => (
                <li key={p.id}>
                  <div>
                    <span className="block text-lg font-regular my-7">
                      {p.title}
                    </span>
                    <span className="text-sm text-[#6B7280] font-regular">
                      {new Date(p.date).toLocaleDateString()}
                    </span>
                  </div>
                  <hr className="border-gray-300 my-6" />
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="">
            <h3 className="text-xl font-medium mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-6 py-2 rounded-full text-lg cursor-pointer ${
                  selectedCategory === ""
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100"
                }`}
                onClick={() => {
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`px-6 py-2 rounded-full text-lg cursor-pointer ${
                    selectedCategory === c
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100"
                  }`}
                  onClick={() => {
                    setSelectedCategory(c);
                    setCurrentPage(1);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Pagination({ current, total, onChange }) {
  const range = [];
  for (let i = 1; i <= total; i++) range.push(i);

  return (
    <div className="flex items-center justify-center gap-3 mt-6 ">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        className="px-1 py-1 bg-[#F4C600] rounded-full cursor-pointer"
      >
        <ChevronLeft className="text-white" />
      </button>
      {range.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            r === current ? "bg-[#455E86] text-white" : "bg-slate-100"
          }`}
        >
          {r}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        className="px-1 py-1 bg-[#F4C600] rounded-full cursor-pointer"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}

export default BlogPage;
