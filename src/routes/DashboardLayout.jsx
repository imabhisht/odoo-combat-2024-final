import { BrowserRouter, Routes, Outlet, Route, Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import React from "react";
import img from "../images/Odoo-Hackathon.png";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
  Square2StackIcon,
  HomeIcon,
  FolderOpenIcon
} from "@heroicons/react/24/outline";
import Output from "../pages/Project/Output";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];
const sidebarNavigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "Projects", href: "/project", icon: FolderOpenIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout(props) {
  React.useEffect(() => {
    document.title = props.title;
  });

  const [activeItem, setActiveItem] = useState("Home");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };


  return (
    <>
      {/* Ensure the container wraps the DashboardLayout and spans full width */}
      <div className="min-h-screen bg-gray-100">
        <div className="flex h-full flex-col fixed w-full">
          {/* Top nav*/}
          <header className="relative flex h-16 flex-shrink-0 items-center bg-white">
            {/* Logo area */}
            <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
              <a
                href="#"
                className="flex h-16 w-16 items-center justify-center bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
              >
                <img
                  className="h-16 w-auto"
                  src={img}
                  alt="Your Company"
                />
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a4448b]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* Desktop nav area */}
            <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="relative max-w-2xl text-gray-400 focus-within:text-[#a4448b] ml-2">
                  <label htmlFor="desktop-search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="desktop-search"
                    type="search"
                    placeholder="Search"
                    className="block w-full border rounded border-gray-300 pl-12 placeholder-gray-500 focus:border-[#a4448b] focus:ring-[#a4448b] sm:text-lg"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 focus-within:text-[#a4448b]" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
                <nav aria-label="Global" className="flex space-x-10">
                  <a href="#" className="text-sm font-medium text-gray-900 hover:text-[#a4448b]">
                    Inboxes
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900 hover:text-[#a4448b]">
                    Reporting
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-900 hover:text-[#a4448b]">
                    Settings
                  </a>
                </nav>
                <div className="flex items-center space-x-8">
                  <span className="inline-flex">
                    <a href="#" className="-mx-1 rounded-full bg-white p-1 text-gray-400 hover:text-[#a4448b]">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </span>

                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#a4448b] focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile menu */}
          <Transition
            show={mobileMenuOpen}
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pt-5 pb-2">
                      <button
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="space-y-6 px-4 py-6">
                      <div className="relative max-w-2xl text-gray-400 focus-within:text-[#a4448b]">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <input
                          id="mobile-search"
                          type="search"
                          placeholder="Search"
                          className="block w-full border rounded border-gray-300 pl-12 placeholder-gray-500 focus:border-[#a4448b] focus:ring-[#a4448b] sm:text-lg"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 focus-within:text-[#a4448b]" aria-hidden="true" />
                        </div>
                      </div>
                      <nav className="space-y-1">
                        {navigation.map((item) => (
                          <div key={item.name}>
                            <a href={item.href} className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#a4448b]">
                              {item.name}
                            </a>
                            {item.children.map((child) => (
                              <a key={child.name} href={child.href} className="ml-4 block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#a4448b]">
                                {child.name}
                              </a>
                            ))}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          {/* Bottom section */}
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Narrow sidebar*/}
            <nav
              style={{ height: "100vh" }}
              aria-label="Sidebar"
              className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
            >
              <div className="relative flex flex-col space-y-3 p-3">
                {sidebarNavigation.map((item) => (
                  <Link to={item.href} key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        activeItem === item.name
                          ? "bg-gray-900 text-white"
                          : "text-gray-400 hover:bg-gray-700",
                        "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
                      )}
                      onClick={() => handleClick(item.name)} // Handle click and update active item
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Main area */}
            <main className="min-w-0 flex-1 border-gray-200 lg:flex">
              <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last">
                <Outlet />
              </section>
            </main>
          </div>

        </div>
      </div>
    </>
  );
}