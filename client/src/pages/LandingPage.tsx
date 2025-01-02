import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart3, PieChart, Wallet, Shield, ArrowRight, Command, Sparkles, ChartBar, TrendingUp, PiggyBank } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Animated Welcome Screen */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 items-center">
            {/* Journey Step 1 */}
            <div className="group relative p-6 rounded-lg bg-card border border-border/50 shadow-lg animate-in slide-in-from-left duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <PiggyBank className="h-6 w-6 text-primary animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Saving</h3>
              <p className="text-muted-foreground relative z-10">Begin your journey to financial freedom with smart budgeting tools.</p>
            </div>

            {/* Journey Step 2 */}
            <div className="group relative p-6 rounded-lg bg-card border border-border/50 shadow-lg animate-in slide-in-from-bottom delay-300 duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ChartBar className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground relative z-10">Monitor your spending patterns with intuitive visualizations.</p>
            </div>

            {/* Journey Step 3 */}
            <div className="group relative p-6 rounded-lg bg-card border border-border/50 shadow-lg animate-in slide-in-from-right delay-500 duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-primary animate-in spin-in-180" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Achieve Goals</h3>
              <p className="text-muted-foreground relative z-10">Reach your financial targets with data-driven insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6 animate-in slide-in-from-bottom duration-500">
            Smart Budget Management Made Simple
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom duration-500 delay-150">
            Take control of your finances with our intuitive budget tracking and analytics platform. 
            Monitor expenses, set budgets, and achieve your financial goals with ease.
          </p>
          <div className="flex gap-4 justify-center items-center flex-wrap animate-in slide-in-from-bottom duration-500 delay-300">
            <Button 
              size="lg" 
              asChild 
              className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/register">
                Get Started Free
                <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="group transition-all duration-300 hover:scale-105"
            >
              <Link href="/login">
                Sign In
                <Command className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-card rounded-lg p-6 text-card-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Wallet className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
            <p className="text-muted-foreground">
              Log and categorize your daily expenses effortlessly. Stay on top of your spending with our intuitive interface.
            </p>
          </div>

          <div className="group bg-card rounded-lg p-6 text-card-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <BarChart3 className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
            <p className="text-muted-foreground">
              Gain insights through beautiful, interactive charts. Make informed decisions with data-driven visualizations.
            </p>
          </div>

          <div className="group bg-card rounded-lg p-6 text-card-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <PieChart className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Categories</h3>
            <p className="text-muted-foreground">
              Organize spending with customizable budget categories. Track progress and optimize your budget allocation.
            </p>
          </div>

          <div className="group bg-card rounded-lg p-6 text-card-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Shield className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-muted-foreground">
              Rest easy knowing your financial data is protected with industry-leading security standards.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Your Finances?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who are already saving more and spending smarter with our powerful budgeting tools.
          </p>
          <Button 
            size="lg" 
            asChild 
            className="group animate-bounce hover:animate-none"
          >
            <Link href="/register">
              Start Your Free Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}