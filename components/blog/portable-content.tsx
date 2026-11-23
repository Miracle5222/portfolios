import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/image";
import type { BlogContentBlock } from "@/lib/blog";

type PortableImage = {
  _type: "image";
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  asset?: { _ref?: string };
};

type VideoBlock = {
  videoUrl?: string;
  videoFileUrl?: string;
  caption?: string;
};

type CodeBlock = {
  code?: string;
  language?: string;
  filename?: string;
};

function videoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
    if (parsed.hostname.endsWith("youtube.com")) {
      const videoId = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).at(-1);
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
    }
    if (parsed.hostname.endsWith("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean).at(-1);
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 leading-8">{children}</p>,
    h2: ({ children }) => <h2 className="!mt-14 !mb-5 text-4xl leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="!mt-10 !mb-4 text-3xl">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l-2 border-primary pl-6 font-heading text-2xl italic text-muted-foreground">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-7">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-7">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const blank = value?.blank === true;
      return <a href={href} target={blank ? "_blank" : undefined} rel={blank ? "noopener noreferrer" : undefined} className="font-medium text-primary underline decoration-primary/40 underline-offset-4">{children}</a>;
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableImage;
      if (!image.asset?._ref) return null;
      const src = urlFor(image as never).width(1440).auto("format").url();
      return (
        <figure className="my-10">
          <Image src={src} alt={image.alt ?? ""} width={image.width ?? 1440} height={image.height ?? 960} className="h-auto w-full rounded-2xl" />
          {image.caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{image.caption}</figcaption>}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      const video = value as VideoBlock;
      const source = video.videoFileUrl ?? video.videoUrl;
      if (!source) return null;
      const embed = video.videoFileUrl ? null : videoEmbedUrl(source);
      return (
        <figure className="my-10">
          {embed ? (
            <div className="aspect-video overflow-hidden rounded-2xl bg-muted"><iframe src={embed} title={video.caption ?? "Embedded video"} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div>
          ) : (
            <video className="w-full rounded-2xl bg-black" controls preload="metadata"><source src={source} /></video>
          )}
          {video.caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{video.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }) => {
      const snippet = value as CodeBlock;
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-border/80 bg-[#211f2c] text-[#f6f2ff]">
          {snippet.filename && <figcaption className="border-b border-white/10 px-5 py-3 font-mono text-xs text-white/60">{snippet.filename}</figcaption>}
          <pre className="overflow-x-auto p-5 text-sm leading-7"><code className={`language-${snippet.language ?? "text"}`}>{snippet.code}</code></pre>
        </figure>
      );
    },
  },
};

export function PortableContent({ body }: { body: BlogContentBlock[] }) {
  if (body.length === 0) return null;

  if (typeof body[0] === "string") {
    return <div className="space-y-6">{body.map((paragraph, index) => <p key={`${index}-${String(paragraph)}`}>{String(paragraph)}</p>)}</div>;
  }

  return <PortableText value={body as unknown as PortableTextBlock[]} components={components} />;
}
