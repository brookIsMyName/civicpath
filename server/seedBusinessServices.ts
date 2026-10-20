
import "dotenv/config";
import mongoose from "mongoose";
import Service from "./models/Service";

const portal = "https://www.new.business.gov.et/";

const businessServices: {
  name: string;
  category: string;
  officialUrl?: string;
  description: string;
  eligibility?: string[];
  requiredDocuments?: string[];
  steps: string[];
  source: string;
}[] = [
  {
    name: "Starting a Business — Ethiopia",
    category: "Business",
    officialUrl:
      "https://new.business.gov.et/Starting%20a%20Business",
    description:
      "Guidance for establishing a legally registered business in Ethiopia. " +
      "The National Business Portal describes company-name registration, " +
      "company documents, TIN registration, commercial registration, " +
      "business licensing, employee registration where applicable, and tax registration. " +
      "Requirements differ by business structure, sector, and location.",
    eligibility: [
      "Individuals planning to establish a legally registered business in Ethiopia.",
      "Applicants must follow the registration requirements for their chosen business structure.",
      "Additional permits or competency certificates may be required for certain business activities."
    ],
    requiredDocuments: [
      "Valid identity document for the business owner or relevant representatives.",
      "Proof of the business's physical address.",
      "Company-name registration confirmation, where required for the chosen business structure.",
      "Memorandum and Articles of Association for applicable company structures, such as PLCs.",
      "Taxpayer Identification Number (TIN) certificate for the relevant registration stage.",
      "Commercial registration documents and any sector-specific permits required for the business activity."
    ],
    steps: [
      "Decide what the business will do and identify its intended legal structure.",
      "Check whether the activity requires sector-specific approval or a competency certificate.",
      "For a PLC or share company, submit the required company-name options to the relevant trade office and obtain the name-registration confirmation.",
      "Where applicable, prepare the Memorandum and Articles of Association and arrange document authentication through the responsible authority.",
      "Confirm the address-proof and identity documents required for your business structure.",
      "Apply for a Taxpayer Identification Number (TIN) through the responsible revenue office.",
      "Submit the required company documents and TIN information to the trade authority for commercial registration.",
      "Obtain the commercial registration certificate before commencing commercial activity.",
      "Apply for the relevant trade or business licence, including any applicable competency certificate.",
      "Ask the responsible revenue authority which tax registrations and filing obligations apply to the business.",
      "If employees are hired, confirm and complete applicable employee income-tax and pension registrations.",
      "Record renewal dates and check the current renewal requirements with the responsible authority."
    ],
    source:
      "Ethiopian National Business Portal — Starting a Business journey. " +
      "Confirm current requirements with the responsible authorities."
  },
  {
    name: "Paying Business Taxes — Ethiopia",
    category: "Tax Services",
    description:
      "Guidance for businesses identifying, filing, and paying their applicable " +
      "Ethiopian taxes. Tax types, registration thresholds, filing frequency, " +
      "deadlines, and payment procedures depend on the business and current tax rules.",
    steps: [
      "Identify the revenue authority responsible for the business and its location.",
      "Gather the business TIN, trade or business licence, accounting records, and previous tax filings where applicable.",
      "Ask the responsible tax authority which tax types apply to the business, such as VAT, turnover tax, income tax, withholding tax, or other sector-specific taxes.",
      "Confirm the current filing frequency, reporting period, deadlines, and required forms for each applicable tax.",
      "Prepare the relevant declarations using the authority's current instructions and the business's records.",
      "Submit the declarations through the approved channel or office.",
      "Confirm the amount due and use an officially accepted payment method.",
      "Keep the submitted declarations, payment receipts, invoices, and supporting records.",
      "Check the next filing deadline and ask the authority how to correct any identified error."
    ],
    source:
      "General guidance. Exact tax obligations and current filing procedures must be confirmed with the responsible Ethiopian revenue authority."
  },
  {
    name: "Construction Permits for Businesses — Ethiopia",
    category: "Business",
    officialUrl:
      "https://www.new.business.gov.et/Construction%20Permits",
    description:
      "The National Business Portal describes a commercial-building journey involving land authentication, planning consent, construction permits, utility coordination, construction-stage inspections, and final inspection. The published journey specifically identifies Addis Ababa authorities; procedures elsewhere may differ.",
    steps: [
      "Confirm the property's location, intended building use, and the authority responsible for the project.",
      "Check the official journey's requirements before preparing an application.",
      "For the described Addis Ababa process, prepare the applicable land documents, such as a lease agreement or title deed, and the debt-provision and neighbour-consent documents specified by the portal.",
      "Submit the land-authentication application to the responsible land administration office and follow its verification process.",
      "Apply for planning consent through the appropriate building-permit department. The office and review depend on the building and project.",
      "Prepare the required design documents and agreements with the relevant design professional or consultant, following the authority's current checklist.",
      "Submit the construction-permit application and obtain approval before proceeding with work that requires the permit.",
      "Ask the authority whether demolition approval, infrastructure relocation, water or sewage connections, or other clearances apply.",
      "Arrange the inspections required at the relevant stages of construction and address any corrections identified by inspectors.",
      "Complete the applicable final inspection and obtain the required completion or occupancy documentation, if applicable."
    ],
    source:
      "Ethiopian National Business Portal — Dealing With Construction Permits journey. " +
      "Published process references Addis Ababa authorities; confirm local rules."
  },
  {
    name: "Registering Property for Business — Ethiopia",
    category: "Property Services",
    officialUrl:
      "https://www.new.business.gov.et/Registering%20Property",
    description:
      "Guidance for property registration and property transfers. The National Business Portal's published journey identifies Addis Ababa land administration and document-authentication authorities. The correct process depends on whether the property is being registered for the first time or transferred to a new owner.",
    steps: [
      "Identify whether the case involves initial registration, adjudication, a sale, or transfer of an already registered property.",
      "Contact the responsible land administration authority to obtain the current document checklist and confirm the applicable procedure.",
      "For property requiring adjudication, submit the required request and supporting documents for review.",
      "Follow the authority's process for resolving or contesting property claims before registration proceeds.",
      "For a property transfer, arrange the required sale agreement and document authentication with the responsible authority.",
      "Obtain any required authorization letter and updated lease documentation where the applicable transfer process requires them.",
      "Apply for property valuation if required and obtain the authority's valuation assessment.",
      "Confirm the applicable duties, taxes, and other charges directly with the responsible offices before payment.",
      "Submit the payment receipts and any required tax-payment authorization documents.",
      "Complete the registration or transfer process and obtain the resulting title deed or official registration document."
    ],
    source:
      "Ethiopian National Business Portal — Registering Property journey. " +
      "Published journey references Addis Ababa authorities; verify the process for the property's location."
  },
  {
    name: "Getting Electricity for Business — Ethiopia",
    category: "Utilities",
    officialUrl:
      "https://www.new.business.gov.et/Getting%20Electricity",
    description:
      "Guidance for obtaining electricity for business premises. The National Business Portal describes construction-stage and building electricity applications, Ethiopian Electric Utility (EEU) assessment, site inspection, cost estimation, installation, and connection. Requirements depend on the premises and requested capacity.",
    steps: [
      "Identify the EEU district or regional office responsible for the premises.",
      "Confirm whether you need a temporary construction connection, a permanent building connection, or an alteration to an existing connection.",
      "Ask the EEU office for the current application form and supporting-document checklist.",
      "For the published business journey, documents may include the construction permit, trade licence, and, for a building connection, the internal wiring plan.",
      "Submit the relevant application and confirm the applicable application fees with the utility.",
      "Arrange the site inspection so EEU can assess the premises, nearby infrastructure, connection requirements, and any transformer needs.",
      "Review the official cost estimate and invoice before making the required payment.",
      "Confirm whether a transformer or other equipment must be supplied by the utility or sourced separately under its instructions.",
      "Complete the required installation, wiring, grounding, and safety checks with the responsible professionals and utility.",
      "Resolve any issues identified during inspection and follow the utility's process for meter installation and energising the connection.",
      "Confirm how the account will be billed and how to pay and retain proof of subsequent electricity payments."
    ],
    source:
      "Ethiopian National Business Portal — Getting Electricity journey. " +
      "Confirm current requirements, fees, and technical conditions with EEU."
  },
  {
    name: "Trading Across Borders — Ethiopia",
    category: "Trade",
    officialUrl:
      "https://www.new.business.gov.et/Trade%20Across%20Borders",
    description:
      "Guidance for businesses importing or exporting goods. The official journey describes different paths for imports and exports, including relevant licences, foreign-exchange and banking procedures where applicable, customs clearance, inspections, and shipment documentation.",
    steps: [
      "Identify whether the transaction is an import or export and describe the goods accurately.",
      "Check whether the goods require a specific trade licence, product permit, inspection, certificate, or other regulatory approval.",
      "Confirm the current requirements with the responsible trade authority and customs authority before committing to a shipment.",
      "For imports, ask the relevant bank and authorities which pro-forma invoice, trade licence, foreign-exchange, insurance, tax, and payment documents apply.",
      "Confirm the accepted payment arrangement with the bank and supplier before shipment.",
      "Check whether the goods require a particular storage facility, customs-bonded warehouse, or special handling.",
      "For exports, confirm the export-licence requirements and whether the goods must pass through the Ethiopian Commodity Exchange or another designated process.",
      "Prepare the goods and obtain the applicable customs declarations, permits, and inspections.",
      "Arrange customs clearance directly or through an authorised clearing or forwarding agent.",
      "Coordinate shipment and retain the invoices, declarations, permits, inspection records, and banking documents."
    ],
    source:
      "Ethiopian National Business Portal — Trade Across Borders journey. " +
      "Requirements vary by goods, transaction, and current regulations."
  },
  {
    name: "Getting Credit for a Business — Ethiopia",
    category: "Financial Services",
    description:
      "Guidance for businesses exploring financing through banks or other regulated financial institutions. Eligibility, collateral, interest rates, repayment terms, required documents, and approval depend on the lender and product.",
    steps: [
      "Estimate the amount of financing needed and explain what the business will use it for.",
      "Identify banks or regulated financial institutions offering suitable business-financing products.",
      "Ask each institution for its current eligibility criteria, document checklist, fees, interest rate, collateral requirements, and repayment schedule.",
      "Prepare the business registration, licence, TIN, financial records, bank statements, business plan, and other documents specifically requested by the lender.",
      "Submit the application through the institution's official channel.",
      "Respond to requests for additional information or verification.",
      "Review the written offer carefully, including total repayment, interest, charges, collateral, and consequences of late payment.",
      "Accept an offer only after understanding its terms and confirming that it fits the business's needs."
    ],
    source:
      "General business-financing guidance. Confirm all requirements and terms with the selected regulated financial institution."
  },
  {
    name: "Enforcing Business Contracts — Ethiopia",
    category: "Legal Services",
    description:
      "Guidance for businesses dealing with a contractual dispute or an obligation that has not been fulfilled. The appropriate remedy depends on the contract, evidence, dispute-resolution clauses, and applicable Ethiopian law.",
    steps: [
      "Read the contract and identify the specific obligation, deadline, or term in dispute.",
      "Collect the signed agreement, amendments, invoices, payment records, correspondence, and other relevant evidence.",
      "Check whether the contract requires written notice, negotiation, mediation, arbitration, or another step before court proceedings.",
      "Keep a clear record of communications and any attempts to resolve the dispute.",
      "Consult a qualified Ethiopian legal professional about the available remedies, applicable deadlines, and risks.",
      "Confirm the correct court or dispute-resolution body and its current filing requirements.",
      "Prepare and submit the required documents through the applicable formal process if advised.",
      "Keep copies of filings and follow official instructions for subsequent hearings, notices, or decisions."
    ],
    source:
      "General legal information, not legal advice. Confirm the applicable process with a qualified Ethiopian legal professional and the responsible dispute-resolution body."
  },
  {
    name: "Resolving Business Insolvency — Ethiopia",
    category: "Business",
    description:
      "Guidance for a business facing serious financial difficulty or possible insolvency. Available procedures, creditor rights, reporting obligations, and deadlines depend on the business's legal structure and applicable law.",
    steps: [
      "Prepare an up-to-date picture of the business's financial position, including assets, debts, cash flow, and outstanding obligations.",
      "Gather financial statements, loan agreements, creditor details, contracts, tax records, and relevant company documents.",
      "Identify urgent payment obligations and any formal notices or legal proceedings already received.",
      "Consult a qualified Ethiopian insolvency or commercial-law professional about the available procedures and immediate legal obligations.",
      "Confirm whether a formal restructuring, insolvency, court, or other statutory process applies to the circumstances.",
      "Ask the responsible authority or professional for the current application requirements, supporting documents, and deadlines.",
      "Follow the applicable formal procedure and keep records of communications, submissions, and decisions.",
      "Do not assume that contacting creditors or stopping payments alone resolves the business's legal obligations."
    ],
    source:
      "General financial and legal information. Confirm the applicable Ethiopian insolvency procedure with a qualified professional and responsible authority."
  },
  {
    name: "Protecting Minority Investors — Ethiopia",
    category: "Business",
    officialUrl:
      "https://www.new.business.gov.et/Protecting%20Minority%20Investments",
    description:
      "The National Business Portal describes aspects of minority-shareholder protection, including company memorandums, authorisation, company registration, annual meetings, and information rights. Specific rights and remedies depend on the company's structure and applicable law.",
    steps: [
      "Before investing, review the company's legal structure, ownership, financial information, and governing documents.",
      "Ensure the Memorandum and Articles of Association accurately record shareholder arrangements, share ownership, decision-making, and profit-and-loss arrangements where applicable.",
      "Ask the responsible document-authentication authority which documents and signatures must be authenticated.",
      "Confirm that any change in ownership or company arrangements is recorded through the required registration process.",
      "Keep copies of the authorised company documents and relevant company decisions.",
      "Participate in meetings and review financial statements and other information available under the governing documents and applicable law.",
      "Record concerns about company decisions, ownership changes, or access to information and preserve relevant evidence.",
      "Consult a qualified Ethiopian legal professional about shareholder rights and available remedies if a dispute arises."
    ],
    source:
      "Ethiopian National Business Portal — Protecting Minority Investments journey. " +
      "Confirm current company-registration and shareholder-rights requirements."
  },

  {
    name: "Ethiopian Business Portal — Explore Business Services",
    category: "Business",
    officialUrl: "https://www.new.business.gov.et/",
    description:
      "A starting point for finding Ethiopian business-service guidance, including business registration, taxes, permits, electricity, trade, property, and financing. It is a directory, so the documents needed depend on the particular service selected.",
    requiredDocuments: [
      "No supporting documents are normally needed just to browse the business-service directory.",
      "For an individual service, prepare the documents listed on that service's own requirements page."
    ],
    steps: [
      "Open the Ethiopian National Business Portal.",
      "Browse the available business services or search for the service you need.",
      "Open the relevant service and choose the scenario that matches your business, where available.",
      "Review its requirements, supporting documents, responsible authority, and application procedure.",
      "Confirm current requirements with the responsible authority before submitting an application."
    ],
    source:
      "Ethiopian National Business Portal — official business-service directory."
  },

];



const businessDocuments: Record<string, string[]> = {
  "Paying Business Taxes — Ethiopia": [
    "Business Taxpayer Identification Number (TIN) certificate.",
    "Current trade or business licence, where applicable.",
    "Sales invoices, purchase invoices, and accounting records for the relevant tax period.",
    "Previous tax returns and tax-payment receipts, where applicable.",
    "Payroll and withholding-tax records, if the business has employees or makes payments subject to withholding.",
    "VAT registration details or other tax-registration records, where applicable."
  ],

  "Construction Permits for Businesses — Ethiopia": [
    "Construction-permit application form.",
    "Debt-provision document and neighbour-consent document for the land-authentication stage, as specified by the portal.",
    "Lease agreement or title deed for the property.",
    "Title deed and agreement between the developer and design consultant for planning consent, as applicable.",
    "Authentication of the design-consultant agreement or power of attorney, as required by the authority.",
    "Architectural plan and a copy of the design consultant's licence.",
    "Structural plan, electrical plan, sanitary-system plan, and soil-test report, as applicable to the project.",
    "Demolition licence and infrastructure-relocation documents, if required.",
    "Architectural and building plans plus inspection reports for an occupancy-permit application."
  ],

  "Registering Property for Business — Ethiopia": [
    "Identity documents for the property owner and purchaser or their authorised representatives.",
    "Existing title deed, lease agreement, or other property-registration records, as applicable.",
    "Sale or transfer agreement submitted for authentication.",
    "Application form requested by the responsible land administration office.",
    "Authorization letter and new lease agreement, where required for a transfer.",
    "Property valuation or valuation assessment, where required.",
    "Tax, duty, and other payment receipts required for the transaction.",
    "Additional registration or tax-clearance documents requested by the responsible authority."
  ],

  "Getting Electricity for Business — Ethiopia": [
    "Completed electricity-connection application form.",
    "Building or construction permit for the premises.",
    "Current trade or business licence, where applicable.",
    "Internal wiring plan for a building electricity connection.",
    "Official cost estimate or invoice issued by Ethiopian Electric Utility (EEU).",
    "Power-requirement information for the premises.",
    "Transformer inspection, import, or installation documents, if a transformer is needed.",
    "Any additional technical or premises documents requested by the responsible EEU office."
  ],

  "Trading Across Borders — Ethiopia": [
    "Current trade or business licence, where applicable.",
    "Import or export trade licence appropriate to the transaction.",
    "Goods-specific licence or regulatory permit, where required.",
    "Warehouse proof or warehouse lease agreement, if required for the goods or licence.",
    "Supplier's pro-forma invoice for an import transaction.",
    "Business TIN certificate and VAT registration certificate, where applicable.",
    "Insurance documents and bank forms required for the chosen foreign-exchange or payment arrangement.",
    "Letter of Credit (LC), Cash Against Documents (CAD), or Telegraphic Transfer (TT) records, as applicable.",
    "Customs declarations, shipping invoices, and transport documents.",
    "Required product certificates, inspection reports, and customs-clearance documents."
  ],

  "Getting Credit for a Business — Ethiopia": [
    "Business registration or commercial registration certificate.",
    "Current business or trade licence, where applicable.",
    "Business TIN certificate.",
    "Recent financial statements and accounting records.",
    "Business bank statements for the period requested by the lender.",
    "Business plan and cash-flow projections, if requested.",
    "Loan application form and identification documents for the applicant or authorised representatives.",
    "Collateral ownership documents or guarantees, if required by the lender.",
    "Existing loan and repayment information, where applicable."
  ],

  "Enforcing Business Contracts — Ethiopia": [
    "Signed contract and any amendments or schedules.",
    "Invoices, receipts, payment records, and other evidence of performance.",
    "Relevant emails, letters, messages, and written notices exchanged by the parties.",
    "Evidence of the alleged breach and any loss claimed.",
    "Records of negotiation, mediation, or arbitration, if applicable.",
    "Company registration or identity documents for the parties, where required.",
    "Power of attorney or other proof of authority if a representative acts for a party.",
    "Court or dispute-resolution application documents specified by the relevant forum."
  ],

  "Resolving Business Insolvency — Ethiopia": [
    "Business registration and governing company documents.",
    "Recent financial statements, accounting records, and cash-flow information.",
    "A list of creditors, outstanding debts, and amounts owed.",
    "A list of business assets and available supporting ownership records.",
    "Loan agreements, guarantees, and repayment schedules.",
    "Contracts, unpaid invoices, and other evidence of outstanding obligations.",
    "Tax returns, tax assessments, and tax-payment records, where applicable.",
    "Formal notices, court papers, or creditor demands already received.",
    "Board or shareholder resolutions and other documents required for the applicable procedure."
  ],

  "Protecting Minority Investors — Ethiopia": [
    "Company Memorandum and Articles of Association.",
    "Shareholder register, share certificates, or other records of share ownership.",
    "Share-purchase or shareholder agreements, where applicable.",
    "Company meeting notices, minutes, and relevant resolutions.",
    "Financial statements and company information available to the shareholder.",
    "Relevant correspondence or records concerning the disputed company decision.",
    "Identity documents and proof of authority for a representative, where applicable.",
    "Court or dispute-resolution documents if formal proceedings have already begun."
  ],

  "Ethiopian Business Portal — Explore Business Services": [
    "No supporting documents are normally needed just to browse the business-service directory.",
    "For an individual service, prepare the documents listed on that service's own requirements page."
  ]
};


async function seedBusinessServices() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(mongoUri);

  try {
    for (const item of businessServices) {
      const record = {
        name: item.name,
        category: item.category,
        description: item.description,
        eligibility: item.eligibility ?? [
          "Eligibility depends on the specific service and the applicant's circumstances. Confirm the current requirements with the responsible authority."
        ],
        requiredDocuments:
        item.requiredDocuments ?? businessDocuments[item.name] ?? [],
        steps: item.steps,
        fees: [],
        locations: ["Ethiopia"],
        officialUrl: item.officialUrl ?? portal,
        source: item.source,
        lastVerified: null
      };

      await Service.updateOne(
        { name: record.name },
        { $set: record },
        { upsert: true }
      );

      console.log(`Updated: ${record.name}`);
    }

    console.log(
      `\nTotal services in database: ${await Service.countDocuments()}`
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedBusinessServices().catch((error) => {
  console.error("Business seeding failed:", error);
  process.exitCode = 1;
});
