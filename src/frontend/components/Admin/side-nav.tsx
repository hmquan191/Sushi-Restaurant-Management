'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminSideNavItem } from './admin-item';
import { House, Users, BookOpen, User, CalendarCheck, List, Utensils, Truck, NotepadText, MapPin, Building, Star } from 'lucide-react';

export const SIDENAV_ITEMS: AdminSideNavItem[] = [
  {
    title: 'Region',
    path: '/admin/region',
    icon: <MapPin size={24} />,
  },
  {
    title: 'Branch',
    path: '/admin/branch',
    icon: <Building size={24} />,
  },
  {
    title: 'Staffs',
    path: '/admin/staffs',
    icon: <Users size={24} />,
  },
  {
    title: 'Rating',
    path: '/admin/rating',
    icon: <Star size={24} />
  },
  {
    title: 'Menu-Combo',
    path: '/admin/menu-combo',
    icon: <BookOpen size={24} />,
  },
  {
    title: 'Sales',
    path: '/admin/sales',
    icon: <NotepadText size = {24} />,
  }
  // {
  //   title: 'Customers',
  //   path: '/admin/customers',
  //   icon: <User size={24} />,
  // },
  // {
  //   title: 'Reservations',
  //   path: '/admin/reservations',
  //   icon: <CalendarCheck size={24} />,
  // },
  // {
  //   title: 'Orders',
  //   path: '#',
  //   icon: <List size={24} />,
  // },
  // {
  //   title: 'Direct service',
  //   path: '/admin/orders/direct-service',
  //   icon: <Utensils size={24} />,
  // },
  // {
  //   title: 'Delivery',
  //   path: '/admin/orders/delivery',
  //   icon: <Truck size={24} />,
  // },
  // {
  //   title: 'Invoice',
  //   path: '/admin/invoice',
  //   icon: <NotepadText size={24} />,
  // },
];


export function SideNav() {
  return (
    <div className="md:w-60 pt-10 bg-zinc-100 h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};


const MenuItem = ({ item }: { item: AdminSideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-200 ${
              pathname.includes(item.path) ? 'bg-zinc-200' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-200 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
