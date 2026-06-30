import React from "react";
import { CopyButton } from "@/components/site/CopyButton";
import { siteContent } from "@/data/site-content";

export default function DocsPage() {
  const { hero, guides, endpoints, reliability } = siteContent.docs;

  return (
    <div className="relative min-h-screen bg-background text-foreground site-page-pad pb-16 sm:pb-20">
      <section className="site-container py-16 sm:py-24">
        {/* Hero Section */}
        <div className="mb-24 grid items-start gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
              // {hero.eyebrow}
            </span>
            <h1 className="site-hero-title mb-6 sm:mb-8">
              {hero.title.split(" ")[0]}
              <br />
              {hero.title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>
          </div>

          {reliability && (
            <div className="border border-border bg-muted/20 p-8 lg:mt-10">
              <h2 className="font-display text-2xl font-bold mb-4">{reliability.title}</h2>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                {reliability.items.map((line) => (
                  <li key={line} className="flex gap-2 leading-relaxed">
                    <span className="text-primary shrink-0">{`->`}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Guides / Quickstart Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-border pb-16">
          {guides?.map((guide) => (
            <div
              key={guide.title}
              className="flex flex-col p-8 border border-border bg-card shadow-sm hover:bg-muted/10 transition-colors"
            >
              <h3 className="font-display font-bold text-xl mb-4 text-foreground">{guide.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                {guide.desc}
              </p>
              <div className="bg-zinc-950 dark:bg-muted/20 text-zinc-300 dark:text-foreground font-mono text-xs p-4 border border-border overflow-x-auto relative rounded-none">
                <span className="text-primary mr-2 font-bold">
                  {guide.title === "Environments" ? "URL" : "KEY"}
                </span>
                {guide.code}
                <div className="absolute right-2 top-2">
                  <CopyButton textToCopy={guide.code} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Endpoints section header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
            // API REFERENCE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight">Available Endpoints</h2>
        </div>

        <div className="flex flex-col border-t border-border">
          {endpoints.map((ep) => {
            const isPost = ep.method === "POST";

            return (
              <div
                key={ep.id}
                className="flex flex-col md:flex-row gap-8 py-12 md:gap-12 md:py-16 border-b border-border hover:bg-muted/10 transition-colors"
              >
                <div className="md:w-1/4 border-l-4 border-primary pl-6 flex flex-col justify-start">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-4">
                    {ep.id}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl tracking-tighter leading-tight mb-2">
                    {ep.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-none px-2 py-1 text-xs font-mono font-bold w-fit border ${
                      isPost
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}
                  >
                    {ep.method} {ep.path}
                  </span>
                </div>
                <div className="md:w-3/4 flex flex-col justify-center pl-0 md:pl-12">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-justify">
                    {ep.desc}
                  </p>

                  <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-black/10 dark:border-white/10 font-mono text-sm text-zinc-800 dark:text-white/80 overflow-hidden shadow-2xl relative transition-colors duration-200">
                    <div className="flex justify-between items-center px-4 py-3 bg-zinc-100 dark:bg-[#2d2d2d] border-b border-black/5 dark:border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-white/50">
                        <span>{ep.label}</span>
                        <CopyButton textToCopy={ep.code} />
                      </div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                      {ep.formatted ? (
                        <pre className="leading-loose">
                          <code className="text-primary font-bold">{ep.formatted.command}</code>{" "}
                          <span className="text-zinc-500 dark:text-white/60">
                            {ep.formatted.args}
                          </span>
                          <br />
                          {ep.formatted.headers.map((h, i) => (
                            <React.Fragment key={i}>
                              {`  `}-H{" "}
                              <span className="text-emerald-600 dark:text-emerald-400">{h}</span>
                              {i < ep.formatted.headers.length - 1 || ep.formatted.payload ? (
                                <>
                                  {" "}
                                  \<br />
                                </>
                              ) : null}
                            </React.Fragment>
                          ))}
                          {ep.formatted.payload && (
                            <>
                              {`  `}-d <span className="text-primary">'{`{`}</span>
                              <br />
                              {Object.entries(ep.formatted.payload).map(([k, v], idx, arr) => {
                                const isNum = typeof v === "number";
                                return (
                                  <React.Fragment key={k}>
                                    {`    `}
                                    <span className="text-zinc-900 dark:text-white/90">
                                      "{k}"
                                    </span>:{" "}
                                    {isNum ? (
                                      <span className="text-amber-600 dark:text-amber-400">
                                        {v}
                                      </span>
                                    ) : (
                                      <span className="text-emerald-600 dark:text-emerald-400">
                                        "{v}"
                                      </span>
                                    )}
                                    {idx < arr.length - 1 ? "," : ""}
                                    <br />
                                  </React.Fragment>
                                );
                              })}
                              {`  `}
                              <span className="text-primary">{`}'`}</span>
                            </>
                          )}
                        </pre>
                      ) : (
                        <pre className="leading-loose text-zinc-800 dark:text-white/80">
                          {ep.code}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
