document.addEventListener("DOMContentLoaded", () => {
  // Get all slides
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const slideIndicatorsContainer = document.querySelector(".slide-indicators")
  const progressBar = document.querySelector(".progress-bar")
  const currentSlideElement = document.getElementById("current-slide")
  const totalSlidesElement = document.getElementById("total-slides")

  let currentSlideIndex = 0
  const totalSlides = slides.length
  let isAnimating = false

  // Set total slides count
  if (totalSlidesElement) {
    totalSlidesElement.textContent = totalSlides
  }

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
  updateProgress()

  // Function to update progress bar and slide counter
  function updateProgress() {
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100
    if (progressBar) {
      progressBar.style.width = `${progress}%`
    }

    if (currentSlideElement) {
      currentSlideElement.textContent = currentSlideIndex + 1
    }
  }

  // Function to go to a specific slide
  function goToSlide(index) {
    if (isAnimating) return

    if (index < 0) {
      index = slides.length - 1
    } else if (index >= slides.length) {
      index = 0
    }

    isAnimating = true

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
      updateProgress()

      // Initialize animations for the current slide
      initSlideAnimations(currentSlideIndex)

      setTimeout(() => {
        isAnimating = false
      }, 500)
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
        initTitleSlideAnimations()
        break
      case 1: // Project Overview
        animateProcessFlow()
        break
      case 2: // Key NLP Terms
        animateTermCards()
        animateMetricBars()
        break
      case 3: // NER Model
        animateNERTokens()
        initEntityHighlighting()
        break
      case 4: // Job Role Classification
        animateBERTClassification()
        initTabsForSlide(4)
        break
      case 5: // Resume & JD Matching
        animateVectorMatching()
        break
      case 6: // Skills Extraction
        animateSkillsExtraction()
        initTabsForSlide(6)
        break
      case 7: // Pipeline Flow
        animatePipelineFlow()
        break
    }
  }

  // Reset animations
  function resetAnimations() {
    // Reset any ongoing animations here
    const animatedElements = document.querySelectorAll(".animated")
    animatedElements.forEach((el) => {
      el.classList.remove("animated")
    })
  }

  // Initialize title slide animations
  function initTitleSlideAnimations() {
    // Make sure the content wrapper is visible
    setTimeout(() => {
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.classList.add("visible")
      }
    }, 500)

    // Initialize neural network and digital rain animations
    initNeuralNetwork()
    initDigitalRain()

    // Add data streams
    const dataViz = document.getElementById("data-viz")
    if (dataViz) {
      addDataStreams(dataViz)
      addBinaryBits(dataViz)
    }

    // Animate waveform bars
    const waveformBars = document.querySelectorAll(".waveform-bar")
    waveformBars.forEach((bar, index) => {
      bar.style.animation = `waveform 1.5s ease-in-out ${index * 0.1}s infinite alternate`
    })
  }

  // Neural network visualization
  function initNeuralNetwork() {
    const neuralCanvas = document.getElementById("neural-canvas")
    if (!neuralCanvas) return

    const neuralCtx = neuralCanvas.getContext("2d")

    // Set canvas dimensions
    neuralCanvas.width = window.innerWidth
    neuralCanvas.height = window.innerHeight

    // Neural network nodes
    const nodes = []
    const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * neuralCanvas.width,
        y: Math.random() * neuralCanvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.3})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }

    // Find connections between nodes
    nodes.forEach((node, index) => {
      for (let i = 0; i < nodes.length; i++) {
        if (i !== index) {
          const dx = node.x - nodes[i].x
          const dy = node.y - nodes[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            node.connections.push(i)
          }
        }
      }
    })

    // Draw neural network
    function drawNeuralNetwork() {
      neuralCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height)

      // Draw connections
      nodes.forEach((node, index) => {
        node.connections.forEach((connIndex) => {
          const connNode = nodes[connIndex]
          const dx = connNode.x - node.x
          const dy = connNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            neuralCtx.beginPath()
            neuralCtx.strokeStyle = `rgba(0, 212, 255, ${0.1 - distance / 1500})`
            neuralCtx.lineWidth = 0.5
            neuralCtx.moveTo(node.x, node.y)
            neuralCtx.lineTo(connNode.x, connNode.y)
            neuralCtx.stroke()

            // Data pulse animation along connections
            const pulseSpeed = Date.now() / 1000
            const pulsePosition = (Math.sin(pulseSpeed + index + connIndex) + 1) / 2

            const pulseX = node.x + dx * pulsePosition
            const pulseY = node.y + dy * pulsePosition

            neuralCtx.beginPath()
            neuralCtx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2)
            neuralCtx.fillStyle = "rgba(0, 212, 255, 0.8)"
            neuralCtx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.speedX
        node.y += node.speedY

        // Bounce off edges
        if (node.x < 0 || node.x > neuralCanvas.width) node.speedX *= -1
        if (node.y < 0 || node.y > neuralCanvas.height) node.speedY *= -1

        // Draw node
        neuralCtx.beginPath()
        neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        neuralCtx.fillStyle = node.color
        neuralCtx.fill()

        // Add glow effect
        neuralCtx.beginPath()
        neuralCtx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2)
        neuralCtx.fillStyle = "rgba(0, 212, 255, 0.1)"
        neuralCtx.fill()
      })

      requestAnimationFrame(drawNeuralNetwork)
    }

    drawNeuralNetwork()
  }

  // Digital rain effect
  function initDigitalRain() {
    const rainCanvas = document.getElementById("digital-rain")
    if (!rainCanvas) return

    const rainCtx = rainCanvas.getContext("2d")

    rainCanvas.width = window.innerWidth
    rainCanvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(rainCanvas.width / fontSize)
    const drops = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    const matrix = "01"

    function drawDigitalRain() {
      rainCtx.fillStyle = "rgba(5, 5, 16, 0.05)"
      rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height)

      rainCtx.fillStyle = "#00d4ff"
      rainCtx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length))
        rainCtx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > rainCanvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      requestAnimationFrame(drawDigitalRain)
    }

    drawDigitalRain()
  }

  // Add data streams
  function addDataStreams(dataViz) {
    const streamCount = 20

    for (let i = 0; i < streamCount; i++) {
      const stream = document.createElement("div")
      stream.className = "data-stream"

      // Random position
      stream.style.left = `${Math.random() * 100}%`

      // Random animation duration and delay
      stream.style.animationDuration = `${3 + Math.random() * 5}s`
      stream.style.animationDelay = `${Math.random() * 5}s`

      dataViz.appendChild(stream)
    }
  }

  // Add binary bits
  function addBinaryBits(dataViz) {
    const bitCount = 50

    for (let i = 0; i < bitCount; i++) {
      const bit = document.createElement("div")
      bit.className = "binary-bit"
      bit.textContent = Math.random() > 0.5 ? "1" : "0"

      // Random position
      bit.style.left = `${Math.random() * 100}%`
      bit.style.top = `${Math.random() * 100}%`

      // Random animation duration and delay
      bit.style.animationDuration = `${1 + Math.random() * 2}s`
      bit.style.animationDelay = `${Math.random() * 3}s`

      dataViz.appendChild(bit)
    }
  }

  // Animation functions for each slide
  function animateProcessFlow() {
    const steps = document.querySelectorAll(".process-step")
    steps.forEach((step, index) => {
      step.style.animation = `fadeInUp 0.5s ease-out ${index * 0.2}s forwards`
    })

    // Animate doc lines
    const docLines = document.querySelectorAll(".doc-line")
    docLines.forEach((line, index) => {
      line.style.animation = `growWidth 1s ease-out ${index * 0.2 + 0.5}s forwards`
    })

    // Animate vector lines
    const vectorLines = document.querySelectorAll(".vector-line")
    vectorLines.forEach((line, index) => {
      line.style.animation = `growWidth 1s ease-out ${index * 0.2 + 1.5}s forwards`
    })

    // Animate transformer
    const transformer = document.querySelector(".transformer-box")
    if (transformer) {
      transformer.style.animation = `pulse 2s infinite`
    }
  }

  function animateTermCards() {
    const termCards = document.querySelectorAll(".term-card")
    termCards.forEach((card, index) => {
      card.style.animation = `fadeInScale 0.5s ease-out ${index * 0.1}s forwards`
    })
  }

  function animateMetricBars() {
    const metricBars = document.querySelectorAll(".metric-bar")
    metricBars.forEach((bar, index) => {
      const value = bar.getAttribute("data-value")
      bar.style.animation = `growWidth 1.5s ease-out ${index * 0.2}s forwards`
      bar.style.width = `${value * 100}%`

      const valueEl = bar.querySelector(".metric-value")
      if (valueEl) {
        valueEl.textContent = `${Math.round(value * 100)}%`
      }
    })
  }

  function animateNERTokens() {
    // Animate entity highlighting in the resume text
    const entities = document.querySelectorAll("[data-entity]")
    entities.forEach((entity, index) => {
      entity.style.animation = `highlightEntity 0.5s ease-out ${index * 0.1}s forwards`
    })

    // Animate tokens in the NER panel
    const tokens = document.querySelectorAll(".ner-token")
    tokens.forEach((token, index) => {
      token.style.animation = `slideInRight 0.5s ease-out ${index * 0.1 + 0.5}s forwards`
    })

    // Animate entity chips
    const entityChips = document.querySelectorAll(".entity-chip")
    entityChips.forEach((chip, index) => {
      chip.style.animation = `fadeInScale 0.5s ease-out ${index * 0.2 + 1.5}s forwards`
    })
  }

  function initEntityHighlighting() {
    const highlightButtons = document.querySelectorAll(".highlight-btn")
    const entities = document.querySelectorAll("[data-entity]")

    highlightButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const entityType = button.getAttribute("data-entity")

        // Reset all entities
        entities.forEach((entity) => {
          entity.style.opacity = "0.3"
        })

        // Highlight selected entities
        if (entityType === "all") {
          entities.forEach((entity) => {
            entity.style.opacity = "1"
          })
        } else {
          const selectedEntities = document.querySelectorAll(`[data-entity="${entityType}"]`)
          selectedEntities.forEach((entity) => {
            entity.style.opacity = "1"
          })
        }
      })
    })
  }

  function animateBERTClassification() {
    // Animate BERT layers
    const layers = document.querySelectorAll(".layer")
    layers.forEach((layer, index) => {
      layer.style.animation = `fadeInScale 0.5s ease-out ${index * 0.2}s forwards`
    })

    // Animate classification bars
    const classifications = document.querySelectorAll(".classification")
    classifications.forEach((classification, index) => {
      const score = classification.getAttribute("data-score")
      classification.style.animation = `growWidth 1.5s ease-out ${index * 0.2 + 1}s forwards`
      classification.style.width = `${score * 100}%`
    })

    // Animate resume examples
    const resumeExamples = document.querySelectorAll(".resume-example")
    resumeExamples.forEach((example, index) => {
      example.style.animation = `fadeInUp 0.5s ease-out ${index * 0.2 + 1.5}s forwards`
    })

    // Animate classification results
    const results = document.querySelectorAll(".classification-result")
    results.forEach((result, index) => {
      result.style.animation = `fadeIn 0.5s ease-out ${index * 0.2 + 2}s forwards`
    })

    // Animate chart bars
    const chartBars = document.querySelectorAll(".chart-bar-segment")
    chartBars.forEach((bar, index) => {
      const value = bar.getAttribute("data-value")
      bar.style.animation = `growWidth 1.5s ease-out ${index * 0.2}s forwards`
    })
  }

  function animateVectorMatching() {
    // Animate vectors
    const v1 = document.querySelector(".v1")
    const v2 = document.querySelector(".v2")

    if (v1) {
      v1.style.animation = `growHeight 1.5s ease-out forwards`
      v1.style.height = "150px"
    }

    if (v2) {
      v2.style.animation = `growHeight 1.5s ease-out 0.3s forwards`
      v2.style.height = "150px"
    }

    // Animate cosine angle
    const cosineAngle = document.querySelector(".cosine-angle")
    if (cosineAngle) {
      cosineAngle.style.animation = `fadeIn 1s ease-out 0.6s forwards`
    }

    // Animate similarity score counter
    const counter = document.querySelector(".percentage")
    if (counter) {
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
    }

    // Animate TF-IDF bars
    const freqBars = document.querySelectorAll(".freq-bar")
    freqBars.forEach((bar, index) => {
      const freq = bar.getAttribute("data-freq")
      bar.style.animation = `growWidth 1.5s ease-out ${index * 0.2 + 1}s forwards`
      bar.style.width = `${freq * 100}px`
    })
  }

  function animateSkillsExtraction() {
    // Animate skill highlights
    const skillHighlights = document.querySelectorAll(".skill-highlight")
    skillHighlights.forEach((skill, index) => {
      skill.style.animation = `highlightEntity 0.5s ease-out ${index * 0.1}s forwards`
    })

    // Animate skill chips
    const skillChips = document.querySelectorAll(".skill-chip")
    skillChips.forEach((chip, index) => {
      chip.style.animation = `fadeInScale 0.5s ease-out ${index * 0.1 + 0.5}s forwards`
    })

    // Animate model layers
    const layers = document.querySelectorAll(".model-layers .layer")
    layers.forEach((layer, index) => {
      layer.style.animation = `fadeInUp 0.5s ease-out ${index * 0.2 + 1}s forwards`
    })

    // Animate chart bars
    const chartBars = document.querySelectorAll(".chart-bar-segment")
    chartBars.forEach((bar, index) => {
      const value = bar.getAttribute("data-value")
      bar.style.animation = `growWidth 1.5s ease-out ${index * 0.2}s forwards`
    })
  }

  function animatePipelineFlow() {
    // Animate flow steps
    const flowSteps = document.querySelectorAll(".flow-step")
    flowSteps.forEach((step, index) => {
      step.style.animation = `fadeInUp 0.5s ease-out ${index * 0.2}s forwards`
    })

    // Animate data nodes
    const dataNodes = document.querySelectorAll(".data-node")
    dataNodes.forEach((node, index) => {
      node.style.animation = `fadeInScale 0.5s ease-out ${index * 0.3 + 1}s forwards`
    })

    // Animate data flow arrows
    const flowArrows = document.querySelectorAll(".data-flow-arrow")
    flowArrows.forEach((arrow, index) => {
      arrow.style.animation = `growWidth 1s ease-out ${index * 0.3 + 1.3}s forwards`
    })

    // Animate CTA button
    const ctaButton = document.querySelector(".demo-button")
    if (ctaButton) {
      ctaButton.style.animation = `pulse 2s infinite 2s`
    }
  }

  // Initialize tabs functionality for slides with tabs
  function initTabsForSlide(slideIndex) {
    const slide = slides[slideIndex]
    const tabButtons = slide.querySelectorAll(".tab-btn")

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")

        // Deactivate all tabs and buttons
        slide.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
        slide.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"))

        // Activate the clicked tab and its content
        button.classList.add("active")
        slide.querySelector(`#${tabId}`).classList.add("active")
      })
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

  // Handle window resize
  window.addEventListener("resize", () => {
    const neuralCanvas = document.getElementById("neural-canvas")
    const rainCanvas = document.getElementById("digital-rain")

    if (neuralCanvas) {
      neuralCanvas.width = window.innerWidth
      neuralCanvas.height = window.innerHeight
    }

    if (rainCanvas) {
      rainCanvas.width = window.innerWidth
      rainCanvas.height = window.innerHeight
    }
  })

  // Add CSS animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInScale {
      from { 
        opacity: 0;
        transform: scale(0.9);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes growWidth {
      from { width: 0; }
      to { width: var(--target-width, 100%); }
    }
    
    @keyframes growHeight {
      from { height: 0; }
      to { height: var(--target-height, 150px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes highlightEntity {
      from { 
        background-color: transparent;
        color: inherit;
      }
      to { 
        background-color: var(--highlight-color, rgba(108, 99, 255, 0.2));
        color: var(--text-color);
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0;
        transform: translateX(20px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes waveform {
      0% { height: 5px; }
      50% { height: 30px; }
      100% { height: 5px; }
    }
  `
  document.head.appendChild(style)
})
