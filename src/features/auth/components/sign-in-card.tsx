import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-separator"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SignInFlow } from "../types"
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();

    const handleProviderSignIn = (value: "github" | "google") => {
        signIn(value)
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">
                    Masuk untuk Melanjutkan
                </CardTitle>
                <CardDescription>
                    Gunakan email Anda atau layanan lain untuk melanjutkan.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" action="">
                    <Input
                        disabled={false}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        required
                        name="email"
                    />
                    <Input
                        disabled={false}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        required
                        name="password"
                    />
                    <Button className="w-full" size='lg' disabled={false} type="submit">
                        Lanjutkan
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={false}
                        onClick={() => handleProviderSignIn("google")}
                        variant="outline"
                        size='lg'
                        className="w-full relative flex items-center gap-2">
                        <FcGoogle size={18} className="absolute left-2.5 top-2.5" />
                        Masuk dengan Google
                    </Button>
                    <Button
                        disabled={false}
                        onClick={() => handleProviderSignIn("github")}
                        variant="outline"
                        size='lg'
                        className="w-full relative flex items-center gap-2">
                        <FaGithub size={18} className="absolute left-2.5 top-2.5" />
                        Masuk dengan Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Tidak ada akun? <span onClick={() => setState('signUp')} className="text-sky-700 hover:underline cursor-pointer">Daftar Sekarang</span>
                </p>
            </CardContent>
        </Card>
    )
}