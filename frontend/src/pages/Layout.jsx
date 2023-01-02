import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

Layout.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
