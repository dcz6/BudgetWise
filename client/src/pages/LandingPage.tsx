import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-20 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Master Your Finances with BudgetWise
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Take control of your financial future with our intuitive budget tracking and management tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg">
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BudgetWise?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Budget Tracking",
              description: "Automatically categorize expenses and track your spending habits with intuitive visualizations."
            },
            {
              title: "Customizable Goals",
              description: "Set and monitor financial goals with progress tracking and smart notifications."
            },
            {
              title: "Secure & Private",
              description: "Your financial data is encrypted and protected. We prioritize your privacy and security."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of users who have transformed their financial habits with BudgetWise.
        </p>
        <Link href="/register">
          <Button size="lg" className="text-lg">
            Start Your Journey
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
