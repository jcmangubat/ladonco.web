import CountUp from "react-countup";

const AchievementsSection = () => {
  const achievements = [
    { number: 410, label: "Projects Done!" },
    { number: 25, label: "Years of trusted service" },
    { number: 97, label: "Client satisfaction rate", suffix: "%" },
    { number: 6, label: "Recognitions & awards" },
  ];

  return (
    <section id="our-achievement" className="padding-large bg-gray-200">
      <div className="container">
        <div className="row">
          {achievements.map((achievement, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter-info text-center d-flex align-items-end justify-content-center">
                <div className="counter-number d-flex align-items-center">
                  <h4 className="timer fw-bold m-0">
                    <CountUp
                      end={achievement.number}
                      duration={1.5}
                      enableScrollSpy
                      scrollSpyDelay={200}
                      suffix={achievement.suffix || ""}
                    />
                  </h4>
                </div>
                <p className="counter-description text-uppercase ps-2 fw-bold">
                  {achievement.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
