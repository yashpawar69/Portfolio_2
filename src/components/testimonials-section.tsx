import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { getTestimonials, type Testimonial } from '@/ai/flows/testimonial-flow';
import TestimonialForm from './testimonial-form';

const TestimonialsSection = async () => {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">What My Clients Say</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          I strive to build not just applications, but also strong relationships. Here's what some of my clients have to say.
        </p>
        
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial) => (
              <Card key={testimonial._id} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                       <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold font-headline">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p>No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}

        <TestimonialForm />
      </div>
    </section>
  )
}

export default TestimonialsSection
