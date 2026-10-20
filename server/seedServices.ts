
import "dotenv/config";
import mongoose from "mongoose";
import Service from "./models/Service";

const officialPortal =
  "https://portal.aacrrsa.gov.et/";

const source =
  "Addis Ababa Civil and Resident Registration System official portal.";

const civilServices = [
  {
    name: "Birth Registration — Addis Ababa",
    category: "Civil Registration",
  },
  {
    name: "Marriage Registration — Addis Ababa",
    category: "Civil Registration",
  },
  {
    name: "Adoption Registration — Addis Ababa",
    category: "Civil Registration",
  },
  {
    name: "Divorce Registration — Addis Ababa",
    category: "Civil Registration",
  },
  {
    name: "Death Registration — Addis Ababa",
    category: "Civil Registration",
  },
  {
    name: "Residence ID Card — Addis Ababa",
    category: "Resident Services",
  },
  {
    name: "Family Registration — Addis Ababa",
    category: "Resident Services",
  },
  {
    name: "Residence Transfer — Addis Ababa",
    category: "Resident Services",
  },
  {
    name: "Non-Marital Certificate — Addis Ababa",
    category: "Resident Services",
  },
  {
    name: "Citizenship Service — Addis Ababa Portal",
    category: "Document Authentication",
  },
  {
    name: "About Being Alive — Addis Ababa Portal",
    category: "Document Authentication",
  },
  {
    name: "Relative Relation Verification — Addis Ababa",
    category: "Document Authentication",
  },
  {
    name: "Verification of Residency — Addis Ababa",
    category: "Document Authentication",
  },
];


const civilDocuments: Record<string, string[]> = {
  "Birth Registration — Addis Ababa": [
    "Birth notification, birth record, or other evidence of the birth, as accepted by the authority.",
    "Identity documents or available identification details for the parent or applicant.",
    "Parent or guardian details and the child's full name and date of birth.",
    "Existing family or residence registration details, where applicable.",
    "Additional evidence requested if the birth occurred outside a health facility or registration is delayed."
  ],

  "Marriage Registration — Addis Ababa": [
    "Identity documents for both people getting married.",
    "Personal details and supporting civil-status information requested by the registration office.",
    "Evidence of being legally free to marry, where required.",
    "Previous divorce registration or a former spouse's death record, if relevant.",
    "Any witness, application, or supporting records requested by the authority."
  ],

  "Adoption Registration — Addis Ababa": [
    "Identity documents for the adoptive parent or parents.",
    "Court adoption decision or other legally accepted adoption documentation.",
    "The child's birth or identity record, if available.",
    "Documents establishing the authority of a guardian or representative, where applicable.",
    "Additional supporting documents required by the civil registration office."
  ],

  "Divorce Registration — Addis Ababa": [
    "Identity documents for the parties or the authorised applicant.",
    "Marriage registration certificate or available marriage record.",
    "Court decision, divorce decree, or other legally accepted divorce documentation.",
    "Power of attorney or proof of representation, if someone applies on another person's behalf.",
    "Additional documents requested by the registration office."
  ],

  "Death Registration — Addis Ababa": [
    "Death notification, medical death record, or other evidence accepted by the authority.",
    "Available identity documents or personal details of the deceased.",
    "Identification of the person reporting the death.",
    "Existing family or civil registration details, where available.",
    "Additional evidence requested for a death occurring outside a health facility or reported late."
  ],

  "Residence ID Card — Addis Ababa": [
    "Proof that the applicant is registered on Residence Registration Form 001.",
    "Evidence of age and identity, where requested.",
    "Two photographs taken within the previous six months, as specified by the directive.",
    "The applicant's current residence and contact details.",
    "Previous residence ID, if renewing or replacing an existing card."
  ],

  "Family Registration — Addis Ababa": [
    "Identity documents or identifying details for the household representative and family members.",
    "Names, dates of birth, relationships, and other details requested on the residence-registration form.",
    "Evidence of the household's regular residential address.",
    "Family relationship evidence, such as birth or marriage records, where required.",
    "Previous residence registration or identification records, if available.",
    "Release or transfer letter from the previous residence, where applicable."
  ],

  "Residence Transfer — Addis Ababa": [
    "Identity or residence ID documents, where available.",
    "Release letter from the previous residence, issued within the period required by the directive.",
    "New residential address and household information.",
    "Family-member details if the transfer includes family members.",
    "Evidence of the new residence or other supporting information requested by the office."
  ],

  "Non-Marital Certificate — Addis Ababa": [
    "Copy of an identity card, passport, driver's licence, travel document, or immigrant ID.",
    "A recent 4x4 or passport-size photograph, as specified by the directive.",
    "Legally certified representation documents and the representative's identification, if applying through a representative.",
    "Divorce registration or a spouse's death record, where the request depends on a previous marriage ending.",
    "Additional evidence requested by the registration office for the applicant's circumstances."
  ],

  "Citizenship Service — Addis Ababa Portal": [
    "Identity document or passport, where available.",
    "Existing civil or residence registration details, if applicable.",
    "Documents supporting the specific citizenship-related request.",
    "Relevant court, family, or official records where required by the service.",
    "Power of attorney or other proof of representation, if applicable."
  ],

  "About Being Alive — Addis Ababa Portal": [
    "Identity card, passport, or other identification accepted by the authority.",
    "Existing residence or family registration details.",
    "The applicant's current identifying information and residence details.",
    "Authorisation or representation documents if a representative is permitted to apply.",
    "Any additional evidence requested by the responsible office."
  ],

  "Relative Relation Verification — Addis Ababa": [
    "Identity documents or available identifying details for the applicant and the relative.",
    "Existing family or residence registration records.",
    "Birth certificates, marriage records, or other evidence of the relationship, where applicable.",
    "Names and identifying information of the family members whose relationship is being verified.",
    "Additional documents requested if the relationship cannot be confirmed from existing records."
  ],

  "Verification of Residency — Addis Ababa": [
    "Residence ID card or other accepted identity document, where available.",
    "Residence registration number or existing registration details, if available.",
    "Current residential address and household information.",
    "Evidence of residence or address requested by the responsible office.",
    "Release or transfer documentation, if the request relates to a change of residence."
  ]
};


async function seedServices() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(mongoUri);

  let addedOrUpdated = 0;

  for (const item of civilServices) {
    const record = {
      ...item,
      description:
        `Information and access guidance for ${item.name}. ` +
        "Check the official portal for the current procedure " +
        "and requirements applicable to your case.",
      eligibility: [
        "Check eligibility with the official service provider.",
      ],
      requiredDocuments:
        civilDocuments[item.name] ?? [
          "Check the official portal for the documents required for this specific request."
        ],
      steps: [
        "Open the official Addis Ababa civil registration portal.",
        "Sign in if required and find the relevant service.",
        "Review the official instructions before applying.",
      ],
      fees: [],
      locations: ["Addis Ababa"],
      officialUrl: officialPortal,
      source,
      lastVerified: null,
    };

    await Service.updateOne(
      { name: record.name },
      { $set: record },
      { upsert: true }
    );

    addedOrUpdated++;
    console.log(`Seeded: ${record.name}`);
  }

  const total = await Service.countDocuments();

  console.log(`\nFinished: ${addedOrUpdated} records processed.`);
  console.log(`Total services in database: ${total}`);

  await mongoose.disconnect();
}

seedServices().catch(async (error) => {
  console.error("Seeding failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
