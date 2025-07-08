import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPage() {
  const user = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'users', user.uid)).then(snap => {
        setIsAdmin(snap.exists() && snap.data()?.role === 'admin');
      });
    } else {
      setIsAdmin(null);
    }
  }, [user]);

  if (!user) return <div className="py-20 text-center text-lg">로그인 필요</div>;
  if (isAdmin === false) return <div className="py-20 text-center text-lg">어드민만 접근 가능</div>;
  if (isAdmin === null) return <div className="py-20 text-center text-lg">로딩 중...</div>;

  return <div className="py-20 text-center text-2xl font-bold">어드민 전용 페이지</div>;
} 