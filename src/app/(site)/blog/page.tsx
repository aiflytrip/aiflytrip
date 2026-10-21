import {
  BlogHub,
  blogHubMetadata,
} from "@/features/content/components/blog-hub";

// Scheduled posts go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;

export const metadata = blogHubMetadata("en");

export default function BlogPage() {
  return <BlogHub locale="en" />;
}
