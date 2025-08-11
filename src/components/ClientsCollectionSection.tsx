import MarqueeCarousel from "@/components/ui/marquee-carousel";
import styles from "@/styles/_components/ClientsCollection.module.css";

const ClientsCollectionSection: React.FC = () => {
  const clients = [
    { id: 1, project: "7eleven", image: "7ELEVEN.png" },
    { id: 2, project: "north-camella", image: "CAMELLA.png" },
    { id: 3, project: "gmc", image: "GMC.png" },
    { id: 4, project: "tadeco", image: "TADECO.png" },
    { id: 5, project: "cjclds", image: "CJCLDS.png" },
    { id: 6, project: "um", image: "UM.png" },
    { id: 7, project: "wakoh", image: "WAKOH.png" },
    { id: 8, project: "mang-inasal", image: "INASAL.png" },
    { id: 9, project: "verdon-parc", image: "VERDONPARC.png" },
  ];

  return (
    <section
      id="clients"
      className="padding-small clients-section"
      style={{ paddingBottom: 0 }}
    >
      <div className="container-fluid">
        <div
          className="section-header offset-lg-4"
          style={{
            //color: "rgb(255,255, 255)",
            textShadow: "rgb(0, 0, 0) 1px 1px 2px",
          }}
        >
          <h2 className="text-uppercase mb-3 left-pattern">
            Our Happy Clients
          </h2>
          <h3 className="text-uppercase">we’ve proudly collaborated with</h3>
        </div>
        <div className="pb-10" style={{ backgroundColor: "white" }}>
          <div
            className={styles["clients-collection"]}
            style={{ backgroundColor: "white" }}
          >
            <MarqueeCarousel
              items={clients}
              speed={0.06}
              customItemStyle={{
                filter: "grayscale(1)",
                padding: "0 60px",
              }}
              renderItem={(client) => (
                <img
                  src={`/assets/images/clients/${client.image}`}
                  alt={client.project}
                  className={styles["client-item-img"]}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCollectionSection;
