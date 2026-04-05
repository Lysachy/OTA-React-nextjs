'use client';

import { useSearchParams } from 'next/navigation';
import { useUserRole } from '@/lib/useAuth';
import AuthForm from './AuthForm';
import ProfileView from './ProfileView';

export default function ProfileContent() {
  const { user, role } = useUserRole();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      {user ? <ProfileView user={user} role={role} /> : <AuthForm initialMode={initialMode} />}
    </section>
  );
}
