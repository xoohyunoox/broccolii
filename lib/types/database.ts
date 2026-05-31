export type BiologicalSex = 'male' | 'female';
export type MealContext = 'fasting' | 'pre_meal' | 'post_meal_1h' | 'post_meal_2h';

// Shape matches @supabase/postgrest-js GenericSchema so the typed client
// can statically infer Insert / Update / Row shapes. Each table must declare
// Row, Insert, Update, Relationships — even if Relationships is [].
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          date_of_birth: string;
          sex: BiologicalSex;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          date_of_birth: string;
          sex: BiologicalSex;
        };
        Update: {
          name?: string;
          date_of_birth?: string;
          sex?: BiologicalSex;
        };
        Relationships: [];
      };
      glucose_logs: {
        Row: {
          id: string;
          user_id: string;
          value_mg_dl: number;
          meal_context: MealContext;
          logged_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          value_mg_dl: number;
          meal_context: MealContext;
          logged_at: string;
        };
        Update: {
          value_mg_dl?: number;
          meal_context?: MealContext;
          logged_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      biological_sex: BiologicalSex;
      meal_context: MealContext;
    };
    CompositeTypes: Record<string, never>;
  };
}
