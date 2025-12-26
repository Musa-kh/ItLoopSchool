const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "IT Loop School",
    "description": "IT школа в Каскелене и Алматы. Курсы программирования и IT для детей и взрослых.",
    "url": "https://it-loop.vercel.app",
    "telephone": "+77084130827",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Алии Молдагуловой 3а",
        "addressLocality": "Каскелен",
        "addressCountry": "KZ"
    },
    "areaServed": [
        {
            "@type": "City",
            "name": "Каскелен"
        },
        {
            "@type": "City",
            "name": "Алматы"
        }
    ]
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(schemaData);
document.head.appendChild(script);