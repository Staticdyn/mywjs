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

//// circle on stroke Timeline ////////////
let circlesOnStroke = gsap.timeline({ defaults: { ease: 'linear' } })
circlesOnStroke
  .to('#path-1 #circle', { opacity: 100, duration: 0.1 })

  .to(
    '#path-1 #circle',
    {
      motionPath: {
        start: 0,
        path: '#stroke',
        align: '#stroke',
        alignOrigin: [0.5, 0.5],
        immediateRender: true,
      },
      immediateRender: true,
    },
    '<'
  )
  .to('#path-1 #circle', { opacity: 0, duration: 0.1 }, '-=0.1')
  .to('#path-2 #circle', { opacity: 100, duration: 0.1 }, '+=0.2')
  .to(
    '#path-2 #circle',
    {
      duration: 2,
      motionPath: {
        start: 0,
        path: '#path-2 #stroke',
        align: '#path-2 #stroke',
        alignOrigin: [0.5, 0.5],
        immediateRender: true,
      },
    },
    '<10%'
  )
  .to('#path-2 #circle', { opacity: 0, duration: 0.1 }, '-=0.1')
  .to('#path-3 #circle', { opacity: 100, duration: 0.1 }, '+=0.2')

  .to(
    '#path-3 #circle',
    {
      duration: 1,
      motionPath: {
        start: 0,
        path: '#path-3 #stroke',
        align: '#path-3 #stroke',
        alignOrigin: [0.5, 0.5],
        immediateRender: true,
      },
      immediateRender: true,
    },
    '<95%'
  )
  .to('#path-3 #circle', { opacity: 0, duration: 0.1 }, '-=0.1')

ScrollTrigger.create({
  animation: circlesOnStroke,
  trigger: '.built-for-ins-wrap',
  start: 'top 70%',
  end: 'bottom 50%',
  scrub: 1,
})

function reorderChildren() {
  const parentDiv = document.querySelector('.ins-sticky-item')
  const children = Array.from(parentDiv.children)

  // Remove all existing children
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild)
  }

  // Rearrange or revert the children order based on screen width
  if (window.innerWidth < 991) {
    const reorderedChildren = []
    for (let i = 0; i < children.length; i += 2) {
      reorderedChildren.push(children[i + 1])
      reorderedChildren.push(children[i])
    }

    // Append the reordered children back to the parent div
    reorderedChildren.forEach((child) => {
      parentDiv.appendChild(child)
    })
  } else {
    // Append the original children order back to the parent div
    children.forEach((child) => {
      parentDiv.appendChild(child)
    })
  }
}
// Call the reorderChildren function initially
reorderChildren()

// Add event listener for resize event
window.addEventListener('resize', reorderChildren)
