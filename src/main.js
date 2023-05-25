import './styles/style.css'
import { gsap } from 'gsap/all'
import { ScrollTrigger } from 'gsap/all'
import { MotionPathPlugin } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const colorArr = ['#0050FF', '#FF7D64', '#834DED', '#ffb03e', '#b5ccff']
let imagesIns = document.querySelectorAll('.ins-cs-btn')
// let animatedHeadings = document.querySelectorAll('h1, h2, h3')

imagesIns.forEach((element, i) => {
  const currentColor = colorArr[i % colorArr.length]
  element.style.borderColor = currentColor
  element.style.color = currentColor
  element.style.opacity = '100'
})
// Link timelines to scroll position
function createScrollTrigger(triggerElement, timeline) {
  // Reset tl when scroll out of view past bottom of screen
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top bottom',
    onLeaveBack: () => {
      timeline.progress(0)
      timeline.pause()
    },
  })
  // Play tl when scrolled into view (60% from top of screen)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top 80%',
    onEnter: () => timeline.play(),
  })
}

imagesIns.forEach((element) => {
  gsap.to(element, {
    x: 'random(-15, 15)',
    y: 'random(-15, 15)',
    duration: 1 * Math.random() + 2,
    ease: 'sine.inOut',
    repeat: -1,
    scale: 1.03,
    yoyo: true,
    filter: 'blur(1px)',
    repeatRefresh: true,
  })
})
// const sections = document.querySelectorAll('.section')
// sections.forEach((section) => {
//   const descendants = section.querySelectorAll('*')
//   descendants.forEach((child) => {
//     child.setAttribute('fade-in', '')
//   })
// })

// gsap.fromTo(
//   '[fade-in]',
//   { opacity: 0 },
//   {
//     opacity: 1,
//     ease: 'power1.inOut',
//     duration: 1,
//     scrollTrigger: {
//       trigger: triggerElement,
//     },
//   }
// )

document.querySelectorAll('.ins-cl-item').forEach((element) => {
  let tl = gsap.timeline()
  tl.from(element, {
    opacity: 0,
    y: 120,
    duration: 1,
    ease: 'expo.out',
    stagger: 0.1,
  })
  createScrollTrigger(element, tl)
})

document.querySelectorAll('[text-split]').forEach(function (element) {
  let tl = gsap.timeline({ paused: true })
  tl.from(element.querySelectorAll('.char'), {
    yPercent: 50,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    stagger: { amount: 0.3 },
  })
  createScrollTrigger(element, tl)
})

gsap.set('[text-split]', { opacity: 1 })

const heroAnimation = gsap.timeline()
heroAnimation.to('.hero-left div', { opacity: 1, duration: 1 })

gsap.to('.section', { opacity: 1 })

let circlesOnStroke = gsap.timeline({
  ScrollTrigger: {
    trigger: '[stroke-section]',
    start: 'top center',
    end: 'bottom center',
    markers: true,
    scrub: 1,
  },
})

circlesOnStroke.to(
  '#path-1 circle',
  {
    motionPath: {
      path: '#stroke',
      align: '#stroke',
      alignOrigin: [0.5, 0.5],
    },
  },
  '<'
)
// circlesOnStroke.to('#path-1 circle', { opacity: 0, duration: 0.5 }, '-=2')
circlesOnStroke.to(
  '#path-2 circle',
  {
    motionPath: {
      path: '#path-2 #stroke',
      align: '#path-2 #stroke',
      alignOrigin: [0.5, 0.5],
    },
  },
  '<'
)
// circlesOnStroke.to('#path-2 circle', { opacity: 0, duration: 0.5 }, '-=2')

circlesOnStroke.to(
  '#path-3 #dot',
  {
    motionPath: {
      path: '#path-3 #stroke',
      align: '#path-3 #stroke',
      alignOrigin: [0.5, 0.5],
    },
  },
  '<'
)
// circlesOnStroke.to('#path-3 #dot', { opacity: 0, duration: 0.5 }, '-=2')

if (window.innerWidth < 991) {
  const parentDiv = document.querySelector('.ins-sticky-item')
  const children = Array.from(parentDiv.children)

  // Remove all existing children
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild)
  }

  // Rearrange the children array
  const reorderedChildren = []
  for (let i = 0; i < children.length; i += 2) {
    reorderedChildren.push(children[i + 1])
    reorderedChildren.push(children[i])
  }

  reorderedChildren.forEach((child) => {
    parentDiv.appendChild(child)
  })
}
