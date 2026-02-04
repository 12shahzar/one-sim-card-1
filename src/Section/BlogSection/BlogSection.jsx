import { useState, useEffect } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import CustomButton from "../../Components/CustomButton/CustomButton";
import SectionHeading from "../../Components/Heading/SectionHeading";
import blog from "../../assets/images/blog.svg";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://travel.onesimcard.com/m2mblog/wp-json/wp/v2/posts?per_page=3&_embed");
        const data = await response.json();

        const transformedBlogs = data.map(post => {
          const author = post._embedded?.author?.[0]?.name || "OneSimCard IoT";

          // Format date: "25 Sep 2025"
          const dateObj = new Date(post.date);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString('en-GB', { month: 'short' });
          const year = dateObj.getFullYear();
          const formattedDate = `${day} ${month} ${year}`;

          const title = decodeHtml(post.title.rendered);

          // Image fallback: Featured media -> first image in content -> default placeholder
          let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          if (!imageUrl) {
            const match = post.content.rendered.match(/src="([^"]+)"/);
            imageUrl = match ? match[1] : blog;
          }

          const link = post.link.replace('https://travel.onesimcard.com/m2mblog', 'https://iot.onesimcard.com/blog');

          return { image: imageUrl, author, date: formattedDate, title, link };
        });

        setBlogs(transformedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section data-aos="fade-right" className="py-16 md:py-20 font-sora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          {/* <h2 className="text-3xl md:text-7xl font-thin text-[#08080C] mb-4 sm:mb-0">
            Latest Insights <br className="hidden sm:block" /> & Blogs
          </h2> */}
          <SectionHeading
            title="Latest Insights<br/>& Blogs"
            showBreak={true}
            align="left"
            className="mb-10 md:mb-0"
          />

          <CustomButton
            text="Explore More"
            bgColor="#455E86"
            hoverColor="#3b5072"
            textColor="white"
            to="/blog"
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-4xl h-96"></div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((item, index) => (
              <BlogCard key={index} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No blog posts found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
