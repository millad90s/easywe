import CreateListingForm from './create-listing-form';

export default function CreateListingPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Create a New Listing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fill out the details below to list your property.
        </p>
      </div>
      <CreateListingForm />
    </div>
  );
}
