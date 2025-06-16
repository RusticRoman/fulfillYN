import { supabase } from '../lib/supabase';
import type { FormData } from '../types/formTypes';

export class DatabaseService {
  async createCompanyProfile(formData: FormData) {
    const {
      companyName,
      websiteUrl,
      phone,
      firstName,
      lastName,
      email,
      // We'll store the rest as JSON in a separate field for now
      ...restData
    } = formData;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('You must be logged in to submit this form');
    }

    console.log('Current user:', user);

    try {
      // Create or update company record
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .upsert({
          user_id: user.id,
          company_name: companyName || 'Unnamed Company',
          website_url: websiteUrl || null,
          phone: phone || 'Not provided',
          year_founded: new Date().getFullYear(),
          headquarters_address: 'Not provided',
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (companyError) {
        console.error('Company creation error:', companyError);
        throw new Error(`Failed to create company: ${companyError.message}`);
      }

      console.log('Company created/updated successfully:', company);

      // For now, we'll log the additional form data that would go into other tables
      // until we create the proper database migrations
      console.log('Additional form data (not stored yet):', {
        capabilities: {
          temperatureControlled: restData.temperatureControlled,
          temperatureTypes: restData.temperatureTypes,
          supportsHazmat: restData.supportsHazmat,
          supportsFbaProp: restData.supportsFbaProp,
          handlesReturns: restData.handlesReturns,
          offersKitting: restData.offersKitting,
          offersSubscriptionFulfillment: restData.offersSubscriptionFulfillment,
          offersSameDayShipping: restData.offersSameDayShipping,
          supportsEdi: restData.supportsEdi,
          supportsB2b: restData.supportsB2b,
          b2bTypes: restData.b2bTypes,
          minimumOrderVolume: restData.minimumOrderVolume,
        },
        compliance: {
          fdaRegistered: restData.fdaRegistered,
          hasLiabilityInsurance: restData.hasLiabilityInsurance,
          certifications: restData.certifications,
          otherCertification: restData.otherCertification,
        },
        techStack: {
          wmsSystem: restData.wmsSystem,
          otherWms: restData.otherWms,
          hasClientPortal: restData.hasClientPortal,
          integrations: restData.integrations,
          hasProprietarySoftware: restData.hasProprietarySoftware,
          proprietarySoftwareDetails: restData.proprietarySoftwareDetails,
          carriers: restData.carriers,
        },
        performanceMetrics: {
          averageReceivingTime: restData.averageReceivingTime,
          maxReceivingTime: restData.maxReceivingTime,
          notifiesOnReceiving: restData.notifiesOnReceiving,
          cutoffTime: restData.cutoffTime,
          dtcSla: restData.dtcSla,
          b2bSla: restData.b2bSla,
          peakSeasonSla: restData.peakSeasonSla,
          returnsProcessingTime: restData.returnsProcessingTime,
          providesBrandedReturnPortals: restData.providesBrandedReturnPortals,
          orderAccuracyRate: restData.orderAccuracyRate,
          inventoryAccuracyRate: restData.inventoryAccuracyRate,
          cycleCounting: restData.cycleCounting,
          providesRealTimeTracking: restData.providesRealTimeTracking,
          billingFrequency: restData.billingFrequency,
          hasOnboardingFees: restData.hasOnboardingFees,
          transparentFees: restData.transparentFees,
          hasDedicatedManager: restData.hasDedicatedManager,
          responseTime: restData.responseTime,
          supportHours: restData.supportHours,
          hasWeekendSupport: restData.hasWeekendSupport,
          requiresLongTermContracts: restData.requiresLongTermContracts,
          providesOnboardingSupport: restData.providesOnboardingSupport,
          hasStandardOnboarding: restData.hasStandardOnboarding,
        },
        references: restData.references,
        media: {
          introVideo: restData.introVideo,
        }
      });

      console.log('3PL application data successfully saved to Supabase');
      return company;

    } catch (error) {
      console.error('Database operation failed:', error);
      throw error;
    }
  }

  async getCompanyProfile(userId: string) {
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (companyError) throw companyError;
    return company;
  }
}