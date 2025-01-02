
import { cn } from "@/lib/utils";

interface ScreenshotProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  mockup: React.ReactNode;
}

export function Screenshot({ title, mockup, className }: ScreenshotProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative border rounded-lg shadow-2xl bg-background overflow-hidden transition-all duration-300 hover:scale-[1.02]">
        {mockup}
      </div>
      <p className="text-sm text-center text-muted-foreground">{title}</p>
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Monthly Overview</h2>
        <div className="flex gap-2">
          <div className="w-24 h-8 rounded bg-primary/10" />
          <div className="w-24 h-8 rounded bg-primary/10" />
        </div>
      </div>
      <div className="h-48 rounded overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 grid place-items-center">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path
                d="M0 180 C100 120, 200 160, 400 60 L400 200 L0 200 Z"
                fill="url(#area-gradient)"
              />
              <path
                d="M0 180 C100 120, 200 160, 400 60"
                fill="none"
                stroke="hsl(142.1 76.2% 36.3%)"
                strokeWidth="2"
              />
              {/* Data points */}
              <circle cx="0" cy="180" r="3" fill="hsl(142.1 76.2% 36.3%)" />
              <circle cx="100" cy="120" r="3" fill="hsl(142.1 76.2% 36.3%)" />
              <circle cx="200" cy="160" r="3" fill="hsl(142.1 76.2% 36.3%)" />
              <circle cx="400" cy="60" r="3" fill="hsl(142.1 76.2% 36.3%)" />
            </svg>
          </div>
          <div className="absolute inset-0 grid grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-l border-border/10 h-full first:border-l-0" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-t border-border/10 w-full first:border-t-0" />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Groceries</span>
          </div>
          <span>$450 / $600</span>
        </div>
        <div className="h-2 rounded-full bg-green-500 w-[75%]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Entertainment</span>
          </div>
          <span>$120 / $200</span>
        </div>
        <div className="h-2 rounded-full bg-blue-500 w-[60%]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Transportation</span>
          </div>
          <span>$180 / $300</span>
        </div>
        <div className="h-2 rounded-full bg-purple-500 w-[60%]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Utilities</span>
          </div>
          <span>$220 / $250</span>
        </div>
        <div className="h-2 rounded-full bg-orange-500 w-[88%]" />
      </div>
    </div>
  );
}

export function CategoryMockup() {
  return (
    <div className="p-4 grid gap-4 grid-cols-2">
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Groceries</span>
        </div>
        <p className="text-2xl font-bold">$600</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Entertainment</span>
        </div>
        <p className="text-2xl font-bold">$200</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span>Transportation</span>
        </div>
        <p className="text-2xl font-bold">$300</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span>Utilities</span>
        </div>
        <p className="text-2xl font-bold">$250</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
    </div>
  );
}

export function ExpensesMockup() {
  return (
    <div className="p-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-3 border-b bg-muted/50">
          <div>Date</div>
          <div>Category</div>
          <div>Description</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="divide-y">
          {[
            { date: "2024-01-15", category: "Groceries", description: "Weekly groceries", amount: 120 },
            { date: "2024-01-14", category: "Entertainment", description: "Movie tickets", amount: 30 },
            { date: "2024-01-14", category: "Transportation", description: "Monthly bus pass", amount: 85 },
            { date: "2024-01-13", category: "Utilities", description: "Electricity bill", amount: 95 },
            { date: "2024-01-12", category: "Groceries", description: "Fresh produce", amount: 45 },
            { date: "2024-01-11", category: "Entertainment", description: "Streaming service", amount: 15 },
          ].map((expense, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 p-3">
              <div>{expense.date}</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: expense.category === "Groceries" ? "#22c55e" : "#3b82f6"
                  }} 
                />
                {expense.category}
              </div>
              <div>{expense.description}</div>
              <div className="text-right">${expense.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
