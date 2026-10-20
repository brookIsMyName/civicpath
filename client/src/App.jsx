
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

function App() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");

  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All services");
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All services",
    ...new Set(
      services
        .map((service) => service.category)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);

        if (!response.ok) {
          throw new Error("Could not load services.");
        }

        const data = await response.json();
        setServices(data);
      } catch {
        setError(
          "We couldn't connect to CivicPath. Please try again in a moment."
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  async function handleAsk(event) {
    event.preventDefault();

    if (!question.trim() || asking) return;

    setAsking(true);
    setAskError("");
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (error) {
      setAskError(error.message || "Unable to connect to CivicPath.");
    } finally {
      setAsking(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const endpoint = query.trim()
      ? `${API_BASE_URL}/api/services/search?q=${encodeURIComponent(query.trim())}`
      : `${API_BASE_URL}/api/services`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Search failed.");
      }

      setServices(await response.json());
    } catch {
      setError("We couldn't load services. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const visibleServices = services.filter((service) => {
    return (
      category === "All services" ||
      (service.category || "").toLowerCase() === category.toLowerCase()
    );
  });

  const displayedServices =
  query.trim() || showAllServices
    ? visibleServices
    : visibleServices.slice(0, 6);
  
  function resetDirectory() {
    setQuery("");
    setCategory("All services");
    handleSearch({ preventDefault: () => {} });
  }

  return (
    <div className="app">
      <a className="skip-link" href="#services">
        Skip to services
      </a>

      <header className="navbar">
        <a className="brand" href="#" aria-label="CivicPath home">
          <span className="brand-mark">C</span>
          <span>
            Civic<span className="brand-accent">Path</span>
          </span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#services">Explore services</a>
          <a href="#ask">Ask CivicPath</a>
          <a href="#about">About us</a>
        </nav>

        <a className="nav-cta" href="#services">
          Get started <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              Your guide to public services
            </p>

            <h1>
              Government services,
              <br />
              <span>made easier.</span>
            </h1>

            <p className="hero-description">
              Find your way through Ethiopian public services.
              Understand the steps, prepare your documents, and
              find official information in one place.
            </p>

            <form className="search-form" onSubmit={handleSearch}>
              <span className="search-icon" aria-hidden="true">
                ⌕
              </span>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try passport, identity, registration..."
                aria-label="Search civic services"
              />

              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Search"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="search-hint">
              Search public services · Find requirements · Follow official links
            </p>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-card">
              <span className="art-icon">✳</span>
              <span className="art-small-label">YOUR NEXT STEP</span>
              <strong>Start with the right information.</strong>
              <span className="art-line" />
              <span className="art-line short" />

              <div className="art-footer">
                <span>Official sources</span>
                <span>↗</span>
              </div>
            </div>

            <div className="art-stamp">
              ETHIOPIA
              <br />
              ኢትዮጵያ
            </div>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="trust-strip" aria-label="CivicPath benefits">
          <div>
            <span className="trust-icon" aria-hidden="true">↗</span>
            <span>
              <strong>Official links</strong>
              <small>Go to original sources</small>
            </span>
          </div>

          <div>
            <span className="trust-icon" aria-hidden="true">✓</span>
            <span>
              <strong>Clear guidance</strong>
              <small>Understand each step</small>
            </span>
          </div>

          <div>
            <span className="trust-icon" aria-hidden="true">◎</span>
            <span>
              <strong>Built for people</strong>
              <small>Less confusion, more clarity</small>
            </span>
          </div>
        </section>

        {/* Service directory */}
        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The civic directory</p>
              <h2>What do you need help with?</h2>
              <p className="section-description">
                Explore available guidance and find the next step.
              </p>
            </div>

            <span className="result-count" aria-live="polite">
              {visibleServices.length}{" "}
              {visibleServices.length === 1 ? "service" : "services"}
            </span>
          </div>

          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-chip ${category === item ? "active" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item === "All services" ? "✳ " : ""}
                {item}
              </button>
            ))}
          </div>

          {error && (
            <div className="notice error" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className="empty-state" role="status">
              Loading civic services...
            </div>
          ) : visibleServices.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">⌕</span>
              <h3>No matching services yet</h3>
              <p>
                Try another search or view all services.
                We will expand the directory as we verify more information.
              </p>

              <button
                className="text-button"
                type="button"
                onClick={resetDirectory}
              >
                View all services →
              </button>
            </div>
          ) : (
            <div className="service-grid">
              {displayedServices.map((service, index) => (
                <article className="service-card" key={service._id}>
                  <div className="card-top">
                    <span className={`service-icon icon-${index % 4}`}>
                      {["▤", "◇", "⌂", "↗"][index % 4]}
                    </span>

                    <span className="card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>

                  <p className="card-category">{service.category}</p>
                  <h3>{service.name}</h3>

                  <p className="card-description">
                    {service.description}
                  </p>

                  <div className="card-meta">
                    <span>
                      ☷ {service.requiredDocuments?.length ?? 0} listed document types
                    </span>
                  </div>

                  <button
                    className="card-link"
                    type="button"
                    onClick={() => setSelectedService(service)}
                    aria-label={`Explore guidance for ${service.name}`}
                  >
                    Explore guidance <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          )}

          {!query.trim() && visibleServices.length > 6 && (
  <div className="show-all-wrapper">
    <button
      type="button"
      className="show-all-button"
      onClick={() => {
  setCategory("All services");
  setShowAllServices((current) => !current);
}}
    >
      {showAllServices ? "Show fewer services" : "Show all services"}
      <span aria-hidden="true">
        {showAllServices ? " ↑" : " ↓"}
      </span>
    </button>
  </div>
)}



        </section>

        {/* AI assistant */}
        <section className="ask-section" id="ask">
          <div className="ask-heading">
            <p className="eyebrow">Your civic assistant</p>
            <h2>Have a question? Let's find your next step.</h2>
            <p>
              Ask about public services in Ethiopia. CivicPath uses
              its available service information to guide you toward
              official sources.
            </p>
          </div>

          <form className="ask-form" onSubmit={handleAsk}>
            <label htmlFor="civic-question">
              What would you like to know?
            </label>

            <textarea
              id="civic-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="For example: What documents do I need for an Ethiopian passport?"
              maxLength={1000}
              rows={4}
              required
            />

            <div className="ask-form-footer">
              <span>{question.length}/1000 characters</span>

              <button type="submit" disabled={asking || !question.trim()}>
                {asking ? "Finding an answer..." : "Ask CivicPath →"}
              </button>
            </div>
          </form>

          {asking && (
            <div className="ask-status" role="status">
              Looking through available service information...
            </div>
          )}

          {askError && (
            <div className="notice error" role="alert">
              {askError}
            </div>
          )}

          {answer && (
            <article className="answer-card" aria-live="polite">
              <p className="eyebrow">CivicPath response</p>

              <div className="answer-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>

              {sources.length > 0 && (
                <div className="answer-sources">
                  <h3>Sources and further information</h3>

                  {sources.map((source, index) => (
                    <div
                      className="answer-source"
                      key={`${source.officialUrl}-${index}`}
                    >
                      <strong>{source.name}</strong>
                      <p>{source.source}</p>

                      {source.officialUrl && (
                        <a
                          href={source.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open official source ↗
                        </a>
                      )}

                      <small>
                        Last verified:{" "}
                        {source.lastVerified
                          ? new Date(source.lastVerified).toLocaleDateString()
                          : "Not verified"}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              <p className="disclaimer">
                CivicPath is an independent guide, not a government
                agency. Confirm current requirements with the official
                institution.
              </p>
            </article>
          )}
        </section>

        {/* About */}
        <section className="about-section" id="about">
          <div className="about-symbol" aria-hidden="true">C.</div>

          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>Public information should be easier to navigate.</h2>
            <p>
              CivicPath organizes public-service guidance and directs
              people to official sources. We are an independent guide,
              not a government agency.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#" aria-label="CivicPath home">
          <span className="brand-mark">C</span>
          <span>
            Civic<span className="brand-accent">Path</span>
          </span>
        </a>

        <p>Navigate with confidence. Verify with official sources.</p>
        <span>© {new Date().getFullYear()} CivicPath</span>
      </footer>

      {/* Service detail modal */}
      {selectedService && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedService(null)}
        >
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close service details"
            >
              ×
            </button>

            <p className="eyebrow">{selectedService.category}</p>
            <h2 id="service-title">{selectedService.name}</h2>

            <p className="modal-description">
              {selectedService.description}
            </p>

            <h3>Before you begin</h3>
            {selectedService.eligibility?.length ? (
              <ul>
                {selectedService.eligibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Check eligibility with the official service.</p>
            )}

            <h3>Documents</h3>
            {selectedService.requiredDocuments?.length ? (
              <ul>
                {selectedService.requiredDocuments.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                Confirm required documents with the official service.
              </p>
            )}

            <h3>Steps to follow</h3>
            {selectedService.steps?.length ? (
              <ol>
                {selectedService.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>Follow the latest official instructions.</p>
            )}

            <h3>Fees</h3>
            {selectedService.fees?.length ? (
              <ul>
                {selectedService.fees.map((fee, index) => (
                  <li key={index}>
                    {fee.name}:{" "}
                    {fee.amount == null
                      ? "Amount not specified"
                      : `${fee.amount} ${fee.currency ?? ""}`}
                    {fee.notes ? ` — ${fee.notes}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Fees have not been verified. Check the official source.
              </p>
            )}

            <p className="source-note">
              <strong>Source:</strong> {selectedService.source || "Not specified"}
            </p>

            <p className="verification-note">
              Last verified:{" "}
              {selectedService.lastVerified
                ? new Date(selectedService.lastVerified).toLocaleDateString()
                : "Not verified"}
            </p>

            {selectedService.officialUrl && (
              <a
                className="official-button"
                href={selectedService.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit official source ↗
              </a>
            )}

            <p className="disclaimer">
              CivicPath is an independent guide. Always confirm current
              requirements with the relevant official institution.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
