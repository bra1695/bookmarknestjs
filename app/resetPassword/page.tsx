import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    return (
        <div className="flex flex-col">
            <div className="space-y-2">
                <div>
                    <h1 className="font-semibold ">Reset Your Password</h1>
                    <p className="text-gray-400 text-sm">Enter your new password below. Make sure it’s strong and secure.</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password <span>*</span></Label>
                        <Input
                            id="password"
                            type="password"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password <span>*</span></Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full"  >
                        Reset Password
                    </Button>
                    <div className="flex flex-row justify-center">
                         <a href="" className="">Back to login</a>

                    </div>
                </form>
            </div>
        </div>
    );
}

