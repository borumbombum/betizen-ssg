// Voting system
window.BZ.voting = {
  init() {
    // Event delegation for vote buttons
    document.addEventListener("click", (e) => {
      const voteBtn = e.target.closest("[data-vote]");
      if (voteBtn) {
        this.handleVote(voteBtn);
      }
    });

    // Event for link buttons which earn karma
    document.addEventListener("click", (e) => {
      const visitBtn = e.target.closest("[data-earnurl]");
      if (visitBtn) {
        e.preventDefault();
        this.handleEarnKarma(visitBtn);
      }
    });

    // UI Subscriptions
    // Helper to update the karma count badge with the sum of given + available
    function updateKarmaDisplay() {
      const s = window.BZ.state;
      const given = s.get("auth.user.total_karma_given") || 0;
      const avail = s.get("auth.user.karma") || 0;
      const total = given + avail;
      document.querySelectorAll(".bz-karma-count").forEach((el) => {
        el.textContent = `${total} karma`;
      });
    }

    // Subscribe to changes in user karma
    window.BZ.state.subscribe("auth.user.karma", (newKarma) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.karma = newKarma;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      updateKarmaDisplay();
    });

    // Subscribe to changes in total_karma_given
    window.BZ.state.subscribe("auth.user.total_karma_given", (newGiven) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.total_karma_given = newGiven;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      updateKarmaDisplay();
    });

    // Subscribe changes to user ranking
    window.BZ.state.subscribe("auth.user.rank", (newRank) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.rank = newRank;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      // update ui elements
      const karmaElements = document.querySelectorAll(".bz-user-rank");
      karmaElements.forEach((el) => {
        el.textContent = `${newRank}`;
      });
    });

    // Subscribe to changes in the modal for external links opened
    window.BZ.state.subscribe("ui.currentModal", (currentModal) => {
      if (currentModal == "external_link_opening") {
        document
          .getElementById("modal-external-click")
          .classList.add("modal-open");
      } else {
        document
          .getElementById("modal-external-click")
          .classList.remove("modal-open");
      }
    });

    // Load entity karma/rank on single-entity pages
    this.loadEntityKarma();

    // Handle browser back button after external redirect (bfcache restore)
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        document
          .getElementById("modal-external-click")
          ?.classList.remove("modal-open");
        window.BZ.state.set("ui.currentModal", null);
        document.querySelectorAll("[data-earnurl]:disabled").forEach((btn) => {
          btn.disabled = false;
        });
      }
    });
  },

  async handleVote(button) {
    if (button.classList.contains("heart-btn")) {
      return this.handleHeartVote(button);
    }

    if (!window.BZ.state.get("auth.isAuthenticated")) {
      window.BZ.auth.showLoginModal();
      return;
    }

    const entityId = button.dataset.entityId;
    const karma = button.dataset.karma;

    try {
      button.disabled = true;
      button.classList.add("loading");

      const response = await window.BZ.api.voting.vote({
        entity_id: entityId,
        karma: Number(karma),
      });

      showToast(`${getTranslation("texts.votingSuccess")}`, "success");

      // Update user karma value an visual elements
      if (response && response.data.newKarma != null) {
        // Update karma state (that will fire ui updates)
        window.BZ.state.set("auth.user.karma", response.data.newKarma);
      }
      // update user rank state (to fire ui updates)
      if (response && response.data.newRank != null) {
        window.BZ.state.set("auth.user.rank", response.data.newRank);
      }

      // Refresh entity karma after vote
      this.loadEntityKarma();
      this.reorderEntityRow(entityId);

      // Update local state
      // const userVotes = window.BZ.state.get("voting.userVotes");
      // userVotes.set(entityId, voteType);
      // window.BZ.state.set("voting.userVotes", userVotes);

      // Update UI
      // this.updateVoteUI(entityId, response.votes);
      // showToast("Vote recorded!", "success");
    } catch (error) {
      // Show a message
      console.error("Vote failed", error);
      showToast(`${getTranslation("texts.votingFailed")}`, "error");
    } finally {
      button.disabled = false;
      button.classList.remove("loading");
    }
  },

  async handleHeartVote(button) {
    if (!window.BZ.state.get("auth.isAuthenticated")) {
      window.BZ.auth.showLoginModal();
      return;
    }

    const entityId = button.dataset.entityId;
    const karma = button.dataset.karma;

    // Grab the icons for toggling
    const heartIcon = button.querySelector(".heart-icon");
    const loaderIcon = button.querySelector(".loader-icon");

    try {
      button.disabled = true;

      // Show loader, hide heart
      if (heartIcon) heartIcon.classList.add("hidden");
      if (loaderIcon) loaderIcon.classList.remove("hidden");

      const response = await window.BZ.api.voting.vote({
        entity_id: entityId,
        karma: Number(karma),
      });

      button.classList.add("liked");

      const label = button.querySelector(".heart-label");
      const votedText = label ? label.dataset.votedText : "";
      if (label) {
        label.textContent = votedText;
        label.classList.add("opacity-100");
        label.classList.remove("opacity-60");

        setTimeout(() => {
          let count = 3;
          label.textContent = votedText + " (" + count + ")";

          const interval = setInterval(() => {
            count--;
            if (count > 0) {
              label.textContent = votedText + " (" + count + ")";
            } else {
              clearInterval(interval);
              button.classList.remove("liked");
              label.textContent = label.dataset.againText;
              label.classList.add("opacity-60");
              label.classList.remove("opacity-100");
            }
          }, 1000);
        }, 500);
      }

      // Restore heart visibility immediately before animating
      if (heartIcon) heartIcon.classList.remove("hidden");
      if (loaderIcon) loaderIcon.classList.add("hidden");

      // Animate the specific heart icon, not just any 'svg'
      if (heartIcon) {
        heartIcon.classList.remove("animate-pop");
        void heartIcon.offsetWidth; // Trigger reflow
        heartIcon.classList.add("animate-pop");
        this.createParticles(heartIcon);
      }

      showToast(`${getTranslation("texts.votingSuccess")}`, "success");

      if (response && response.data.newKarma != null) {
        window.BZ.state.set("auth.user.karma", response.data.newKarma);
      }
      if (response && response.data.newRank != null) {
        window.BZ.state.set("auth.user.rank", response.data.newRank);
      }

      // Refresh entity karma after vote
      this.loadEntityKarma();
      this.reorderEntityRow(entityId);
    } catch (error) {
      console.error("Vote failed", error);
      showToast(`${getTranslation("texts.votingFailed")}`, "error");

      // Ensure icons are reset even if the request fails
      if (heartIcon) heartIcon.classList.remove("hidden");
      if (loaderIcon) loaderIcon.classList.add("hidden");
    } finally {
      button.disabled = false;
    }
  },
  // async handleHeartVote(button) {
  //   if (!window.BZ.state.get("auth.isAuthenticated")) {
  //     window.BZ.auth.showLoginModal();
  //     return;
  //   }

  //   const entityId = button.dataset.entityId;
  //   const karma = button.dataset.karma;

  //   try {
  //     button.disabled = true;

  //     const response = await window.BZ.api.voting.vote({
  //       entity_id: entityId,
  //       karma: Number(karma),
  //     });

  //     button.classList.add("liked");

  //     const label = button.querySelector(".heart-label");
  //     const votedText = label ? label.dataset.votedText : "";
  //     if (label) {
  //       label.textContent = votedText;
  //       label.classList.add("opacity-100");
  //       label.classList.remove("opacity-60");

  //       setTimeout(() => {
  //         let count = 3;
  //         label.textContent = votedText + " (" + count + ")";

  //         const interval = setInterval(() => {
  //           count--;
  //           if (count > 0) {
  //             label.textContent = votedText + " (" + count + ")";
  //           } else {
  //             clearInterval(interval);
  //             button.classList.remove("liked");
  //             label.textContent = label.dataset.againText;
  //             label.classList.add("opacity-60");
  //             label.classList.remove("opacity-100");
  //           }
  //         }, 1000);
  //       }, 500);
  //     }

  //     const svg = button.querySelector("svg");
  //     if (svg) {
  //       svg.classList.remove("animate-pop");
  //       void svg.offsetWidth;
  //       svg.classList.add("animate-pop");
  //       this.createParticles(svg);
  //     }

  //     showToast(`${getTranslation("texts.votingSuccess")}`, "success");

  //     if (response && response.data.newKarma != null) {
  //       window.BZ.state.set("auth.user.karma", response.data.newKarma);
  //     }
  //     if (response && response.data.newRank != null) {
  //       window.BZ.state.set("auth.user.rank", response.data.newRank);
  //     }

  //     // Refresh entity karma after vote
  //     this.loadEntityKarma();
  //   } catch (error) {
  //     console.error("Vote failed", error);
  //     showToast(`${getTranslation("texts.votingFailed")}`, "error");
  //   } finally {
  //     button.disabled = false;
  //   }
  // },

  createParticles(targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = [
      "#dc3545",
      "#ff6b6b",
      "#ff8787",
      "#f03e3e",
      "#c92a2a",
      "#ffa8a8",
      "#e03131",
      "#fa5252",
    ];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "heart-particle";
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 40 + Math.random() * 40;
      particle.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
      particle.style.background = colors[i % colors.length];
      particle.style.left = `${cx}px`;
      particle.style.top = `${cy}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 750);
    }
  },

  async handleEarnKarma(button) {
    const urlToVisit = button.dataset.earnurl.trim();

    // Only apply karma if user is authenticated
    if (window.BZ.state.get("auth.isAuthenticated")) {
      // console.log("TRIMMED_URL", urlToVisit);

      window.BZ.modal.close(); // close other modals if opened

      button.disabled = true;
      // open modal
      window.BZ.state.set("ui.currentModal", "external_link_opening");

      try {
        const response = await window.BZ.api.voting.earnKarma.forVisitingLink({
          type: "VISIT_AFFILIATE_LINK",
          url: urlToVisit,
        });

        switch (response.data.status) {
          case "COOLDOWN":
            showToast(`${getTranslation("texts.karmaEarnCooldown")}`, "error");
            showToast(
              `${getTranslation("texts.cooldownTime")}: ${
                response.data.cooldown_hours
              }hrs`,
              "error",
            );

            break;
          case "SUCCESS":
            showToast(`${getTranslation("texts.karmaEarned")}`, "success");
            showToast(
              `${getTranslation("texts.youEarned")}: ${
                response.data.karma_granted
              } ${getTranslation("texts.karmaPoints")}`,
              "success",
            );
            break;
        }

        // window.BZ.state.set("ui.currentModal", null);
        // button.disabled = false;
      } catch (err) {
        showToast(`${getTranslation("texts.karmaEarnError")}`, "error");
        // button.disabled = false;
        // window.BZ.state.set("ui.currentModal", "null");
      } finally {
        // button.disabled = false;
        // window.BZ.state.set("ui.currentModal", "null");

        // change modal message
        document.getElementById("modal-external-click-message").innerHTML =
          `${getTranslation("texts.karmaEarnRedirecting")}`;

        // Finally visit the casino
        // setTimeout(function () {
        window.location.href = urlToVisit;
        // }, 1000);

        // window.open(urlToVisit, "_blank");
      }
    } else {
      console.log("Karma not earned, used is logged out.");
      window.BZ.state.set("ui.currentModal", "external_link_opening");

      document.getElementById("modal-external-click-message").innerHTML =
        `${getTranslation("texts.karmaEarnRedirecting")}`;

      try {
        // Try to count the visit to the link
        const visitCount = await window.BZ.api.voting.countVisit({
          url: urlToVisit,
        });
      } catch (error) {
        // Some api error, log it and redirect
        console.error(`Error: Cound not count visit, api seems off ${error}`);
      }

      /* Visit link anyway, even if api is off */
      window.location.href = urlToVisit;
    }
  },

  async loadUserKarmaData() {
    if (!window.BZ.state.get("auth.isAuthenticated")) {
      return;
    }

    try {
      const response = await window.BZ.api.voting.getKarmaData();
      // Update karma state (that will fire ui updates)
      if (response && response.data.karma != null) {
        window.BZ.state.set("auth.user.karma", response.data.karma);
      }
      // Update rank state (that will fire ui updates)
      if (response && response.data.rank != null) {
        window.BZ.state.set("auth.user.rank", response.data.rank);
      }
      // Update total_karma_given state
      if (response && response.data.total_karma_given != null) {
        window.BZ.state.set("auth.user.total_karma_given", response.data.total_karma_given);
      }
    } catch {
      console.error("Failed to get user karma data", error);
    }
  },

  async loadEntityKarma() {
    const entityEls = document.querySelectorAll("[data-bz-entity-id]");
    if (!entityEls.length) return;

    const ids = [...new Set([...entityEls].map((el) => el.dataset.bzEntityId).filter(Boolean))];
    if (!ids.length) return;

    try {
      const response = await window.BZ.api.voting.getEntityKarma(ids);
      const entities = response?.data?.entities;
      if (!entities || !entities.length) return;

      entities.forEach((entity) => {
        const el = document.querySelector(`[data-bz-entity-id="${entity.entity_id}"]`);
        if (!el) return;

        el.removeAttribute("hidden");

        const karmaValueEl = el.querySelector("[data-bz-karma-value]");
        if (karmaValueEl) karmaValueEl.textContent = `${entity.karma} karma`;

        const rankEl = el.querySelector("[data-bz-rank]");
        if (rankEl) rankEl.textContent = `#${entity.rank}`;

        const voteCountEl = el.querySelector("[data-bz-vote-count]");
        if (voteCountEl) voteCountEl.textContent = `(${entity.vote_count} ${getTranslation("texts.votes")})`;
      });
    } catch {
      // Silently fail
    }

    // Reorder rows by karma on listing pages only
    const listing = document.querySelector("[data-bz-listing]");
    if (!listing) return;

    // FLIP: snapshot old positions
    const rects = new Map();
    const rows = [...listing.children].filter((el) =>
      el.querySelector("[data-bz-entity-id]")
    );
    rows.forEach((r) => rects.set(r, r.getBoundingClientRect().top));

    rows.sort((a, b) => {
      const ka =
        parseFloat(
          a.querySelector("[data-bz-karma-value]")?.textContent
        ) || 0;
      const kb =
        parseFloat(
          b.querySelector("[data-bz-karma-value]")?.textContent
        ) || 0;
      return kb - ka;
    });
    rows.forEach((r) => listing.appendChild(r));

    // FLIP: animate from old position to new
    requestAnimationFrame(() => {
      rows.forEach((r) => {
        const old = rects.get(r);
        const cur = r.getBoundingClientRect().top;
        const dy = old - cur;
        if (dy !== 0) {
          r.style.transition = "none";
          r.style.transform = `translateY(${dy}px)`;
          requestAnimationFrame(() => {
            r.style.transition = "transform 400ms ease";
            r.style.transform = "";
            setTimeout(() => {
              r.style.transition = "";
            }, 450);
          });
        }
      });
    });
  },

  async reorderEntityRow(entityId) {
    const listing = document.querySelector("[data-bz-listing]");
    const badge = listing?.querySelector(
      `[data-bz-entity-id="${entityId}"]`
    );
    if (!badge) return;
    const row = badge.closest("[data-bz-listing] > div");
    if (!row) return;

    const karmaEl = row.querySelector("[data-bz-karma-value]");
    const newKarma = parseFloat(karmaEl?.textContent) || 0;

    // FLIP: snapshot old position
    const oldRect = row.getBoundingClientRect();

    const siblings = [...listing.children].filter(
      (el) => el !== row && el.querySelector("[data-bz-entity-id]")
    );
    let insertBefore = null;
    for (const sib of siblings) {
      const sk =
        parseFloat(
          sib.querySelector("[data-bz-karma-value]")?.textContent
        ) || 0;
      if (newKarma > sk) {
        insertBefore = sib;
        break;
      }
    }
    insertBefore
      ? listing.insertBefore(row, insertBefore)
      : listing.appendChild(row);

    // FLIP: animate
    const newRect = row.getBoundingClientRect();
    const dy = oldRect.top - newRect.top;
    if (dy !== 0) {
      row.style.transition = "none";
      row.style.transform = `translateY(${dy}px)`;
      requestAnimationFrame(() => {
        row.style.transition = "transform 400ms ease";
        row.style.transform = "";
        setTimeout(() => {
          row.style.transition = "";
        }, 450);
      });
    }
  },

  // updateVoteUI(entityId, voteCounts) {
  //   const container = document.querySelector(`[data-entity-id="${entityId}"]`);
  //   if (container) {
  //     container.querySelector(".up-count").textContent = voteCounts.up;
  //     container.querySelector(".down-count").textContent = voteCounts.down;
  //   }
  // },

  // async loadUserVotes() {
  //   try {
  //     const response = await window.BZ.api.voting.getUserVotes();
  //     const userVotes = new Map();
  //     response.votes.forEach((vote) => {
  //       userVotes.set(vote.entityId, vote.voteType);
  //     });
  //     window.BZ.state.set("voting.userVotes", userVotes);
  //   } catch (error) {
  //     console.error("Failed to load user votes:", error);
  //   }
  // },
};
