/**
 * Benefits Module
 * Handles auth-gated benefits page with promotions
 */

window.BZ = window.BZ || {};
window.BZ.benefits = {
  async init() {
    const container = document.getElementById("benefits-promotions");
    if (!container) return;

    if (window.BZ.state.get("auth.isAuthenticated")) {
      await this.fetchPromotions(container);
    } else {
      window.BZ.state.subscribe("auth.isAuthenticated", (isAuth) => {
        if (isAuth) this.fetchPromotions(container);
      });
    }
  },

  async fetchPromotions(container) {
    try {
      const response = await window.BZ.api.request("/benefits/promotions");
      container.innerHTML = this.renderPromotions(response.data);
    } catch {
      console.log("Benefits: using default promotions");
    }
  },

  renderPromotions(promos) {
    if (!Array.isArray(promos) || !promos.length) return "";
    return promos
      .map(
        (p) => `
        <div class="card bg-base-200/50">
          <figure class="px-6 pt-6">
            <img src="${p.logo}" alt="${p.name}" class="rounded-xl h-16 object-contain" />
          </figure>
          <div class="card-body items-center text-center">
            <h3 class="card-title text-sm">${p.title}</h3>
            <div class="card-actions mt-2">
              <a href="${p.url}" class="btn btn-primary btn-sm" rel="nofollow noopener" target="_blank">${p.cta}</a>
            </div>
          </div>
        </div>`,
      )
      .join("");
  },
};
