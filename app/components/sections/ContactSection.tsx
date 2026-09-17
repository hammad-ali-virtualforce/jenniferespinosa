"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import type { ContactSectionData } from "@/app/lib/wordpress/graphql/pages";


interface ContactInfo {
  address?: string | null;
  emailAddress?: string | null;
  googleMapsUrl?: string | null;
  phoneNumber?: string | null;
}

interface SocialInfo {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  xTwitterUrl?: string | null;
}

interface ContactSectionProps {
  data: ContactSectionData;
  contact?: ContactInfo | null;
  social?: SocialInfo | null;
}

export default function ContactSection({
  data,
  contact,
  social,
}: ContactSectionProps) {
  const image = data.image?.node;
  const showForm = Boolean(data.showForm);
const mapSrc = contact?.address
  ? `https://www.google.com/maps?q=${encodeURIComponent(
      contact.address
    )}&output=embed`
  : null;
  return (
    <section
      className="
        px-6
        py-16
        md:px-8
        lg:px-12
        lg:py-[110px]
      "
      style={{
        backgroundColor: data.backgroundColor || "#ffffff",
      }}
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1450px]
          gap-10
          lg:grid-cols-[1fr_0.95fr]
          lg:items-center
          lg:gap-0
        "
      >
        {/* LEFT SIDE */}
        <div className="relative lg:pr-0">
          <div
            className="
              relative
              min-h-[430px]
              overflow-hidden
              md:min-h-[560px]
              lg:min-h-[760px]
            "
          >
            {image?.sourceUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={image.sourceUrl}
                alt={image.altText || data.heading || "Contact"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>

          {/* FLOATING CONTACT INFO CARD */}
          {(contact?.phoneNumber ||
            contact?.emailAddress ||
            contact?.address ||
            social?.facebookUrl ||
            social?.instagramUrl ||
            social?.linkedinUrl ||
            social?.youtubeUrl) && (
            <div
              className="
                relative
                z-10
                mt-6
                bg-white
                p-6
                shadow-[0_18px_50px_rgba(0,0,0,0.12)]

                lg:absolute
                lg:top-32
                lg:-left-14
                lg:mt-0
                lg:w-[380px]
                lg:p-12
              "
            >
              <h3
                className="
                  mb-5
                  text-[20px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#000e35]
                "
              >
                Contact Details
              </h3>

              <div className="space-y-4 text-[#303030]">
                {contact?.phoneNumber && (
                  <a
                    href={`tel:${contact.phoneNumber.replace(/[^\d+]/g, "")}`}
                    className="flex items-start gap-3 transition-opacity hover:opacity-70"
                  >
                    <Phone
                      size={16}
                      className="mt-1 shrink-0 text-[#000e35]"
                    />
                    <span className="text-[16px] leading-[1.7]">
                      {contact.phoneNumber}
                    </span>
                  </a>
                )}

                {contact?.emailAddress && (
                  <a
                    href={`mailto:${contact.emailAddress}`}
                    className="flex items-start gap-3 break-all transition-opacity hover:opacity-70"
                  >
                    <Mail
                      size={16}
                      className="mt-1 shrink-0 text-[#000e35]"
                    />
                    <span className="text-[16px] leading-[1.7]">
                      {contact.emailAddress}
                    </span>
                  </a>
                )}

                {contact?.address && (
                  contact.googleMapsUrl ? (
                    <a
                      href={contact.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 transition-opacity hover:opacity-70"
                    >
                      <MapPin
                        size={16}
                        className="mt-1 shrink-0 text-[#000e35]"
                      />
                      <span className="text-[16px] leading-[1.7]">
                        {contact.address}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className="mt-1 shrink-0 text-[#000e35]"
                      />
                      <span className="text-[13px] leading-[1.7]">
                        {contact.address}
                      </span>
                    </div>
                  )
                )}
              </div>

              {(social?.facebookUrl ||
                social?.instagramUrl ||
                social?.linkedinUrl ||
                social?.youtubeUrl) && (
                <div className="mt-6 flex items-center gap-3">
                  {social.facebookUrl && (
                    <a
                      href={social.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center border border-[#e8e8e8] text-[#303030] transition-colors hover:border-[#000e35] hover:text-[#000e35]"
                    >
                      <FaFacebookF size={16} />
                    </a>
                  )}

                  {social.instagramUrl && (
                    <a
                      href={social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center border border-[#e8e8e8] text-[#303030] transition-colors hover:border-[#000e35] hover:text-[#000e35]"
                    >
                      <FaInstagram size={16} />
                    </a>
                  )}

                  {social.linkedinUrl && (
                    <a
                      href={social.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center border border-[#e8e8e8] text-[#303030] transition-colors hover:border-[#000e35] hover:text-[#000e35]"
                    >
                      <FaLinkedinIn size={16} />
                    </a>
                  )}

                  {social.youtubeUrl && (
                    <a
                      href={social.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center border border-[#e8e8e8] text-[#303030] transition-colors hover:border-[#000e35] hover:text-[#000e35]"
                    >
                      <FaYoutube size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            border
            border-[#000e35]
            bg-white
            px-6
            py-10

            md:px-10
            md:py-14

            lg:my-[55px]
            lg:-ml-[1px]
            lg:px-14
            lg:py-16

            xl:px-[64px]
          "
        >
          <div className="mb-10">
            {data.eyebrow && (
              <p
                className="
                  mb-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#000e35]
                "
              >
                {data.eyebrow}
              </p>
            )}

            {data.heading && (
              <h2
                className="
                  font-heading
                  text-[clamp(52px,5vw,78px)]
                  font-normal
                  leading-[0.9]
                  text-[#303030]
                "
              >
                {data.heading}
              </h2>
            )}

            {data.description && (
              <p
                className="
                  mt-5
                  max-w-[550px]
                  text-[13px]
                  leading-[1.8]
                  text-[#666]
                  md:text-[14px]
                "
              >
                {data.description}
              </p>
            )}
          </div>

          {showForm ? (
            <form className="space-y-7">
              <div className="grid gap-7 md:grid-cols-2">
                <FormField label="First Name" name="firstName" required />
                <FormField label="Last Name" name="lastName" required />
              </div>

              <FormField label="Email" name="email" type="email" required />
              <FormField label="Phone" name="phone" type="tel" />

              <div>
                <label
                  htmlFor="interest"
                  className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#666]"
                >
                  I'm Interested In
                </label>
                <select
                  id="interest"
                  name="interest"
                  defaultValue=""
                  className="w-full border-0 border-b border-[#000e35] bg-transparent px-0 py-3 text-[14px] text-[#303030] outline-none"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="buying">Buying a Home</option>
                  <option value="selling">Selling a Home</option>
                  <option value="relocating">Relocating</option>
                  <option value="property">Property Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#666]"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none border-0 border-b border-[#000e35] bg-transparent px-0 py-3 text-[14px] text-[#303030] outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-w-[160px] items-center justify-center bg-[#000e35] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#303030]"
              >
                {data.buttonText || "Send Message"}
              </button>
            </form>
          ) : (
            <div>
              <Link
                href="/contact"
                className="inline-flex min-w-[160px] items-center justify-center bg-[#000e35] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#303030]"
              >
                {data.buttonText || "Contact Us"}
              </Link>
            </div>
          )}
        </div>
      </div>
       {/* ==============================
          GOOGLE MAP
      ============================== */}

      {data.showMap && (
        <div
          className="
            mx-auto
            mt-10
            max-w-[1450px]
            overflow-hidden

            md:mt-12
            lg:mt-16
          "
        >
          <iframe
            src={mapSrc?? undefined}
            title="Jennifer Espinosa Location"
            width="100%"
            height="500"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="
              block
              h-[350px]
              w-full
              border-0

              md:h-[450px]
              lg:h-[520px]
            "
          />
        </div>
      )}
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#666]"
      >
        {label}
        {required ? " *" : ""}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-[#000e35] bg-transparent px-0 py-3 text-[14px] text-[#303030] outline-none transition-colors focus:border-[#303030]"
      />
    </div>
  );
}