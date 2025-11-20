import React from "react";
import Common_Banner from "../Components/Banner/Common_Banner";
import FaqSection from "../Section/FaqSection/FaqSection";

const Layout = ({ children, banner }) => {
  return (
    <div>
      {/* ✅ Banner section (only show when page passes banner props) */}
      {banner && (
        <Common_Banner
          titleFirst={banner.titleFirst}
          titleLast={banner.titleLast}
          breadcrumb={banner.breadcrumb}
        />
      )}

      {/* ✅ Page content */}
      <main className="">{children}</main>
      <FaqSection  bgColor={banner.bgColor} searchBar={banner.searchBar} />
    </div>
  );
};

export default Layout;
