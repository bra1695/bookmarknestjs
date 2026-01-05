import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    return (
        <div className="flex flex-col">
            <div className="space-y-2">
                <div>
                    <h1 className="font-semibold ">Forgot your password?</h1>
                    <p className="text-gray-400 text-sm">Enter your email address below and we’ll send you a link to reset your password.</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email <span>*</span></Label>
                        <Input
                            id="email"
                            type="email"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full"  >
                        Send reset link
                    </Button>
                    <div className="flex flex-row justify-center">
                         <a href="" className="">Back to login</a>

                    </div>
                </form>
            </div>
        </div>
    );
}

