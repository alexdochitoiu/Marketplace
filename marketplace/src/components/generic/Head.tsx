import { Helmet } from "react-helmet";

export default function ({ title, description, image, url }) {
  const fullTitle = `MIRAL FASHION | ${title}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>‍
      <meta name="description" content={description} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="twitter:widgets:csp" content="on" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@user" />
      <meta name="twitter:creator" content="@user" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={fullTitle} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:type" content="article" />
    </Helmet>
  );
}
