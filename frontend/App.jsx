import React, { useState } from 'react';


function App() {
  const [query, setQuery] = useState("");
  const [component, setComponent] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Remove unwanted instructional text from the backend result
  function cleanResult(text) {
    if (!text) return '';
    // Remove lines containing specific unwanted phrases
    const unwantedPatterns = [
      /If you didn't find what you want/i,
      /refine your search criteria/i,
      /to filter the results you can use/i,
      /\.\/rex\.sh find/i,
      /grep -vE/i
    ];
    return text
      .split('\n')
      .filter(line => !unwantedPatterns.some(pattern => pattern.test(line.trim())))
      .join('\n')
      .trim();
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("http://localhost:3001/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, component }),
      });
      const data = await res.json();
      setResult(cleanResult(data.result || data.error || "No results"));
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fafd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        width: "100vw",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "40px 36px 32px 36px",
          maxWidth: 1400,
          width: "96vw",
          minWidth: 900,
          display: "flex",
          flexDirection: "row",
          gap: 40,
        }}
      >
        <div style={{ flex: 1, minWidth: 320, maxWidth: 400 }}>
          <h2
            style={{
              textAlign: "left",
              marginBottom: 28,
              fontWeight: 700,
              letterSpacing: 0.5,
              color: "#1a2330",
              fontSize: 28,
            }}
          >
            WSO2IS Repo Explorer
          </h2>
          <form onSubmit={handleSearch} style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for repo or component..."
              style={{
                padding: "12px 16px",
                fontSize: 17,
                border: "1.5px solid #d1d5db",
                borderRadius: 8,
                outline: "none",
                transition: "border 0.2s",
                boxSizing: "border-box",
              }}
              required
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", fontSize: 15, color: "#374151" }}>
                <input
                  type="checkbox"
                  checked={component}
                  onChange={(e) => setComponent(e.target.checked)}
                  style={{ marginRight: 6 }}
                />
                Component only
              </label>
              <button
                type="submit"
                style={{
                  marginLeft: "auto",
                  background: "#ff7300",
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  padding: "10px 22px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 2px 8px rgba(37,99,235,0.08)",
                  opacity: loading ? 0.7 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                }}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
        <div
          style={{
            flex: 2,
            background: "#f3f4f6",
            borderRadius: 8,
            padding: "18px 18px",
            minHeight: 420,
            maxHeight: 700,
            fontSize: 15.5,
            color: "#22292f",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            border: "1px solid #e5e7eb",
            marginTop: 8,
            overflowY: "auto",
            overflowX: "auto",
            fontFamily: "'JetBrains Mono', 'Fira Mono', 'Menlo', 'monospace'",
            width: "100%",
            boxSizing: "border-box",
            display: "block",
          }}
        >
          {result
            .split(/\r?\n/)
            .filter(line => line.trim() !== "")
            .map((line, idx) => {
              // URL regex
              const urlPattern = /^(https?:\/\/[^\s]+)$/i;
              if (urlPattern.test(line.trim())) {
                return (
                  <button
                    key={idx}
                    onClick={() => window.open(line.trim(), '_blank', 'noopener,noreferrer')}
                    style={{
                      display: 'inline-block',
                      width: 'auto',
                      textAlign: 'left',
                      background: 'rgba(255,255,255,0.65)',
                      color: '#1a2330',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: 10,
                      padding: '10px 18px',
                      margin: '8px 0',
                      fontSize: 15.5,
                      fontFamily: "'JetBrains Mono', 'Fira Mono', 'Menlo', 'monospace'",
                      cursor: 'pointer',
                      transition: 'background 0.18s, box-shadow 0.18s, border 0.18s',
                      wordBreak: 'break-all',
                      overflow: 'visible',
                      whiteSpace: 'pre',
                      fontWeight: 600,
                      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
                      e.currentTarget.style.border = '1.5px solid #ff7300';
                      e.currentTarget.style.boxShadow = '0 4px 18px 0 #ff730022';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.65)';
                      e.currentTarget.style.border = '1.5px solid #e5e7eb';
                      e.currentTarget.style.boxShadow = '0 2px 12px 0 rgba(30,41,59,0.07)';
                    }}
                  >
                    <span style={{ textShadow: '0 1px 4px #fff' }}>{line.trim()}</span>
                  </button>
                );
              } else {
                return <div key={idx}>{line}</div>;
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
