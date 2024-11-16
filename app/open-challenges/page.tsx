'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function OpenChallenges() {
    const [challengeStatus, setChallengeStatus] = useState<'Active' | 'Success'>('Active')
    const [showButtons, setShowButtons] = useState(true)

    const handleClaimSuccess = () => {
        setChallengeStatus('Success')
        setShowButtons(false)
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
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-800">Open Challenges</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">Benjakitti - gate to path end</CardTitle>
                            <div
                                className={`px-3 py-1 rounded-md text-white font-medium ${challengeStatus === 'Active' ? 'bg-green-500' : 'bg-blue-500'
                                    }`}
                            >
                                Status: {challengeStatus}
                            </div>
                        </div>
                        <CardDescription>Athlete: Thomas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Deadline:</strong> Nov 27, 2024</p>
                        <p><strong>Max Time:</strong> 500 seconds</p>
                        <p><strong>Description:</strong> Raising money for charity trying to set a Strava record on this segment. Donate to 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 to support me! If I fail, the money will be sent to Bitboy instead.</p>
                    </CardContent>
                    {showButtons && (
                        <CardFooter className="flex justify-end space-x-2">
                            <Button onClick={handleClaimSuccess} variant="default">Claim Success</Button>
                            <Button variant="destructive">Claim Failure</Button>
                        </CardFooter>
                    )}
                </Card>
            </main>

            <footer className="bg-primary/20 backdrop-blur-sm mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-primary-700">
                    &copy; {new Date().getFullYear()} straVault. All rights reserved.
                </div>
            </footer>
        </div>
    )
}