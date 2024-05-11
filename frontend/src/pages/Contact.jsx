import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { PhoneIcon, MailboxIcon, LocateIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { API_URL } from '@/lib/config'

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2)
})

function Contact() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  /** @param {z.infer<typeof contactFormSchema>} data */
  async function onSubmit(data) {
    const resp = await fetch(API_URL + '/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (resp.ok) {
      const text = await resp.text()
      toast.success(text)
      form.reset()
    } else {
      toast.error('An error occurred. Please try again later.')
      console.log(resp)
    }
  }

  return (
    <>
      <section className="md:mt-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='mt-5 md:mt-10 mx-auto'>
            <h2 className="text-2xl font-bold inline-block mb-7">Contact Us</h2>
            <div className="flex items-center gap-4 mb-6">
              <PhoneIcon className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">Phone</h3>
                <a href='tel:+1 (555) 123-4567'>+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <MailboxIcon className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">Email</h3>
                <a href='mailto:info@blog.com'>info@blog.com</a>
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
            <Card className='min-h-fit w-11/12 mx-auto md:w-[27rem] md:py-5'>
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
                    <Button type="submit" className='mt-3'>Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact