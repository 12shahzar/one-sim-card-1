import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blogPlaceholder from "../assets/images/blog.svg";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [newestPosts, setNewestPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewest, setLoadingNewest] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const transformPost = (post) => {
    const title = decodeHtml(post.title.rendered);
    const excerpt = decodeHtml(post.excerpt.rendered).replace(/<[^>]+>/g, '');
    const content = post.content.rendered;

    let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (!imageUrl) {
      const match = post.content.rendered.match(/src="([^"]+)"/);
      imageUrl = match ? match[1] : blogPlaceholder;
    }

    const link = post.link.replace('https://travel.onesimcard.com/m2mblog', 'https://iot.onesimcard.com/blog');
    const date = post.date;

    return { id: post.id, title, excerpt, content, image: imageUrl, link, date };
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://travel.onesimcard.com/m2mblog/wp-json/wp/v2/categories");
      const data = await response.json();
      setCategories(data.filter(c => c.count > 0));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchNewestPosts = useCallback(async () => {
    setLoadingNewest(true);
    try {
      const response = await fetch("https://travel.onesimcard.com/m2mblog/wp-json/wp/v2/posts?per_page=5&_embed");
      const data = await response.json();
      setNewestPosts(data.map(transformPost));
    } catch (error) {
      console.error("Error fetching newest posts:", error);
    } finally {
      setLoadingNewest(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `https://travel.onesimcard.com/m2mblog/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}&_embed`;
      if (debouncedQuery) url += `&search=${encodeURIComponent(debouncedQuery)}`;
      if (selectedCategory) url += `&categories=${selectedCategory}`;

      const response = await fetch(url);
      const totalPagesHeader = response.headers.get("X-WP-TotalPages");
      if (totalPagesHeader) setTotalPages(parseInt(totalPagesHeader, 10));

      const data = await response.json();
      setPosts(data.map(transformPost));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedQuery, selectedCategory]);

  useEffect(() => {
    fetchCategories();
    fetchNewestPosts();
  }, [fetchCategories, fetchNewestPosts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Blog posts */}
        <main className="lg:col-span-2 space-y-8">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="w-full h-60 bg-gray-100 rounded-lg mb-4"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-lg w-full mb-2"></div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="group">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-60 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <h2 className="text-3xl md:text-5xl font-thin mb-2 hover:text-[#455E86] transition-colors">{post.title}</h2>
                </a>
                <p className="text-[#6B7280] text-base my-4 line-clamp-3">{post.excerpt}</p>
                <div
                  className="text-[#6B7280] text-base line-clamp-5 hidden md:block"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#455E86] font-medium hover:underline"
                >
                  Read More →
                </a>
              </article>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              No blog posts found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          )}
        </main>

        {/* Right column: Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Search */}
          <div className="bg-white rounded-4xl p-2 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full h-14 px-4 rounded-full bg-[#EEEEEE] outline-none pr-12"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                🔍
              </button>
            </div>
          </div>

          {/* Newest Posts */}
          <div className="">
            <h3 className="text-xl font-medium mb-4">Newest Posts</h3>
            <ul className="space-y-3">
              {loadingNewest ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse py-2">
                    <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                    <hr className="border-gray-200 mt-4" />
                  </div>
                ))
              ) : (
                newestPosts.map((p) => (
                  <li key={p.id}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="block hover:text-[#455E86]">
                      <span className="block text-lg font-regular my-2">
                        {p.title}
                      </span>
                      <span className="text-sm text-[#6B7280] font-regular">
                        {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </a>
                    <hr className="border-gray-300 my-6" />
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Categories */}
          <div className="">
            <h3 className="text-xl font-medium mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-6 py-2 rounded-full text-lg cursor-pointer transition-colors ${selectedCategory === ""
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
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
                  key={c.id}
                  className={`px-6 py-2 rounded-full text-lg cursor-pointer transition-colors ${selectedCategory === c.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    setCurrentPage(1);
                  }}
                >
                  {c.name}
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
          className={`px-4 py-2 rounded-full cursor-pointer ${r === current ? "bg-[#455E86] text-white" : "bg-slate-100"
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
