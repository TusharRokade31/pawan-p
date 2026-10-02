import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';
import { getPortfolioData } from '@/db';
import AdminDashboardClient from './AdminDashboardClient';

export const revalidate = 0;

export default async function AdminPage() {
  const isAuth = await verifyAdminSession();

  if (!isAuth) {
    redirect('/admin/login');
  }

  const data = await getPortfolioData();

  return <AdminDashboardClient data={data} />;
}
