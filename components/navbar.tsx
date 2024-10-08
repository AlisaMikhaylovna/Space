"use client";

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { UserButton } from '@/components/userbutton';
import { currentUser } from '@/lib/current-user';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';

export const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    const serverId = pathname?.split('/')[2];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await currentUser();
                //@ts-ignore 
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null); // Optionally handle error state
            }
        };

        fetchUser();
    }, []);

    return (
        <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
            {user && (
                <div className="flex gap-x-2">
                    <Button
                        asChild
                        variant={pathname?.includes("channels") ? "default" : "outline"}
                    >
                        <Link href={`/servers/${serverId}/channels`}>Message</Link>
                    </Button>
                    <Button
                        asChild
                        variant={pathname?.includes("topics") ? "default" : "outline"}
                    >
                        <Link href={`/servers/${serverId}/topics`}>Topic</Link>
                    </Button>
                    <Button
                        asChild
                        variant={pathname?.includes("blog") ? "default" : "outline"}
                    >
                        <Link href={`/servers/${serverId}/blog`}>Blog</Link>
                    </Button>
                </div>
            )}
            <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
                {user ? (
                    <UserButton user={user} />
                ) : (
                    <Link href='/sign-in' className={buttonVariants()}>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};
