export default {
  en: {
    errors: {
      title: "Page not found | Scrumdapp",
      goback: "Go back",
      notfound: "404 error, page not found",

      generic: {
        badRequest: {
          title: "Bad request",
          description: "The request was malformed or invalid.",
        },
        authenticationRequired: {
          title: "Authentication required",
          description:
            "You need to be logged in to access this page. Please log in and try again.",
        },
        invalidToken: {
          title: "Invalid token",
          description:
            "The token provided is invalid or has expired. Please request a new token and try again.",
        },
        accessDenied: {
          title: "Access denied",
          description: "There is no permission to access this resource.",
        },
        internal: {
          title: "Internal server error",
          description: "An unexpected error occurred on the server.",
        },
        serviceUnavailable: {
          title: "Service unavailable",
          description:
            "The service is currently unavailable. Please try again later.",
        },
        notFound: {
          title: "Page not found",
          description: "The requested page could not be found.",
          goback: "Go back",
        },
        unknown: {
          title: "Unknown error",
          description: "An unknown error occurred. Please try again later.",
        },
      },

      validation: {
        failed: {
          title: "Invalid input",
          description:
            "Some of the information that is entered is invalid. Please check the input and try again.",
        },

        email: {
          title: "Invalid email address",
          description: "Please enter a valid email address.",
          required: "Please enter an email address.",
          invalid: "Please enter a valid email address.",
        },

        group: {
          name: {
            pattern: "Please enter a valid group name.",
            required: "Please enter a group name.",
            minLength: "Group name must be at least 3 characters long.",
            maxLength: "Group name cannot be longer than 64 characters.",
          },
        },

        userId: {
          required: "User ID is required.",
          invalid: "Please provide a valid user ID.",
        },

        sessionId: {
          required: "Session ID is required.",
          invalid: "Please provide a valid session ID.",
        },

        presence: {
          invalid: "Please select a valid presence status.",
        },

        impediment: {
          maxLength: "Obstacles cannot be longer than 2,000 characters.",
        },

        stars: {
          tooSmall: "Stars cannot be less than 0.",
          tooLarge: "Stars cannot be more than 10.",
        },

        comment: {
          maxLength: "Comments cannot be longer than 2,000 characters.",
        },

        name: {
          maxLength: "Name cannot be longer than 32 characters.",
          invalid: "Please enter a valid name.",
          required: "Please enter a name.",
        },

        invite: {
          password: {
            invalid: "Please enter a valid password.",
            required: "Please enter a password.",
            minLength: "Password must be at least 1 character long.",
            maxLength: "Password cannot be longer than 100 characters.",
          },
          expiresAt: { invalid: "Please enter a valid expiration date." },
          firstName: {
            maxLength: "First name cannot be longer than 64 characters.",
          },
          lastName: {
            maxLength: "Last name cannot be longer than 64 characters.",
          },
        },
      },

      invite: {
        notFound: {
          title: "Invite not found",
          description: "The requested invite could not be found.",
        },
        expired: {
          title: "Invite expired",
          description: "This invite has expired and is no longer valid.",
        },
        passwordIncorrect: {
          title: "Incorrect password",
          description: "The entered password for this invite is incorrect.",
        },
      },

      checkpoint: {
        expired: {
          title: "Checkpoint expired",
          description: "This checkpoint has expired and is no longer valid.",
        },
        notFound: {
          title: "Check-in not found",
          description: "The requested check-in could not be found.",
        },
      },

      user: {
        notFound: {
          title: "User not found",
          description: "The requested user could not be found.",
        },
      },

      group: {
        notFound: {
          title: "Group not found",
          description: "The requested group could not be found.",
        },
      },

      trends: {
        notFound: {
          title: "Trends not found",
          description: "The requested trends could not be found.",
        },
      },
    },
  },

  nl: {
    errors: {
      generic: {
        badRequest: {
          title: "Ongeldig verzoek",
          description: "Het verzoek is ongeldig of onjuist opgebouwd.",
        },
        authenticationRequired: {
          title: "Inloggen vereist",
          description:
            "Je moet ingelogd zijn om deze pagina te bekijken. Log in en probeer het opnieuw.",
        },
        invalidToken: {
          title: "Ongeldige token",
          description:
            "De opgegeven token is ongeldig of verlopen. Vraag een nieuwe token aan en probeer het opnieuw.",
        },
        accessDenied: {
          title: "Toegang geweigerd",
          description: "Er is geen toestemming om deze bron te bekijken.",
        },
        internal: {
          title: "Interne serverfout",
          description: "Er is een onverwachte fout opgetreden op de server.",
        },
        serviceUnavailable: {
          title: "Service niet beschikbaar",
          description:
            "De service is momenteel niet beschikbaar. Probeer het later opnieuw.",
        },
        notFound: {
          title: "Pagina niet gevonden",
          description: "De gevraagde pagina is niet gevonden.",
          goback: "Ga terug",
        },
        unknown: {
          title: "Onbekende fout",
          description:
            "Er is een onbekende fout opgetreden. Probeer het later opnieuw.",
        },
      },

      validation: {
        failed: {
          title: "Ongeldige invoer",
          description:
            "Een deel van de ingevoerde informatie is ongeldig. Controleer de invoer en probeer het opnieuw.",
        },

        email: {
          title: "Ongeldig e-mailadres",
          description: "Vul een geldig e-mailadres in.",
          required: "Vul een e-mailadres in.",
          invalid: "Vul een geldig e-mailadres in.",
        },

        group: {
          name: {
            pattern: "Vul een geldige groepsnaam in.",
            required: "Vul een groepsnaam in.",
            minLength: "De groepsnaam moet minimaal 3 tekens bevatten.",
            maxLength: "De groepsnaam mag niet langer zijn dan 64 tekens.",
          },
        },

        userId: {
          required: "Gebruikers-ID is verplicht.",
          invalid: "Vul een geldige gebruikers-ID in.",
        },

        sessionId: {
          required: "Sessie-ID is verplicht.",
          invalid: "Vul een geldige sessie-ID in.",
        },

        presence: {
          invalid: "Selecteer een geldige aanwezigheidsstatus.",
        },

        impediment: {
          maxLength: "Een obstakel mag niet langer zijn dan 2.000 tekens.",
        },

        stars: {
          tooSmall: "Het aantal sterren kan niet lager zijn dan 0.",
          tooLarge: "Het aantal sterren kan niet hoger zijn dan 10.",
        },

        comment: {
          maxLength: "Een opmerking mag niet langer zijn dan 2.000 tekens.",
        },

        name: {
          maxLength: "De naam mag niet langer zijn dan 32 tekens.",
          invalid: "Vul een geldige naam in.",
          required: "Vul een naam in.",
        },

        invite: {
          password: {
            invalid: "Vul een geldig wachtwoord in.",
            required: "Vul het wachtwoord in.",
            minLength: "Het wachtwoord moet minimaal 1 teken bevatten.",
            maxLength: "Het wachtwoord mag niet langer zijn dan 100 tekens.",
          },
          expiresAt: {
            invalid: "Vul een geldige vervaldatum in.",
          },
          firstName: {
            maxLength: "De voornaam mag niet langer zijn dan 64 tekens.",
          },
          lastName: {
            maxLength: "De achternaam mag niet langer zijn dan 64 tekens.",
          },
        },
      },

      invite: {
        notFound: {
          title: "Uitnodiging niet gevonden",
          description: "De gevraagde uitnodiging is niet gevonden.",
        },
        expired: {
          title: "Uitnodiging verlopen",
          description: "Deze uitnodiging is verlopen en niet meer geldig.",
        },
        passwordIncorrect: {
          title: "Onjuist wachtwoord",
          description:
            "Het ingevoerde wachtwoord voor deze uitnodiging is onjuist.",
        },
      },

      checkpoint: {
        expired: {
          title: "Checkpoint verlopen",
          description: "Dit checkpoint is verlopen en niet meer geldig.",
        },
        notFound: {
          title: "Check-in niet gevonden",
          description: "De gevraagde check-in is niet gevonden.",
        },
      },

      user: {
        notFound: {
          title: "Gebruiker niet gevonden",
          description: "De gevraagde gebruiker is niet gevonden.",
        },
      },

      group: {
        notFound: {
          title: "Groep niet gevonden",
          description: "De gevraagde groep is niet gevonden.",
        },
      },

      trends: {
        notFound: {
          title: "Trends niet gevonden",
          description: "De gevraagde trends zijn niet gevonden.",
        },
      },
    },
  },
};
