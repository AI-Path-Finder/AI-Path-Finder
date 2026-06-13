import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrganizationSite = repositoryName?.endsWith(".github.io");
const basePath =
  isGitHubPages && !isUserOrOrganizationSite
    ? `/${repositoryName ?? "AI-Path-Finder"}`
    : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
};

export default nextConfig;
