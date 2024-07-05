import {
  MdChat,
  MdDashboard,
  MdMail,
  MdManageAccounts,
  MdOutlineCurrencyExchange,
  MdOutlineRemoveRedEye,
  MdOutlineSupervisorAccount,
  MdShop,
} from "react-icons/md";

const summary = [
  { icon: MdOutlineRemoveRedEye, amount: 132323, name: "views" },
  { icon: MdOutlineCurrencyExchange, amount: 202303, name: "sales" },
  { icon: MdManageAccounts, amount: 323, name: "members" },
  { icon: MdShop, amount: 532323, name: "customers" },
];

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "Dashboard",
        icon: MdDashboard,
      },
      {
        path: "/members",
        name: "Members",
        icon: MdOutlineSupervisorAccount,
      },
      {
        path: "/products",
        name: "E-commerce",
        icon: MdShop,
        children: [
          {
            name: "productList",
            path: "product_list",
          },
          { name: "productAdd", path: "product_add" },
          { name: "orders", path: "orders" },
        ],
      },
      {
        path: "/mail",
        name: "Mail Box",
        icon: MdMail,
        children: [
          { path: "inbox", name: "Inbox" },
          { path: "compose", name: "Compose" },
        ],
      },
    ],
  },
];

export { summary, routes };
