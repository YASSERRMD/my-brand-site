"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/yasserrmd", key: "li" },
  { label: "GitHub", href: "https://github.com/YASSERRMD", key: "gh" },
  { label: "Email", href: "mailto:arafath.yasser@gmail.com", key: "em" },
] as const;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback with form data
    const mailto = `mailto:arafath.yasser@gmail.com?subject=Message from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.name} (${formState.email})`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-16 py-24"
      style={{ zIndex: 10 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-2xl w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "#C9A84C",
              opacity: 0.6,
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            — The Signal
          </div>
          <h2
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Let's Build the Future
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
            }}
          >
            Government. AI. Intelligent cities. If your vision sits at the intersection
            of these worlds, let's connect.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass p-8 flex flex-col gap-5"
          style={{ border: "1px solid rgba(201,168,76,0.12)" }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              value={formState.name}
              onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
              placeholder="Your name"
            />
            <InputField
              label="Email"
              type="email"
              value={formState.email}
              onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
              placeholder="your@email.com"
            />
          </div>
          <TextareaField
            label="Message"
            value={formState.message}
            onChange={(v) => setFormState((s) => ({ ...s, message: v }))}
            placeholder="What would you like to build together?"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 text-center transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "#C9A84C",
              textTransform: "uppercase",
            }}
          >
            {submitted ? "Message Sent ✓" : "Send Signal"}
          </motion.button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-8"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.key !== "em" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
                className="group-hover:text-[#C9A84C]"
              >
                {link.label}
              </span>
              <span
                className="block w-4 h-px bg-white/10 group-hover:bg-[#C9A84C]/50 group-hover:w-8 transition-all duration-400"
              />
            </a>
          ))}
        </motion.div>

        {/* Final statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-20 text-center"
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
            }}
          >
            "The future belongs to those<br />who architect it."
          </p>
          <div
            className="mt-4 w-12 h-px mx-auto"
            style={{ background: "rgba(201,168,76,0.3)" }}
          />
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(201,168,76,0.4)",
              textTransform: "uppercase",
              marginTop: "12px",
            }}
          >
            Mohamed Yasser
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="bg-transparent border-b border-white/10 focus:border-[#C9A84C]/40 outline-none py-2 transition-colors duration-300"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.9rem",
          color: "#FFFFFF",
        }}
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        rows={5}
        className="bg-transparent border-b border-white/10 focus:border-[#C9A84C]/40 outline-none py-2 transition-colors duration-300 resize-none"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.9rem",
          color: "#FFFFFF",
        }}
      />
    </div>
  );
}
