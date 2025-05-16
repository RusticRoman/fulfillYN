export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          user_id: string
          company_name: string
          website_url: string | null
          phone: string
          year_founded: number
          headquarters_address: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          website_url?: string | null
          phone: string
          year_founded: number
          headquarters_address: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          website_url?: string | null
          phone?: string
          year_founded?: number
          headquarters_address?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      warehouses: {
        Row: {
          id: string
          company_id: string
          address: string
          square_footage: number
          capabilities: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          address: string
          square_footage: number
          capabilities?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          address?: string
          square_footage?: number
          capabilities?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      capabilities: {
        Row: {
          id: string
          company_id: string
          temperature_controlled: boolean
          temperature_types: string[]
          supports_hazmat: boolean
          supports_fba_prep: boolean
          handles_returns: boolean
          offers_kitting: boolean
          offers_subscription_fulfillment: boolean
          offers_same_day_shipping: boolean
          supported_marketplaces: string[]
          supports_edi: boolean
          supports_b2b: boolean
          b2b_types: string[]
          minimum_order_volume: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          temperature_controlled?: boolean
          temperature_types?: string[]
          supports_hazmat?: boolean
          supports_fba_prep?: boolean
          handles_returns?: boolean
          offers_kitting?: boolean
          offers_subscription_fulfillment?: boolean
          offers_same_day_shipping?: boolean
          supported_marketplaces?: string[]
          supports_edi?: boolean
          supports_b2b?: boolean
          b2b_types?: string[]
          minimum_order_volume?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          temperature_controlled?: boolean
          temperature_types?: string[]
          supports_hazmat?: boolean
          supports_fba_prep?: boolean
          handles_returns?: boolean
          offers_kitting?: boolean
          offers_subscription_fulfillment?: boolean
          offers_same_day_shipping?: boolean
          supported_marketplaces?: string[]
          supports_edi?: boolean
          supports_b2b?: boolean
          b2b_types?: string[]
          minimum_order_volume?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      compliance: {
        Row: {
          id: string
          company_id: string
          fda_registered: boolean
          has_liability_insurance: boolean
          certifications: string[]
          other_certification: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          fda_registered?: boolean
          has_liability_insurance?: boolean
          certifications?: string[]
          other_certification?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          fda_registered?: boolean
          has_liability_insurance?: boolean
          certifications?: string[]
          other_certification?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      tech_stack: {
        Row: {
          id: string
          company_id: string
          wms_system: string
          other_wms: string | null
          has_client_portal: boolean
          integrations: string[]
          has_proprietary_software: boolean
          proprietary_software_details: string | null
          carriers: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          wms_system: string
          other_wms?: string | null
          has_client_portal?: boolean
          integrations?: string[]
          has_proprietary_software?: boolean
          proprietary_software_details?: string | null
          carriers?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          wms_system?: string
          other_wms?: string | null
          has_client_portal?: boolean
          integrations?: string[]
          has_proprietary_software?: boolean
          proprietary_software_details?: string | null
          carriers?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      performance_metrics: {
        Row: {
          id: string
          company_id: string
          average_receiving_time: number
          max_receiving_time: number
          notifies_on_receiving: boolean
          cutoff_time: string | null
          dtc_sla: string
          b2b_sla: string | null
          peak_season_sla: string | null
          returns_processing_time: number | null
          provides_branded_return_portals: boolean
          order_accuracy_rate: string
          inventory_accuracy_rate: string
          cycle_counting: string
          provides_real_time_tracking: boolean
          billing_frequency: string
          has_onboarding_fees: boolean
          transparent_fees: boolean
          has_dedicated_manager: boolean
          response_time: string
          support_hours: string
          has_weekend_support: boolean
          requires_long_term_contracts: boolean
          provides_onboarding_support: boolean
          has_standard_onboarding: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          average_receiving_time: number
          max_receiving_time: number
          notifies_on_receiving?: boolean
          cutoff_time?: string | null
          dtc_sla: string
          b2b_sla?: string | null
          peak_season_sla?: string | null
          returns_processing_time?: number | null
          provides_branded_return_portals?: boolean
          order_accuracy_rate: string
          inventory_accuracy_rate: string
          cycle_counting: string
          provides_real_time_tracking?: boolean
          billing_frequency: string
          has_onboarding_fees?: boolean
          transparent_fees?: boolean
          has_dedicated_manager?: boolean
          response_time: string
          support_hours: string
          has_weekend_support?: boolean
          requires_long_term_contracts?: boolean
          provides_onboarding_support?: boolean
          has_standard_onboarding?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          average_receiving_time?: number
          max_receiving_time?: number
          notifies_on_receiving?: boolean
          cutoff_time?: string | null
          dtc_sla?: string
          b2b_sla?: string | null
          peak_season_sla?: string | null
          returns_processing_time?: number | null
          provides_branded_return_portals?: boolean
          order_accuracy_rate?: string
          inventory_accuracy_rate?: string
          cycle_counting?: string
          provides_real_time_tracking?: boolean
          billing_frequency?: string
          has_onboarding_fees?: boolean
          transparent_fees?: boolean
          has_dedicated_manager?: boolean
          response_time?: string
          support_hours?: string
          has_weekend_support?: boolean
          requires_long_term_contracts?: boolean
          provides_onboarding_support?: boolean
          has_standard_onboarding?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      customer_references: {
        Row: {
          id: string
          company_id: string
          brand_name: string
          website: string
          contact_email: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          brand_name: string
          website: string
          contact_email: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          brand_name?: string
          website?: string
          contact_email?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      media_assets: {
        Row: {
          id: string
          company_id: string
          logo_url: string | null
          warehouse_image_urls: string[]
          intro_video_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          logo_url?: string | null
          warehouse_image_urls?: string[]
          intro_video_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          logo_url?: string | null
          warehouse_image_urls?: string[]
          intro_video_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}