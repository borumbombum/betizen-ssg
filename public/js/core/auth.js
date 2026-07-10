// Authentication logic with UI management
window.BZ.auth = {
  async init() {
    const token = localStorage.getItem("bz_token");
    const storedUser = localStorage.getItem("bz_user");

    // Immediately set auth state from localStorage if available
    if (token && storedUser) {
      window.BZ.state.set("auth.token", token);
      window.BZ.state.set("auth.user", JSON.parse(storedUser));
      window.BZ.state.set("auth.isAuthenticated", true);

      // Verify in the background to refresh data and validate token
      window.BZ.api.auth
        .verify()
        .then((userData) => {
          // If the verify endpoint returns a user object, update it.
          // Otherwise, the token is still valid, so we do nothing.
          if (userData && userData.user) {
            localStorage.setItem("bz_user", JSON.stringify(userData.user));
            window.BZ.state.set("auth.user", userData.user); // Update state with fresh data
          }
        })
        .catch(() => {
          this.logout(); // Token is invalid or other error, so log out
        });
    }

    // Set initial UI state based on what we have so far
    this.updateUI(window.BZ.state.get("auth.isAuthenticated"));

    // Subscribe to auth changes for future UI updates
    window.BZ.state.subscribe("auth.isAuthenticated", (isAuth) => {
      this.updateUI(isAuth);
    });

    // Initialize Google Sign-In
    if (window.google && window.google.accounts && window.google.accounts.id) {
      google.accounts.id.initialize({
        client_id:
          "503591699595-q2ti6rrqiugemi21o7sfk5fmj3tmslmv.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
      });
    } else {
      console.error("Google GSI library not loaded.");
    }
  },

  updateUI(isAuthenticated) {
    // Handle logged-in only elements
    document.querySelectorAll(".auth-logged-in").forEach((el) => {
      el.classList.toggle("hidden", !isAuthenticated);
      el.classList.toggle("flex", isAuthenticated);
    });

    // Handle logged-out only elements
    document.querySelectorAll(".auth-logged-out").forEach((el) => {
      el.classList.toggle("hidden", isAuthenticated);
    });

    // Update user data in UI if authenticated
    if (isAuthenticated) {
      this.updateUserData();
    }
  },

  updateUserData() {
    const user = window.BZ.state.get("auth.user");
    if (!user) return;

    // Update user name
    if (user.name) {
      const nameElements = document.querySelectorAll(".bz-user-name");
      nameElements.forEach((el) => {
        el.textContent = user.name;
      });
    }

    // Only update UI elements if the data exists in your API
    if (user.karma != null) {
      const given = user.total_karma_given || 0;
      const total = given + user.karma;
      const karmaElements = document.querySelectorAll(".bz-karma-count");
      karmaElements.forEach((el) => {
        el.textContent = `${total} karma`;
      });
    }

    // Only if your API provides rank
    if (user.rank) {
      const rankElements = document.querySelectorAll(".bz-user-rank");
      rankElements.forEach((el) => {
        el.textContent = user.rank;
      });
    }

    // Set initials for avatar fallback
    const initials = this.getInitials(user.name);
    document.querySelectorAll(".bz-avatar-initials").forEach((el) => {
      el.textContent = initials;
    });

    // Handle avatar image with fallback
    const avatarElements = document.querySelectorAll(".bz-user-avatar");
    avatarElements.forEach((el) => {
      if (user.avatar) {
        el.src = user.avatar;
        el.style.display = "";
        el.onerror = () => {
          el.style.display = "none";
          const container = el.closest(".bz-avatar-container");
          if (container) {
            const initialsEl = container.querySelector(".bz-avatar-initials");
            if (initialsEl) initialsEl.style.display = "flex";
          }
        };
        // Hide initials when image is set (shown on error)
        const container = el.closest(".bz-avatar-container");
        if (container) {
          const initialsEl = container.querySelector(".bz-avatar-initials");
          if (initialsEl) initialsEl.style.display = "none";
        }
      } else {
        el.style.display = "none";
        const container = el.closest(".bz-avatar-container");
        if (container) {
          const initialsEl = container.querySelector(".bz-avatar-initials");
          if (initialsEl) initialsEl.style.display = "flex";
        }
      }
    });
  },

  getInitials(name) {
    if (!name) return "?";
    return (
      name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("") || "?"
    );
  },

  //   async login(email, password) {
  //     try {
  //       window.BZ.state.set("ui.loading", true);
  //       const response = await window.BZ.api.auth.login({ email, password });

  //       localStorage.setItem("bz_token", response.token);
  //       window.BZ.state.set("auth.token", response.token);
  //       window.BZ.state.set("auth.user", response.user);
  //       window.BZ.state.set("auth.isAuthenticated", true);

  //       showToast("Welcome back!", "success");
  //       document.getElementById("bz_modal_1")?.close();
  //     } catch (error) {
  //       showToast(error.message, "error");
  //     } finally {
  //       window.BZ.state.set("ui.loading", false);
  //     }
  //   },

  async loginWithNostr() {
    const btn = document.getElementById("nostr-login-btn");
    if (btn?.disabled) return;
    if (btn) btn.disabled = true;

    try {
      if (!window.nostr?.signEvent) {
        document.dispatchEvent(
          new CustomEvent("nlLaunch", { detail: "welcome" }),
        );
      }

      const challengeRes = await window.BZ.api.auth.getNostrChallenge();
      const challenge = challengeRes.data.challenge;

      const signPromise = window.nostr.signEvent({
        kind: 22242,
        tags: [["challenge", challenge]],
        content: "Cubiq authentication",
        created_at: Math.floor(Date.now() / 1000),
      });

      const timeout = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Login cancelled or timed out")),
          60000,
        ),
      );

      const signedEvent = await Promise.race([signPromise, timeout]);

      window.BZ.state.set("ui.loading", true);
      const apiResponse = await window.BZ.api.auth.loginWithNostr({
        signed_event: JSON.stringify(signedEvent),
        challenge,
      });

      const token = apiResponse.data.access_token;
      const user = apiResponse.data.user;

      localStorage.setItem("bz_token", token);
      localStorage.setItem("bz_user", JSON.stringify(user));

      window.BZ.state.set("auth.token", token);
      window.BZ.state.set("auth.user", user);
      window.BZ.state.set("auth.isAuthenticated", true);

      showToast(getTranslation("texts.welcome"), "success");

      document.getElementById("bz_modal_1")?.close();
    } catch (error) {
      console.error("Nostr login error:", error);
      showToast(
        error.message || getTranslation("texts.nostrLoginFailed"),
        "error",
      );
    } finally {
      window.BZ.state.set("ui.loading", false);
      if (btn) btn.disabled = false;
    }
  },

  async handleCredentialResponse(response) {
    // console.log("Google Response:", response);
    try {
      window.BZ.state.set("ui.loading", true);
      const apiResponse = await window.BZ.api.auth.loginWithGoogle(
        response.credential,
      );

      const token = apiResponse.data.access_token;
      const user = apiResponse.data.user; // Directly use the user object from the API response

      localStorage.setItem("bz_token", token);
      localStorage.setItem("bz_user", JSON.stringify(user));

      window.BZ.state.set("auth.token", token);
      window.BZ.state.set("auth.user", user);
      window.BZ.state.set("auth.isAuthenticated", true);

      showToast(getTranslation("texts.welcome"), "success");

      document.getElementById("bz_modal_1")?.close();
    } catch (error) {
      showToast("Google login failed", "error");
    } finally {
      window.BZ.state.set("ui.loading", false);
    }
  },

  logout() {
    localStorage.removeItem("bz_token");
    localStorage.removeItem("bz_user");

    window.BZ.state.set("auth.token", null);
    window.BZ.state.set("auth.user", null);
    window.BZ.state.set("auth.isAuthenticated", false);

    showToast(getTranslation("texts.logoutMessage"), "info");
  },

  showLoginModal() {
    const loginForm = `
      <div class="mx-auto max-w-sm">
        <form id="bz-login-form" class="space-y-4">

          <div class="hidden">
              <input type="email" name="email" placeholder="Email" class="input input-bordered w-full" required>
              <button type="submit" disabled class="btn btn-primary w-full text-white">
                ${getTranslation("texts.loginWithEmail")}
              </button>
          </div>

          <div id="google-login-container"></div>

          <div class="divider uppercase">${getTranslation("texts.or")}</div>
          
          <button type="button" id="nostr-login-btn" class="btn btn-outline dark:btn-ghost dark:shadow-none dark:border-none rounded w-full dark:hover:bg-[#5E5F60] font-normal text-[14px] text-[#3C4044] dark:text-[#e8eaed] dark:bg-[#202124] border-[#DADCE0]">
              ${getTranslation("texts.loginWithNostr")}
          </button>
        </form>
      </div>
    `;

    window.BZ.modal.show({
      // title: "Login to Betizen",
      title: getTranslation("texts.login"),
      body: loginForm,
    });

    const container = document.getElementById("google-login-container");
    if (container) {
      // 1. Handle Dark Mode
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const buttonTheme = currentTheme === "dark" ? "filled_black" : "outline";

      // 2. Handle Width (up to Google's max of 400px)
      const containerWidth = container.offsetWidth;
      const buttonWidth = Math.min(
        containerWidth > 0 ? containerWidth : 300,
        400,
      );

      // Render the Google button
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        google.accounts.id.renderButton(container, {
          theme: buttonTheme,
          size: "large",
          type: "standard",
          width: buttonWidth.toString(),
        });
      }
    }
  },
};
