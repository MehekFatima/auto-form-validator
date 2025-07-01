import { ValidationMessages } from "../types";

export const messagesMap: Record<"en" | "hi", ValidationMessages> = {
  en: {
    required: "This field is required",
    minLength: (n) => `Minimum length is ${n}`,
    maxLength: (n) => `Maximum length is ${n}`,
    pattern: "Invalid format",
    async: "Validation failed",
  },
  hi: {
    required: "यह फ़ील्ड आवश्यक है",
    minLength: (n) => `न्यूनतम लंबाई ${n} होनी चाहिए`,
    maxLength: (n) => `अधिकतम लंबाई ${n} होनी चाहिए`,
    pattern: "अमान्य प्रारूप",
    async: "मान्यकरण विफल हुआ",
  },
};
