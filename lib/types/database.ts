export type BiologicalSex = 'male' | 'female';
export type MealContext = 'fasting' | 'pre_meal' | 'post_meal_1h' | 'post_meal_2h';

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
      };
    };
    Enums: {
      biological_sex: BiologicalSex;
      meal_context: MealContext;
    };
  };
}
