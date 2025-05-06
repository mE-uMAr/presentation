document.addEventListener("DOMContentLoaded", () => {
  // Get all slides
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const slideIndicatorsContainer = document.querySelector(".slide-indicators")

  let currentSlideIndex = 0

  // Create slide indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement("div")
    indicator.classList.add("indicator")
    if (index === 0) {
      indicator.classList.add("active")
    }
    indicator.addEventListener("click", () => {
      goToSlide(index)
    })
    slideIndicatorsContainer.appendChild(indicator)
  })

  // Initialize the first slide
  slides[0].classList.add("active")

  // Function to go to a specific slide
  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1
    } else if (index >= slides.length) {
      index = 0
    }

    // Remove active class from current slide and add prev class
    slides[currentSlideIndex].classList.remove("active")
    slides[currentSlideIndex].classList.add("prev")

    // Update indicators
    document.querySelectorAll(".indicator").forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })

    // Add active class to new slide
    setTimeout(() => {
      slides[currentSlideIndex].classList.remove("prev")
      slides[index].classList.add("active")
      currentSlideIndex = index

      // Initialize animations for the current slide
      initSlideAnimations(currentSlideIndex)
    }, 50)
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlideIndex - 1)
  })

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlideIndex + 1)
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goToSlide(currentSlideIndex - 1)
    } else if (e.key === "ArrowRight") {
      goToSlide(currentSlideIndex + 1)
    }
  })

  // Initialize animations for specific slides
  function initSlideAnimations(slideIndex) {
    // Reset animations
    resetAnimations()

    // Slide-specific animations
    switch (slideIndex) {
      case 0: // Title slide
        // No special animations needed, CSS handles it
        break
      case 1: // Project Overview
        animateProcessFlow()
        break
      case 2: // Key NLP Terms
        animateMetricBars()
        break
      case 3: // NER Model
        animateNERTokens()
        break
      case 4: // Job Role Classification
        animateBERTClassification()
        break
      case 5: // Resume & JD Matching
        animateVectorMatching()
        break
      case 6: // Skills Extraction
        animateSkillsExtraction()
        break
      case 7: // Pipeline Flow
        animatePipelineFlow()
        break
    }
  }

  // Reset animations
  function resetAnimations() {
    // Reset any ongoing animations here
  }

  // Animation functions for each slide
  function animateProcessFlow() {
    const steps = document.querySelectorAll(".process-step")
    steps.forEach((step, index) => {
      step.style.animationDelay = `${index * 0.2}s`
    })
  }

  function animateMetricBars() {
    const metricBars = document.querySelectorAll(".metric-bar")
    metricBars.forEach((bar) => {
      const value = bar.getAttribute("data-value")
      bar.style.setProperty("--value", value)
    })
  }

  function animateNERTokens() {
    const tokens = document.querySelectorAll(".ner-token")
    tokens.forEach((token, index) => {
      token.style.animationDelay = `${index * 0.1}s`
    })
  }

  function animateBERTClassification() {
    const classifications = document.querySelectorAll(".classification")
    classifications.forEach((classification) => {
      const score = classification.getAttribute("data-score")
      classification.style.setProperty("--score", score)
    })

    const chartBars = document.querySelectorAll(".chart-bar")
    chartBars.forEach((bar) => {
      const value = bar.getAttribute("data-value")
      bar.style.setProperty("--value", value)
    })
  }

  function animateVectorMatching() {
    // Animate cosine similarity
    const v1 = document.querySelector(".v1")
    const v2 = document.querySelector(".v2")
    const cosineAngle = document.querySelector(".cosine-angle")

    // Animate similarity score counter
    const counter = document.getElementById("similarity-counter")
    let count = 0
    const targetScore = 89
    const duration = 2000 // 2 seconds
    const interval = 20 // Update every 20ms
    const steps = duration / interval
    const increment = targetScore / steps

    const counterInterval = setInterval(() => {
      count += increment
      if (count >= targetScore) {
        count = targetScore
        clearInterval(counterInterval)
      }
      counter.textContent = `${Math.round(count)}%`
    }, interval)

    // Animate TF-IDF bars
    const freqBars = document.querySelectorAll(".freq-bar")
    freqBars.forEach((bar) => {
      const freq = bar.getAttribute("data-freq")
      bar.style.setProperty("--freq", freq)
    })
  }

  function animateSkillsExtraction() {
    // Animation is handled by CSS
  }

  function animatePipelineFlow() {
    const flowSteps = document.querySelectorAll(".flow-step")
    flowSteps.forEach((step, index) => {
      step.style.animationDelay = `${index * 0.2}s`
    })
  }

  // Initialize animations for the first slide
  initSlideAnimations(currentSlideIndex)

  // Add swipe functionality for mobile
  let touchStartX = 0
  let touchEndX = 0

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    const threshold = 50 // Minimum distance for swipe
    if (touchEndX < touchStartX - threshold) {
      // Swipe left, go to next slide
      goToSlide(currentSlideIndex + 1)
    } else if (touchEndX > touchStartX + threshold) {
      // Swipe right, go to previous slide
      goToSlide(currentSlideIndex - 1)
    }
  }
})
