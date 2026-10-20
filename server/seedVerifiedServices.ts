
import "dotenv/config";
import mongoose from "mongoose";
import Service from "./models/Service";

const services: {
  name: string;
  category: string;
  url: string;
  source: string;
  description: string;
  eligibility?: string[];
  requiredDocuments?: string[];
  steps?: string[];
}[]  = [
  
  {
    name: "Authenticate Ethiopian Education Documents",
    category: "Education",
    url: "https://www.neta.gov.et/requestverification",
    source: "FDRE Education and Training Authority — Document Authentication Request Form.",
    description:
      "Guidance for authenticating educational documents issued in Ethiopia. Requirements depend on the qualification and the documents used for admission.",
    eligibility: [
      "For people requesting authentication of educational credentials issued in Ethiopia.",
      "Additional requirements depend on the credential being authenticated and the applicant's educational history.",
    ],
    requiredDocuments: [
      "Original degree with the required signatures and institutional stamps, where applicable.",
      "Original transcript with the required signatures and institutional stamps, where applicable.",
      "The original diploma or Grade 12 completion certificate used for admission, as applicable.",
      "Authentication or verification of the admission qualification by the relevant authority, where required.",
      "Additional previous-degree verification or name-change evidence, where applicable.",
    ],
    steps: [
      "Open the official Document Authentication Request Form.",
      "Read the eligibility and document requirements for your particular qualification.",
      "Prepare clear scans of the required documents and complete the requested identity and educational information.",
      "Follow the portal's identity verification and document-upload instructions.",
      "Review your application before submitting it.",
      "Follow the official payment instructions provided by the portal; confirm any applicable fees before paying.",
      "Keep your application confirmation so you can track its status.",
    ],
  },
  {
    name: "Evaluate Foreign Educational Qualifications",
    category: "Education",
    url: "https://neta.gov.et/equivalence-letter/aggrement",
    source: "FDRE Education and Training Authority — Foreign Credential Equivalence Requirements.",
    description:
      "Guidance for requesting an Ethiopian equivalence assessment for educational qualifications obtained abroad. Requirements vary by qualification level.",
    eligibility: [
      "For applicants seeking equivalence assessment of educational credentials obtained outside Ethiopia.",
      "The required evidence depends on whether the qualification is secondary school, bachelor's degree, or another level.",
    ],
    requiredDocuments: [
      "For secondary-school equivalence: original and photocopy of the graduation certificate or diploma, authenticated as required by the official instructions.",
      "For bachelor's-degree equivalence: degree certificate and academic transcript, authenticated as required.",
      "High-school graduation certificate and other previous-qualification records, where required for the qualification being assessed.",
      "Passport copies and evidence of study in the country where the qualification was obtained, where required.",
    ],
    steps: [
      "Open the official foreign-credential equivalence requirements page.",
      "Select the requirements that match your qualification level.",
      "Check the authentication requirements for each document before applying.",
      "Prepare the original documents, copies, and supporting evidence specified by the authority.",
      "Follow the official application instructions and submit the requested documents.",
      "Keep your application number or confirmation so you can track the request.",
      "Contact the authority if your qualification or circumstances do not match the listed cases.",
    ],
  },
  {
    name: "Check Education Document Application Status",
    category: "Education",
    url: "https://www.neta.gov.et/check-status",
    source: "FDRE Education and Training Authority — Application Status Tracking.",
    description:
      "Track an existing educational-document authentication or equivalence application using its application number.",
    eligibility: [
      "For applicants who have already submitted an authentication or equivalence request and have an application number.",
    ],
    requiredDocuments: [
      "Application number from the application confirmation email.",
    ],
    steps: [
      "Open the official application-status page.",
      "Find the application-number field.",
      "Enter the application number from your confirmation email.",
      "Submit the status check and review the result displayed by the portal.",
      "Follow any additional instructions provided by the authority.",
      "Contact ETA through its official contact page if you cannot retrieve your status.",
    ],
  },
  {
    name: "Institutional Education Document Verification",
    category: "Education",
    url: "https://portal.neta.gov.et/",
    source: "FDRE Education and Training Authority — Institutional Verification Portal.",
    description:
      "An institutional portal for organizations requesting authentication of their employees' educational documents.",
    eligibility: [
      "Intended for institutions applying to verify employees' educational documents, rather than a general individual application.",
    ],
    requiredDocuments: [
      "Employee educational documents and supporting information requested by the institutional application form.",
      "Any additional information required by the authority's current institutional application instructions.",
    ],
    steps: [
      "Open the official institutional portal.",
      "Review the institutional application instructions and eligibility requirements.",
      "Sign in or follow the institution-registration process if required.",
      "Complete the application with accurate employee and educational-document information.",
      "Upload the supporting documents requested by the portal.",
      "Review the application for completeness before submitting it.",
      "Keep the submission details and follow the portal's status updates.",
    ],
  },

  {
    name: "Renew a Driver's Competence Licence — Addis Ababa",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Guidance on the driver's competence licence renewal service listed by the Addis Ababa authority.",
  },
  {
    name: "Verify an International Driver's Licence — Addis Ababa",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Information about verification of driver competence licences for drivers travelling abroad.",
  },
  {
    name: "Request a Replacement Driver's Licence — Addis Ababa",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Guidance on the replacement driver's licence service listed by the authority.",
  },
  {
    name: "Transfer a Driver's File to a Regional Office",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Information about transferring a driver's file from Addis Ababa to a regional office.",
  },
  {
    name: "Driver Theory Examination Information — Addis Ababa",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Guidance about the driver's theory examination service listed by the authority.",
  },
  {
    name: "Reschedule a Failed Driver Theory Examination",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Information about requesting another appointment after failing a driver's theory examination.",
  },
  {
    name: "Request Removal of a Driver Licence Suspension",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Guidance on the authority's service for requesting removal of a licence suspension.",
  },
  {
    name: "Request Driver Information — Addis Ababa",
    category: "Transport",
    url: "https://dvlca.gov.et/index.php?page=1",
    source: "Addis Ababa Driver's and Vehicle Permit Control Authority.",
    description:
      "Information about the driver's information service listed by the authority.",
  },
  {
    name: "Register as a Taxpayer — Harari Region",
    category: "Tax Services",
    url: "https://www.hra.gov.et/",
    source: "Harari Revenue Authority official portal.",
    description:
      "Guide to finding taxpayer registration information from the Harari Revenue Authority.",
  },
  {
    name: "File Taxes — Harari Region",
    category: "Tax Services",
    url: "https://www.hra.gov.et/",
    source: "Harari Revenue Authority official portal.",
    description:
      "Guide to finding tax filing information and instructions from the Harari Revenue Authority.",
  },
  {
    name: "Pay Taxes — Harari Region",
    category: "Tax Services",
    url: "https://www.hra.gov.et/",
    source: "Harari Revenue Authority official portal.",
    description:
      "Guide to finding official tax payment information from the Harari Revenue Authority.",
  },
];


const transportTaxDocuments: Record<string, string[]> = {
  "Renew a Driver's Competence Licence — Addis Ababa": [
    "Existing driver's competence licence.",
    "Accepted identity document.",
    "Recent photograph, if required by the renewal procedure.",
    "Medical or fitness certificate, if required for the licence category.",
    "Renewal application form and payment reference, where requested."
  ],

  "Verify an International Driver's Licence — Addis Ababa": [
    "Existing Ethiopian driver's competence licence.",
    "Accepted identity document or passport.",
    "Details of the licence to be verified, including its number if available.",
    "International application or receiving-authority details, if requested.",
    "Application form and payment evidence, where applicable."
  ],

  "Request a Replacement Driver's Licence — Addis Ababa": [
    "Accepted identity document.",
    "Licence number or a copy of the previous licence, if available.",
    "Replacement application form.",
    "Police report or loss declaration, if required for a lost licence.",
    "Damaged licence, if requesting replacement because of damage.",
    "Payment reference or receipt, where applicable."
  ],

  "Transfer a Driver's File to a Regional Office": [
    "Accepted identity document.",
    "Existing driver's licence or licence number.",
    "Written request or application for file transfer.",
    "Details of the receiving regional office.",
    "Current address or contact information, if requested."
  ],

  "Driver Theory Examination Information — Addis Ababa": [
    "Accepted identity document.",
    "Learner or driver's application reference, if already registered.",
    "Driving-school or training details, where applicable.",
    "Examination booking or appointment reference, if issued.",
    "Any documents specified for the relevant licence category."
  ],

  "Reschedule a Failed Driver Theory Examination": [
    "Accepted identity document.",
    "Previous examination booking or candidate reference.",
    "Previous examination result or evidence of the failed attempt, if available.",
    "Rescheduling application or appointment details.",
    "Payment reference, if a rescheduling fee applies."
  ],

  "Request Removal of a Driver Licence Suspension": [
    "Accepted identity document.",
    "Suspended driver's licence or licence number.",
    "Suspension notice or official reference explaining the suspension.",
    "Evidence that any required conditions or penalties have been addressed, where applicable.",
    "Formal request and supporting decisions or documents required by the authority."
  ],

  "Request Driver Information — Addis Ababa": [
    "Accepted identity document.",
    "Driver's licence number or other identifying information for the driver.",
    "Written request specifying the information needed.",
    "Proof of authorisation or legal authority if requesting another person's information.",
    "Additional details required by the authority to identify the record."
  ],

  "Register as a Taxpayer — Harari Region": [
    "Valid identification document, such as a National ID or passport.",
    "Proof of address.",
    "Business registration or commercial registration certificate, if registering a business.",
    "Business or trade licence, where applicable.",
    "Business address and contact information.",
    "Additional ownership or representative documents requested by the Harari Revenue Authority."
  ],

  "File Taxes — Harari Region": [
    "Taxpayer Identification Number (TIN) and tax-registration details.",
    "Business or trade licence, where applicable.",
    "Sales invoices, purchase invoices, and accounting records for the reporting period.",
    "Previous tax returns and tax-payment records, where applicable.",
    "VAT records, payroll records, or withholding-tax records, if relevant to the taxpayer.",
    "Tax-return form and supporting schedules required for the applicable tax type."
  ],

  "Pay Taxes — Harari Region": [
    "Taxpayer Identification Number (TIN).",
    "Tax assessment, payment notice, or return showing the amount due.",
    "Tax period and tax type associated with the payment.",
    "Payment reference or invoice number, if issued.",
    "Previous payment receipt, if needed to resolve a payment or account discrepancy."
  ]
};


async function seedVerifiedServices() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri);

  for (const item of services) {
    await Service.updateOne(
      { name: item.name },
      {
        $set: {
          name: item.name,
          category: item.category,
          description: item.description,
          eligibility: item.eligibility ?? [],
          requiredDocuments:
          item.requiredDocuments ?? transportTaxDocuments[item.name] ?? [],
          steps: item.steps ?? [
            "Open the responsible authority's official website.",
            "Find the relevant service and review its current instructions.",
            "Confirm applicable requirements directly with the authority.",
],
          fees: [],
          locations: [
            item.category === "Tax Services"
              ? "Harari Region"
              : "Check the responsible authority",
          ],
          officialUrl: item.url,
          source: item.source,
          lastVerified: null,
        },
      },
      { upsert: true }
    );

    console.log(`Seeded: ${item.name}`);
  }

  console.log(
    `\nProcessed ${services.length} records.`
  );
  console.log(
    `Total services and guides: ${await Service.countDocuments()}`
  );

  await mongoose.disconnect();
}

seedVerifiedServices().catch(async (error) => {
  console.error("Seeding failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
