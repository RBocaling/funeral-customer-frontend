const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4 relative z-[51]">
      <ul>
        <li>
          <a href="/dashboard" className="block py-2">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/booking" className="block py-2">
            Booking
          </a>
        </li>
        <li>
          <a href="/messages" className="block py-2">
            Messages
          </a>
        </li>
        <li>
          <a href="/services" className="block py-2">
            Services
          </a>
        </li>
        <li>
          <a href="/online-burial" className="block py-2">
            Online Burial
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
