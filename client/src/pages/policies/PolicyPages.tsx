import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faFileLines,
  faLock,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link } from "wouter";
import { PageIntro, BookingCTA } from "@/pages/PageBlocks";
import { imageSources } from "@/data/siteData";
import { setPageMetadata } from "@/utils/metadata";

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

const policyItems: {
  slug: string;
  title: string;
  icon: typeof faFileLines;
  body: string;
  sections: PolicySection[];
}[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    icon: faFileLines,
    body: "Service terms and responsibilities for transportation services arranged with travel agents.",
    sections: [
      {
        heading: "Our service commitment",
        paragraphs: [
          "Haramain Hajj and Umrah Group is dedicated to providing superior, reliable and seamless transportation solutions for Hajj and Umrah Pilgrims. These Terms and Conditions outline the operational standards, mutual responsibilities, service limitations and payment/credit framework governing our partnership with travel agents.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    icon: faLock,
    body: "How information may be collected and used when you access the Haramain Hajj and Umrah Group website and services.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This policy explains how Haramain Hajj and Umrah Group collects, uses, and shares information when you use our website and services. We use this information to provide and improve the Service, in accordance with applicable law.",
        ],
      },
      {
        heading: "Definitions",
        bullets: [
          "Account: an account created to access the Service.",
          "Affiliate: an entity that controls, is controlled by, or shares common control with a party; control means ownership of at least 50% of voting interests.",
          "Company, we, us, or our: Haramain Hajj and Umrah Group.",
          "Cookies: small files stored on your Device that may record website activity.",
          "Country: Saudi Arabia. Device: a device used to access the Service.",
          "Personal Data: information relating to an identified or identifiable individual.",
          "Service and Website: the Haramain Hajj and Umrah Group website.",
          "Service Provider: a person or organization processing data on our behalf to support or analyze the Service.",
          "Usage Data: information collected automatically through use of the Service, such as page-visit duration.",
          "You: the individual or legal entity accessing or using the Service.",
        ],
      },
      {
        heading: "Collecting and using your Personal Data",
        paragraphs: [
          "Information you may provide includes your email address, first and last name, phone number, and postal address. We may also collect Usage Data automatically while you use the Service.",
        ],
      },
      {
        heading: "Usage Data",
        paragraphs: [
          "This may include your IP address, browser and device type, operating system, pages visited, visit date and time, time spent on pages, unique identifiers, and diagnostic information. Your browser or mobile device may send this information when you access the Service.",
        ],
      },
      {
        heading: "Tracking technologies and Cookies",
        paragraphs: [
          "We use Cookies and similar technologies, such as tags, scripts, and web beacons, to retain information, understand website activity, and improve the Service. Session Cookies are removed when you close your browser; Persistent Cookies remain on your Device. You can configure your browser to reject Cookies or notify you when they are sent. Some Service features may not work without them.",
        ],
      },
      {
        heading: "Necessary / Essential Cookies",
        paragraphs: [
          "Type: Session Cookies. Administered by: Haramain Hajj and Umrah Group. These Cookies enable core website features, support authentication, and help prevent fraudulent account use. They are used only to provide the services you request.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund / Cancellation Policy",
    icon: faRotate,
    body: "Refund eligibility, cancellation timing, and rescheduling options for booked services.",
    sections: [
      {
        heading: "If we cancel the service",
        paragraphs: [
          "If Haramain Hajj and Umrah Group cancels the service, the customer will be eligible for a full refund or a free rescheduling option.",
        ],
      },
      {
        heading: "Refund processing",
        paragraphs: [
          "Approved refunds will be processed through the original payment method and may take 5–7 business days to be completed.",
        ],
      },
      {
        heading: "Non-refundable bookings",
        paragraphs: [
          "Certain bookings, such as promotional discount packages or selected peak-season bookings, may be non-refundable. Any non-refundable conditions will be clearly communicated at the time of booking.",
        ],
      },
      {
        heading: "Cancellation and refund schedule",
        bullets: [
          "Cancellation more than 24 hours before the scheduled service: 90% refund",
          "Cancellation within 12 hours before the scheduled service: 60% refund",
          "No-show: 20% refund",
        ],
      },
      {
        heading: "Refund assistance",
        paragraphs: [
          "For any questions regarding refunds, customers can contact Haramain Hajj and Umrah Group through our official WhatsApp or email.",
        ],
      },
    ],
  },
];

export function PoliciesPage() {
  useEffect(() => {
    setPageMetadata(
      "Policies",
      "Terms, privacy, and refund policies for Haramain Hajj and Umrah Group."
    );
  }, []);
  return (
    <div>
      <PageIntro
        eyebrow="Policies"
        title="Clear expectations build trust."
        body="Review our terms and conditions, privacy practices, and refund and cancellation policy."
        image={imageSources.policy}
      />
      <section className="section container policy-grid">
        {policyItems.map(item => (
          <Link
            href={`/policies/${item.slug}`}
            className="policy-card"
            key={item.slug}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="eyebrow">Policy</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <span className="text-link">
              Read policy <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
        ))}
      </section>
      <BookingCTA />
    </div>
  );
}

export function PolicyDetailPage({ slug }: { slug: string }) {
  const policy = policyItems.find(item => item.slug === slug) || policyItems[0];
  useEffect(() => {
    setPageMetadata(policy.title, policy.body);
  }, [policy.title, policy.body]);
  return (
    <div>
      <PageIntro
        eyebrow="Haramain Hajj and Umrah Group"
        title={policy.title}
        body={policy.body}
        image={imageSources.policy}
      />
      <section className="section legal-section">
        <article className="container legal-page__body">
          <span className="eyebrow">Policy details</span>
          <h2>{policy.title}</h2>
          {policy.sections.map(section => (
            <section className="legal-page__section" key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs?.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <Link className="text-link" href="/contact">
            Contact us about a booking <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </article>
      </section>
      <BookingCTA />
    </div>
  );
}
