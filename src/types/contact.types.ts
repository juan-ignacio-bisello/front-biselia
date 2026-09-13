export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: 'SaaS' | 'Sistema de Gestión' | 'Software a Medida' | '';
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}
