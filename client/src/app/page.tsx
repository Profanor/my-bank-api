import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowDownIcon, ArrowUpIcon, BellIcon, CreditCardIcon, DollarSignIcon, LogOutIcon, MenuIcon, PieChartIcon, PlusIcon, SearchIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { SavingsGoalsChart } from "@/components/savings-goals-chart"
import { InvestmentPortfolioChart } from "@/components/investment-portfolio-chart"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <DollarSignIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Imperial Bank</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
              <CardDescription>Your current balance across all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">$12,345.67</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="bg-green-500 hover:bg-green-600">
                <PlusIcon className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Transfer</CardTitle>
              <CardDescription>Send money to your contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Recipient's name or email" />
                <Input type="number" placeholder="Amount" />
                <Button className="w-full">Send Money</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="flex items-center">
                    <ArrowDownIcon className="mr-2 h-4 w-4 text-green-500" />
                    Deposit
                  </span>
                  <span className="font-semibold">+$500.00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center">
                    <ArrowUpIcon className="mr-2 h-4 w-4 text-red-500" />
                    Withdrawal
                  </span>
                  <span className="font-semibold">-$200.00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center">
                    <ArrowUpIcon className="mr-2 h-4 w-4 text-blue-500" />
                    Transfer to Sarah
                  </span>
                  <span className="font-semibold">-$150.00</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">View All Transactions</Button>
            </CardFooter>
          </Card>
          <div className="col-span-full md:col-span-2">
            <SavingsGoalsChart />
          </div>
          <div className="col-span-full md:col-span-2 lg:col-span-1">
            <InvestmentPortfolioChart />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Services</CardTitle>
              <CardDescription>Access common banking services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex flex-col items-center py-6">
                  <CreditCardIcon className="mt-2 h-6 w-6" />
                  <span>Cards</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center py-6">
                  <PieChartIcon className="mt-2 h-6 w-6" />
                  <span>Budgeting</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center py-6">
                  <BellIcon className="mt-2 h-6 w-6" />
                  <span>Alerts</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center py-6">
                  <MenuIcon className="mt-2 h-6 w-6" />
                  <span>More</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
