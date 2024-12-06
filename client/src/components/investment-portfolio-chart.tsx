"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const portfolioData = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 10500 },
  { month: "Mar", value: 11200 },
  { month: "Apr", value: 11800 },
  { month: "May", value: 12100 },
  { month: "Jun", value: 12800 },
]

export function InvestmentPortfolioChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
        <CardDescription>6-month performance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>Starting Value: $10,000</div>
          <div>Current Value: $12,800</div>
          <div>Growth: +28%</div>
        </div>
      </CardContent>
    </Card>
  )
}

