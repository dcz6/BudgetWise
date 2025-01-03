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
        <div className="w-full h-full relative p-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground py-4">
            <span>$800</span>
            <span>$600</span>
            <span>$400</span>
            <span>$200</span>
            <span>$0</span>
          </div>
          <div className="absolute right-0 left-12 bottom-0 h-6 flex justify-between text-xs text-muted-foreground px-4">
            <span>Jan 11</span>
            <span>Jan 12</span>
            <span>Jan 13</span>
            <span>Jan 14</span>
            <span>Jan 15</span>
          </div>
          <div className="absolute inset-0 mt-4 ml-12 mr-4 mb-6">
            <div className="relative w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <g className="grid">
                  {[...Array(6)].map((_, i) => (
                    <>
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 40}
                        x2="400"
                        y2={i * 40}
                        stroke="hsl(var(--border))"
                        strokeOpacity="0.15"
                      />
                      {[...Array(8)].map((_, j) => (
                        <line
                          key={`v-${j}`}
                          x1={j * 50}
                          y1="0"
                          x2={j * 50}
                          y2="200"
                          stroke="hsl(var(--border))"
                          strokeOpacity="0.15"
                        />
                      ))}
                    </>
                  ))}
                </g>
                <path
                  d="M0 120 C20 120, 30 80, 50 80 C70 80, 80 160, 100 160 C120 160, 130 40, 150 40 C170 40, 180 120, 200 120"
                  fill="none"
                  stroke="hsl(142.1 76.2% 36.3%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Groceries</span>
          </div>
          <span>$600 / $750</span>
        </div>
        <div className="h-2.5 rounded-full bg-green-500 w-full border border-gray-200" style={{ backgroundColor: 'white' }}>
          <div className="h-full rounded-full bg-green-500 w-[80%]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Transportation</span>
          </div>
          <span>$170 / $200</span>
        </div>
        <div className="h-2.5 rounded-full bg-blue-500 w-full border border-gray-200" style={{ backgroundColor: 'white' }}>
          <div className="h-full rounded-full bg-blue-500 w-[85%]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Entertainment</span>
          </div>
          <span>$145 / $300</span>
        </div>
        <div className="h-2.5 rounded-full bg-purple-500 w-full border border-gray-200" style={{ backgroundColor: 'white' }}>
          <div className="h-full rounded-full bg-purple-500 w-[48%]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Utilities</span>
          </div>
          <span>$220 / $250</span>
        </div>
        <div className="h-2.5 rounded-full bg-orange-500 w-full border border-gray-200" style={{ backgroundColor: 'white' }}>
          <div className="h-full rounded-full bg-orange-500 w-[88%]" />
        </div>
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
        <p className="text-2xl font-bold">$750.00</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Transportation</span>
        </div>
        <p className="text-2xl font-bold">$200.00</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span>Entertainment</span>
        </div>
        <p className="text-2xl font-bold">$300.00</p>
        <p className="text-sm text-muted-foreground">Monthly Budget</p>
      </div>
      <div className="p-4 border rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span>Utilities</span>
        </div>
        <p className="text-2xl font-bold">$250.00</p>
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
            { date: "2024-01-15", category: "Groceries", description: "Weekly groceries", amount: 300 },
            { date: "2024-01-14", category: "Groceries", description: "Fresh produce", amount: 300 },
            { date: "2024-01-14", category: "Transportation", description: "Monthly transit pass", amount: 170 },
            { date: "2024-01-13", category: "Utilities", description: "Electricity bill", amount: 220 },
            { date: "2024-01-12", category: "Entertainment", description: "Movie tickets", amount: 85 },
            { date: "2024-01-11", category: "Entertainment", description: "Streaming service", amount: 60 },
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