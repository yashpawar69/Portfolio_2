"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MessageSquarePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { submitTestimonial, type TestimonialInput } from '@/ai/flows/testimonial-flow'

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title or company must be at least 2 characters."),
  quote: z.string().min(10, "Testimonial must be at least 10 characters.").max(300, "Testimonial must be 300 characters or less."),
})

const TestimonialForm = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      title: '',
      quote: '',
    },
  })

  async function onSubmit(values: TestimonialInput) {
    setIsSubmitting(true);
    try {
      const result = await submitTestimonial(values);
      if (result.success) {
        toast({
          title: 'Testimonial Submitted!',
          description: 'Thank you for your feedback.',
        });
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem submitting your testimonial. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <MessageSquarePlus className="h-6 w-6 text-accent"/>
          Leave a Testimonial
        </CardTitle>
        <CardDescription>Share your experience working with me. Your feedback is greatly appreciated!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Title / Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CEO, Tech Solutions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share your experience..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Testimonial'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default TestimonialForm;
