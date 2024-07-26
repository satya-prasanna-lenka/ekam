const Footer = () => {
  return (
    <footer className="myFooter">
      <div className="text-center p-4">
        © {new Date().getFullYear()} Wellness Retreats. All rights reserved.
        {/* <a className="text-reset fw-bold" href="https://shoonya.life/">
          Shoonya
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
