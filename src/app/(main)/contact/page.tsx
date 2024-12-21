import { Button, Heading, TextArea, TextField } from '@radix-ui/themes'
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'

export default function ContactPage() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center">
          <Heading size="8" className="mb-4">Contact Us</Heading>

          <p className="text-gray-600 text-lg leading-relaxed">
            Have questions about our workspace solutions? We&apos;re here to help you find
            the perfect space for your business needs.
          </p>
        </section>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <Heading size="4" className="mb-6">Get in Touch</Heading>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IconMapPin className="h-6 w-6 text-blue-600 mt-1" />

                  <div>
                    <h3 className="font-semibold">Our Location</h3>

                    <p className="text-gray-600">
                      123 Business District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconMail className="h-6 w-6 text-blue-600 mt-1" />

                  <div>
                    <h3 className="font-semibold">Email Us</h3>

                    <a
                      href="mailto:support@flexspace.com"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      support@flexspace.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconPhone className="h-6 w-6 text-blue-600 mt-1" />

                  <div>
                    <h3 className="font-semibold">Call Us</h3>

                    <a
                      href="tel:+1234567890"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Heading size="4" className="mb-4">Business Hours</Heading>

              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>

                <p>Saturday: 10:00 AM - 4:00 PM</p>

                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <Heading size="4" className="mb-6">Send Us a Message</Heading>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <TextField.Root
                    placeholder="First Name"
                    name="firstName"
                    required
                    size="3"
                  />

                  <TextField.Root
                    placeholder="Last Name"
                    name="lastName"
                    required
                    size="3"
                  />
                </div>

                <TextField.Root
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  required
                  size="3"
                />

                <TextField.Root
                  placeholder="Subject"
                  name="subject"
                  required
                  size="3"
                />

                <TextArea
                  placeholder="Your Message"
                  name="message"
                  required
                  className="min-h-[150px]"
                  size="3"
                />

                <Button size="3" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <Heading size="6" className="mb-4">Looking for a Workspace?</Heading>

          <p className="text-gray-600 mb-6">
            Browse our available locations and find the perfect space for your needs.
          </p>

          <Button size="3" variant="solid">
            View Locations
          </Button>
        </section>
      </div>
    </div>
  )
}
