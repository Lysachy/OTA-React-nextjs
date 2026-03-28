import {
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Destination {
  id: string;
  name: string;
  location: string;
  emoji: string;
  thumbColor: string;
  tags: string[];
  priceStart: number;
  isLive: boolean;
}

export async function getDestinations(filter?: string): Promise<Destination[]> {
  if (!db) return [];
  const ref = collection(db, "destinations");
  const q =
    filter && filter !== "Semua"
      ? query(ref, where("location", "==", filter))
      : ref;

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination));
}

export function subscribeSensor(
  docId: string,
  callback: (data: DocumentData | undefined) => void
) {
  if (!db) return () => {};
  const docRef = doc(db, "monitoring_data", docId);
  return onSnapshot(docRef, (snap) => callback(snap.data()));
}
