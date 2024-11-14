import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, Link } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Navigation from "./components/Navigation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig 
      value={{ 
        fetcher,
        loadingTimeout: 3000,
        onError: (error) => {
          console.error("SWR Error:", error);
        }
      }}
    >
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="py-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/categories" component={Categories} />
            <Route path="/expenses" component={Expenses} />
            <Route>
              <div className="container mx-auto p-4 text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-muted-foreground">Page not found</p>
                <Button asChild className="mt-4">
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
      <Toaster />
    </SWRConfig>
  </StrictMode>,
);
