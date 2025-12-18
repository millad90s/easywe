import Link from 'next/link';
import { Home, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              PropConnect Mini
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/create-listing">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Listing
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
