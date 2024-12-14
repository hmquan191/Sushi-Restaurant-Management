"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Replace with the icon library you use
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center w-full px-10">
        {/* Logo */}
        <Link href="/" className="mr-auto">
          <img
            src="/logo.png"
            alt="Tokyo Deli"
            className="h-40 w-50" // Adjust logo size
          />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex justify-center content-center text-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/express" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  GIỚI THIỆU
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/menu" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  THỰC ĐƠN
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/promotions" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  THÔNG TIN - KHUYẾN MÃI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/home" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  THẺ THÀNH VIÊN
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/catering" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  HỆ THỐNG CHI NHÁNH
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contacts" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  LIÊN HỆ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Cart Button */}
          <Link href="/cart" legacyBehavior passHref>
            <a className="relative inline-flex items-center">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </a>
          </Link>

          {/* Registration and Login */}
          <Link href="/registration" legacyBehavior passHref>
            <Button variant="outline">ĐĂNG KÝ</Button>
          </Link>
          <Link href="/login" legacyBehavior passHref>
            <Button variant="outline">ĐĂNG NHẬP</Button>
          </Link>

          {/* Order Now Button */}
          <Link href="/cart" legacyBehavior passHref>
            <Button className="bg-red-600 hover:bg-red-700">ĐẶT HÀNG NGAY</Button>
          </Link>

        </div>
      </div>
    </header>
  );
}