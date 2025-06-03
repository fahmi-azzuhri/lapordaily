import React from "react";
import {
  Home,
  Users,
  MessageSquare,
  HelpCircle,
  Settings,
  BarChart3,
  LogOut,
  Eye,
  ShoppingCart,
  MessageCircle,
  DollarSign,
  Search,
  Menu,
} from "lucide-react";

export default function DashboardAdmin() {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Customers" },
    { icon: MessageSquare, label: "Message" },
    { icon: HelpCircle, label: "Help" },
    { icon: Settings, label: "Settings" },
    { icon: BarChart3, label: "Analytics" },
    { icon: LogOut, label: "Sign Out" },
  ];

  const recentOrders = [
    {
      name: "Star Refrigerator",
      price: "$1200",
      payment: "Paid",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      name: "Window AC",
      price: "$110",
      payment: "Due",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Speakers",
      price: "$620",
      payment: "Paid",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-600",
    },
    {
      name: "HP Laptop",
      price: "$110",
      payment: "Due",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      name: "Apple Watch",
      price: "$1200",
      payment: "Paid",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      name: "Wall Fan",
      price: "$110",
      payment: "Paid",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Adidas Shoes",
      price: "$620",
      payment: "Paid",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-600",
    },
    {
      name: "Denim Shirts",
      price: "$110",
      payment: "Due",
      status: "Delivered",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      name: "Casual Shoes",
      price: "$575",
      payment: "Paid",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Wall Fan",
      price: "$110",
      payment: "Paid",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      name: "Denim Shirts",
      price: "$110",
      payment: "Due",
      status: "Delivered",
      statusColor: "bg-blue-100 text-blue-600",
    },
  ];

  const recentCustomers = [
    { name: "David", avatar: "bg-orange-400", initials: "D" },
    { name: "Muhammad", avatar: "bg-gray-400", initials: "M" },
    { name: "Amelia", avatar: "bg-pink-400", initials: "A" },
    { name: "Olivia", avatar: "bg-green-400", initials: "O" },
    { name: "Amit", avatar: "bg-blue-400", initials: "A" },
    { name: "Ashley", avatar: "bg-purple-400", initials: "A" },
    { name: "John", avatar: "bg-red-400", initials: "J" },
    { name: "Anna", avatar: "bg-indigo-400", initials: "A" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
            </div>
            <span className="font-semibold text-lg">Brand Name</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Menu className="w-6 h-6 text-gray-600 lg:hidden" />
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Daily Views</p>
                  <p className="text-2xl font-bold text-gray-900">1,504</p>
                </div>
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-blue-500 p-6 rounded-xl shadow-sm text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Sales</p>
                  <p className="text-2xl font-bold">80</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Comments</p>
                  <p className="text-2xl font-bold text-gray-900">284</p>
                </div>
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Earning</p>
                  <p className="text-2xl font-bold text-gray-900">$7,842</p>
                </div>
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View All
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.payment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Customers */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Customers
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${customer.avatar} rounded-full flex items-center justify-center text-white font-medium`}
                      >
                        {customer.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
