import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "../../components/ProjectCaseStudy";
import { projectCaseStudyData } from "../../components/projectCaseStudyData";
import {
  getCaseStudyProjectBySlug,
  portfolioProjects,
} from "../../components/projectData";

type ProjectRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.flatMap((project) => {
    if (!project.hasCaseStudy || !project.slug) {
      return [];
    }

    const slug = project.slug.split("/").at(-1);
    return slug ? [{ slug }] : [];
  });
}

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyProjectBySlug(slug);
  const content = project
    ? projectCaseStudyData[project.id]
    : undefined;

  if (!project || !content) {
    return {};
  }

  const pageTitle = project.client
    ? `${project.client} — ${project.title}`
    : `${project.title} | Burgos in Motion`;
  const title = project.client ? pageTitle : { absolute: pageTitle };
  const description = content.metaDescription ?? content.intro;

  return {
    title,
    description,
    alternates: {
      canonical: project.slug,
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      images: [
        {
          url: project.thumbnail,
          alt: project.thumbnailAlt,
        },
      ],
    },
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getCaseStudyProjectBySlug(slug);
  const content = project
    ? projectCaseStudyData[project.id]
    : undefined;

  if (!project || !content) {
    notFound();
  }

  return <ProjectCaseStudy project={project} content={content} />;
}
