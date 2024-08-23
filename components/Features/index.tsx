import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto text-black text-center">
          <SectionTitle
            title="Main Features"
            paragraph="Explore the vast world of our MMORPG with these exciting features designed to enhance your play-to-earn experience."
            center
          />

          <div className="text-black grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
