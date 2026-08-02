document.addEventListener("DOMContentLoaded", () => {
  // Sticky header on scroll
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  // Mobile hamburger menu
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Search form (demo only, no backend)
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("propiedades").scrollIntoView({ behavior: "smooth" });
  });

  // Hero carousel: auto-advancing crossfade with a re-triggered Ken Burns zoom per slide
  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  const HERO_INTERVAL = 6500;
  let heroIndex = 0;

  const playKenBurns = (slide) => {
    const img = slide.querySelector(".hero-bg");
    if (!img) return;
    img.classList.remove("kenburns-play");
    void img.offsetWidth; // force reflow so the animation restarts
    img.classList.add("kenburns-play");
  };

  const showHeroSlide = (index) => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
    playKenBurns(heroSlides[heroIndex]);
  };

  if (heroSlides.length) {
    playKenBurns(heroSlides[heroIndex]);
    setInterval(() => showHeroSlide(heroIndex + 1), HERO_INTERVAL);
  }

  // Scroll-reveal: fades/slides elements in the first time they enter the viewport
  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        )
      : null;

  const observeReveal = (elements) => {
    if (revealObserver) {
      elements.forEach((el) => revealObserver.observe(el));
    } else {
      elements.forEach((el) => el.classList.add("is-visible"));
    }
  };

  observeReveal(document.querySelectorAll(".reveal:not(.destination-card)"));

  // Destination cards reveal together based on the track's own visibility.
  // Individually observing each card breaks once there are more cards than
  // fit on screen: a card scrolled out of view horizontally never counts as
  // "intersecting" the viewport, so it would stay invisible forever.
  const destinationsTrackEl = document.getElementById("destinationsTrack");
  if (destinationsTrackEl) {
    const revealDestinationCards = () => {
      destinationsTrackEl.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    };
    if (revealObserver) {
      const trackObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealDestinationCards();
              trackObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      trackObserver.observe(destinationsTrackEl);
    } else {
      revealDestinationCards();
    }
  }

  // Featured collection carousel (crossfade between slides)
  const track = document.getElementById("collectionTrack");
  const slides = Array.from(document.querySelectorAll(".collection-slide"));
  let activeIndex = slides.findIndex((s) => s.classList.contains("is-active"));
  if (activeIndex === -1) activeIndex = 0;

  const syncTrackHeight = () => {
    track.style.minHeight = `${slides[activeIndex].scrollHeight}px`;
  };

  const showSlide = (index) => {
    slides[activeIndex].classList.remove("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "true");
    activeIndex = (index + slides.length) % slides.length;
    slides[activeIndex].classList.add("is-active");
    slides[activeIndex].removeAttribute("aria-hidden");
    syncTrackHeight();
  };

  slides.forEach((slide, i) => {
    if (i !== activeIndex) slide.setAttribute("aria-hidden", "true");
  });
  syncTrackHeight();
  window.addEventListener("resize", syncTrackHeight);

  document.getElementById("collectionPrev").addEventListener("click", () => showSlide(activeIndex - 1));
  document.getElementById("collectionNext").addEventListener("click", () => showSlide(activeIndex + 1));

  // Destinations: arrow buttons + click-and-drag scrolling on desktop
  const destTrack = document.getElementById("destinationsTrack");
  const prevBtn = document.querySelector(".destinations-arrow-prev");
  const nextBtn = document.querySelector(".destinations-arrow-next");
  if (destTrack && prevBtn && nextBtn) {
    const scrollAmount = () => destTrack.clientWidth * 0.9;
    prevBtn.addEventListener("click", () => destTrack.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
    nextBtn.addEventListener("click", () => destTrack.scrollBy({ left: scrollAmount(), behavior: "smooth" }));
  }

  if (destTrack) {
    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let startScrollLeft = 0;

    destTrack.addEventListener("pointerdown", (e) => {
      isDown = true;
      didDrag = false;
      startX = e.clientX;
      startScrollLeft = destTrack.scrollLeft;
      destTrack.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 5) didDrag = true;
      destTrack.scrollLeft = startScrollLeft - delta;
    });

    const endDrag = () => {
      isDown = false;
      destTrack.classList.remove("is-dragging");
    };
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    // Prevent the card link from navigating right after a drag gesture
    destTrack.querySelectorAll(".destination-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (didDrag) e.preventDefault();
      });
    });
  }

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Featured properties grid, rendered from data/properties.json
  const grid = document.getElementById("propertyGrid");
  const currencyFormatters = {};
  const formatPrice = (amount, currency) => {
    if (!currencyFormatters[currency]) {
      currencyFormatters[currency] = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      });
    }
    return currencyFormatters[currency].format(amount);
  };

  const guestIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>';
  const bedIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"></path></svg>';

  fetch("data/properties.json")
    .then((res) => res.json())
    .then((properties) => {
      grid.innerHTML = properties
        .map(
          (p, i) => `
          <article class="property-card reveal" style="transition-delay:${(i % 3) * 0.12}s">
            <div class="property-photo">
              <picture>
                <source type="image/webp" srcset="images/${p.image}.webp"/>
                <img src="images/${p.image}.jpg" alt="${p.name}, ${p.zone}" loading="lazy"/>
              </picture>
              ${p.tag ? `<span class="property-tag">${p.tag}</span>` : ""}
            </div>
            <div class="property-body">
              <p class="property-zone">${p.zone}</p>
              <h3 class="property-name">${p.name}</h3>
              <div class="property-meta">
                <span>${guestIcon} ${p.guests} huéspedes</span>
                <span>${bedIcon} ${p.bedrooms} habitaciones</span>
              </div>
              <p class="property-price">Desde <strong>${formatPrice(p.priceFrom, p.currency)}</strong> / noche</p>
            </div>
          </article>
        `
        )
        .join("");
      observeReveal(grid.querySelectorAll(".reveal"));
    })
    .catch(() => {
      grid.innerHTML = '<p class="properties-loading">No se pudieron cargar las propiedades en este momento.</p>';
    });
});
