import React, { useEffect, useState } from "react";
import ProjectsGrid from "./ui/projects-grid";
import { useNavigate } from "react-router-dom";

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

const ProjectsFeaturedSection: React.FC = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/assets/contents/projects/index.json")
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
        setProjects(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" style={{ paddingBottom: 0 }}>
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Our Featured Projects
          </h2>
          <h3 style={{ textTransform: "uppercase", color: "#555" }}>
            Explore our works
          </h3>
        </header> */}

        <div
          className="section-header offset-lg-4"
          style={{
            textShadow: "rgb(0, 0, 0) 1px 1px 2px",
          }}
        >
          <h2 className={`text-uppercase mb-3 left-pattern`}>
            Our Featured Projects
          </h2>
          <h3 className={`text-uppercase`}>Explore our works</h3>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ProjectsGrid
            projects={projects}
            featuredOnly={true}
            onProjectClick={(project) => {
              navigate(`/projects/${project.slug}`);
            }}
          />
        )}
        <div style={{ textAlign: "center" }}>
          <a
            href="/projects"
            className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase mb-5"
            draggable={false}
          >
            <span>See More Projects...</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsFeaturedSection;
