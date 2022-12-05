import NextHead from "next/head";

type HeadProps = {
  title?: string;
  description?: string;
};

export function Head({
  title,
  description = "Find out which plants you probably shouldn't let your pets nibble on 🐱🙅🪴",
}: HeadProps) {
  return (
    <NextHead>
      <title>
        {typeof title === "string" ? `${title} | ` : ""} Is It Toxic To?
      </title>
      <meta name="description" content={description} key="description" />

      {/* open graph */}
      <meta
        property="og:title"
        content={
          typeof title === "string"
            ? `${title} | Is It Toxic To?`
            : "Is It Toxic To? | Check if a plant is toxic to an animal"
        }
        key="og:title"
      />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="og:image"
        content={`${
          process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
        }/og.png`}
        key="og:image"
      />
      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="og:site_name"
        content="Is It Toxic To?"
        key="og:site_name"
      />

      {/* twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        name="twitter:title"
        content={
          typeof title === "string"
            ? `${title} | Is It Toxic To?`
            : "Is It Toxic To? | Check if a plant is toxic to an animal"
        }
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta
        name="twitter:image"
        content={`${
          process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
        }/og.png`}
        key="twitter:image"
      />
      <meta
        name="twitter:creator"
        content="@itsnotchester"
        key="twitter:creator"
      />

      {/* favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
        key="apple-touch-icon"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
        key="icon16"
      />
      <link rel="manifest" href="/site.webmanifest" key="manifest" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
        key="mask-icon"
      />
      <meta
        name="msapplication-TileColor"
        content="#ffffff"
        key="msapplication-TileColor"
      />
      <meta name="theme-color" content="#ffffff" key="theme-color" />

      {/* others */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  );
}
