'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserRole = 'user' | 'pengelola' | 'admin';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return user;
}

async function ensureUserDoc(user: User) {
  if (!db) return;
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.displayName ?? '',
      email: user.email ?? '',
      photoURL: user.photoURL ?? '',
      role: 'user',
      createdAt: serverTimestamp(),
    });
  }
}

export function useUserRole() {
  const user = useAuthState();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (!user || !db) {
      setRole(null);
      return;
    }

    ensureUserDoc(user);

    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      const data = snap.data();
      setRole((data?.role as UserRole) ?? 'user');
    });

    return () => unsub();
  }, [user]);

  return { user, role };
}
