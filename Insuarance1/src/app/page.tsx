import Link from 'next/link';
import Header from './components/Header';
import CoverageSection from './components/CoveregeSection';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <CoverageSection />
      <Footer/>
    </div>
  );
};

export default Home;
