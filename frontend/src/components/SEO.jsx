import { Helmet } from "react-helmet-async";

const defaults = {
  title: "WE ARE DIGITAL — Digital Marketing Agency",
  description:
    "A full-service digital marketing agency specializing in Meta & TikTok ads, Shopify & WordPress development, branding, and SEO.",
  url: "https://wearedigital.com",
  image: "/images/logo_final.png",
};

export default function SEO({ title, description, url, image }) {
  const pageTitle = title
    ? `${title} | WE ARE DIGITAL`
    : defaults.title;
  const pageDesc = description || defaults.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url || defaults.url} />
      <meta property="og:image" content={image || defaults.image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
