/* ============================================================
   RIYA GUPTA — PORTFOLIO — shared behaviour
   ============================================================ */
(function(){
  "use strict";

  /* ---------- page loader (with fallback so it never sticks) ---------- */
  const hideLoader = () => {
    const loader = document.querySelector(".loader");
    if (loader && !loader.classList.contains("hide")) loader.classList.add("hide");
  };
  window.addEventListener("load", () => setTimeout(hideLoader, 300));
  document.addEventListener("DOMContentLoaded", () => setTimeout(hideLoader, 900));
  setTimeout(hideLoader, 1800); // absolute fallback

  /* ---------- theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("rg-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  document.querySelectorAll(".theme-toggle").forEach(btn => {
    const knob = btn.querySelector(".knob");
    if (knob) knob.textContent = root.getAttribute("data-theme") === "light" ? "☀️" : "🌙";
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      if (next === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      localStorage.setItem("rg-theme", next);
      if (knob) knob.textContent = next === "light" ? "☀️" : "🌙";
    });
  });

  /* ---------- mobile menu ---------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (hamburger && mobileMenu){
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", hamburger.classList.contains("open"));
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    }));
  }

  /* ---------- active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  /* ---------- nav shrink / hide-on-scroll shadow ---------- */
  const nav = document.querySelector(".nav");
  if (nav){
    window.addEventListener("scroll", () => {
      nav.style.boxShadow = window.scrollY > 12 ? "0 10px 30px -18px rgba(0,0,0,.5)" : "none";
    }, { passive:true });
  }

  /* ---------- back to top ---------- */
  const toTop = document.querySelector(".to-top");
  if (toTop){
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive:true });
    toTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.15, rootMargin:"0px 0px -60px 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- button ripple ---------- */
  document.querySelectorAll(".btn, .filter-btn, .icon-btn").forEach(btn => {
    btn.style.position = btn.style.position || "relative";
    btn.style.overflow = "hidden";
    btn.addEventListener("click", function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size/2) + "px";
      ripple.style.top = (e.clientY - rect.top - size/2) + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------- cursor glow (desktop only) ---------- */
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches){
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    window.addEventListener("mousemove", (e) => {
      glow.style.setProperty("--x", e.clientX + "px");
      glow.style.setProperty("--y", e.clientY + "px");
    });
  }

  /* ---------- accordion (skills, about page) ---------- */
  document.querySelectorAll(".acc-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".acc-item");
      const panel = item.querySelector(".acc-panel");
      const isOpen = item.classList.contains("open");

      item.parentElement.querySelectorAll(".acc-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".acc-panel").style.maxHeight = null;
      });

      if (!isOpen){
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
  // open first accordion item by default
  const firstAcc = document.querySelector(".acc-item");
  if (firstAcc){
    firstAcc.classList.add("open");
    const p = firstAcc.querySelector(".acc-panel");
    requestAnimationFrame(() => p.style.maxHeight = p.scrollHeight + "px");
  }

  /* ---------- project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  if (filterBtns.length){
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        projectCards.forEach(card => {
          const match = f === "all" || card.dataset.category.includes(f);
          card.style.display = match ? "" : "none";
          if (match){
            card.style.animation = "none";
            requestAnimationFrame(() => { card.style.animation = "pop-in .5s ease forwards"; });
          }
        });
      });
    });
  }

  /* ---------- floating labels: mark fields with value on load ---------- */
  document.querySelectorAll(".field input, .field textarea").forEach(el => {
    if (el.value) el.closest(".field").classList.add("has-value");
  });

  /* ---------- contact form (client-side only) ---------- */
  const form = document.querySelector("#contact-form");
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.querySelector(".form-status");
      const btn = form.querySelector("button[type=submit]");
      const original = btn.innerHTML;
      btn.innerHTML = "<span>Sending…</span>";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        status.classList.add("show");
        form.reset();
        document.querySelectorAll(".field").forEach(f => f.classList.remove("has-value"));
        setTimeout(() => status.classList.remove("show"), 5000);
      }, 900);
    });
  }

  /* ---------- copy to clipboard ---------- */
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      navigator.clipboard?.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = "✓";
        setTimeout(() => btn.innerHTML = original, 1400);
      });
    });
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

})();
