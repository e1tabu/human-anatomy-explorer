import { useState } from 'react';
import { Header } from '@/components/Header';
import { HumanBody } from '@/components/HumanBody';
import { InfoPanel } from '@/components/InfoPanel';

const Index = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const handleRegionClick = (region: string) => {
    setActiveRegion(region);
  };

  const handleClosePanel = () => {
    setActiveRegion(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-300 ${activeRegion ? 'lg:mr-[420px]' : ''}`}>
          <HumanBody
            onRegionClick={handleRegionClick}
            activeRegion={activeRegion}
          />
        </div>
      </main>

      <InfoPanel region={activeRegion} onClose={handleClosePanel} />
    </div>
  );
};

export default Index;
