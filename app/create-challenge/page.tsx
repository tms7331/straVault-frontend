'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateChallenge() {
    const [formData, setFormData] = useState({
        successAddress: '',
        failureAddress: '',
        athleteId: '',
        maxTime: '',
        segmentId: '',
        deadline: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
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
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-800">Create a new challenge</h1>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-background/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="successAddress">Success Address</Label>
                            <Input
                                type="text"
                                id="successAddress"
                                name="successAddress"
                                value={formData.successAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="failureAddress">Failure Address</Label>
                            <Input
                                type="text"
                                id="failureAddress"
                                name="failureAddress"
                                value={formData.failureAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="athleteId">Athlete ID</Label>
                            <Input
                                type="text"
                                id="athleteId"
                                name="athleteId"
                                value={formData.athleteId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="maxTime">Max Time</Label>
                            <Input
                                type="text"
                                id="maxTime"
                                name="maxTime"
                                value={formData.maxTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="segmentId">Segment ID</Label>
                            <Input
                                type="text"
                                id="segmentId"
                                name="segmentId"
                                value={formData.segmentId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-6">Submit Challenge</Button>
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