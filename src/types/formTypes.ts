export interface FormData {
  // 3PL Contact Info (all optional)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl: string;

  // Warehouse & Capabilities (mandatory minimum order volume)
  temperatureControlled: boolean;
  temperatureTypes: string[];
  supportsHazmat: boolean;
  supportsFbaProp: boolean;
  handlesReturns: boolean;
  offersKitting: boolean;
  offersSubscriptionFulfillment: boolean;
  offersSameDayShipping: boolean;
  supportsEdi: boolean;
  supportsB2b: boolean;
  b2bTypes: string[];
  minimumOrderVolume: number; // Changed to number and mandatory

  // Insurance & Compliance (moved to capabilities)
  fdaRegistered: boolean;
  hasLiabilityInsurance: boolean;
  certifications: string[];
  otherCertification: string;

  // Tech & Integrations (moved to capabilities)
  wmsSystem: string;
  otherWms: string;
  hasClientPortal: boolean;
  integrations: string[];
  hasProprietarySoftware: boolean;
  proprietarySoftwareDetails: string;
  carriers: string[];

  // SLA & Performance Metrics (moved to capabilities, all optional)
  averageReceivingTime: number;
  maxReceivingTime: number;
  notifiesOnReceiving: boolean;
  
  // Order Fulfillment
  cutoffTime: string;
  dtcSla: string;
  b2bSla: string;
  peakSeasonSla: string;
  
  // Returns (moved to capabilities, all optional)
  returnsProcessingTime: number;
  providesBrandedReturnPortals: boolean;
  
  // Accuracy & Reporting (moved to capabilities, all optional)
  orderAccuracyRate: string;
  inventoryAccuracyRate: string;
  cycleCounting: string;
  providesRealTimeTracking: boolean;
  billingFrequency: string;
  hasOnboardingFees: boolean;
  transparentFees: boolean;
  
  // Support & Communication (moved to capabilities, all optional)
  hasDedicatedManager: boolean;
  responseTime: string;
  supportHours: string;
  hasWeekendSupport: boolean;
  requiresLongTermContracts: boolean;
  providesOnboardingSupport: boolean;
  hasStandardOnboarding: boolean;
  
  // Customer References
  references: Reference[];
  
  // Media Uploads
  logo: File | null;
  warehouseImages: File[];
  introVideo: string;
}

export interface Reference {
  brandName: string;
  website: string;
  contactEmail: string;
}

export type FormSection = 
  | 'contact'
  | 'capabilities'
  | 'references'
  | 'media'
  | 'review';

export interface FormState {
  currentStep: number;
  data: FormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export const initialFormData: FormData = {
  // 3PL Contact Info (all optional)
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  websiteUrl: '',

  // Warehouse & Capabilities
  temperatureControlled: false,
  temperatureTypes: [],
  supportsHazmat: false,
  supportsFbaProp: false,
  handlesReturns: false,
  offersKitting: false,
  offersSubscriptionFulfillment: false,
  offersSameDayShipping: false,
  supportsEdi: false,
  supportsB2b: false,
  b2bTypes: [],
  minimumOrderVolume: 11, // Default to minimum valid value

  // Insurance & Compliance
  fdaRegistered: false,
  hasLiabilityInsurance: false,
  certifications: [],
  otherCertification: '',

  // Tech & Integrations
  wmsSystem: '',
  otherWms: '',
  hasClientPortal: false,
  integrations: [],
  hasProprietarySoftware: false,
  proprietarySoftwareDetails: '',
  carriers: [],

  // SLA & Performance Metrics
  averageReceivingTime: 0,
  maxReceivingTime: 0,
  notifiesOnReceiving: false,
  
  // Order Fulfillment
  cutoffTime: '',
  dtcSla: '',
  b2bSla: '',
  peakSeasonSla: '',
  
  // Returns
  returnsProcessingTime: 0,
  providesBrandedReturnPortals: false,
  
  // Accuracy & Reporting
  orderAccuracyRate: '',
  inventoryAccuracyRate: '',
  cycleCounting: '',
  providesRealTimeTracking: false,
  billingFrequency: '',
  hasOnboardingFees: false,
  transparentFees: false,
  
  // Support & Communication
  hasDedicatedManager: false,
  responseTime: '',
  supportHours: '',
  hasWeekendSupport: false,
  requiresLongTermContracts: false,
  providesOnboardingSupport: false,
  hasStandardOnboarding: false,
  
  // Customer References
  references: [{ brandName: '', website: '', contactEmail: '' }],
  
  // Media Uploads
  logo: null,
  warehouseImages: [],
  introVideo: ''
};