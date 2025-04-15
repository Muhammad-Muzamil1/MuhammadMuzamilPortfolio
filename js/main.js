// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let currentSection = "intro"
    let isAnimating = false
    let renderer, scene, camera, particles
    let animationFrameId
  
    // DOM Elements
    const loader = document.getElementById("loader")
    const canvas = document.getElementById("bg-canvas")
    const navItems = document.querySelectorAll(".nav-item")
    const sections = document.querySelectorAll(".section")
    const skillBars = document.querySelectorAll(".skill-progress")
  
    // Initialize Three.js scene
    function initThreeJS() {
      // Create scene
      scene = new THREE.Scene()
  
      // Create camera
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 10
  
      // Create renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
  
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(10, 10, 5)
      directionalLight.castShadow = true
      scene.add(directionalLight)
  
      // Create particles
      createParticles()
  
      // Start animation loop
      animate()
  
      // Handle window resize
      window.addEventListener("resize", onWindowResize)
    }
  
    // Create floating particles
    function createParticles() {
      const particleCount = 200
      const particleGeometry = new THREE.SphereGeometry(1, 16, 16)
      const particleMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
      })
  
      particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, particleCount)
  
      const dummy = new THREE.Object3D()
      const positions = []
  
      for (let i = 0; i < particleCount; i++) {
        // Random position
        const x = THREE.MathUtils.randFloatSpread(40)
        const y = THREE.MathUtils.randFloatSpread(40)
        const z = THREE.MathUtils.randFloatSpread(10) - 5
  
        // Random scale
        const scale = THREE.MathUtils.randFloat(0.05, 0.15)
  
        // Store position for animation
        positions.push({
          position: [x, y, z],
          speed: THREE.MathUtils.randFloat(0.01, 0.05),
          scale: scale,
          factor: THREE.MathUtils.randFloat(0.5, 1),
        })
  
        // Set initial matrix
        dummy.position.set(x, y, z)
        dummy.scale.set(scale, scale, scale)
        dummy.updateMatrix()
        particles.setMatrixAt(i, dummy.matrix)
      }
  
      particles.instanceMatrix.needsUpdate = true
      particles.userData.positions = positions
  
      scene.add(particles)
    }
  
    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate)
  
      // Animate particles
      if (particles && particles.userData.positions) {
        const positions = particles.userData.positions
        const dummy = new THREE.Object3D()
        const time = performance.now() * 0.001
  
        for (let i = 0; i < positions.length; i++) {
          const { position, speed, scale, factor } = positions[i]
  
          // Move particle up and create looping effect
          position[1] -= speed
          if (position[1] < -20) {
            position[1] = 20
            position[0] = THREE.MathUtils.randFloatSpread(40)
          }
  
          // Apply sine wave effect for gentle floating
          const x = position[0] + Math.sin(time * factor) * 0.2
  
          dummy.position.set(x, position[1], position[2])
          dummy.scale.set(scale, scale, scale)
          dummy.updateMatrix()
  
          particles.setMatrixAt(i, dummy.matrix)
        }
  
        particles.instanceMatrix.needsUpdate = true
      }
  
      // Render scene
      renderer.render(scene, camera)
    }
  
    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  
    // Navigation and section switching
    function initNavigation() {
      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          const targetSection = item.getAttribute("data-section")
          if (currentSection !== targetSection && !isAnimating) {
            switchSection(targetSection)
          }
        })
      })
    }
  
    // Switch between sections with smooth transitions
    function switchSection(targetSection) {
      if (isAnimating) return
      isAnimating = true
  
      // Update navigation
      document.querySelector(`.nav-item.active`).classList.remove("active")
      document.querySelector(`.nav-item[data-section="${targetSection}"]`).classList.add("active")
  
      // Fade out current section
      const currentSectionElement = document.getElementById(currentSection)
      currentSectionElement.style.opacity = "0"
  
      setTimeout(() => {
        // Hide current section
        currentSectionElement.classList.remove("active")
  
        // Show target section
        const targetSectionElement = document.getElementById(targetSection)
        targetSectionElement.classList.add("active")
  
        // Trigger animations for the new section
        if (targetSection === "skills") {
          animateSkillBars()
        }
  
        // Fade in target section
        setTimeout(() => {
          targetSectionElement.style.opacity = "1"
          currentSection = targetSection
          isAnimating = false
        }, 50)
      }, 500)
    }
  
    // Animate skill bars when skills section is shown
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        bar.style.width = "0%"
        setTimeout(() => {
          bar.style.width = bar.parentElement.previousElementSibling.querySelector(".skill-level").textContent
        }, 100)
      })
    }
  
    // Form submission handling
    function initContactForm() {
      const contactForm = document.getElementById("contact-form")
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault()
  
          // Get form data
          const name = document.getElementById("name").value
          const email = document.getElementById("email").value
          const subject = document.getElementById("subject").value
          const message = document.getElementById("message").value
  
          // Here you would typically send the form data to a server
          // For now, we'll just log it and show a success message
          console.log({ name, email, subject, message })
  
          // Show success message (in a real app, this would happen after successful submission)
          const submitButton = contactForm.querySelector(".submit-button")
          const originalText = submitButton.textContent
          submitButton.textContent = "Message Sent!"
          submitButton.disabled = true
  
          setTimeout(() => {
            submitButton.textContent = originalText
            submitButton.disabled = false
            contactForm.reset()
          }, 3000)
        })
      }
    }
  
    // Initialize performance optimizations
    function initPerformanceOptimizations() {
      // Use Intersection Observer to optimize animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Resume animations when visible
              if (!animationFrameId) {
                animate()
              }
            } else {
              // Pause animations when not visible
              if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
                animationFrameId = null
              }
            }
          })
        },
        { threshold: 0.1 },
      )
  
      // Observe the canvas
      observer.observe(canvas)
  
      // Optimize images and assets loading
      document.querySelectorAll("img").forEach((img) => {
        img.loading = "lazy"
      })
    }
  
    // Initialize the application
    function init() {
      // Initialize Three.js
      initThreeJS()
  
      // Initialize navigation
      initNavigation()
  
      // Initialize contact form
      initContactForm()
  
      // Initialize performance optimizations
      initPerformanceOptimizations()
  
      // Show initial section
      document.getElementById(currentSection).classList.add("active")
      document.querySelector(`.nav-item[data-section="${currentSection}"]`).classList.add("active")
  
      // Hide loader
      setTimeout(() => {
        loader.classList.add("hidden")
  
        // Animate skill bars if skills section is active
        if (currentSection === "skills") {
          animateSkillBars()
        }
      }, 1500)
    }
  
    // Start the application
    init()
  })
  
  import * as THREE from "three"
  