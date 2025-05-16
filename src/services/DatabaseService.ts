import { supabase } from '../lib/supabase';
import type { FormData } from '../types/formTypes';

export class DatabaseService {
  async createCompanyProfile(formData: FormData) {
    const {
      companyName,
      websiteUrl,
      phone,
      yearFounded,
      headquartersAddress,
      warehouseLocations,
      ...rest
    } = formData;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    // Start a transaction by using a single connection
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        user_id: user.id,
        company_name: companyName,
        website_url: websiteUrl,
        phone,
        year_founded: parseInt(yearFounded),
        headquarters_address: headquartersAddress,
      })
      .select()
      .single();

    if (companyError) throw companyError;

    // Insert warehouses
    const warehouseInserts = warehouseLocations.map(location => ({
      company_id: company.id,
      address: location.address,
      square_footage: location.squareFootage,
      capabilities: location.capabilities,
    }));

    const { error: warehousesError } = await supabase
      .from('warehouses')
      .insert(warehouseInserts);

    if (warehousesError) throw warehousesError;

    // Insert capabilities
    const { error: capabilitiesError } = await supabase
      .from('capabilities')
      .insert({
        company_id: company.id,
        temperature_controlled: rest.temperatureControlled,
        temperature_types: rest.temperatureTypes,
        supports_hazmat: rest.supportsHazmat,
        supports_fba_prep: rest.supportsFbaProp,
        handles_returns: rest.handlesReturns,
        offers_kitting: rest.offersKitting,
        offers_subscription_fulfillment: rest.offersSubscriptionFulfillment,
        offers_same_day_shipping: rest.offersSameDayShipping,
        supported_marketplaces: rest.supportedMarketplaces,
        supports_edi: rest.supportsEdi,
        supports_b2b: rest.supportsB2b,
        b2b_types: rest.b2bTypes,
        minimum_order_volume: rest.minimumOrderVolume,
      });

    if (capabilitiesError) throw capabilitiesError;

    // Insert compliance
    const { error: complianceError } = await supabase
      .from('compliance')
      .insert({
        company_id: company.id,
        fda_registered: rest.fdaRegistered,
        has_liability_insurance: rest.hasLiabilityInsurance,
        certifications: rest.certifications,
        other_certification: rest.otherCertification,
      });

    if (complianceError) throw complianceError;

    // Insert tech stack
    const { error: techStackError } = await supabase
      .from('tech_stack')
      .insert({
        company_id: company.id,
        wms_system: rest.wmsSystem,
        other_wms: rest.otherWms,
        has_client_portal: rest.hasClientPortal,
        integrations: rest.integrations,
        has_proprietary_software: rest.hasProprietarySoftware,
        proprietary_software_details: rest.proprietarySoftwareDetails,
        carriers: rest.carriers,
      });

    if (techStackError) throw techStackError;

    // Insert performance metrics
    const { error: metricsError } = await supabase
      .from('performance_metrics')
      .insert({
        company_id: company.id,
        average_receiving_time: rest.averageReceivingTime,
        max_receiving_time: rest.maxReceivingTime,
        notifies_on_receiving: rest.notifiesOnReceiving,
        cutoff_time: rest.cutoffTime,
        dtc_sla: rest.dtcSla,
        b2b_sla: rest.b2bSla,
        peak_season_sla: rest.peakSeasonSla,
        returns_processing_time: rest.returnsProcessingTime,
        provides_branded_return_portals: rest.providesBrandedReturnPortals,
        order_accuracy_rate: rest.orderAccuracyRate,
        inventory_accuracy_rate: rest.inventoryAccuracyRate,
        cycle_counting: rest.cycleCounting,
        provides_real_time_tracking: rest.providesRealTimeTracking,
        billing_frequency: rest.billingFrequency,
        has_onboarding_fees: rest.hasOnboardingFees,
        transparent_fees: rest.transparentFees,
        has_dedicated_manager: rest.hasDedicatedManager,
        response_time: rest.responseTime,
        support_hours: rest.supportHours,
        has_weekend_support: rest.hasWeekendSupport,
        requires_long_term_contracts: rest.requiresLongTermContracts,
        provides_onboarding_support: rest.providesOnboardingSupport,
        has_standard_onboarding: rest.hasStandardOnboarding,
      });

    if (metricsError) throw metricsError;

    // Insert customer references
    const referenceInserts = rest.references.map(ref => ({
      company_id: company.id,
      brand_name: ref.brandName,
      website: ref.website,
      contact_email: ref.contactEmail,
    }));

    const { error: referencesError } = await supabase
      .from('customer_references')
      .insert(referenceInserts);

    if (referencesError) throw referencesError;

    // Insert media assets
    const { error: mediaError } = await supabase
      .from('media_assets')
      .insert({
        company_id: company.id,
        logo_url: '', // Handle file upload separately
        warehouse_image_urls: [], // Handle file upload separately
        intro_video_url: rest.introVideo,
      });

    if (mediaError) throw mediaError;

    return company;
  }

  async getCompanyProfile(userId: string) {
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select(`
        *,
        warehouses (*),
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