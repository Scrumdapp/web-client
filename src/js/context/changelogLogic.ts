import { useEffect } from "react";
import ChangelogV1_2 from "../../components/changelog/v1_2.tsx";
import ChangelogV1_1 from "../../components/changelog/v1_1.tsx";
import { ModalState } from "../hooks/useModalState.ts";

const STORAGE_KEY = "seenChangelogs";

export const CHANGELOGS = [
  { versionId: "1.2", ChangelogComponent: ChangelogV1_2 },
  { versionId: "1.1", ChangelogComponent: ChangelogV1_1 },
];

const CHANGELOG_IDS = CHANGELOGS.map((c) => c.versionId);

function readSeen(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSeen(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

function listsDiffer(a: string[] | null, b: string[]) {
  if (!Array.isArray(a)) return true;
  return a.length !== b.length || a.some((id, i) => id !== b[i]);
}

export function useAutoOpenChangelog(modal: ModalState) {
  useEffect(() => {
    if (listsDiffer(readSeen(), CHANGELOG_IDS)) {
      modal.open();
      writeSeen(CHANGELOG_IDS);
    }
  }, []);
}
