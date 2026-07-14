import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { SectionContainer } from '@/layouts/SectionContainer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Inline SVG Icons for Visual Continuity ──────────────────────────────────
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Contact Info Props & Component ──────────────────────────────────────────
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactCard({ icon, label, value, href }: ContactCardProps) {
  const innerCard = (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        borderColor: 'rgba(255, 96, 0, 0.28)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.65), 0 0 28px rgba(255,96,0,0.14)',
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative flex items-center gap-4 p-5 rounded-premium-lg
        bg-[rgba(14,14,18,0.65)] backdrop-blur-[16px]
        border border-[rgba(255,255,255,0.05)]
        transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Soft internal gradient glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(255,96,0,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Icon frame */}
      <div className="relative z-10 shrink-0 w-11 h-11 flex items-center justify-center rounded-premium-md
        bg-[rgba(255,96,0,0.08)] border border-[rgba(255,96,0,0.14)]
        text-orange-accent
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        group-hover:scale-110 group-hover:bg-[rgba(255,96,0,0.14)]"
      >
        {icon}
      </div>

      {/* Details */}
      <div className="relative z-10 min-w-0 flex-1">
        <span className="block text-[10px] font-mono font-semibold uppercase tracking-widest text-text-muted mb-0.5">
          {label}
        </span>
        <span className="block text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300 truncate">
          {value}
        </span>
      </div>

      {/* Arrow Indicator for external links */}
      {href && (
        <svg
          className="relative z-10 shrink-0 w-4 h-4 text-text-muted group-hover:text-orange-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        aria-label={`${label}: ${value}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent rounded-premium-lg"
      >
        {innerCard}
      </a>
    );
  }

  return <div className="block">{innerCard}</div>;
}

// ─── Contact Form Component ──────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS credentials are not configured in environment variables.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: data.name,
          from_email: data.email,
        },
        publicKey
      );

      setStatus('success');
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('idle');
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-premium-lg p-7 md:p-8
        bg-[rgba(14,14,18,0.65)] backdrop-blur-[16px]
        border border-[rgba(255,255,255,0.05)]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.55)]
        overflow-hidden w-full"
    >
      {/* Corner Ambient Glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-48 h-48 opacity-[0.06]"
        style={{ background: 'radial-gradient(circle at top right, #ff6000, transparent 65%)' }}
        aria-hidden="true"
      />

      {status === 'success' ? (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center justify-center gap-5 py-12 text-center"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[rgba(255,96,0,0.12)] border border-orange-accent/25">
            <CheckIcon className="w-7 h-7 text-orange-accent" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-text-primary">Message Sent!</h3>
            <p className="text-sm text-text-secondary max-w-xs font-sans">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs font-mono font-semibold text-orange-accent hover:text-orange-accent-hover transition-colors duration-200 underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" aria-label="Contact form" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-semibold font-mono uppercase tracking-widest text-text-muted">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                disabled={status === 'submitting'}
                aria-invalid={errors.name ? 'true' : 'false'}
                placeholder="John Doe"
                className={`w-full rounded-premium-md px-4 py-3 text-sm text-text-primary
                  bg-[rgba(14,14,18,0.55)] backdrop-blur-sm
                  border placeholder:text-text-muted
                  outline-none
                  focus:border-orange-accent focus:shadow-[0_0_0_2px_rgba(255,96,0,0.12)]
                  hover:border-[rgba(255,255,255,0.12)]
                  transition-all duration-250 font-sans ${
                    errors.name 
                      ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]' 
                      : 'border-[rgba(255,255,255,0.07)]'
                  }`}
                {...register('name', { required: 'Full name is required' })}
              />
              {errors.name && (
                <span className="text-xs text-red-500 font-mono mt-0.5" role="alert">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-semibold font-mono uppercase tracking-widest text-text-muted">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                disabled={status === 'submitting'}
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder="john@example.com"
                className={`w-full rounded-premium-md px-4 py-3 text-sm text-text-primary
                  bg-[rgba(14,14,18,0.55)] backdrop-blur-sm
                  border placeholder:text-text-muted
                  outline-none
                  focus:border-orange-accent focus:shadow-[0_0_0_2px_rgba(255,96,0,0.12)]
                  hover:border-[rgba(255,255,255,0.12)]
                  transition-all duration-250 font-sans ${
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]' 
                      : 'border-[rgba(255,255,255,0.07)]'
                  }`}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-mono mt-0.5" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-subject" className="text-xs font-semibold font-mono uppercase tracking-widest text-text-muted">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              disabled={status === 'submitting'}
              aria-invalid={errors.subject ? 'true' : 'false'}
              placeholder="Project collaboration, job opportunity…"
              className={`w-full rounded-premium-md px-4 py-3 text-sm text-text-primary
                bg-[rgba(14,14,18,0.55)] backdrop-blur-sm
                border placeholder:text-text-muted
                outline-none
                focus:border-orange-accent focus:shadow-[0_0_0_2px_rgba(255,96,0,0.12)]
                hover:border-[rgba(255,255,255,0.12)]
                transition-all duration-250 font-sans ${
                  errors.subject 
                    ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]' 
                    : 'border-[rgba(255,255,255,0.07)]'
                }`}
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && (
              <span className="text-xs text-red-500 font-mono mt-0.5" role="alert">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-xs font-semibold font-mono uppercase tracking-widest text-text-muted">
              Message
            </label>
            <textarea
              id="contact-message"
              disabled={status === 'submitting'}
              aria-invalid={errors.message ? 'true' : 'false'}
              rows={5}
              placeholder="Tell me about your project, idea, or question…"
              className={`w-full rounded-premium-md px-4 py-3 text-sm text-text-primary
                bg-[rgba(14,14,18,0.55)] backdrop-blur-sm
                border placeholder:text-text-muted
                outline-none resize-none
                focus:border-orange-accent focus:shadow-[0_0_0_2px_rgba(255,96,0,0.12)]
                hover:border-[rgba(255,255,255,0.12)]
                transition-all duration-250 font-sans ${
                  errors.message 
                    ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]' 
                    : 'border-[rgba(255,255,255,0.07)]'
                }`}
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <span className="text-xs text-red-500 font-mono mt-0.5" role="alert">
                {errors.message.message}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(255,96,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center gap-2.5 px-7 py-3.5 mt-1
              rounded-premium-md font-semibold text-sm uppercase tracking-wider font-mono
              bg-orange-accent hover:bg-orange-accent-hover
              text-[#08080a] cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]
              transition-colors duration-200"
          >
            {status === 'submitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-[#08080a]/40 border-t-[#08080a] rounded-full animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

// ─── Animation Easing Variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Contact Section Export ──────────────────────────────────────────────────
export default function Contact() {
  return (
    <SectionContainer id="contact" className="border-t border-border-primary pb-24 pt-24">
      {/* Background Soft AI Ambience Glows */}
      <div className="absolute top-[20%] left-[-10%] w-80 h-80 rounded-full bg-[rgba(255,96,0,0.02)] blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 rounded-full bg-[rgba(255,96,0,0.02)] blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full space-y-16 max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-3xl">
          <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase font-mono block">
            05. CONTACT
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-text-primary">
            Let's Build Something Meaningful
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans max-w-2xl">
            Whether you have an exciting project, a collaboration opportunity, or just want to connect, I'd be happy to hear from you. Let's build modern, scalable, AI-powered applications together.
          </p>
        </motion.div>

        {/* Two-column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left column: Contact info */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">
            <ContactCard
              icon={<MailIcon className="w-5 h-5" aria-hidden="true" />}
              label="Email"
              value="mesud3818@gmail.com"
              href="mailto:mesud3818@gmail.com"
            />
            <ContactCard
              icon={<GithubIcon className="w-5 h-5" aria-hidden="true" />}
              label="GitHub"
              value="github.com/mesud17"
              href="https://github.com/mesud17"
            />
            <ContactCard
              icon={<LinkedinIcon className="w-5 h-5" aria-hidden="true" />}
              label="LinkedIn"
              value="linkedin.com/in/mesud-ali-a823ba409"
              href="https://www.linkedin.com/in/mesud-ali-a823ba409"
            />
            <ContactCard
              icon={<MapPinIcon className="w-5 h-5" aria-hidden="true" />}
              label="Location"
              value="Addis Ababa, Ethiopia"
            />
          </div>

          {/* Right column: Contact form */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>

        {/* Divider & Footer Area */}
        <div className="w-full flex flex-col pt-12">
          {/* Sleek Gradient Line Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent mb-12" aria-hidden="true" />

          <div className="flex flex-col items-center text-center space-y-6">
            <p className="text-xs font-mono text-text-muted tracking-[0.25em] uppercase">
              Thanks for visiting.
            </p>


            {/* Social profiles in footer */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/mesud17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-premium-md border border-[rgba(255,255,255,0.07)]
                  bg-[rgba(14,14,18,0.40)] text-text-muted
                  hover:text-orange-accent hover:border-[rgba(255,96,0,0.28)]
                  hover:-translate-y-0.5
                  transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mesud-ali-a823ba409"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-premium-md border border-[rgba(255,255,255,0.07)]
                  bg-[rgba(14,14,18,0.40)] text-text-muted
                  hover:text-orange-accent hover:border-[rgba(255,96,0,0.28)]
                  hover:-translate-y-0.5
                  transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
