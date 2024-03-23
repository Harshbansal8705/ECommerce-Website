import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import LogoutPage from './pages/LogoutPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='logout' element={<LogoutPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='product/:id' element={<ProductDetailsPage />} />
        </Route>
    )
)

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
