export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  id: string;
  items: FaqItem[];
  heading?: string;
  alt?: boolean;
}

export function FaqSection({
  id,
  items,
  heading = 'Frequently asked questions',
  alt = false,
}: FaqSectionProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <section
      className={alt ? 'section section-alt' : 'section'}
      aria-labelledby={id}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container">
        <div className="section-header">
          <p className="section-kicker">FAQ</p>
          <h2 id={id}>{heading}</h2>
        </div>

        <div className="card-grid-2">
          {items.map(({ question, answer }) => (
            <article className="card" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
