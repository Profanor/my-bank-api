"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const goalsData = [
  { name: "Emergency Fund", current: 5000, target: 10000 },
  { name: "Vacation", current: 2000, target: 5000 },
  { name: "New Car", current: 15000, target: 30000 },
  { name: "Home Down Payment", current: 50000, target: 100000 },
]

export function SavingsGoalsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
        <CardDescription>Track your progress towards financial objectives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goalsData.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{goal.name}</span>
                <span className="font-medium">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>
          ))}
        </div>
        <div className="mt-6 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={goalsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="current" fill="#3b82f6" name="Current" />
              <Bar dataKey="target" fill="#93c5fd" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

