import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PhoneIcon, MailboxIcon, LocateIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2)
})

function Contact() {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  /** 
   * @param {z.infer<typeof ContactFormSchema>} data
   */
  function onSubmit(data) {
    console.log(data)
  }

  return (
    <div className='container mx-auto'>
      <section className="mt-12 md:mt-16 mx-auto">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='mt-5 md:mt-10'>
            <div className="flex items-center gap-4 mb-6">
              <PhoneIcon className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <MailboxIcon className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">Email</h3>
                <p>info@blog.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LocateIcon className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">Address</h3>
                <address>123 Main Street, Anytown USA</address>
              </div>
            </div>
          </div>
          <div>
            <Card className='h-[35rem] w-11/12 mx-auto md:w-[27rem] md:pt-5'>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 my-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="name">Name</FormLabel>
                              <FormControl>
                                <Input {...field} id="name" placeholder="Enter your name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <FormControl>
                                <Input {...field} id="email" placeholder="Enter your email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="message">Message</FormLabel>
                            <FormControl>
                              <Textarea {...field} id="message" className="resize-none min-h-28" placeholder="Enter your message" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact