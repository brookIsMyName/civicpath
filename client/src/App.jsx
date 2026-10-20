
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

function App() {
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
      } catch (err) {
        setError(
          "We couldn't connect to CivicPath. Check that your backend is running."
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
        body: JSON.stringify({ question }),
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

    if (!query.trim()) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        setServices(await response.json());
      } catch {
        setError("Unable to load services. Please try again.");
      } finally {
        setLoading(false);
      }

      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/services/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      setServices(await response.json());
    } catch {
      setError("Search failed. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }

  const visibleServices = services.filter((service) => {
    return (
      category === "All services" ||
      service.category.toLowerCase() === category.toLowerCase()
    );
  });

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-mark">C</span>
          <span>Civic<span className="brand-accent">Path</span></span>
        </a>

        <nav>
          <a href="#services">Explore services</a>
          <a href="#about">About CivicPath</a>
        </nav>

        <a className="nav-cta" href="#services">Get started ↗</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              YOUR GUIDE TO PUBLIC SERVICES
            </div>

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
              <span className="search-icon">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try passport, identity, registration..."
                aria-label="Search civic services"
              />
              <button type="submit">Search <span>→</span></button>
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
            <div className="art-stamp">ETHIOPIA<br />ኢትዮጵያ</div>
          </div>
        </section>
 
        
        <section className="ask-section" id="ask">
          <div className="ask-heading">
            <p className="eyebrow">YOUR CIVIC ASSISTANT</p>
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
              rows={3}
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
              <p className="eyebrow">CIVICPATH RESPONSE</p>

              <div className="answer-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>

              {sources.length > 0 && (
                <div className="answer-sources">
                  <h3>Sources and further information</h3>

                  {sources.map((source, index) => (
                    <div className="answer-source" key={`${source.officialUrl}-${index}`}>
                      <strong>{source.name}</strong>
                      <p>{source.source}</p>

                      <a
                        href={source.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open official source ↗
                      </a>

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


        <section className="trust-strip">
          <div>
            <span className="trust-icon">↗</span>
            <span><strong>Official links</strong><small>Go to original sources</small></span>
          </div>
          <div>
            <span className="trust-icon">✓</span>
            <span><strong>Clear guidance</strong><small>Understand each step</small></span>
          </div>
          <div>
            <span className="trust-icon">◎</span>
            <span><strong>Built for people</strong><small>Less confusion, more clarity</small></span>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE CIVIC DIRECTORY</p>
              <h2>What do you need help with?</h2>
              <p className="section-description">
                Explore available guidance and find the next step.
              </p>
            </div>
            <span className="result-count">
              {visibleServices.length} {visibleServices.length === 1 ? "service" : "services"}
            </span>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-chip ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item === "All services" ? "✳ " : ""}
                {item}
              </button>
            ))}
          </div>

          {error && <div className="notice error">{error}</div>}

          {loading ? (
            <div className="empty-state">Loading civic services...</div>
          ) : visibleServices.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">⌕</span>
              <h3>No matching services yet</h3>
              <p>
                Try another search or choose All services.
                We will expand the directory as we verify more information.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setQuery("");
                  setCategory("All services");
                  handleSearch({
                    preventDefault: () => {},
                  });
                }}
              >
                View all services →
              </button>
            </div>
          ) : (
            <div className="service-grid">
              {visibleServices.map((service, index) => (
                <article className="service-card" key={service._id}>
                  <div className="card-top">
                    <span className={`service-icon icon-${index % 4}`}>
                      {["▤", "◇", "⌂", "↗"][index % 4]}
                    </span>
                    <span className="card-arrow">↗</span>
                  </div>

                  <p className="card-category">{service.category}</p>
                  <h3>{service.name}</h3>
                  <p className="card-description">{service.description}</p>

                  <div className="card-meta">
                    <span>☷ {service.requiredDocuments?.length ?? 0} listed document types</span>
                  </div>

                  <button
                    className="card-link"
                    onClick={() => setSelectedService(service)}
                  >
                    Explore guidance <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-symbol">C.</div>
          <div>
            <p className="eyebrow">OUR PURPOSE</p>
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
        <a className="brand" href="#">
          <span className="brand-mark">C</span>
          <span>Civic<span className="brand-accent">Path</span></span>
        </a>
        <p>Navigate with confidence. Verify with official sources.</p>
        <span>© {new Date().getFullYear()} CivicPath</span>
      </footer>

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
              onClick={() => setSelectedService(null)}
              aria-label="Close service details"
            >
              ×
            </button>

            <p className="eyebrow">{selectedService.category}</p>
            <h2 id="service-title">{selectedService.name}</h2>
            <p className="modal-description">{selectedService.description}</p>

            <h3>Before you begin</h3>
            {selectedService.eligibility?.length ? (
              <ul>
                {selectedService.eligibility.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : <p>Check eligibility with the official service.</p>}

            <h3>Documents</h3>
            {selectedService.requiredDocuments?.length ? (
              <ul>
                {selectedService.requiredDocuments.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : <p>Confirm required documents with the official service.</p>}

            <h3>Steps to follow</h3>
            {selectedService.steps?.length ? (
              <ol>
                {selectedService.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            ) : <p>Follow the latest official instructions.</p>}

            <h3>Fees</h3>
            {selectedService.fees?.length ? (
              <ul>
                {selectedService.fees.map((fee, i) => (
                  <li key={i}>
                    {fee.name}:{" "}
                    {fee.amount == null
                      ? "Amount not specified"
                      : `${fee.amount} ${fee.currency ?? ""}`}
                    {fee.notes ? ` — ${fee.notes}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Fees have not been verified. Check the official source.</p>
            )}

            <p className="source-note">
              <strong>Source:</strong> {selectedService.source}
            </p>

            <p className="verification-note">
              Last verified:{" "}
              {selectedService.lastVerified
                ? new Date(selectedService.lastVerified).toLocaleDateString()
                : "Not verified"}
            </p>

            <a
              className="official-button"
              href={selectedService.officialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit official source ↗
            </a>

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
