import {
  MdChat,
  MdDashboard,
  MdMail,
  MdOutlineSupervisorAccount,
  MdShop,
} from "react-icons/md";
import Layout from "./Layout";
import { Chat, Dashboard, Members, NotFound, Signin, Signup } from "./pages";
import IndividualChat from "./pages/chat/IndividualChat";
import {
  Orders,
  ProductAdd,
  ProductDetail,
  ProductEdit,
  ProductList,
  Products,
} from "./pages/Ecommerce";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Compose, Inbox, Mail } from "./pages/mailbox";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        name: "Dashboard",
        element: <Dashboard />,
        icon: MdDashboard,
      },
      {
        path: "/members",
        name: "Members",
        element: <Members />,
        icon: MdOutlineSupervisorAccount,
      },
      {
        path: "/chat",
        name: "Chat",
        element: <Chat />,
        icon: MdChat,
        children: [
          { name: "individualChat", path: ":userId/:productId", element: <IndividualChat /> },
        ],
      },
      {
        path: "/products",
        name: "E-commerce",
        element: <Products />,
        icon: MdShop,
        children: [
          {
            name: "productList",
            path: "product_list",
            element: <ProductList />,
          },
          { name: "productDetail", path: ":id", element: <ProductDetail /> },
          { name: "productEdit", path: ":id/edit", element: <ProductEdit /> },
          { name: "productAdd", path: "product_add", element: <ProductAdd /> },
          { name: "orders", path: "orders", element: <Orders /> },
        ],
      },
      {
        path: "/mail",
        name: "Mail Box",
        element: <Mail />,
        icon: MdMail,
        children: [
          { path: "inbox", name: "Inbox", element: <Inbox /> },
          { path: "compose", name: "Compose", element: <Compose /> },
        ],
      },
      {path: 'signin', element: <Signin /> },
      {path: 'signup', element: <Signup /> },
      {path: '*', element: <NotFound /> },
    ],
  },
];

function App() {
  let router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
