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
      admin_actions: {
        Row: {
          id: string
          admin_user_id: string
          action_type: string
          target_type: string
          target_id: string
          description: string | null
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          admin_user_id: string
          action_type: string
          target_type: string
          target_id: string
          description?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          admin_user_id?: string
          action_type?: string
          target_type?: string
          target_id?: string
          description?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
      }
      brand_requirements: {
        Row: {
          id: string
          brand_id: string
          temperature_controlled: boolean | null
          hazmat_support: boolean | null
          fba_prep: boolean | null
          returns_handling: boolean | null
          kitting: boolean | null
          subscription_fulfillment: boolean | null
          same_day_shipping: boolean | null
          b2b_support: boolean | null
          edi_support: boolean | null
          client_portal: boolean | null
          required_integrations: string[] | null
          required_shipping_speed: string | null
          max_receiving_time: number | null
          min_order_accuracy: number | null
          min_inventory_accuracy: number | null
          requires_real_time_tracking: boolean | null
          prefer_no_long_term_contract: boolean | null
          requires_transparent_pricing: boolean | null
          requires_dedicated_manager: boolean | null
          requires_24x7_support: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          brand_id: string
          temperature_controlled?: boolean | null
          hazmat_support?: boolean | null
          fba_prep?: boolean | null
          returns_handling?: boolean | null
          kitting?: boolean | null
          subscription_fulfillment?: boolean | null
          same_day_shipping?: boolean | null
          b2b_support?: boolean | null
          edi_support?: boolean | null
          client_portal?: boolean | null
          required_integrations?: string[] | null
          required_shipping_speed?: string | null
          max_receiving_time?: number | null
          min_order_accuracy?: number | null
          min_inventory_accuracy?: number | null
          requires_real_time_tracking?: boolean | null
          prefer_no_long_term_contract?: boolean | null
          requires_transparent_pricing?: boolean | null
          requires_dedicated_manager?: boolean | null
          requires_24x7_support?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          brand_id?: string
          temperature_controlled?: boolean | null
          hazmat_support?: boolean | null
          fba_prep?: boolean | null
          returns_handling?: boolean | null
          kitting?: boolean | null
          subscription_fulfillment?: boolean | null
          same_day_shipping?: boolean | null
          b2b_support?: boolean | null
          edi_support?: boolean | null
          client_portal?: boolean | null
          required_integrations?: string[] | null
          required_shipping_speed?: string | null
          max_receiving_time?: number | null
          min_order_accuracy?: number | null
          min_inventory_accuracy?: number | null
          requires_real_time_tracking?: boolean | null
          prefer_no_long_term_contract?: boolean | null
          requires_transparent_pricing?: boolean | null
          requires_dedicated_manager?: boolean | null
          requires_24x7_support?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      brands: {
        Row: {
          id: string
          user_id: string
          brand_name: string
          contact_name: string | null
          contact_email: string | null
          phone: string | null
          industry: string | null
          website_url: string | null
          monthly_volume: number
          average_order_value: number | null
          product_types: string[] | null
          preferred_locations: string[] | null
          current_platform: string | null
          current_wms: string | null
          budget_range: string | null
          max_setup_fee: number | null
          timeline_to_start: string | null
          special_requirements: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          brand_name: string
          contact_name?: string | null
          contact_email?: string | null
          phone?: string | null
          industry?: string | null
          website_url?: string | null
          monthly_volume: number
          average_order_value?: number | null
          product_types?: string[] | null
          preferred_locations?: string[] | null
          current_platform?: string | null
          current_wms?: string | null
          budget_range?: string | null
          max_setup_fee?: number | null
          timeline_to_start?: string | null
          special_requirements?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          brand_name?: string
          contact_name?: string | null
          contact_email?: string | null
          phone?: string | null
          industry?: string | null
          website_url?: string | null
          monthly_volume?: number
          average_order_value?: number | null
          product_types?: string[] | null
          preferred_locations?: string[] | null
          current_platform?: string | null
          current_wms?: string | null
          budget_range?: string | null
          max_setup_fee?: number | null
          timeline_to_start?: string | null
          special_requirements?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          company_name: string
          website_url: string | null
          phone: string
          year_founded: number | null
          headquarters_address: string | null
          created_at: string | null
          updated_at: string | null
          is_certified: boolean | null
          certification_date: string | null
          certified_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          website_url?: string | null
          phone: string
          year_founded?: number | null
          headquarters_address?: string | null
          created_at?: string | null
          updated_at?: string | null
          is_certified?: boolean | null
          certification_date?: string | null
          certified_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          website_url?: string | null
          phone?: string
          year_founded?: number | null
          headquarters_address?: string | null
          created_at?: string | null
          updated_at?: string | null
          is_certified?: boolean | null
          certification_date?: string | null
          certified_by?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          message: string
          is_read: boolean | null
          related_entity_type: string | null
          related_entity_id: string | null
          metadata: Json | null
          expires_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          message: string
          is_read?: boolean | null
          related_entity_type?: string | null
          related_entity_id?: string | null
          metadata?: Json | null
          expires_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          title?: string
          message?: string
          is_read?: boolean | null
          related_entity_type?: string | null
          related_entity_id?: string | null
          metadata?: Json | null
          expires_at?: string | null
          created_at?: string | null
        }
      }
      partnerships: {
        Row: {
          id: string
          brand_id: string
          company_id: string
          status: Database["public"]["Enums"]["partnership_status"] | null
          match_score: number | null
          initiated_by: string | null
          notes: string | null
          started_at: string | null
          ended_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          brand_id: string
          company_id: string
          status?: Database["public"]["Enums"]["partnership_status"] | null
          match_score?: number | null
          initiated_by?: string | null
          notes?: string | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          brand_id?: string
          company_id?: string
          status?: Database["public"]["Enums"]["partnership_status"] | null
          match_score?: number | null
          initiated_by?: string | null
          notes?: string | null
          started_at?: string | null
          ended_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
          first_name: string | null
          last_name: string | null
          phone: string | null
          company_name: string | null
          avatar_url: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          user_type?: Database["public"]["Enums"]["user_type"]
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          company_name?: string | null
          avatar_url?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          company_name?: string | null
          avatar_url?: string | null
          is_active?: boolean | null
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
      user_type: "brand" | "3pl" | "admin"
      partnership_status: "pending" | "active" | "paused" | "terminated"
      notification_type: "match_found" | "partnership_request" | "certification_update" | "system_update"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}