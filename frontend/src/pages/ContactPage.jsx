import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import FAQAccordion from "../components/faq/FAQAccordion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to a /contact endpoint once the backend is ready.
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Get in Touch" title="Contact Us" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-5 text-ink/70">
          <div>
            <h4 className="text-wine-700 font-medium mb-1">Address</h4>
            <p className="text-sm">123 Ring Road, Rajkot, Gujarat</p>
          </div>
          <div>
            <h4 className="text-wine-700 font-medium mb-1">Phone</h4>
            <p className="text-sm">+91 98765 43210</p>
          </div>
          <div>
            <h4 className="text-wine-700 font-medium mb-1">Hours</h4>
            <p className="text-sm">Mon – Sat, 9:00 AM – 8:00 PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {sent ? (
            <p className="text-wine-700 font-medium">Thanks — we'll get back to you shortly.</p>
          ) : (
            <>
              <div>
                <label className="text-sm text-ink/60 block mb-1">Name</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
              </div>
              <div>
                <label className="text-sm text-ink/60 block mb-1">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
              </div>
              <div>
                <label className="text-sm text-ink/60 block mb-1">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={4}
                  className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </>
          )}
        </form>
      </div>

      <FAQAccordion />
    </div>
  );
}
