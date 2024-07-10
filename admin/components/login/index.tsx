"use client";
import Image from "next/image";
import Input from "../input";
import { useState } from "react";
import Button from "../button";
import useLoginUser from "@/hooks/useLoginUser";

export default function Login() {
    const { mutateAsync: loginUser } = useLoginUser();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [info, setInfo] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!info.email || !info.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            await loginUser(info);
            window.location.href = '/';
        } catch(error: any) {
            setError(error.message);
            setLoading(false);
        }
    }

    const updateInfo = (key: keyof typeof info, value: string) => {
        setError(null);
        setInfo({
            ...info,
            [key]: value,
        })
    }

    return(
        <main className="h-screen flex flex-col justify-center items-center">
            <Image 
                className="mb-5"
                src={'/logo.png'}
                width={320}
                height={47}
                alt="Logo"
            />
            <form 
                className="w-[550px] p-5 bg-primary rounded-md"
                onSubmit={handleSubmit}
            >
                <Input 
                    onChange={text => updateInfo('email', text)}
                    className="mb-3"
                    placeholder="Email"
                    value={info.email}
                />
                <Input 
                    onChange={text => updateInfo('password', text)}
                    className="mb-3"
                    placeholder="Password"
                    value={info.password}
                    type="password"
                />
                {error && (
                    <span className="block mb-3">
                        {error}
                    </span>
                )}
                <Button 
                    className="w-full"
                    disabled={loading}
                    buttonType="submit"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
        </main>
    )
}