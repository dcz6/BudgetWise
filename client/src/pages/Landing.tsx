import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, PieChart, LineChart, CalendarDays, Settings } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="font-bold tracking-tight text-4xl sm:text-6xl mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Take Control of Your Finances
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          BudgetWise helps you track expenses, manage budgets, and achieve your financial goals with powerful visualization tools and intuitive controls.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Button asChild size="lg" className="text-lg">
            <Link href="/register">
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl -m-2 group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-6 rounded-2xl border bg-card text-card-foreground">
              <PieChart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Smart Budget Tracking</h3>
              <p className="text-muted-foreground">
                Set and monitor category-based budgets with interactive charts and real-time spending insights.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl -m-2 group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-6 rounded-2xl border bg-card text-card-foreground">
              <LineChart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Visual Analytics</h3>
              <p className="text-muted-foreground">
                Understand your spending patterns with beautiful, interactive charts and trend analysis.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl -m-2 group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-6 rounded-2xl border bg-card text-card-foreground">
              <CalendarDays className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Monthly Insights</h3>
              <p className="text-muted-foreground">
                Track your progress with detailed monthly summaries and customizable reports.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl -m-2 group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-6 rounded-2xl border bg-card text-card-foreground">
              <Settings className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Customizable Categories</h3>
              <p className="text-muted-foreground">
                Create and manage custom budget categories with color coding and flexible limits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl font-bold">Ready to Start?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who are taking control of their finances with BudgetWise.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link href="/register">
              Create Free Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
