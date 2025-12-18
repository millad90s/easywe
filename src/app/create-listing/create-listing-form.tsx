'use client';

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Upload, X, Image as ImageIcon } from 'lucide-react';
import { enhanceDescriptionAction } from '../actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  address: z.string().min(10, 'Please enter a full address.'),
  price: z.coerce.number().min(1, 'Price must be a positive number.'),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(1),
  sqft: z.coerce.number().int().min(1),
  amenities: z.string().min(3, 'List at least one amenity.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateListingForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      address: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 1000,
      amenities: '',
      description: '',
    },
  });

  function onSubmit(values: FormValues) {
    // In a real app, this would submit the data to a server/database.
    console.log(values);
    toast({
        title: "Listing Submitted!",
        description: "Your property is now ready for review.",
    });
  }

  const handleEnhanceDescription = () => {
    const { address, price, amenities, description } = form.getValues();
    if (!description) {
        toast({
            variant: "destructive",
            title: "Cannot Enhance",
            description: "Please write a basic description first.",
        });
        return;
    }

    startTransition(async () => {
      const result = await enhanceDescriptionAction({
        address,
        price,
        amenities,
        description,
      });

      if (result.success) {
        form.setValue('description', result.data, { shouldValidate: true });
        toast({
          title: 'Description Enhanced!',
          description: 'The AI has improved your property description.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description: result.error,
        });
      }
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sunny 2-Bedroom Apartment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($/month)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sq. Ft.</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description & Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., In-unit Laundry, Parking, Pet Friendly"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a comma-separated list of amenities.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" onClick={handleEnhanceDescription} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Enhance with AI
            </Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Media Upload</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-border hover:border-primary/50">
                    <Upload className="w-10 h-10 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    <input id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple onChange={handleImageUpload} />
                </div>
                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative group aspect-video">
                                <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover rounded-md" />
                                <div className="absolute inset-0 flex items-center justify-center transition-colors bg-black/50 opacity-0 group-hover:opacity-100">
                                    <Button variant="destructive" size="icon" className="w-8 h-8" onClick={() => removeImage(index)}>
                                        <X className="w-4 h-4" />
                                        <span className="sr-only">Remove image</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          Create My Listing
        </Button>
      </form>
    </Form>
  );
}
