import React from "react";
import Common_Banner from "../Components/Banner/Common_Banner";

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
      <main className="container mx-auto px-4 py-10">
        {children}
      </main>

    </div>
  );
};

export default Layout;
