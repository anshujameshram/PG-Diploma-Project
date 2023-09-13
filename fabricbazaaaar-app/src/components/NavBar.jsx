import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'

export default function NavBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const redirectToProducts = () => {
        navigate('/products');
      };

      function logout(){
            localStorage.removeItem('user')
            localStorage.removeItem('cart')
            
            navigate('/');
            return
          
      }
    const data = localStorage.getItem('user');
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      onSearch?onSearch(event.target.value):redirectToProducts();
    };
    return (
        <div><nav className="navbar">
            <div className="barnd-name"><a href="/"><span>FabricBazar</span>.com</a></div>
            <div className="nav-menu">
                <ul>
                    <li><Link to="/products">Men</Link></li>
                    <li><Link to="/products">Women</Link></li>
                    <li><Link to="/products">Kids</Link></li>
                </ul>
                <div className="nav-search-bar">
                    <form action="">
                    <input type="text" name="" id="" value={searchTerm} onChange={handleSearchChange}/>
                    </form>
                </div>
                <div className="use-icon">
                    <Link to="/login"><img src="/img/svgexport-7.svg" alt="" /></Link>
                    <Link to="/cart"><img src="/img/CartNav.svg" alt="" /></Link>
                    {data==='user'?<div onClick={logout}><img src="/img/power-off-line-icon.svg" alt="" style={{width : "30px",marginLeft:"20px"}}/></div>:""}
                </div>
            </div>
        </nav></div>
    )
}
