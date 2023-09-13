
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import Cart from "./pages/Cart";
import SignUpPage from "./pages/SignUpPage";
const NoPage= ()=>{
  return <h1>404 Pages not Found</h1>;
}
// eslint-disable-next-line

function App() {

  
  return (
    <div className="App">
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin-dashboard/:userData" element={<AdminDashBoard />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    // <Categories/>
  );
}



export default App;
