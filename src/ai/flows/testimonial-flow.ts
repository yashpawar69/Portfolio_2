'use server';
/**
 * @fileOverview Flows for handling testimonials.
 *
 * - submitTestimonial - Saves a new testimonial to the database.
 * - getTestimonials - Fetches all testimonials from the database.
 * - Testimonial - The type for a testimonial.
 * - TestimonialInput - The input type for submitting a testimonial.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

const TestimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title or company must be at least 2 characters."),
  quote: z.string().min(10, "Testimonial must be at least 10 characters.").max(300, "Testimonial must be 300 characters or less."),
});

// For data coming from the DB
export type Testimonial = z.infer<typeof TestimonialSchema> & {
    _id: string;
    createdAt: Date;
};

// For form submission
export type TestimonialInput = z.infer<typeof TestimonialSchema>;

const SubmitTestimonialOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function submitTestimonial(input: TestimonialInput): Promise<z.infer<typeof SubmitTestimonialOutputSchema>> {
    return submitTestimonialFlow(input);
}

const submitTestimonialFlow = ai.defineFlow(
  {
    name: 'submitTestimonialFlow',
    inputSchema: TestimonialSchema,
    outputSchema: SubmitTestimonialOutputSchema,
  },
  async (input) => {
    try {
      const client = await clientPromise;
      const db = client.db("portfolio");
      const collection = db.collection("testimonials");
      await collection.insertOne({ ...input, createdAt: new Date() });
      revalidatePath('/'); // Revalidate the root path
      return { success: true, message: 'Testimonial submitted successfully!' };
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      return { success: false, message: 'Failed to submit testimonial.' };
    }
  }
);

export async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const testimonials = await db.collection("testimonials")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        
        return JSON.parse(JSON.stringify(testimonials));
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return [];
    }
}
