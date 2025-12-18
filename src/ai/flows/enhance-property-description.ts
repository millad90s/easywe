/**
 * @fileOverview This file defines a Genkit flow to enhance property descriptions using AI.
 *
 * - enhancePropertyDescription - A function that enhances a given property description.
 * - EnhancePropertyDescriptionInput - The input type for the enhancePropertyDescription function.
 * - EnhancePropertyDescriptionOutput - The output type for the enhancePropertyDescription function.
 */
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePropertyDescriptionInputSchema = z.object({
  address: z.string().describe('The full address of the property.'),
  price: z.number().describe('The rental price of the property per month.'),
  amenities: z.string().describe('A comma-separated list of amenities offered by the property.'),
  description: z.string().describe('The original description of the property provided by the owner.'),
});
export type EnhancePropertyDescriptionInput = z.infer<typeof EnhancePropertyDescriptionInputSchema>;

const EnhancePropertyDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The AI-enhanced property description.'),
});
export type EnhancePropertyDescriptionOutput = z.infer<typeof EnhancePropertyDescriptionOutputSchema>;

export async function enhancePropertyDescription(
  input: EnhancePropertyDescriptionInput
): Promise<EnhancePropertyDescriptionOutput> {
  return enhancePropertyDescriptionFlow(input);
}

const enhancePropertyDescriptionPrompt = ai.definePrompt({
  name: 'enhancePropertyDescriptionPrompt',
  input: {schema: EnhancePropertyDescriptionInputSchema},
  output: {schema: EnhancePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter.

  Given the following details about a property, enhance the description to be more engaging and attractive to potential renters. Focus on highlighting the best features and creating a sense of desire.

  Address: {{{address}}}
  Price: {{{price}}}
  Amenities: {{{amenities}}}
  Original Description: {{{description}}}

  Enhanced Description:`,
});

const enhancePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'enhancePropertyDescriptionFlow',
    inputSchema: EnhancePropertyDescriptionInputSchema,
    outputSchema: EnhancePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await enhancePropertyDescriptionPrompt(input);
    return output!;
  }
);
