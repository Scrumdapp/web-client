export default {
  en: {
    settings: {
      header: "Settings",

      users: {
        title: "Group Members",
        name: "Member",
        actions: "Actions",
        updateTitle: "Edit settings for {{user}}",
        ghost: {
          visible: "Visible",
          hidden: "Hidden",
          labelInput: "User is visible: ",
          labelTable: "Visibility",
        },
        delete: {
          title: "Remove {{user}} from this group",
          steps: "Step {{index}}/{{total}}",
          warn: {
            desc: "Do you want to remove {{user}}? This will permanently delete all their data in this group, and this user will no longer be able to access it",
          },
          confirm: {
            desc: "Type '{{target}}' to permanently delete this member from the group",
            placeholder: "Type the users first name here",
          },
          deleted: {
            title: "Member has been removed",
            desc: "'{{user}}' has been removed from this group",
          },
        },
      },

      checkpointNames: {
        header: "Checkpoint Names",
        editHeader: "Edit checkpoint names",
        description:
            "These are all the checkpoint names that are used in this group:",
        placeholder: "New checkpoint name",
        noNames: "No checkpoint names have been added yet...",
        saveErrorTitle: "Unable to save",
        saveErrorDescription:
            "There was an error while saving, please try again",
      },

      invite: {
        accept: {
          header: "You have been invited to join",
          text: "Enter your given password underneath.",
        },
        inGroup: {
          header: "Already in group",
          text: "You have already joined the group, {{group}}",
        },
        createPassword: "Create a Password",
        password: "Password",
        header: "All Invites",
        create: "New Invite",
        noInvites: "No active invites.",
        expire: "Expires at",
        expired: "Expired",
        modal: {
          error: "Only letters, numbers and spaces and - are allowed.",
          create: "Create",
          header: "Invite others to group.",
          text: "Copy and share this generated link with your team.",
          link: "Link:",
          copy: "Copy link",
          copied: "Copied!",
          done: "Done",
          success: "Link copied to clipboard!",
        },
      },

      background: {
        header: "Background",
        text: "Current background",
        alt: "Background {{id}}",
        current: "Current background",
        modal: {
          select: "Select a background",
          subjects: {
            all: "All",
            landscapes: "Landscapes",
            cities: "Cities",
            people: "People",
            colors: "Colors",
            other: "Other",
          },
        },
      },

    },
  },

  nl: {
    settings: {
      header: "Instellingen",

      users: {
        title: "Groepsgenoten",
        name: "Gebruiker",
        actions: "Acties",
        updateTitle: "Bewerk instellingen voor {{user}}",
        ghost: {
          visible: "Zichtbaar",
          hidden: "Verborgen",
          labelInput: "Gebruiker is zichtbaar: ",
          labelTable: "Zichtbaarheid",
        },
        delete: {
          title: "Verwijder {{user}} uit de groep",
          steps: "Stap {{index}}/{{total}}",
          warn: {
            desc: "Weet je zeker dat je '{{user}}' wilt verwijderen uit de groep? Dit verwijdert alle checkpoints van deze gebruiker. Daarnaast verliest de gebruiker direct toegang tot de groep",
          },
          confirm: {
            desc: "Typ '{{target}}' om de gebruiker uit de groep te verwijderen",
            placeholder: "Typ de naam in dit veld",
          },
          deleted: {
            title: "Gebruiker verwijdert",
            desc: "De gebruiker '{{user}}' is verwijdert uit de groep",
          },
        },
      },

      checkpointNames: {
        header: "Checkpoint namen",
        editHeader: "Pas checkpoint namen aan",
        description:
            "Dit zijn alle checkpoint namen die gebruikt worden in deze groep:",
        placeholder: "Nieuwe checkpoint naam",
        noNames: "Er zijn nog geen checkpoint namen toegevoegd...",
        saveErrorTitle: "Opslaan mislukt",
        saveErrorDescription:
            "Er was een fout bij het opslaan, probeer het later opnieuw",
      },

      invite: {
        accept: {
          header: "Jij bent uitgenodigd voor",
          text: "Voer het gegeven wachtwoord in.",
        },
        inGroup: {
          header: "Al in de groep",
          text: "Jij bent al toegevoegd aan de groep {{group}}",
        },
        createPassword: "Maak een wachtwoord aan",
        password: "Wachtwoord",
        header: "Alle uitnodigingen",
        create: "Maak uitnodiging",
        noInvites: "Geen actieve uitnodigingen",
        expire: "Verloopt op",
        expired: "Verlopen",
        modal: {
          error:
              "Alleen letters, nummer, spaties en de leestekens zijn toegestaan.",
          create: "Maak aan",
          header: "Nodig anderen uit om deel te nemen aan de groep.",
          text: "Kopieer en deel deze link met je team.",
          link: "Link:",
          copy: "Kopieer",
          copied: "Gekopiëerd!",
          done: "Klaar",
          success: "Link gekopieerd naar klembord!",
        },
      },

      background: {
        header: "Achtergrond",
        text: "Huidige achtergrond",
        alt: "Achtergrond {{id}}",
        current: "Huidige achtergrond",
        modal: {
          select: "Kies een achtergrond",
          subjects: {
            all: "Alles",
            landscapes: "Landschappen",
            cities: "Steden",
            people: "Mensen",
            colors: "Kleuren",
            other: "Overig",
          },
        },
      },

    },
  },
};
