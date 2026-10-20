
import "dotenv/config";
import mongoose from "mongoose";
import Service from "./models/Service";

const guides = [
  {
    name: "Create an eServices Account",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/auth/register",
    description:
      "Guide to creating an account on Ethiopia's government eServices platform.",
    steps: [
      "Open the official registration page.",
      "Complete the requested account information.",
      "Follow the portal's verification instructions.",
      "Keep your login details secure.",
    ],
  },
  {
    name: "Sign In to Government eServices",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/auth/login",
    description:
      "Guidance for accessing an existing government eServices account.",
    steps: [
      "Open the official login page.",
      "Enter the credentials requested by the portal.",
      "Follow any additional verification steps.",
    ],
  },
  {
    name: "Find a Government Service Online",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/services",
    description:
      "Guide to searching and browsing the official government service catalogue.",
    steps: [
      "Open the official services catalogue.",
      "Search by service name, description, or provider.",
      "Review any available service details.",
      "Confirm the current instructions with the responsible provider.",
    ],
  },
  {
    name: "Understand Service Requirements",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/getting-started",
    description:
      "Explains how to review the specific requirements shown for an online service.",
    steps: [
      "Find and open the relevant service.",
      "Read its requirements and terms.",
      "Prepare only the information and documents it requests.",
      "Contact the responsible provider if details are unclear.",
    ],
  },
  {
    name: "Submit an Online Service Application",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/getting-started",
    description:
      "Guide to completing and submitting an application through eServices when the service supports online applications.",
    steps: [
      "Sign in if the selected service requires an account.",
      "Open the relevant service.",
      "Complete the requested fields and provide required documents.",
      "Review your information before submitting.",
    ],
  },
  {
    name: "Track an eServices Application",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en",
    description:
      "Guidance on checking application progress through the eServices workspace.",
    steps: [
      "Sign in to the official portal.",
      "Open My Workspace if available.",
      "Review the status and notifications for your application.",
    ],
  },
  {
    name: "Download Available Certificates or Documents",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en",
    description:
      "Guide to retrieving digital documents made available through the eServices portal.",
    steps: [
      "Sign in to the official portal.",
      "Review your application notifications.",
      "Check My Documents or the relevant workspace section.",
      "Download the document if it has been made available.",
    ],
  },
  {
    name: "Recover a Forgotten eServices Password",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/faq",
    description:
      "Guidance for using the official password recovery process.",
    steps: [
      "Open the official portal login page.",
      "Select the password recovery option.",
      "Follow the verification instructions shown by the portal.",
    ],
  },
  {
    name: "Browse Government Service Providers",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/providers",
    description:
      "Guide to finding government organizations listed as service providers on eServices.",
    steps: [
      "Open the official provider directory.",
      "Search for the organization if the directory is populated.",
      "Open available provider information and follow its official links.",
    ],
  },
  {
    name: "Browse Government Services by Category",
    category: "Digital Government",
    url: "https://www.eservices.gov.et/en/services",
    description:
      "Guide to exploring the categories displayed in the official eServices catalogue, including education, healthcare, employment, and transport.",
    steps: [
      "Open the official services catalogue.",
      "Browse the available categories.",
      "Check whether individual service listings are available.",
      "Use the responsible authority's official source if a listing is unavailable.",
    ],
  },
];


const portalDocuments: Record<string, string[]> = {
  "Create an eServices Account": [
    "Name and contact details requested by the registration form.",
    "Accessible email address or phone number for account verification, as requested.",
    "Identification information requested for the selected account type, if applicable."
  ],

  "Sign In to Government eServices": [
    "Registered username, email address, or other login identifier.",
    "Account password.",
    "Access to the registered email address or phone for additional verification, if requested."
  ],

  "Find a Government Service Online": [
    "The name of the service, government institution, or subject you want to search for.",
    "No supporting documents are normally required just to browse the service catalogue."
  ],

  "Understand Service Requirements": [
    "The name or link of the government service you intend to use.",
    "Any eligibility information relevant to your application.",
    "Documents listed on the selected service's own requirements page."
  ],

  "Submit an Online Service Application": [
    "The information and supporting documents listed by the selected service.",
    "Identification information or ID documents, where required by that service.",
    "Digital copies of required documents, if the service accepts uploads.",
    "Application-specific reference numbers or supporting records, if requested."
  ],

  "Track an eServices Application": [
    "Application or tracking number, if issued.",
    "The account used to submit the application.",
    "Access to registered email or phone notifications, if needed."
  ],

  "Download Available Certificates or Documents": [
    "The account used to submit the application.",
    "Application or certificate reference number, if requested.",
    "Any verification information requested by the portal before download."
  ],

  "Recover a Forgotten eServices Password": [
    "Registered username, email address, or phone number.",
    "Access to the registered email address or phone for account verification.",
    "Any additional information requested by the official recovery process."
  ],

  "Browse Government Service Providers": [
    "The name of the government institution or service provider you want to find.",
    "No supporting documents are normally required just to browse the provider directory."
  ],

  "Browse Government Services by Category": [
    "The category or topic of the service you are looking for.",
    "No supporting documents are normally required just to browse the catalogue.",
    "The selected service's own document checklist, once you find the service."
  ]
};


async function seedPortalGuides() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri);

  for (const guide of guides) {
    await Service.updateOne(
      { name: guide.name },
      {
        $set: {
          name: guide.name,
          category: guide.category,
          description: guide.description,
          eligibility: [],
          requiredDocuments:
            portalDocuments[guide.name] ?? [
              "Check the selected service's official requirements for any supporting documents."
          ],
          steps: guide.steps,
          fees: [],
          locations: ["Online"],
          officialUrl: guide.url,
          source: "Ethiopian Government Electronic Services Portal.",
          lastVerified: null,
        },
      },
      { upsert: true }
    );

    console.log(`Seeded: ${guide.name}`);
  }

  console.log(
    `\nTotal services and guides: ${await Service.countDocuments()}`
  );

  await mongoose.disconnect();
}

seedPortalGuides().catch(async (error) => {
  console.error("Portal guide seeding failed:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
