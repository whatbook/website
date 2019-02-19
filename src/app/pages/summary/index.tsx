import React, { Component } from 'react'
import { TweenMax, Power2, Sine } from 'gsap/TweenMax'
import { releases } from './data'

/*
Desc: Dot object
*/
class Dot {
  x
  y
  color
  alpha
  draw
  stageCtx
  circleRadius

  constructor(x, y, color, alpha, stageCtx, circleRadius) {
    this.x = x
    this.y = y
    this.color = color
    this.alpha = alpha
    this.stageCtx = stageCtx
    this.circleRadius = circleRadius

    this.draw = function () {
      this.stageCtx.beginPath()
      this.stageCtx.arc(this.x, this.y, this.circleRadius, 0, 2 * Math.PI, false)
      this.stageCtx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')'
      this.stageCtx.fill()
    }
  }
}
export default class Summary extends Component {
  color: string = ''
  alpha: number = 0
  x: number = 0
  y: number = 0
  tagCtx
  versionCtx
  tagWidth = window.innerWidth
  tagHeight = window.innerHeight
  versionWidth = window.innerWidth
  versionHeight = window.innerHeight
  numberOffsetX
  numberOffsetY
  stage
  stageCtx
  stageWidth = window.innerWidth
  stageHeight = window.innerHeight
  renderFrom = 0
  renderTimer = 1000
  // renderTimer = 100
  renderRunning = true
  breakTimer = 1000
  // breakTimer = 100
  totalDotsCount = 800
  dots: (any)[] = []
  circleRadius = 2
  colors = [
    '61, 207, 236',
    '255, 244, 174',
    '255, 211, 218',
    '151, 211, 226',
  ]
  mostTagCount = 3

  componentDidMount() {
    /*
  Desc: Define inital variables
  */
    this.init()
    /*
  Desc: Create a certain amount of dots
  */
    for (let i = 0; i < this.totalDotsCount; i++) {
      // Create a dot
      let dot = new Dot(
        this.randomNumber(0, this.stageWidth),
        this.randomNumber(0, this.stageHeight),
        this.colors[this.randomNumber(1, this.colors.length)],
        0.3,
        this.stageCtx,
        this.circleRadius
      )

      // Push to into an array of dots
      this.dots.push(dot)

      // Animate dots
      this.tweenDots(dot, '', 'space', null)
    }

    this.canvasRender()

    this.loop()
  }

  /*
Desc: Animate dots
*/
  tweenDots = (dot, pos, type, index) => {
    // Move dots around canvas randomly
    if (type === 'space') {
      // Tween dot to coordinate to form number
      TweenMax.to(dot, 3 + Math.round(Math.random() * 100) / 100, {
        x: this.randomNumber(0, this.stageWidth),
        y: this.randomNumber(0, this.stageHeight),
        alpha: 0.3,
        ease: Sine.easeOut,
        onComplete: () => {
          this.tweenDots(dot, '', 'space', null)
        },
      })
    } else if (type === 'empty') {
      TweenMax.to(dot, 1, {
        x: this.randomNumber(0, this.stageWidth),
        y: this.randomNumber(0, this.stageHeight),
        alpha: 0,
        ease: Sine.easeOut,
        onComplete: () => {
          this.dots.splice(index, 1)
        },
      })
    } else {
      // Tween dot to coordinate to form number
      // const newDot = { ...dot }
      // dots.push()
      const newDot = new Dot(
        this.randomNumber(0, this.stageWidth),
        this.randomNumber(0, this.stageHeight),
        this.colors[this.randomNumber(1, this.colors.length)],
        0.3,
        this.stageCtx,
        this.circleRadius
      )

      // Push to into an array of dots
      this.dots.push(newDot)
      TweenMax.to(newDot, 1 + Math.round(Math.random() * 100) / 100, {
        x: pos.x + this.numberOffsetX,
        y: pos.y + this.numberOffsetY,
        delay: 0,
        alpha: 1,
        ease: Power2.easeInOut,
        onComplete: function () { },
      })
    }
  }

  /*
  Desc: Init canvases & Number text
  */
  init = () => {
    this.initReleases()

    // Init Stage which will have dots
    this.stage = document.getElementById('canvas-dots')
    this.stageCtx = this.stage.getContext('2d')
    this.stage.width = this.stageWidth
    this.stage.height = this.stageHeight

    // Create offset so text appears in middle of screen
    this.numberOffsetX = (this.stageWidth - this.tagWidth) / 2
    this.numberOffsetY = (this.stageHeight - this.tagHeight) / 2
  }
  initReleases = () => {
    const initRelease = (index) => {
      // Init stage which will have tags
      // Set the canvas to width and height of the window
      const tagElement: HTMLCanvasElement | null = document.querySelector(`#canvas-tag-${index}`)
      const versionElement: HTMLCanvasElement | null = document.querySelector(`#canvas-version-${index}`)
      if (tagElement && versionElement) {
        let tagElement1: HTMLCanvasElement = tagElement
        tagElement1.width = this.tagWidth // May be I can use tag char count to set every release of width here
        tagElement1.height = this.tagHeight
        versionElement.width = this.versionWidth // May be I can use tag char count to set every release of width here
        versionElement.height = this.versionHeight
      }
    }
    releases.forEach((release, index) => {
      initRelease(index)
    })
  }

  /*
  Desc: Get a random number
  */
  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  /*
  Desc: render
  */
  canvasRender = () => {
    // Send number to be drawn
    const tagCanvas: HTMLCanvasElement | null = document.querySelector(`#canvas-tag-${this.renderFrom}`)
    const versionCanvas: HTMLCanvasElement | null = document.querySelector(`#canvas-version-${this.renderFrom}`)

    if (tagCanvas && versionCanvas) {
      this.tagCtx = tagCanvas.getContext('2d')
      this.versionCtx = versionCanvas.getContext('2d')
    }

    this.drawTag(releases[this.renderFrom].tag.toString())
    this.drawVersion(releases[this.renderFrom].version.toString())
    console.log('dots', this.dots.length, releases[this.renderFrom]['tagDots'].length, releases[this.renderFrom]['versionDots'])

    // When we hit zero stop render
    if (this.renderFrom + 1 === releases.length) {
      this.renderRunning = false
      // Now that renders finised show the text Go
    }

    // Decrement number down
    console.log('renderForm', this.renderFrom)
    this.renderFrom++
  }

  /*
  Desc: Redraw loops
  */
  loop = () => {
    this.stageCtx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].draw(this.stageCtx)
    }

    requestAnimationFrame(this.loop)
  }

  /*
  Desc: Draw number
  */
  drawTag = (num) => {
    // Create a number on a seperate canvas
    // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

    //	Clear stage of previous tags
    console.log(num)
    this.tagCtx.clearRect(0, 0, this.tagWidth, this.tagHeight)

    this.tagCtx.fillStyle = '#24282f'
    this.tagCtx.textAlign = 'left'
    this.tagCtx.font = 'bold 88px Lato'
    console.log(((this.tagHeight - 200) / this.mostTagCount) * ((this.renderFrom % 3) + 1))
    this.tagCtx.fillText(
      num,
      100,
      ((this.tagHeight - 200) / this.mostTagCount) * ((this.renderFrom % 3) + 1)
    )
    console.log(this.renderFrom)
    const canvas: HTMLCanvasElement | null = document.querySelector(`#canvas-tag-${this.renderFrom}`)
    console.log(canvas)
    let ctx
    if (canvas) {
      ctx = canvas.getContext('2d')
    }

    // getImageData(x, y, width, height)
    // note: is an exspenisve const, so =  make sure canvas is small as possible for what you gra=> b
    // Returns 1 Dimensional array of pixel color value chanels
    // Red, blue, green, alpha chanel of single pixel
    // First chanel is red
    const imageData = ctx.getImageData(0, 0, this.tagWidth, this.tagHeight).data
    // Clear number coordinated
    releases[this.renderFrom]['tagDots'] = []
    console.log(releases[0])
    // i is equal to total image data(eg: 480,000)
    // run while i is greater or equal to 0
    // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels
    for (let i = imageData.length; i >= 0; i -= 4) {

      // If not an empty pixel
      if (imageData[i] !== 0) {
        // i represents the position in the array a red pixel was found

        // (i / 4 ) and percentage by width of canvas
        // Need to divide i by 4 because it has 4 values and you need its orginal position
        // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
        const x = (i / 4) % this.tagWidth

        // (i divide by width) then divide by 4
        // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
        const y = Math.floor(Math.floor(i / this.tagWidth) / 4)

        // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
        if (
          x &&
          x % (this.circleRadius * 2 + 3) === 0 &&
          (y && y % (this.circleRadius * 2 + 3) === 0)
        ) {
          // Push object to numberPixels array with x and y coordinates
          releases[this.renderFrom]['tagDots'].push({ x: x, y: y })
        }
      }
    }

    this.formNumber('tagDots')
  }

  drawVersion = (num) => {
    // Create a number on a seperate canvas
    // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

    //	Clear stage of previous versions
    this.versionCtx.clearRect(0, 0, this.versionWidth, this.versionHeight)

    this.versionCtx.fillStyle = '#24282f'
    this.versionCtx.textAlign = 'left'
    this.versionCtx.font = 'bold 68px Lato'
    this.versionCtx.fillText(
      num,
      100,
      ((this.versionHeight - 200) / this.mostTagCount) * ((this.renderFrom % 3) + 1) + 80
    )

    const canvas: HTMLCanvasElement | null = document.querySelector(`#canvas-version-${this.renderFrom}`)
    let ctx
    if (canvas) {
      ctx = canvas.getContext('2d')
    }

    // getImageData(x, y, width, height)
    // note: is an exspenisve const, so =  make sure canvas is small as possible for what you gra=> b
    // Returns 1 Dimensional array of pixel color value chanels
    // Red, blue, green, alpha chanel of single pixel
    // First chanel is red
    const imageData = ctx.getImageData(0, 0, this.versionWidth, this.versionHeight).data

    // Clear number coordinated
    releases[this.renderFrom]['versionDots'] = []

    // i is equal to total image data(eg: 480,000)
    // run while i is greater or equal to 0
    // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels
    for (let i = imageData.length; i >= 0; i -= 4) {
      // If not an empty pixel
      if (imageData[i] !== 0) {
        // i represents the position in the array a red pixel was found

        // (i / 4 ) and percentage by width of canvas
        // Need to divide i by 4 because it has 4 values and you need its orginal position
        // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
        const x = (i / 4) % this.tagWidth

        // (i divide by width) then divide by 4
        // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
        const y = Math.floor(Math.floor(i / this.tagWidth) / 4)

        // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
        if (
          x &&
          x % (this.circleRadius * 2 + 3) === 0 &&
          (y && y % (this.circleRadius * 2 + 3) === 0)
        ) {
          // Push object to numberPixels array with x and y coordinates
          releases[this.renderFrom]['versionDots'].push({ x: x, y: y })
        }
      }
    }

    this.formNumber('versionDots')
  }

  getRenderTimer = () => {
    // const tag = releases[renderFrom].tag
    // const version = releases[renderFrom].version

    // return tag === version ? 2500 : renderTimer
    return this.renderTimer // 出现几个就break一次值需要renderTimer即可
  }
  /*
  Desc: Form number
  */
  formNumber = (type) => {
    for (
      let i = 0;
      i < releases[this.renderFrom][type].length;
      i++
    ) {
      // Loop out as many coordionates as we need & pass dots in to animate
      this.tweenDots(this.dots[i], releases[this.renderFrom][type][i], '', null)
    }

    // Break number apart
    if (this.renderRunning && this.renderFrom + 1 !== releases.length) {
      setTimeout(() => {
        console.log('render', type)
        if (this.renderFrom % 3 === 0) {
          setTimeout(() => {
            this.breakRelease(type)
          }, this.renderTimer + 500)
        } else if (type === 'versionDots') {
          this.canvasRender()
        }
      }, this.getRenderTimer())
    }
  }

  breakRelease = (type) => {
    for (let i = this.dots.length - 1; i >= this.totalDotsCount; i--) {
      this.tweenDots(this.dots[i], '', 'empty', i)
    }

    if (this.renderRunning && type === 'versionDots') {
      // Build next number
      setTimeout(() => {
        this.canvasRender()
      }, this.breakTimer)
    }
  }

  render() {
    return (
      <div id="canvas-wrap">
        <canvas id="canvas-tag-0" />
        <canvas id="canvas-tag-1" />
        <canvas id="canvas-tag-2" />
        <canvas id="canvas-tag-3" />
        <canvas id="canvas-tag-4" />
        <canvas id="canvas-tag-5" />
        <canvas id="canvas-tag-6" />
        <canvas id="canvas-tag-7" />
        <canvas id="canvas-tag-8" />
        <canvas id="canvas-tag-9" />
        <canvas id="canvas-tag-10" />
        <canvas id="canvas-tag-11" />
        <canvas id="canvas-tag-12" />
        <canvas id="canvas-tag-13" />
        <canvas id="canvas-tag-14" />
        <canvas id="canvas-tag-15" />
        <canvas id="canvas-tag-16" />
        <canvas id="canvas-tag-17" />
        <canvas id="canvas-tag-18" />
        <canvas id="canvas-tag-19" />
        <canvas id="canvas-tag-20" />
        <canvas id="canvas-tag-21" />
        <canvas id="canvas-tag-22" />
        <canvas id="canvas-tag-23" />
        <canvas id="canvas-tag-24" />
        <canvas id="canvas-tag-25" />
        <canvas id="canvas-tag-26" />
        <canvas id="canvas-tag-27" />
        <canvas id="canvas-tag-28" />
        <canvas id="canvas-tag-29" />
        <canvas id="canvas-tag-30" />
        <canvas id="canvas-tag-31" />
        <canvas id="canvas-tag-32" />
        <canvas id="canvas-tag-33" />
        <canvas id="canvas-tag-34" />
        <canvas id="canvas-tag-35" />
        <canvas id="canvas-tag-36" />
        <canvas id="canvas-tag-37" />
        <canvas id="canvas-tag-38" />
        <canvas id="canvas-version-0" />
        <canvas id="canvas-version-1" />
        <canvas id="canvas-version-2" />
        <canvas id="canvas-version-3" />
        <canvas id="canvas-version-4" />
        <canvas id="canvas-version-5" />
        <canvas id="canvas-version-6" />
        <canvas id="canvas-version-7" />
        <canvas id="canvas-version-8" />
        <canvas id="canvas-version-9" />
        <canvas id="canvas-version-10" />
        <canvas id="canvas-version-11" />
        <canvas id="canvas-version-12" />
        <canvas id="canvas-version-13" />
        <canvas id="canvas-version-14" />
        <canvas id="canvas-version-15" />
        <canvas id="canvas-version-16" />
        <canvas id="canvas-version-17" />
        <canvas id="canvas-version-18" />
        <canvas id="canvas-version-19" />
        <canvas id="canvas-version-20" />
        <canvas id="canvas-version-21" />
        <canvas id="canvas-version-22" />
        <canvas id="canvas-version-23" />
        <canvas id="canvas-version-24" />
        <canvas id="canvas-version-25" />
        <canvas id="canvas-version-26" />
        <canvas id="canvas-version-27" />
        <canvas id="canvas-version-28" />
        <canvas id="canvas-version-29" />
        <canvas id="canvas-version-30" />
        <canvas id="canvas-version-31" />
        <canvas id="canvas-version-32" />
        <canvas id="canvas-version-33" />
        <canvas id="canvas-version-34" />
        <canvas id="canvas-version-35" />
        <canvas id="canvas-version-36" />
        <canvas id="canvas-version-37" />
        <canvas id="canvas-version-38" />
        <canvas id="canvas-version" />
        <canvas id="canvas-dots" />
      </div>
    )
  }
}
