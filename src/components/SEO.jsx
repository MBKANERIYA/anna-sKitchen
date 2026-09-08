import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | Anna's Kitchen` : "Anna's Kitchen"}</title>
      <meta name="description" content={description || "Premium catering and refrigeration equipment by Anna's Kitchen."} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};

export default SEO;
