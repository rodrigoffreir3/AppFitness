// frontend/src/types/index.ts

// --- Entidades Principais ---

export interface Student {
  id: string;
  name: string;
  email: string;
  active?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
  video_url?: string; // Pode ser URL assinada (R2) ou link externo (Vimeo/YouTube)
}

export interface Workout {
  id: string;
  student_id: string;
  student_name?: string; // Opcional: vem preenchido em listagens conjuntas
  name: string;
  description: string;
  is_active: boolean;
  file_url?: string; // Para PDFs ou planos alimentares anexos
}

export interface WorkoutExercise {
  id: string;
  exercise_id: string;
  exercise_name: string;
  video_url?: string;
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

// --- Autenticação e Branding (White Label) ---

export interface Branding {
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  payment_pix_key?: string;
  payment_link_url?: string;
  payment_instructions?: string;
}

export interface LoginResponse {
  token: string;
  branding?: Branding; // Opcional, pois nem sempre vem preenchido se não tiver white label
}