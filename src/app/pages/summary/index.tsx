import React, { Component } from 'react'
import { TweenMax, Power2, Sine } from 'gsap/TweenMax'
import { releases } from './data.tsx'

export default class Summary extends Component {
  componentDidMount() {
    /*
Desc: Define inital variables
*/
    var
      tagCtx,
      versionCtx,
      tagWidth = window.innerWidth,
      tagHeight = window.innerHeight,
      versionWidth = window.innerWidth,
      versionHeight = window.innerHeight,
      numberOffsetX,
      numberOffsetY,
      stage,
      stageCtx,
      stageWidth = window.innerWidth,
      stageHeight = window.innerHeight,
      renderFrom = 0,
      renderTimer = 1000,
      // renderTimer = 100,
      renderRunning = true,
      breakTimer = 1000,
      // breakTimer = 100,
      totalDotsCount = 800,
      dots = [],
      circleRadius = 2,
      colors = [
        '61, 207, 236',
        '255, 244, 174',
        '255, 211, 218',
        '151, 211, 226',
      ],
      mostTagCount = 3

    /*
Desc: Init canvases & Number text
*/
    function init() {
      initReleases()

      // Init Stage which will have dots
      stage = document.getElementById('canvas-dots')
      stageCtx = stage.getContext('2d')
      stage.width = stageWidth
      stage.height = stageHeight

      // Create offset so text appears in middle of screen
      numberOffsetX = (stageWidth - tagWidth) / 2
      numberOffsetY = (stageHeight - tagHeight) / 2
    }

    init()

    function initReleases() {
      function initRelease(index) {
        // Init stage which will have tags
        // Set the canvas to width and height of the window
        const tagElement = document.querySelector(`#canvas-tag-${index}`)
        const versionElement = document.querySelector(`#canvas-version-${index}`)
        tagElement.width = tagWidth // May be I can use tag char count to set every release of width here
        tagElement.height = tagHeight
        versionElement.width = versionWidth // May be I can use tag char count to set every release of width here
        versionElement.height = versionHeight
      }
      releases.forEach((release, index) => {
        initRelease(index)
      })
    }

    /*
Desc: Dot object
*/
    function Dot(x, y, color, alpha) {
      var _this = this

      _this.x = x
      _this.y = y
      _this.color = color
      _this.alpha = alpha

      this.draw = function () {
        stageCtx.beginPath()
        stageCtx.arc(_this.x, _this.y, circleRadius, 0, 2 * Math.PI, false)
        stageCtx.fillStyle = 'rgba(' + _this.color + ', ' + _this.alpha + ')'
        stageCtx.fill()
      }
    }

    /*
Desc: Create a certain amount of dots
*/
    for (var i = 0; i < totalDotsCount; i++) {
      // Create a dot
      var dot = new Dot(
        randomNumber(0, stageWidth),
        randomNumber(0, stageHeight),
        colors[randomNumber(1, colors.length)],
        0.3
      )

      // Push to into an array of dots
      dots.push(dot)

      // Animate dots
      tweenDots(dot, '', 'space')
    }

    /*
Desc: render
*/
    function render() {
      // Send number to be drawn
      tagCtx = document
        .querySelector(`#canvas-tag-${renderFrom}`)
        .getContext('2d')
      versionCtx = document
        .querySelector(`#canvas-version-${renderFrom}`)
        .getContext('2d')
      drawTag(releases[renderFrom].tag.toString())
      drawVersion(releases[renderFrom].version.toString())
      console.log('dots', dots.length, releases[renderFrom].tagDots, releases[renderFrom].versionDots.length)

      // When we hit zero stop render
      if (renderFrom + 1 === releases.length) {
        renderRunning = false
        // Now that renders finised show the text Go
      }

      // Decrement number down
      console.log('renderForm', renderFrom)
      renderFrom++
    }
    render()

    /*
Desc: Redraw loops
*/
    function loop() {
      stageCtx.clearRect(0, 0, stageWidth, stageHeight)

      for (var i = 0; i < dots.length; i++) {
        dots[i].draw(stageCtx)
      }

      requestAnimationFrame(loop)
    }

    loop()

    /*
Desc: Draw number
*/
    function drawTag(num) {
      // Create a number on a seperate canvas
      // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

      //	Clear stage of previous tags
      tagCtx.clearRect(0, 0, tagWidth, tagHeight)

      tagCtx.fillStyle = '#24282f'
      tagCtx.textAlign = 'left'
      tagCtx.font = 'bold 88px Lato'
      tagCtx.fillText(
        num,
        100,
        ((tagHeight - 200) / mostTagCount) * ((renderFrom % 3) + 1)
      )

      var ctx = document
        .querySelector(`#canvas-tag-${renderFrom}`)
        .getContext('2d')

      // getImageData(x, y, width, height)
      // note: is an exspenisve function, so make sure canvas is small as possible for what you grab
      // Returns 1 Dimensional array of pixel color value chanels
      // Red, blue, green, alpha chanel of single pixel
      // First chanel is red
      var imageData = ctx.getImageData(0, 0, tagWidth, tagHeight).data

      // Clear number coordinated
      releases[renderFrom].tagDots = []

      // i is equal to total image data(eg: 480,000)
      // run while i is greater or equal to 0
      // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels
      for (var i = imageData.length; i >= 0; i -= 4) {
        // If not an empty pixel
        if (imageData[i] !== 0) {
          // i represents the position in the array a red pixel was found

          // (i / 4 ) and percentage by width of canvas
          // Need to divide i by 4 because it has 4 values and you need its orginal position
          // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
          var x = (i / 4) % tagWidth

          // (i divide by width) then divide by 4
          // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
          var y = Math.floor(Math.floor(i / tagWidth) / 4)

          // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
          if (
            x &&
            x % (circleRadius * 2 + 3) === 0 &&
            (y && y % (circleRadius * 2 + 3) === 0)
          ) {
            // Push object to numberPixels array with x and y coordinates
            releases[renderFrom].tagDots.push({ x: x, y: y })
          }
        }
      }

      formNumber('tagDots')
    }

    function drawVersion(num) {
      // Create a number on a seperate canvas
      // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

      //	Clear stage of previous versions
      versionCtx.clearRect(0, 0, versionWidth, versionHeight)

      versionCtx.fillStyle = '#24282f'
      versionCtx.textAlign = 'left'
      versionCtx.font = 'bold 68px Lato'
      versionCtx.fillText(
        num,
        100,
        ((versionHeight - 200) / mostTagCount) * ((renderFrom % 3) + 1) + 80
      )

      var ctx = document
        .querySelector(`#canvas-version-${renderFrom}`)
        .getContext('2d')

      // getImageData(x, y, width, height)
      // note: is an exspenisve function, so make sure canvas is small as possible for what you grab
      // Returns 1 Dimensional array of pixel color value chanels
      // Red, blue, green, alpha chanel of single pixel
      // First chanel is red
      var imageData = ctx.getImageData(0, 0, versionWidth, versionHeight).data

      // Clear number coordinated
      releases[renderFrom].versionDots = []

      // i is equal to total image data(eg: 480,000)
      // run while i is greater or equal to 0
      // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels
      for (var i = imageData.length; i >= 0; i -= 4) {
        // If not an empty pixel
        if (imageData[i] !== 0) {
          // i represents the position in the array a red pixel was found

          // (i / 4 ) and percentage by width of canvas
          // Need to divide i by 4 because it has 4 values and you need its orginal position
          // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
          var x = (i / 4) % tagWidth

          // (i divide by width) then divide by 4
          // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
          var y = Math.floor(Math.floor(i / tagWidth) / 4)

          // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
          if (
            x &&
            x % (circleRadius * 2 + 3) === 0 &&
            (y && y % (circleRadius * 2 + 3) === 0)
          ) {
            // Push object to numberPixels array with x and y coordinates
            releases[renderFrom].versionDots.push({ x: x, y: y })
          }
        }
      }

      formNumber('versionDots')
    }

    function getRenderTimer() {
      // const tag = releases[renderFrom].tag
      // const version = releases[renderFrom].version

      // return tag === version ? 2500 : renderTimer
      return renderTimer // 出现几个就break一次值需要renderTimer即可
    }
    /*
Desc: Form number
*/
    function formNumber(type) {
      for (
        var i = 0;
        i < releases[renderFrom][type].length;
        i++
      ) {
        // Loop out as many coordionates as we need & pass dots in to animate
        tweenDots(dots[i], releases[renderFrom][type][i], '')
      }

      // Break number apart
      if (renderRunning && renderFrom + 1 !== releases.length) {
        setTimeout(function () {
          console.log('render', type)
          if (renderFrom % 3 === 0) {
            setTimeout(() => {
              breakRelease(type)
            }, renderTimer + 500)
          } else if (type === 'versionDots') {
            render()
          }
        }, getRenderTimer())
      }
    }

    function breakRelease(type) {
      for (var i = dots.length - 1; i >= totalDotsCount; i--) {
        tweenDots(dots[i], '', 'empty', i)
      }

      if (renderRunning && type === 'versionDots') {
        // Build next number
        setTimeout(function () {
          render()
        }, breakTimer)
      }
    }

    /*
Desc: Animate dots
*/
    function tweenDots(dot, pos, type, index) {
      // Move dots around canvas randomly
      if (type === 'space') {
        // Tween dot to coordinate to form number
        TweenMax.to(dot, 3 + Math.round(Math.random() * 100) / 100, {
          x: randomNumber(0, stageWidth),
          y: randomNumber(0, stageHeight),
          alpha: 0.3,
          ease: Sine.easeOut,
          onComplete: function () {
            tweenDots(dot, '', 'space')
          },
        })
      } else if (type === 'empty') {
        TweenMax.to(dot, 1, {
          x: randomNumber(0, stageWidth),
          y: randomNumber(0, stageHeight),
          alpha: 0,
          ease: Sine.easeOut,
          onComplete: function () {
            dots.splice(index, 1)
          },
        })
      } else {
        // Tween dot to coordinate to form number
        // const newDot = { ...dot }
        // dots.push()
        var newDot = new Dot(
          randomNumber(0, stageWidth),
          randomNumber(0, stageHeight),
          colors[randomNumber(1, colors.length)],
          0.3
        )

        // Push to into an array of dots
        dots.push(newDot)
        TweenMax.to(newDot, 1 + Math.round(Math.random() * 100) / 100, {
          x: pos.x + numberOffsetX,
          y: pos.y + numberOffsetY,
          delay: 0,
          alpha: 1,
          ease: Power2.easeInOut,
          onComplete: function () { },
        })
      }
    }

    /*
Desc: Get a random number
*/
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
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
