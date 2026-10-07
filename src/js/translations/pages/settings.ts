export default {
  en: {
    settings: {
      title: "Settings | Scrumdapp",
      header: "Settings",
      background: {
        header: "Background",
        text: "Current background",
        change: "Change background",
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
          apply: "Kies",
        },
      },
      users: {
        title: "Group Members",
        name: "Member",
        actions: "Actions",
        updateTitle: "Edit settings for {{user}}",
        save: "Save",
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
            next: "Continue",
          },
          confirm: {
            desc: "Type '{{target}}' to permanently delete this member from the group",
            placeholder: "Type the users first name here",
            next: "Delete",
          },
          deleted: {
            title: "Member has been removed",
            desc: "'{{user}}' has been removed from this group",
            close: "Close",
          },
        },
      },
      checkpointNames: {
        header: "Checkpoint Names",
        edit: "Edit",
        description:
          "These are all the checkpoint names that are used in this group:",
        placeholder: "Type a checkpoint name here",
        add: "Add a new checkpoint name",
      },
    },
  },
  nl: {
    settings: {
      title: "Instellingen | Scrumdapp",
      header: "Instellingen",
      background: {
        header: "Achtergrond",
        text: "Huidige achtergrond",
        change: "Verander achtergrond",
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
          apply: "Kies",
        },
      },
      users: {
        title: "Groeps genoten",
        name: "Gebruiker",
        actions: "Acties",
        updateTitle: "Bewerk instellingen voor {{user}}",
        save: "Opslaan",
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
            next: "Volgende",
          },
          confirm: {
            desc: "Typ '{{target}}' om de gebruiker uit de groep te verwijderen",
            placeholder: "Typ de naam in dit veld",
            next: "Verwijder",
          },
          deleted: {
            title: "Gebruiker verwijdert",
            desc: "De gebruiker '{{user}}' is verwijdert uit de groep",
            close: "Sluit",
          },
        },
      },
      checkpointNames: {
        header: "Checkpoint Names",
        edit: "Pas aan",
        description:
          "Dit zijn alle checkpoint namen die gebruikt worden in deze groep:",
        placeholder: "Type een checkpoint naam hier",
        add: "Voeg een nieuwe checkpoint naam toe",
      },
    },
  },
};
