import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Products from 'pages/Products/Products'
import ProductDetail from 'pages/ProductDetail/ProductDetail'
// import AboutUs from 'pages/AboutUs/AboutUs';
// import Faq from 'pages/Faq/Faq';
// import PrivacyPolicy from 'pages/PrivacyPolicy/PrivacyPolicy';
// import DeliveryPolicy from 'pages/DeliveryPolicy/DeliveryPolicy';
// import ReturnExchangePolicy from 'pages/ReturnExchangePolicy/ReturnExchangePolicy';
import Login from 'pages/Login/Login'
import Dashboard from 'pages/Dashboard/Dashboard'
import ProductForm from 'pages/ProductForm/ProductForm'
import NotFound from 'pages/NotFound/NotFound'

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/product/:id', element: <ProductDetail /> },
  // Outras rotas comentadas...
  { path: '/admin', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  // Rota para cadastro de produto
  { path: '/product-form', element: <ProductForm /> },
  // Rota para edição de produto (id será capturado no ProductForm)
  { path: '/product-form/:id', element: <ProductForm /> },
  { path: '*', element: <NotFound /> },
])

export default function App() {
  return <RouterProvider router={routes} />
}
