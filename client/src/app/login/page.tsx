'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSignIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useLoginMutation } from '@/state/services/auth.service'
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [ login, { isLoading } ] = useLoginMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      console.error('please fill all required fields');
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "please fill in all required fields",
      })
      return;
    }
    login({
      email,
      password
    })
    .unwrap()
    .then((response: unknown) => {
      console.log('login successful', response);
      toast({
        variant: "default",
        title: "Success",
        description: "Welcome to Imperial Bank!",
      })
      setTimeout(() => {
        router.push('/');
      }, 3000)
    })
    .catch((error) => {
    console.error('Login failed', error);
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Incorrect email or password. Please try again.",
      action: <ToastAction onClick={handleLogin} altText={'Retry'}>Retry</ToastAction>
    });
  });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <DollarSignIcon className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            className="w-full"
            onClick={handleLogin}
            disabled={isLoading}
            >{isLoading ? "Loading..." : "Login"}
              </Button>
          <Link href="/forgot-password" className="mt-2 text-sm text-center text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </CardFooter>
        <div className="mt-4 mb-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}