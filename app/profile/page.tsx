'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Profile() {
    const [profile, setProfile] = useState({
        name: 'Thomas',
        bio: 'I mostly enjoy cycling, but will do a run from time to time! Trying to improve my times on medium distance bike rides.',
        location: 'Austin, TX',
        stravaId: '151008765',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Updated profile:', profile)
        // Here you would typically send the updated profile to your backend
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/10 to-primary/30">
            <header className="bg-primary text-primary-foreground">
                <nav className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold">straVault</Link>
                        <ul className="flex space-x-4">
                            <li><Link href="/open-challenges" className="hover:underline">Open Challenges</Link></li>
                            <li><Link href="/create-challenge" className="hover:underline">Create New Challenge</Link></li>
                            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-800">Profile</h1>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-background/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-xl font-semibold text-primary-700">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="bio" className="text-xl font-semibold text-primary-700">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                className="mt-1"
                                rows={4}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-xl font-semibold text-primary-700">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="stravaId" className="text-xl font-semibold text-primary-700">Strava ID</Label>
                            <Input
                                id="stravaId"
                                name="stravaId"
                                value={profile.stravaId}
                                onChange={handleChange}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-primary-700 mb-2">Open Challenges</h2>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/open-challenges">Benjakitti - gate to path end</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button type="submit" className="w-full">Update Profile</Button>
                    </div>
                </form>
            </main>

            <footer className="bg-primary/20 backdrop-blur-sm mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-primary-700">
                    &copy; {new Date().getFullYear()} straVault. All rights reserved.
                </div>
            </footer>
        </div>
    )
}