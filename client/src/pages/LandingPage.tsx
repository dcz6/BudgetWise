import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart3, PieChart, Wallet, Shield, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
          Smart Budget Management Made Simple
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Take control of your finances with our intuitive budget tracking and analytics platform. 
          Monitor expenses, set budgets, and achieve your financial goals.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild className="transition-all duration-200 hover:scale-105">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-all duration-200 hover:scale-105">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card rounded-lg p-6 text-card-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
            <p className="text-muted-foreground">
              Easily log and categorize your daily expenses with our intuitive interface.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-card-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
            <p className="text-muted-foreground">
              Understand your spending patterns with beautiful and interactive charts.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-card-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Budget Categories</h3>
            <p className="text-muted-foreground">
              Organize and track spending with customizable budget categories.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-card-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your financial data is protected with industry-standard security.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who are already managing their finances smarter.
        </p>
        <Button size="lg" asChild className="group">
          <Link href="/register">
            Start Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
