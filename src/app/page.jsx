import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-primary/10 p-4 text-primary">
          <FileText className="h-12 w-12" />
        </div>
        <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          Welcome to Libala Connect
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your one-stop portal for community services. Access permits, certificates, and manage waste services with ease.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Libala Connect. All rights reserved.
      </footer>
    </main>
  );
}
