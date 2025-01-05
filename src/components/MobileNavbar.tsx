"use client";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden item-center space-x-2">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger>
          <Button variant={"ghost"} size="icon">
            <MenuIcon className="h-5 w-5">Menu</MenuIcon>
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant={"ghost"}
              className="flex items-center gap-3 justify-start"
            >
              <Link href={"/"}>
                <HomeIcon className="w-4 h-4">Home</HomeIcon>
              </Link>
            </Button>
          </nav>

          {isSignedIn ? (
            <>
              <Button
                variant={"ghost"}
                className="flex items-center gap-3 justify-start"
              >
                <Link href={"/notifications"}>
                  <BellIcon className="w-4 h-4">Notifications</BellIcon>
                </Link>
              </Button>
              <Button
                variant={"ghost"}
                className="flex items-center gap-3 justify-start"
                asChild
              >
                <Link href={"/profile"}>
                  <UserIcon>Profile</UserIcon>
                </Link>
              </Button>
              <SignOutButton>
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-3 justify-start w-full"
                >
                  <LogOutIcon>Logout</LogOutIcon>
                </Button>
              </SignOutButton>
            </>
          ) : (
            <>
              <SignInButton>
                <Button variant={"default"}>Sign In </Button>
              </SignInButton>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
