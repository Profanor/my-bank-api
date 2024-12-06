'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeftIcon, ArrowDownIcon, ArrowUpIcon, SearchIcon } from 'lucide-react'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'transfer'
  amount: number
  description: string
  date: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // simulate fetching transactions
    setTimeout(() => {
      setTransactions([
        { id: '1', type: 'deposit', amount: 500, description: 'Salary', date: '2023-05-01' },
        { id: '2', type: 'withdrawal', amount: 200, description: 'ATM Withdrawal', date: '2023-05-02' },
        { id: '3', type: 'transfer', amount: 150, description: 'Transfer to Sarah', date: '2023-05-03' },
        { id: '4', type: 'deposit', amount: 1000, description: 'Freelance Payment', date: '2023-05-05' },
        { id: '5', type: 'withdrawal', amount: 50, description: 'Grocery Shopping', date: '2023-05-06' },
        { id: '6', type: 'transfer', amount: 300, description: 'Rent Payment', date: '2023-05-07' },
        { id: '7', type: 'deposit', amount: 200, description: 'Refund', date: '2023-05-08' },
        { id: '8', type: 'withdrawal', amount: 75, description: 'Dinner', date: '2023-05-09' },
        { id: '9', type: 'transfer', amount: 100, description: 'Phone Bill', date: '2023-05-10' },
        { id: '10', type: 'deposit', amount: 5000, description: 'Bonus', date: '2023-05-15' },
      ])
    }, 1000)
  }, [])

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeftIcon className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>View and search your transaction history</CardDescription>
              </div>
            </div>
            <div className="relative w-64">
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      {transaction.type === 'deposit' && <ArrowDownIcon className="mr-2 h-4 w-4 text-green-500" />}
                      {transaction.type === 'withdrawal' && <ArrowUpIcon className="mr-2 h-4 w-4 text-red-500" />}
                      {transaction.type === 'transfer' && <ArrowUpIcon className="mr-2 h-4 w-4 text-blue-500" />}
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-1/3">Load More</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

