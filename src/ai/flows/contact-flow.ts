'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendContactMessage - A function that handles processing the contact form data.
 * - ContactFormInput - The input type for the sendContactMessage function.
 * - ContactFormOutput - The return type for the sendContactMessage function.
 */

import { ai } from '@/ai/genkit';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;


export async function sendContactMessage(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    try {
      const client = await clientPromise;
      const db = client.db("portfolio");
      await db.collection("contacts").insertOne({ ...input, createdAt: new Date() });
      return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Failed to save contact message:', error);
      return { success: false, message: 'Failed to send message.' };
    }
  }
);
