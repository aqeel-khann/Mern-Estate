import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const [search, setSearch] = useState('')
  const currentUser = useSelector((state) => state?.user?.user?.currentUser);
  const avatar = currentUser?.data?.avatar || currentUser?.avatar;
  const navigate = useNavigate()
  

  //handle Submit
  const handleSubmit = async (e) => {
     e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',search)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
    
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl=urlParams.get('serachTerm', search)
    if (searchTermFromUrl){
      setSearch(searchTermFromUrl)
    }
})
  

  return (
    <header className="bg-slate-300 shadow-lg">
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="text-sm sm:text-xl">
            <span className="text-slate-500 ">MERN</span>
            <span className="text-slate-700">-ESTATE</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent focus:outline-none rounded-lg w-24 sm:w-64"
            type="text"
            placeholder="Search..."
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hover:underline cursor-pointer hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hover:underline cursor-pointer hidden sm:inline">
              About
            </li>
          </Link>
          <Link to={currentUser ? "/profile" : "/login"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={avatar}
                alt="profile"
              />
            ) : (
              <span className="hover:underline cursor-pointer">Login</span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
