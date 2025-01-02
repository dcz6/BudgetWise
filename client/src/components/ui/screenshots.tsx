
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
      <div className="h-48 rounded bg-gradient-to-r from-primary/10 to-primary/5" />
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
