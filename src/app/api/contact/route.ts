import { NextRequest, NextResponse } from 'next/server';
import { CreateContact, ContactsApi } from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, firstName, lastName, email, phone, projectSize, stack, requiresDatabase, budget } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY environment variable is not set');
      return NextResponse.json(
        { 
          error: 'Configuration manquante',
          details: 'La clé API Brevo n\'est pas configurée. Veuillez contacter l\'administrateur.'
        },
        { status: 500 }
      );
    }

    // Initialize API with API key
    const contactAPI = new ContactsApi();
    (contactAPI as unknown as { authentications: { apiKey: { apiKey: string } } }).authentications.apiKey.apiKey = apiKey;

    // Create contact object
    const contact = new CreateContact();
    contact.email = email;
    contact.listIds = [3]; // List ID 3 as requested
    contact.attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      COMPANY: company,
      PHONE: phone,
      PROJECT_SIZE: projectSize,
      TECH_STACK: stack,
      REQUIRES_DATABASE: requiresDatabase ? 'Oui' : 'Non',
      BUDGET: budget,
      SOURCE: 'https://ai2h.tech'
    };
    
    // Create the contact
    const response = await contactAPI.createContact(contact);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact créé avec succès',
        contactId: response.body?.id 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Error creating contact:', error);
    
    // Type guard to check if error has response property
    const isAxiosError = (err: unknown): err is { response?: { data?: { message?: string }; status?: number }; status?: number; body?: { message?: string }; message?: string } => {
      return typeof err === 'object' && err !== null;
    };
    
    // Log the full error response for debugging
    if (isAxiosError(error) && error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    
    // Provide more specific error messages
    let errorMessage = 'Erreur lors de la création du contact';
    let details = 'Une erreur inattendue s\'est produite';
    
    if (isAxiosError(error)) {
      details = error.response?.data?.message || error.body?.message || error.message || details;
      
      const status = error.status || error.response?.status;
      if (status === 401) {
        errorMessage = 'Erreur d\'authentification';
        details = 'Clé API invalide ou expirée';
      } else if (status === 400) {
        errorMessage = 'Données invalides';
        details = error.response?.data?.message || 'Vérifiez que tous les champs sont correctement remplis';
      } else if (status === 403) {
        errorMessage = 'Accès refusé';
        details = 'Permissions insuffisantes pour créer le contact';
      }
    }

    console.error('Error creating contact:', errorMessage, details);
    
    const status = isAxiosError(error) ? (error.status || error.response?.status || 500) : 500;
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: details
      },
      { status }
    );
  }
}
