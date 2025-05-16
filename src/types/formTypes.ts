export interface FormData {
  // Basic Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl: string;

  // Company Overview
  yearFounded: string;
  headquartersAddress: string;
  totalWarehouses: number;
  warehouseLocations: WarehouseLocation[];

  // Warehouse & Capabilities
  temperatureControlled: boolean;
  temperatureTypes: string[];
  supportsHazmat: boolean;
  supportsFbaProp: boolean;
  handlesReturns: boolean;
  offersKitting: boolean;
  offersSubscriptionFulfillment: boolean;
  offersSameDayShipping: boolean;
  supportedMarketplaces: string[];
  supportsEdi: boolean;
  supportsB2b: boolean;
  b2bTypes: string[];
  minimumOrderVolume: string;

  // Insurance & Compliance
  fdaRegistered: boolean;
  hasLiabilityInsurance: boolean;
  certifications: string[];
  otherCertification: string;

  // Tech & Integrations
  wmsSystem: string;
  otherWms: string;
  hasClientPortal: boolean;
  integrations: string[];
  hasProprietarySoftware: boolean;
  proprietarySoftwareDetails: string;
  carriers: string[];

  // SLA & Performance Metrics
  averageReceivingTime: number;
  maxReceivingTime: number;
  notifiesOnReceiving: boolean;
  
  // Order Fulfillment
  cutoffTime: string;
  dtcSla: string;
  b2bSla: string;
  peakSeasonSla: string;
  
  // Returns
  returnsProcessingTime: number;
  providesBrandedReturnPortals: boolean;
  
  // Accuracy & Reporting
  orderAccuracyRate: string;
  inventoryAccuracyRate: string;
  cycleCounting: string;
  providesRealTimeTracking: boolean;
  billingFrequency: string;
  hasOnboardingFees: boolean;
  transparentFees: boolean;
  
  // Support & Communication
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

export interface WarehouseLocation {
  address: string;
  squareFootage: number;
  capabilities: string[];
}

export interface Reference {
  brandName: string;
  website: string;
  contactEmail: string;
}

export type FormSection = 
  | 'contact'
  | 'company'
  | 'capabilities'
  | 'insurance'
  | 'tech'
  | 'sla'
  | 'returns'
  | 'accuracy'
  | 'support'
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
  // Basic Contact Info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  websiteUrl: '',

  // Company Overview
  yearFounded: '',
  headquartersAddress: '',
  totalWarehouses: 1,
  warehouseLocations: [{ address: '', squareFootage: 0, capabilities: [] }],

  // Warehouse & Capabilities
  temperatureControlled: false,
  temperatureTypes: [],
  supportsHazmat: false,
  supportsFbaProp: false,
  handlesReturns: false,
  offersKitting: false,
  offersSubscriptionFulfillment: false,
  offersSameDayShipping: false,
  supportedMarketplaces: [],
  supportsEdi: false,
  supportsB2b: false,
  b2bTypes: [],
  minimumOrderVolume: '',

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