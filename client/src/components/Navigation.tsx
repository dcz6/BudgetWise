import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const routes = [
    { path: "/", label: "Dashboard" },
    { path: "/categories", label: "Categories" },
    { path: "/expenses", label: "Expenses" },
  ];

  return (
    <nav className="border-b mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Budget Tracker
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={location === route.path ? "default" : "ghost"}
                className="transition-colors duration-200 hover:bg-primary/10"
                asChild
              >
                <Link href={route.path}>{route.label}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="transition-colors duration-200 hover:bg-primary/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {routes.map((route) => (
                  <DropdownMenuItem 
                    key={route.path} 
                    className="cursor-pointer"
                    asChild
                  >
                    <Link href={route.path}>{route.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
