import BlogCard from "../../Components/BlogCard/BlogCard";
import CustomButton from "../../Components/CustomButton/CustomButton";
import SectionHeading from "../../Components/Heading/SectionHeading";
import blog from "../../assets/images/blog.svg";

export default function BlogSection() {
  const blogs = [
    {
      image: blog,
      author: "Mark Thompson",
      date: "25 Sep 2025",
      title: "The standard Lorem Ipsum passage natus error sit voluptatem",
    }, 
    {
      image: blog,
      author: "Mark Thompson",
      date: "25 Sep 2025",
      title: "The standard Lorem Ipsum passage natus error sit voluptatem",
    },
    {
      image: blog, // ✅ fixed undefined variable (was bloblogg3)
      author: "Mark Thompson",
      date: "25 Sep 2025",
      title: "The standard Lorem Ipsum passage natus error sit voluptatem",
    },
  ];

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
          {blogs.map((item, index) => (
            <BlogCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
