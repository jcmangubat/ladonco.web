import React from "react";
import styles from "@/styles/_components-reusables/_projects-grid.module.css";

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

type ProjectsGridProps = {
  projects: Project[];
  featuredOnly?: boolean;
  onProjectClick?: (project: Project) => void;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  featuredOnly,
  onProjectClick,
}) => {
  const filteredProjects = featuredOnly
    ? projects.filter((p) => p.isFeatured)
    : projects;

  return (
    <section className={styles.grid}>
      {filteredProjects.map((project, index) => (
        <div key={index} className={styles.tile}>
          <div className={styles.imageWrapper}>
            <img
              src={project.assetPrime}
              alt={project.projectName}
              className={styles.image}
            />
            <span className={styles.badge}>Featured</span>
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>
              <button
                className={styles.titleButton}
                onClick={() => onProjectClick?.(project)}
              >
                {project.projectName}
              </button>
            </h3>
            <p className={styles.region}>{project.region}</p>
            {project.dateCompleted && (
              <p className={styles.date}>Completed: {project.dateCompleted}</p>
            )}
            <p className={styles.description}>{project.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectsGrid;
