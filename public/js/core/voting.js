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
    // Subscribe to changes in user karma
    window.BZ.state.subscribe("auth.user.karma", (newKarma) => {
      const user = JSON.parse(localStorage.getItem("bz_user"));
      user.karma = newKarma;

      // save edited value to local storage
      localStorage.setItem("bz_user", JSON.stringify(user));
      // update ui elements
      const karmaElements = document.querySelectorAll(".bz-karma-count");
      karmaElements.forEach((el) => {
        el.textContent = `${newKarma} karma`;
      });
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
        document.getElementById("modal-external-click")?.classList.remove("modal-open");
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

    try {
      button.disabled = true;

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

      const svg = button.querySelector("svg");
      if (svg) {
        svg.classList.remove("animate-pop");
        void svg.offsetWidth;
        svg.classList.add("animate-pop");
        this.createParticles(svg);
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
    } catch (error) {
      console.error("Vote failed", error);
      showToast(`${getTranslation("texts.votingFailed")}`, "error");
    } finally {
      button.disabled = false;
    }
  },

  createParticles(targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ["#dc3545", "#ff6b6b", "#ff8787", "#f03e3e", "#c92a2a", "#ffa8a8", "#e03131", "#fa5252"];

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

      try{
        // Try to count the visit to the link
        const visitCount = await window.BZ.api.voting.countVisit({
          url: urlToVisit,
        });
      }catch (error){
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
    } catch {
      console.error("Failed to get user karma data", error);
    }
  },

  async loadEntityKarma() {
    const entityId = document.querySelector("[data-bz-entity-id]")?.dataset.bzEntityId;
    if (!entityId) return;

    try {
      const response = await window.BZ.api.voting.getEntityKarma([entityId]);
      const entity = response?.data?.entities?.[0];
      if (!entity) return;

      const rankEl = document.querySelector("[data-bz-rank]");
      if (rankEl) rankEl.textContent = `#${entity.rank}`;

      const karmaValueEl = document.querySelector("[data-bz-karma-value]");
      if (karmaValueEl) karmaValueEl.textContent = `${entity.karma} karma `;

      const voteCountEl = document.querySelector("[data-bz-vote-count]");
      if (voteCountEl) voteCountEl.textContent = `(${entity.vote_count})`;
    } catch {
      // Silently fail — static values remain as fallback
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
