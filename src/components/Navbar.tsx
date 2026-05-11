
import './Navbar.css'
function Navbar(){
    return(
        <>
         <nav className="navbar navbar-expand-lg w-150 navbar-dark custom-navbar sticky-top">
      <div className="container">
        <h1>My Porfolio</h1>
        <div>
        <div className="navbar-nav ms-auto">
            <ul className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </ul>
            <ul className="nav-item">
              <a className="nav-link" href="#aboutme">About Me</a>
            </ul>
            <ul className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </ul>
        </div>
        </div>
          
        </div>
    </nav>
        </>
    )
}
export default Navbar;