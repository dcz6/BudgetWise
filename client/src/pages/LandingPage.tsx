import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart3, PieChart, Wallet, Shield, ArrowRight, Command, Sparkles, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export default function LandingPage() {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const { theme, setTheme } = useTheme();

  const demoData = [
    { month: "Jan", budget: 1000, spent: 800 },
    { month: "Feb", budget: 1000, spent: 900 },
    { month: "Mar", budget: 1000, spent: 750 },
    { month: "Apr", budget: 1000, spent: 950 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 transition-all" />
          ) : (
            <Moon className="h-5 w-5 transition-all" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-2xl font-semibold text-primary animate-in slide-in-from-bottom duration-500">
            Welcome to BudgetWise
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6 animate-in slide-in-from-bottom duration-500">
            Smart Budget Management Made Simple with BudgetWise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom duration-500 delay-150">
            Take control of your finances with BudgetWise's intuitive tracking and analytics platform. 
            Monitor expenses, set budgets, and achieve your financial goals with ease.
          </p>
          <div className="flex gap-4 justify-center items-center flex-wrap animate-in slide-in-from-bottom duration-500 delay-300">
            <Button 
              size="lg" 
              asChild 
              className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/register">
                Try BudgetWise Free
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

      {/* Interactive Demo Widget */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-4xl mx-auto bg-card rounded-xl p-6 shadow-lg border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-center">Try BudgetWise Demo</h3>
          <div className="relative h-[300px] bg-background rounded-lg p-4">
            <div className="flex justify-between mb-4">
              {demoData.map((item, index) => (
                <motion.div
                  key={item.month}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-32 w-8 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="absolute bottom-0 w-full bg-primary rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.spent / item.budget) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">{item.month}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <Button 
              onClick={() => setIsDemoActive(!isDemoActive)}
              className="group"
            >
              {isDemoActive ? "Reset Demo" : "Start Demo"}
              <motion.span
                className="ml-2"
                animate={{ rotate: isDemoActive ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <BarChart3 className="h-4 w-4" />
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Animated Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Wallet,
              title: "Smart Tracking",
              description: "BudgetWise makes expense tracking effortless. Stay on top of your spending with our intuitive interface."
            },
            {
              icon: BarChart3,
              title: "Visual Analytics",
              description: "Gain insights through beautiful, interactive charts. Make informed decisions with data-driven visualizations."
            },
            {
              icon: PieChart,
              title: "Smart Categories",
              description: "Organize spending with customizable budget categories. Track progress and optimize your budget allocation."
            },
            {
              icon: Shield,
              title: "Bank-Grade Security",
              description: "Rest easy knowing your financial data is protected with BudgetWise's industry-leading security standards."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group bg-card rounded-lg p-6 text-card-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                whileHover={{ rotate: 12 }}
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Your Finances with BudgetWise?</h2>
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