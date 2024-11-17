'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Proof, WebProof } from '@vlayer/sdk'
import { callProver, getVerified, getWebProof } from '@/lib/prove'
import { Hex } from "viem";


type ClaimStep = 'initial' | 'start' | 'prover' | 'verifier' | 'success'

export default function OpenChallenges() {
    const [challengeStatus, setChallengeStatus] = useState<'Active' | 'Success'>('Active')
    const [claimStep, setClaimStep] = useState<ClaimStep>('initial')

    const [webProof, setWebProof] = useState<WebProof | null>(null)
    const [proof, setProof] = useState<Proof | null>(null)
    const [proofId, setProofId] = useState<string | null>(null)
    const [proofHash, setProofHash] = useState<Hex | null>(null)

    const handleStartClaim = async () => {
        console.log("Starting claim process")
        const webProof = await getWebProof()
        setWebProof(webProof)
        setClaimStep('start')
    }

    const handleCallProver = async () => {
        console.log("Calling prover")
        if (!webProof) {
            console.error("WebProof is null")
            return
        }
        const [proof, proofId, proofHash] = await callProver(webProof)
        console.log("Proof:", proof)
        console.log("Proof ID:", proofId)
        console.log("Proof Hash:", proofHash)
        setProof(proof)
        setProofId(proofId)
        setProofHash(proofHash)
        setClaimStep('prover')
    }

    const handleCallVerifier = async () => {
        console.log("Calling verifier")
        if (!proof || !proofId || !proofHash) {
            console.error("Proof, proofId, or proofHash is null")
            return
        }
        await getVerified(proof, proofId, proofHash);
        setClaimStep('success')
        setChallengeStatus('Success')
    }

    const getClaimButton = () => {
        switch (claimStep) {
            case 'initial':
                return <Button onClick={handleStartClaim} variant="default">Start Claim</Button>
            case 'start':
                return <Button onClick={handleCallProver} variant="default">Call Prover</Button>
            case 'prover':
                return <Button onClick={handleCallVerifier} variant="default">Call Verifier</Button>
            default:
                return null
        }
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
                            <CardTitle className="text-2xl font-bold">
                                <Link href="https://www.strava.com/segments/25981978" className="hover:underline" target="_blank" rel="noopener noreferrer">
                                    Benjakitti - gate to path end
                                </Link>
                            </CardTitle>
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
                        <p><strong>Max Time:</strong> 8 Minutes 20 seconds</p>
                        <p><strong>Description:</strong> Raising money for charity trying to set a Strava record on this segment. Donate to 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 to support me! If I fail, the money will be sent to Bitboy instead.</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        {claimStep !== 'success' && (
                            <>
                                {getClaimButton()}
                                <Button variant="destructive">Claim Failure</Button>
                            </>
                        )}
                    </CardFooter>
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