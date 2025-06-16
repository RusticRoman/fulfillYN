export interface BrandFormData {
  // Brand Information
  brandName: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  industry: string;
  websiteUrl: string;
  monthlyVolume: number;
  averageOrderValue: number;
  productTypes: string[];
  preferredLocations: string[];

  // 3PL Requirements
  requirements: {
    temperatureControlled: boolean;
    hazmatSupport: boolean;
    fbaPrep: boolean;
    returnsHandling: boolean;
    kitting: boolean;
    subscriptionFulfillment: boolean;
    sameDayShipping: boolean;
    b2bSupport: boolean;
    ediSupport: boolean;
    clientPortal: boolean;
  };

  // Integration Requirements
  requiredIntegrations: string[];
  currentPlatform: string;
  currentWms: string;

  // Performance Requirements
  requiredShippingSpeed: string;
  maxReceivingTime: number;
  minOrderAccuracy: number;
  minInventoryAccuracy: number;
  requiresRealTimeTracking: boolean;

  // Budget & Contract Preferences
  budgetRange: string;
  maxSetupFee: number;
  preferNoLongTermContract: boolean;
  requiresTransparentPricing: boolean;
  requiresDedicatedManager: boolean;
  requires24x7Support: boolean;

  // Additional Requirements
  specialRequirements: string;
  timelineToStart: string;
}

export interface BrandFormState {
  data: BrandFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export const initialBrandFormData: BrandFormData = {
  // Brand Information
  brandName: '',
  contactName: '',
  contactEmail: '',
  phone: '',
  industry: '',
  websiteUrl: '',
  monthlyVolume: 0,
  averageOrderValue: 0,
  productTypes: [],
  preferredLocations: [],

  // 3PL Requirements
  requirements: {
    temperatureControlled: false,
    hazmatSupport: false,
    fbaPrep: false,
    returnsHandling: false,
    kitting: false,
    subscriptionFulfillment: false,
    sameDayShipping: false,
    b2bSupport: false,
    ediSupport: false,
    clientPortal: false,
  },

  // Integration Requirements
  requiredIntegrations: [],
  currentPlatform: '',
  currentWms: '',

  // Performance Requirements
  requiredShippingSpeed: '',
  maxReceivingTime: 0,
  minOrderAccuracy: 0,
  minInventoryAccuracy: 0,
  requiresRealTimeTracking: false,

  // Budget & Contract Preferences
  budgetRange: '',
  maxSetupFee: 0,
  preferNoLongTermContract: false,
  requiresTransparentPricing: false,
  requiresDedicatedManager: false,
  requires24x7Support: false,

  // Additional Requirements
  specialRequirements: '',
  timelineToStart: '',
};