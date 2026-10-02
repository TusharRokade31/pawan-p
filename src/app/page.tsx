import { getPortfolioData } from '@/db';
import PortfolioView from '@/components/PortfolioView';

export const revalidate = 0; // Dynamic on request

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <PortfolioView
      siteConfig={data.siteConfig}
      projects={data.projects}
      reels={data.reels}
      experiences={data.experiences}
      reviews={data.reviews}
      faqs={data.faqs}
      logos={(data as any).logos || []}
    />
  );
}
