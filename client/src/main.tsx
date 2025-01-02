import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CommandMenu } from "./components/CommandMenu";
import Landing from "./pages/Landing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
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
          <main>
            <Switch>
              <Route path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard">
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Route>
              <Route path="/categories">
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              </Route>
              <Route path="/expenses">
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              </Route>
            </Switch>
          </main>
        </div>
        <Toaster />
        <CommandMenu />
      </SWRConfig>
    </AuthProvider>
  </StrictMode>,
);