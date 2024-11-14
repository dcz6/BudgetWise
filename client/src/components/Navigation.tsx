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
    <nav className="border-b mb-6">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Budget Tracker</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={location === route.path ? "default" : "ghost"}
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
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {routes.map((route) => (
                  <DropdownMenuItem key={route.path} asChild>
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
