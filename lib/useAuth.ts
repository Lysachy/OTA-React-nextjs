'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
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

export function useUserRole() {
  const user = useAuthState();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (!user || !db) {
      setRole(null);
      return;
    }

    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      const data = snap.data();
      setRole((data?.role as UserRole) ?? 'user');
    });

    return () => unsub();
  }, [user]);

  return { user, role };
}
