import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    return (
        <div className="flex flex-col">
            <div className="space-y-2">
                <div>
                    <h1 className="font-semibold ">Create your account</h1>
                    <p className="text-gray-400 text-sm">Join us and start saving your favorite links — organized, searchable, and always within reach.</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullname">Full name <span>*</span></Label>
                        <Input
                            id="fullname"
                            type="text"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address <span>*</span></Label>
                        <Input
                            id="email"
                            type="email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password <span>*</span></Label>
                        <Input
                            id="password"
                            type="password"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full"  >
                        Create account
                    </Button>
                    <div className="flex flex-row justify-center">
                        <span className="text-gray-500">Already have an account?</span> <a href="" className="">Login</a>

                    </div>
                </form>
            </div>
        </div>
    );
}

