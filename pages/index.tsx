import Home from '@/views/Home/Home';
import { CustomHead } from '@/components/CustomHead';

export default function HomePage() {
  return (
    <>
        <CustomHead title="Brawl Tracker Home" />
        <Home />
    </>
  )
}
