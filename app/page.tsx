import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <div>
        <h1 className="font-semibold ">Log in to your account</h1>
        <p className="text-gray-400 text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full"  >
            Login
          </Button>
          <div className="flex flex-row justify-center">
                   <span className="text-gray-500">Forget Password ?</span> <a href="" className="">Reset it</a>

          </div>
          <div className="flex flex-row justify-center">
                    <span className="text-gray-500">Don’t have an account?</span><a href="" className="">Sign up</a>

          </div>
        </form>
      </div>

    </div>
  );
}

