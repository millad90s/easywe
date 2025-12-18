'use server';

import { enhancePropertyDescription, EnhancePropertyDescriptionInput } from '@/ai/flows/enhance-property-description';
import { z } from 'zod';

const ActionInputSchema = z.object({
  address: z.string(),
  price: z.number(),
  amenities: z.string(),
  description: z.string(),
});

export async function enhanceDescriptionAction(input: EnhancePropertyDescriptionInput) {
  try {
    const validatedInput = ActionInputSchema.parse(input);
    const result = await enhancePropertyDescription(validatedInput);
    return { success: true, data: result.enhancedDescription };
  } catch (error) {
    console.error('Error enhancing description:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.' };
    }
    return { success: false, error: 'Failed to enhance description with AI.' };
  }
}
