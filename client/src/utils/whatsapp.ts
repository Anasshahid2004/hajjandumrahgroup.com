import { contact } from "@/data/siteData";

export type BookingData = {
  fullName: string;
  email: string;
  whatsapp: string;
  travelDate: string;
  tripDetails: string;
  vehicleNames?: string[];
  vehicleName?: string;
  notes?: string;
};

const normalizeWhatsAppNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("92")) return digits;
  return digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
};

const waNumber = normalizeWhatsAppNumber(contact.whatsapp);

export function buildWhatsAppMessage(data: BookingData) {
  const selectedVehicles = Array.from(
    new Set(
      [...(data.vehicleNames ?? []), data.vehicleName ?? ""]
        .map(name => name.trim())
        .filter(Boolean)
    )
  );
  return [
    "New Booking Request - Haramain Hajj and Umrah Group",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Travel Date: ${data.travelDate}`,
    `Vehicles: ${selectedVehicles.join(", ") || "No specific vehicle selected"}`,
    `Trip Details: ${data.tripDetails}`,
    `Additional Notes: ${data.notes?.trim() || "None"}`,
  ].join("\n");
}

export function buildWhatsAppUrl(data: BookingData, phoneNumber = contact.whatsapp) {
  const number = normalizeWhatsAppNumber(phoneNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
}

export function buildWhatsAppContactUrl(
  message = "Hello Haramain Hajj and Umrah Group, I would like to ask about a booking.",
  phoneNumber = contact.whatsapp
) {
  const number = normalizeWhatsAppNumber(phoneNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppContact(message?: string) {
  window.open(buildWhatsAppContactUrl(message), "_blank", "noopener,noreferrer");
}
