import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
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
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-800">straVault</h1>
          <p className="text-xl md:text-2xl text-primary-700">
            Challenge Yourself and your Friends on Strava
          </p>
        </section>

        <section className="max-w-2xl mx-auto bg-background/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-700">How it works:</h2>
          <ol className="list-decimal list-inside space-y-4 text-foreground">
            <li>Choose a Strava segment and a time goal, along with a deadline. You can create a challenge for yourself, or for a friend.</li>
            <li>Next, choose where the money should go if you succeed, as well as where it should go if you fail.</li>
            <li>Finally - get outside and complete the challenge!</li>
          </ol>
        </section>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/create-challenge">Create Your First Challenge</Link>
          </Button>
        </div>
      </main>

      <footer className="bg-primary/20 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-primary-700">
          &copy; {new Date().getFullYear()} straVault. All rights reserved.
        </div>
      </footer>
    </div>
  )
}