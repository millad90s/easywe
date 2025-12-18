'use client';

import type { Property } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Badge } from './ui/badge';
import { Bath, BedDouble, Maximize, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const ownerAvatar = getPlaceholderImage(property.owner.avatarId);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {property.imageIds.map((id, index) => {
              const image = getPlaceholderImage(id);
              return (
                <CarouselItem key={index}>
                  <div className="aspect-[4/3] relative">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {property.imageIds.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-4" />
              <CarouselNext className="absolute right-4" />
            </>
          )}
        </Carousel>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start">
            <CardTitle className="mb-2 text-xl font-headline leading-tight">{property.title}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap">
            ${property.price.toLocaleString()}/mo
            </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{property.address}</p>
        <div className="mt-4 flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Contact Owner</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Property Owner</DialogTitle>
              <DialogDescription>
                You can reach out to the owner to ask questions or schedule a viewing.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Avatar>
                {ownerAvatar && <AvatarImage src={ownerAvatar.imageUrl} />}
                <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{property.owner.name}</p>
                <p className="text-sm text-muted-foreground">Property Owner</p>
              </div>
            </div>
             <DialogFooter className="sm:justify-start">
              <Button type="button">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message on Telegram
              </Button>
               <DialogClose asChild>
                 <Button type="button" variant="secondary">
                  Close
                </Button>
               </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
