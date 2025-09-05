"use client"

import { useEffect, useRef } from "react"

// GSAP animation utilities for SupplySphere
export const useGSAPAnimations = () => {
  const elementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Hero section animations
      const heroElements = document.querySelectorAll(".hero-animate")
      if (heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
          },
        )
      }

      // Feature cards stagger animation
      const featureCards = document.querySelectorAll(".feature-card")
      if (featureCards.length > 0) {
        gsap.fromTo(
          featureCards,
          {
            opacity: 0,
            y: 60,
            rotationX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".features-section",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Stats counter animation
      const statNumbers = document.querySelectorAll(".stat-number")
      statNumbers.forEach((stat) => {
        const finalValue = stat.textContent || "0"
        const numericValue = Number.parseInt(finalValue.replace(/[^\d]/g, "")) || 0

        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              const current = Math.round(this.targets()[0].textContent)
              if (finalValue.includes("M")) {
                stat.textContent = current + "M+"
              } else if (finalValue.includes("K")) {
                stat.textContent = current + "K+"
              } else if (finalValue.includes("%")) {
                stat.textContent = current + "%"
              } else {
                stat.textContent = current + "+"
              }
            },
          },
        )
      })

      // Problem/Solution reveal animation
      const problemSolution = document.querySelectorAll(".problem-solution-item")
      if (problemSolution.length > 0) {
        gsap.fromTo(
          problemSolution,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".problem-solution-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Floating background elements
      const floatingElements = document.querySelectorAll(".floating-bg")
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        })
      })

      // Navbar scroll effect
      const navbar = document.querySelector(".navbar")
      if (navbar) {
        gsap.to(navbar, {
          backgroundColor: "rgba(var(--background), 0.95)",
          backdropFilter: "blur(10px)",
          scrollTrigger: {
            trigger: "body",
            start: "100px top",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        })
      }
    }

    loadGSAP()
  }, [])

  return { elementsRef }
}

// Dashboard animations
export const useDashboardAnimations = () => {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // KPI cards entrance animation
      const kpiCards = document.querySelectorAll(".kpi-card")
      if (kpiCards.length > 0) {
        gsap.fromTo(
          kpiCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
        )
      }

      // Chart animations
      const charts = document.querySelectorAll(".chart-container")
      charts.forEach((chart) => {
        gsap.fromTo(
          chart,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
          },
        )
      })

      // Table row stagger
      const tableRows = document.querySelectorAll(".table-row")
      if (tableRows.length > 0) {
        gsap.fromTo(
          tableRows,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
          },
        )
      }

      const animatedValues = document.querySelectorAll(".animated-value")
      animatedValues.forEach((value) => {
        const finalText = value.textContent || "0"
        const numericValue = Number.parseInt(finalText.replace(/[^\d]/g, "")) || 0

        if (numericValue > 0) {
          gsap.fromTo(
            value,
            { textContent: 0 },
            {
              textContent: numericValue,
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              delay: 0.5,
              onUpdate: function () {
                const current = Math.round(this.targets()[0].textContent)
                if (finalText.includes("%")) {
                  value.textContent = current + "%"
                } else if (finalText.includes("K")) {
                  value.textContent = current + "K"
                } else if (finalText.includes("M")) {
                  value.textContent = current + "M"
                } else if (finalText.includes("$")) {
                  value.textContent = "$" + current.toLocaleString()
                } else {
                  value.textContent = current.toString()
                }
              },
            },
          )
        }
      })

      const menuItems = document.querySelectorAll(".menu-item")
      if (menuItems.length > 0) {
        gsap.fromTo(
          menuItems,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05,
            delay: 0.2,
          },
        )
      }
    }

    loadGSAP()
  }, [])
}

// Page transition animations
export const usePageTransition = () => {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Page entrance animation
      const pageContent = document.querySelector(".page-content")
      if (pageContent) {
        gsap.fromTo(
          pageContent,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
        )
      }
    }

    loadGSAP()
  }, [])
}

// Hover animations
export const addHoverAnimations = () => {
  if (typeof window === "undefined") return

  const loadGSAP = async () => {
    const { gsap } = await import("gsap")

    // Button hover effects
    const buttons = document.querySelectorAll(".btn-hover")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Card hover effects
    const cards = document.querySelectorAll(".card-hover")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    const menuItems = document.querySelectorAll(".menu-item")
    menuItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          x: 5,
          duration: 0.2,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        })
      })
    })
  }

  loadGSAP()
}

export const useLoadingAnimation = () => {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      const loadingSpinners = document.querySelectorAll(".loading-spinner")
      loadingSpinners.forEach((spinner) => {
        gsap.to(spinner, {
          rotation: 360,
          duration: 1,
          ease: "none",
          repeat: -1,
        })
      })
    }

    loadGSAP()
  }, [])
}
