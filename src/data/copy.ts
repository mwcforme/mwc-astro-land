export const COPY = {
  cta: {
    bookConsult: "Book in-person visit",
    headerCta: "Book Appointment",
    startConsult: "Book in-person visit",
    bookConsultInline: "book in-person visit",
    bookDiscreetVisit: "Book in-person visit",
    seeIfIQualify: "Book in-person visit",
    seeIfYouQualify: "Book in-person visit",
    callNow: "Call Now",
    getLabsChecked: "Get My Labs Checked",
    bookNoCostVisit: "Book in-person visit",
  },
  badge: {
    noCostConsult: "No-cost visit",
    offerValue: "No-Cost",
    offerLabel: "60-Min Physician Assessment\nNo Insurance Needed",
  },
  offer: {
    finalSubhead: "No-cost visit. Same-day availability.",
    manifestoTag: "No-obligation in-person visit. Individual results vary.",
    cancelReschedule: "Cancel or reschedule at no charge, anytime.",
  },
} as const;

export type CopyMap = typeof COPY;
