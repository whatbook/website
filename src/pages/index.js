import React, { Component } from 'react'
import { TweenMax, Power2, TimelineLite, Bounce, Sine } from 'gsap/TweenMax'

export default class IndexPage extends Component {
  componentDidMount() {
    /*
Desc: Define inital variables
*/
    var tag,
      tagCtx,
      tagWidth = window.innerWidth,
      tagHeight = window.innerHeight,
      numberOffsetX,
      numberOffsetY,
      stage,
      stageCtx,
      stageWidth = window.innerWidth,
      stageHeight = window.innerHeight,
      stageCenterX = stageWidth / 2,
      stageCenterY = stageHeight / 2,
      renderFrom = 0,
      renderTimer = 4000,
      renderRunning = true,
      breakTimer = 1000,
      number,
      dots = [],
      numberPixelCoordinates,
      circleRadius = 2,
      colors = [
        '61, 207, 236',
        '255, 244, 174',
        '255, 211, 218',
        '151, 211, 226',
      ]
    var releases = [
      {
        tag: '2018-4-26今天我们上线啦！',
        version: '1.0.0',
      },
      {
        tag: '修复一个小问题',
        version: '1.0.1',
      },
      {
        tag: '1.1.0 你没有用过的船新版本',
        version: '1.1.0',
      },
      {
        tag: '修复问题',
        version: '1.1.1',
      },
      {
        tag: '增加临时的图片旋转解决方案',
        version: '1.1.2',
      },
      {
        tag: '优化图片预览是显示图片速度',
        version: '1.1.3',
      },
      {
        tag: '1.2.0',
        version: '1.2.0',
      },
      {
        tag: '1.2.1',
        version: '1.2.1',
      },
      {
        tag: '1.2.2',
        version: '1.2.2',
      },
      {
        tag: '1.2.3',
        version: '1.2.3',
      },
      {
        tag: '1.2.4',
        version: '1.2.4',
      },
      {
        tag: '1.3.0',
        version: '1.3.0',
      },
      {
        tag: '1.3.1',
        version: '1.3.1',
      },
      {
        tag: '修复第一次编辑简要病史保存后不收起不回显的问题',
        version: '1.3.2',
      },
      {
        tag: '1.3.3',
        version: '1.3.3',
      },
      {
        tag: '抓紧！2.0发车了！',
        version: '2.0.0',
      },
      {
        tag: '2.1.0',
        version: '2.1.0',
      },
      {
        tag: '2.2.0',
        version: '2.2.0',
      },
      {
        tag: '2.2.1',
        version: '2.2.1',
      },
      {
        tag: '2.2.2',
        version: '2.2.2',
      },
      {
        tag: '2.2.3',
        version: '2.2.3',
      },
      {
        tag: '2.2.4',
        version: '2.2.4',
      },
      {
        tag: '2.3.0',
        version: '2.3.0',
      },
      {
        tag: '湘雅-2.4.0',
        version: '2.4.0',
      },
      {
        tag: '2.4.1',
        version: '2.4.1',
      },
      {
        tag: '2.5.0',
        version: '2.5.0',
      },
      {
        tag: '2.6.0',
        version: '2.6.0',
      },
      {
        tag: '2.7.0',
        version: '2.7.0',
      },
      {
        tag: '2.8.0',
        version: '2.8.0',
      },
      {
        tag: '2.8.1',
        version: '2.8.1',
      },
      {
        tag: '2.9.0',
        version: '2.9.0',
      },
      {
        tag: '2.9.1',
        version: '2.9.1',
      },
      {
        tag: '2.9.2',
        version: '2.9.2',
      },
      {
        tag: '2.9.3',
        version: '2.9.3',
      },
      {
        tag: '2.10.0',
        version: '2.10.0',
      },
      {
        tag: '2.11.0',
        version: '2.11.0',
      },
      {
        tag: '2.11.1',
        version: '2.11.1',
      },
      {
        tag: '2.11.2',
        version: '2.11.2',
      },
      {
        tag: 'Feture',
        version: 'xx.xx.xx',
      },
    ]

    /*
Desc: Init canvases & Number text
*/
    function init() {
      // Init stage which will have tags
      tag = document.getElementById('canvas-tag')
      tagCtx = tag.getContext('2d')
      // Set the canvas to width and height of the window
      tag.width = tagWidth
      tag.height = tagHeight

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

    /*
Desc: Dot object
*/
    function Dot(x, y, color, alpha) {
      var _this = this

      _this.x = x
      _this.y = y
      _this.color = color
      _this.alpha = alpha

      this.draw = function() {
        stageCtx.beginPath()
        stageCtx.arc(_this.x, _this.y, circleRadius, 0, 2 * Math.PI, false)
        stageCtx.fillStyle = 'rgba(' + _this.color + ', ' + _this.alpha + ')'
        stageCtx.fill()
      }
    }

    /*
Desc: Create a certain amount of dots
*/
    for (var i = 0; i < 2240; i++) {
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
      drawTag(releases[renderFrom].tag.toString())

      // When we hit zero stop render
      if (renderFrom + 1 === releases.length) {
        renderRunning = false
        // Now that renders finised show the text Go
      }

      // Decrement number down
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
      tagCtx.fillText(num, 600, 400)

      var ctx = document.getElementById('canvas-tag').getContext('2d')

      // getImageData(x, y, width, height)
      // note: is an exspenisve function, so make sure canvas is small as possible for what you grab
      // Returns 1 Dimensional array of pixel color value chanels
      // Red, blue, green, alpha chanel of single pixel
      // First chanel is red
      var imageData = ctx.getImageData(0, 0, tagWidth, tagHeight).data

      // Clear number coordinated
      numberPixelCoordinates = []

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
            x % (circleRadius * 2 + 3) == 0 &&
            (y && y % (circleRadius * 2 + 3) == 0)
          ) {
            // Push object to numberPixels array with x and y coordinates
            numberPixelCoordinates.push({ x: x, y: y })
          }
        }
      }

      formNumber()
    }

    function getRenderTimer() {
      const tag = releases[renderFrom].tag
      const version = releases[renderFrom].version

      return tag === version ? 2500 : renderTimer
    }
    /*
Desc: Form number
*/
    function formNumber() {
      for (var i = 0; i < numberPixelCoordinates.length; i++) {
        // Loop out as many coordionates as we need & pass dots in to animate
        tweenDots(dots[i], numberPixelCoordinates[i], '')
      }

      // Break number apart
      if (renderRunning && renderFrom + 1 !== releases.length) {
        setTimeout(function() {
          breakNumber()
        }, getRenderTimer())
      }
    }

    function breakNumber() {
      for (var i = 0; i < numberPixelCoordinates.length; i++) {
        tweenDots(dots[i], '', 'space')
      }

      if (renderRunning) {
        // Build next number
        setTimeout(function() {
          render()
        }, breakTimer)
      }
    }

    /*
Desc: Animate dots
*/
    function tweenDots(dot, pos, type) {
      // Move dots around canvas randomly
      if (type === 'space') {
        // Tween dot to coordinate to form number
        TweenMax.to(dot, 3 + Math.round(Math.random() * 100) / 100, {
          x: randomNumber(0, stageWidth),
          y: randomNumber(0, stageHeight),
          alpha: 0.3,
          ease: Sine.easeOut,
          onComplete: function() {
            tweenDots(dot, '', 'space')
          },
        })
      } else {
        // Tween dot to coordinate to form number
        TweenMax.to(dot, 1.5 + Math.round(Math.random() * 100) / 100, {
          x: pos.x + numberOffsetX,
          y: pos.y + numberOffsetY,
          delay: 0,
          alpha: 1,
          ease: Bounce.easeInOut,
          onComplete: function() {},
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
      <div>
        <canvas id="canvas-tag" />
        <canvas id="canvas-version" />
        <canvas id="canvas-dots" />
      </div>
    )
  }
}
