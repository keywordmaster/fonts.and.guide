import Script from "next/script";

const AnalyticsScripts: React.FC = () =>
  process.env.NODE_ENV === "production" && (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-K2NEKBNEHP"
      />
      <Script id="ga" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-K2NEKBNEHP');
            `}
      </Script>
      <Script
        id="msc"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mrco71ybro");
          `,
        }}
      />
    </>
  );

export default AnalyticsScripts;
