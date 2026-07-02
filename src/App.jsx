import Background from "./components/Background.jsx";
import Nav from "./components/Nav.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SectionHero from "./sections/SectionHero.jsx";
import SectionQuestion from "./sections/SectionQuestion.jsx";
import SectionDiffusion from "./sections/SectionDiffusion.jsx";
import SectionHumanOrAI from "./sections/SectionHumanOrAI.jsx";
import SectionConcepts from "./sections/SectionConcepts.jsx";
import SectionTools from "./sections/SectionTools.jsx";
import SectionPrompt from "./sections/SectionPrompt.jsx";
import SectionPipeline from "./sections/SectionPipeline.jsx";
import SectionVideo from "./sections/SectionVideo.jsx";
import SectionClosing from "./sections/SectionClosing.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen text-white font-body overflow-x-hidden">
      <Background />
      <ProgressBar />
      <Nav />
      <main style={{ scrollBehavior: "smooth" }}>
        <SectionHero />
        <SectionQuestion />
        <SectionDiffusion />
        <SectionHumanOrAI />
        <SectionConcepts />
        <SectionTools />
        <SectionPrompt />
        <SectionPipeline />
        <SectionVideo />
        <SectionClosing />
      </main>
    </div>
  );
}
