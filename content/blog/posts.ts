import type { BlogPost } from "@/lib/blog";

export const posts: BlogPost[] = [
  {
    slug: "making-space-for-the-small-details",
    title: "Making space for the small details",
    date: "September 18, 2025",
    readingTime: "4 min read",
    excerpt: "A few thoughts on why the little decisions in a product often shape how it feels to use.",
    tags: ["Design", "Process"],
    coverImage: { url: "/images/blog-detail.svg", alt: "Illustration about thoughtful design details", width: 1200, height: 700 },
    body: [
      "Good digital experiences are rarely defined by one grand gesture. More often, they are the result of many small decisions that work together quietly.",
      "A considered empty state, a clear label, or a reassuring confirmation can remove friction at exactly the moment it matters. These details are easy to overlook when a team is focused only on the happy path.",
      "I try to leave room in every project to notice those moments, test them with real people, and refine the parts that make an experience feel complete.",
    ],
  },
  {
    slug: "a-practical-design-process",
    title: "A practical design process",
    date: "August 04, 2025",
    readingTime: "6 min read",
    excerpt: "A lightweight way to move from an open-ended problem to a useful first release.",
    tags: ["Design", "Workflow"],
    coverImage: { url: "/images/blog-process.svg", alt: "Illustrated notes and design process boards", width: 1200, height: 700 },
    body: [
      "A process should create momentum, not ceremony. I start by writing down what needs to change for the people using the product and what we still need to learn.",
      "From there, rough sketches and small prototypes help make assumptions visible. Sharing those early gives collaborators something concrete to react to before implementation becomes expensive.",
      "The final step is to measure what happened, keep what worked, and treat the next iteration as part of the same design process.",
    ],
  },
];
