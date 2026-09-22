"use client";

import Image from "next/image";
import { FileLock, FolderLock, ShieldCheck } from "@phosphor-icons/react";
import { type KeyboardEvent, useState } from "react";

const stories = [
  {
    id: "scope",
    number: "01",
    tab: "Matter scope",
    eyebrow: "PERMISSION ENVELOPE",
    title: "It knows the matter, not the whole firm.",
    body: "Permissions resolve the authorised set before search or ranking begins. Anything outside the active matter is invisible to the model.",
    image: null,
    alt: null,
    icon: FolderLock,
    status: "SCOPE RESOLVED"
  },
  {
    id: "policy",
    number: "02",
    tab: "Policy gate",
    eyebrow: "CAPABILITY BOUNDARY",
    title: "Model proposes. Policy decides.",
    body: "Requests cross a deterministic gate before any tool can run. A prompt cannot add authority or widen the active matter.",
    image: "/images/policy-gate.png",
    alt: "A lime document passing through a precise dark policy gate",
    icon: ShieldCheck,
    status: "ALLOW"
  },
  {
    id: "sources",
    number: "03",
    tab: "Immutable sources",
    eyebrow: "VERSIONED OUTPUTS",
    title: "Original evidence stays untouched.",
    body: "Approved actions create a separate, traceable version. The source remains protected, visible, and ready to verify.",
    image: "/images/immutable-source.png",
    alt: "An original document protected in an archive case beside a new version",
    icon: FileLock,
    status: "VERSION 02"
  }
] as const;

export function FeatureStoryTabs() {
  const [activeId, setActiveId] = useState<(typeof stories)[number]["id"]>("scope");

  function movePanel(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? stories.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + stories.length) % stories.length;
    setActiveId(stories[nextIndex].id);
    document.getElementById(`${stories[nextIndex].id}-trigger`)?.focus();
  }

  return (
    <div className="boundary-showcase" role="tablist" aria-label="How Resurrect X contains AI authority">
      {stories.map((story, index) => {
        const active = story.id === activeId;
        const Icon = story.icon;
        return (
          <article className={`boundary-panel ${active ? "active" : ""}`} data-kind={story.id} key={story.id}>
            <button
              id={`${story.id}-trigger`}
              className="boundary-trigger"
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${story.id}-content`}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(story.id)}
              onKeyDown={(event) => movePanel(event, index)}
            >
              <span>{story.number}</span>
              <strong>{story.tab}</strong>
              <i aria-hidden="true" />
            </button>

            <div
              id={`${story.id}-content`}
              className="boundary-content"
              role="tabpanel"
              aria-labelledby={`${story.id}-trigger`}
              aria-hidden={!active}
            >
              <div className="boundary-copy">
                <span className="boundary-icon"><Icon size={24} /></span>
                <div className="boundary-text">
                  <small>{story.eyebrow}</small>
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </div>
                {story.id === "scope" ? (
                  <div className="matter-lines">
                    <span>Harbourline Developments <b>OPEN</b></span>
                    <span>Southern Cross Advisory <b>HIDDEN</b></span>
                    <span>Sealed identifiers <b>NO-AI</b></span>
                  </div>
                ) : null}
                <div className="boundary-rule" aria-hidden="true"><i /><b>{story.status}</b></div>
              </div>

              {story.image ? (
                <div className="boundary-art" aria-hidden={!active}>
                  <Image src={story.image} alt={story.alt ?? ""} fill unoptimized sizes="(max-width: 760px) 100vw, 45vw" />
                  <span className="boundary-scan" aria-hidden="true" />
                </div>
              ) : (
                <div className="scope-map" aria-hidden="true">
                  <span className="scope-node firm">FIRM</span>
                  <span className="scope-line first" />
                  <span className="scope-node matter">ACTIVE MATTER</span>
                  <span className="scope-line second" />
                  <span className="scope-node model">MODEL</span>
                  <span className="scope-denied">OTHER MATTERS / BLOCKED</span>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
