import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import AppLayout from "@/components/AppLayout";
import PageIntroBanner from "@/components/ui/PageWrapper";

import Masonry from "react-masonry-css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import styles from "@/styles/_pages/ProjectDetailsPage.module.css";

type Project = {
  projectName: string;
  slug: string;
  region: string;
  dateCompleted?: string;
  isFeatured?: boolean;
  assetPrime: string;
  description: string;
  assetsRef: string;
};

const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/contents/projects/index.json")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p: any) => ({
          projectName: p["project-name"],
          slug:
            p["slug"] || p["project-name"].toLowerCase().replace(/\s+/g, "-"),
          region: p.region,
          dateCompleted: p["date-completed"],
          isFeatured: p["is-featured"],
          assetPrime: p["asset-prime"],
          description: p.description,
          assetsRef: p["assets-ref"],
        }));
        const match = normalized.find((p) => p.slug === slug);
        console.log("match", match);
        if (match) {
          setProject(match);
          fetch(`/contents/projects/${match.assetsRef}`)
            .then((res) => res.json())
            .then((imgs: string[]) => setImages(imgs));
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <PageIntroBanner
          backgroundImageUrl="/images/intro/bg-image4.jpg"
          title={project.projectName}
          //pageName={project.slug}
          pageName={
            <>
              <Link to="/projects" className="text-decoration-none">
                Projects
              </Link>
              {" / "}
              <span className="">{project.slug}</span>
            </>
          }
        >
          <section
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "2rem 1rem",
            }}
          >
            <button onClick={() => navigate(-1)} className={styles["back-to"]}>
              ← Back to Projects
            </button>

            <p>
              <strong>Region:</strong> {project.region}
            </p>
            {project.dateCompleted && (
              <p>
                <strong>Completed:</strong> {project.dateCompleted}
              </p>
            )}
            <p>{project.description}</p>

            <h3 style={{ marginTop: "2rem" }}>Project Gallery</h3>

            <Masonry
              breakpointCols={{
                default: 3,
                1100: 2,
                700: 1,
              }}
              className={styles["masonry-grid"]}
              columnClassName={styles["masonry-column"]}
            >
              {images.map((url, idx) => (
                <Zoom key={idx}>
                  <img
                    key={idx}
                    src={url}
                    alt={`Project image ${idx + 1}`}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                    loading="lazy"
                  />
                </Zoom>
              ))}
            </Masonry>
          </section>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default ProjectDetailsPage;
