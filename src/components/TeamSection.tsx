import { useEffect } from "react";
//import { useLibraries } from "@/hooks/use-libraries";
import "aos/dist/aos.css";
import styles from "@/styles/_components/Team.module.css";

const TeamSection = () => {
  //useLibraries(); // AOS init

  const teamMembers = [
    {
      id: 1,
      name: "Engr. Dennis Lungtad, CE",
      position: "Project Manager",
      image: "/assets/images/dennis-lungtad.png",
    },
    {
      id: 2,
      name: "Mr. Buds Bayola",
      position: "Area Manager / Marketing Specialist",
      image: "/assets/images/budz-gayola.png",
    },
    {
      id: 3,
      name: "Mr. Rizalde Perez",
      position: "Senior Procurement Manager",
      image: "/assets/images/rizalde-perez.png",
    },
    {
      id: 4,
      name: "Engr. Marcelo Chiong, EE",
      position: "Area Manager – Visayas Area",
      image: "/assets/images/marcelo-chiong.png",
    },
  ];

  return (
    <section id="our-team" className="padding-medium pb-0">
      <div className="container">
        <div className="section-header text-uppercase mb-4">
          <h2 className="left-pattern">Our Team</h2>
          <h3>Meet the Minds Building Your Vision</h3>
        </div>
        <div className="row">
          {teamMembers.map((m, idx) => (
            <div
              key={m.id}
              className="col-sm-6 col-lg-3 mb-5"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className={styles.teamMember + " text-center"}>
                <div className={styles.imageHolder + " mb-3"}>
                  <img
                    src={m.image}
                    alt={m.name}
                    className="img-fluid rounded-circle unselectable"
                    draggable={false}
                  />
                </div>
                <h3 className="fs-5 text-uppercase mb-1">{m.name}</h3>
                <p className="fs-6 text-muted">{m.position}</p>
                <ul className={styles.socialLinks + " list-inline mt-3"}>
                  {/* …social icons… */}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
