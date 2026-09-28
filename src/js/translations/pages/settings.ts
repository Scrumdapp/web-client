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
          steps: "step {{index}}/{{total}}",
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
      },
    },
  },
};
