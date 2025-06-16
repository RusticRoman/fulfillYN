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
      temperatureControlled,
      temperatureTypes,
      supportsHazmat,
      supportsFbaProp,
      handlesReturns,
      offersKitting,
      offersSubscriptionFulfillment,
      offersSameDayShipping,
      supportsEdi,
      supportsB2b,
      b2bTypes,
      minimumOrderVolume,
      fdaRegistered,
      hasLiabilityInsurance,
      certifications,
      otherCertification,
      wmsSystem,
      otherWms,
      hasClientPortal,
      integrations,
      hasProprietarySoftware,
      proprietarySoftwareDetails,
      carriers,
      averageReceivingTime,
      maxReceivingTime,
      notifiesOnReceiving,
      cutoffTime,
      dtcSla,
      b2bSla,
      peakSeasonSla,
      returnsProcessingTime,
      providesBrandedReturnPortals,
      orderAccuracyRate,
      inventoryAccuracyRate,
      cycleCounting,
      providesRealTimeTracking,
      billingFrequency,
      hasOnboardingFees,
      transparentFees,
      hasDedicatedManager,
      responseTime,
      supportHours,
      hasWeekendSupport,
      requiresLongTermContracts,
      providesOnboardingSupport,
      hasStandardOnboarding,
      references,
      introVideo,
      ...rest
    } = formData;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('You must be logged in to submit this form');
    }

    console.log('Current user:', user);

    try {
      // 1. Create or update company record
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .upsert({
          user_id: user.id,
          company_name: companyName || 'Unnamed Company',
          website_url: websiteUrl || null,
          phone: phone || 'Not provided',
          year_founded: new Date().getFullYear(), // Default to current year if not provided
          headquarters_address: 'Not provided', // Default value
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (companyError) {
        console.error('Company creation error:', companyError);
        throw new Error(`Failed to create company: ${companyError.message}`);
      }

      console.log('Company created:', company);

      // 2. Create capabilities record
      const { error: capabilitiesError } = await supabase
        .from('capabilities')
        .upsert({
          company_id: company.id,
          temperature_controlled: temperatureControlled,
          temperature_types: temperatureTypes,
          supports_hazmat: supportsHazmat,
          supports_fba_prep: supportsFbaProp,
          handles_returns: handlesReturns,
          offers_kitting: offersKitting,
          offers_subscription_fulfillment: offersSubscriptionFulfillment,
          offers_same_day_shipping: offersSameDayShipping,
          supports_edi: supportsEdi,
          supports_b2b: supportsB2b,
          b2b_types: b2bTypes,
          minimum_order_volume: minimumOrderVolume.toString(),
        }, {
          onConflict: 'company_id'
        });

      if (capabilitiesError) {
        console.error('Capabilities creation error:', capabilitiesError);
        throw new Error(`Failed to create capabilities: ${capabilitiesError.message}`);
      }

      // 3. Create compliance record
      const { error: complianceError } = await supabase
        .from('compliance')
        .upsert({
          company_id: company.id,
          fda_registered: fdaRegistered,
          has_liability_insurance: hasLiabilityInsurance,
          certifications: certifications,
          other_certification: otherCertification || null,
        }, {
          onConflict: 'company_id'
        });

      if (complianceError) {
        console.error('Compliance creation error:', complianceError);
        throw new Error(`Failed to create compliance: ${complianceError.message}`);
      }

      // 4. Create tech stack record
      const { error: techStackError } = await supabase
        .from('tech_stack')
        .upsert({
          company_id: company.id,
          wms_system: wmsSystem || 'Not specified',
          other_wms: otherWms || null,
          has_client_portal: hasClientPortal,
          integrations: integrations,
          has_proprietary_software: hasProprietarySoftware,
          proprietary_software_details: proprietarySoftwareDetails || null,
          carriers: carriers,
        }, {
          onConflict: 'company_id'
        });

      if (techStackError) {
        console.error('Tech stack creation error:', techStackError);
        throw new Error(`Failed to create tech stack: ${techStackError.message}`);
      }

      // 5. Create performance metrics record
      const { error: metricsError } = await supabase
        .from('performance_metrics')
        .upsert({
          company_id: company.id,
          average_receiving_time: averageReceivingTime || 0,
          max_receiving_time: maxReceivingTime || 0,
          notifies_on_receiving: notifiesOnReceiving,
          cutoff_time: cutoffTime || null,
          dtc_sla: dtcSla || 'Not specified',
          b2b_sla: b2bSla || null,
          peak_season_sla: peakSeasonSla || null,
          returns_processing_time: returnsProcessingTime || null,
          provides_branded_return_portals: providesBrandedReturnPortals,
          order_accuracy_rate: orderAccuracyRate || 'Not specified',
          inventory_accuracy_rate: inventoryAccuracyRate || 'Not specified',
          cycle_counting: cycleCounting || 'Not specified',
          provides_real_time_tracking: providesRealTimeTracking,
          billing_frequency: billingFrequency || 'Not specified',
          has_onboarding_fees: hasOnboardingFees,
          transparent_fees: transparentFees,
          has_dedicated_manager: hasDedicatedManager,
          response_time: responseTime || 'Not specified',
          support_hours: supportHours || 'Not specified',
          has_weekend_support: hasWeekendSupport,
          requires_long_term_contracts: requiresLongTermContracts,
          provides_onboarding_support: providesOnboardingSupport,
          has_standard_onboarding: hasStandardOnboarding,
        }, {
          onConflict: 'company_id'
        });

      if (metricsError) {
        console.error('Performance metrics creation error:', metricsError);
        throw new Error(`Failed to create performance metrics: ${metricsError.message}`);
      }

      // 6. Create customer references (only if they have content)
      if (references && references.length > 0) {
        const validReferences = references.filter(ref => 
          ref.brandName?.trim() || ref.website?.trim() || ref.contactEmail?.trim()
        );

        if (validReferences.length > 0) {
          // Delete existing references first
          await supabase
            .from('customer_references')
            .delete()
            .eq('company_id', company.id);

          // Insert new references
          const referenceInserts = validReferences.map(ref => ({
            company_id: company.id,
            brand_name: ref.brandName || 'Not provided',
            website: ref.website || 'Not provided',
            contact_email: ref.contactEmail || 'Not provided',
          }));

          const { error: referencesError } = await supabase
            .from('customer_references')
            .insert(referenceInserts);

          if (referencesError) {
            console.error('References creation error:', referencesError);
            // Don't throw here, references are optional
            console.warn('Failed to create references, but continuing...');
          }
        }
      }

      // 7. Create media assets record
      const { error: mediaError } = await supabase
        .from('media_assets')
        .upsert({
          company_id: company.id,
          logo_url: null, // File uploads would be handled separately
          warehouse_image_urls: [], // File uploads would be handled separately
          intro_video_url: introVideo || null,
        }, {
          onConflict: 'company_id'
        });

      if (mediaError) {
        console.error('Media assets creation error:', mediaError);
        throw new Error(`Failed to create media assets: ${mediaError.message}`);
      }

      console.log('All data successfully saved to Supabase');
      return company;

    } catch (error) {
      console.error('Database operation failed:', error);
      throw error;
    }
  }

  async getCompanyProfile(userId: string) {
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select(`
        *,
        capabilities (*),
        compliance (*),
        tech_stack (*),
        performance_metrics (*),
        customer_references (*),
        media_assets (*)
      `)
      .eq('user_id', userId)
      .single();

    if (companyError) throw companyError;
    return company;
  }
}