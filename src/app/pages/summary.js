import React, { Component } from 'react'
import { TweenMax, Power2, Sine } from 'gsap/TweenMax'

export default class Summary extends Component {
  constructor(props) {
    super(props)

    
  }
  componentDidMount() {
    /*
Desc: Define inital variables
*/
    var
      tagCtx,
      tagWidth = window.innerWidth,
      tagHeight = window.innerHeight,
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
      initTags()

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

    function initTags() {
      function initTag(tagElement) {
        // Init stage which will have tags
        // Set the canvas to width and height of the window
        tagElement.width = tagWidth // May be I can use tag char count to set every release of width here
        tagElement.height = tagHeight
      }
      releases.forEach((release, index) => {
        // const tagElement = createTagElement(index)
        initTag(document.querySelector(`#canvas-tag-${index}`))
      })
      // initTag(document.querySelector(`#canvas-tag-${renderFrom}`))
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
      releases[renderFrom].numberPixelCoordinates = []

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
            releases[renderFrom].numberPixelCoordinates.push({ x: x, y: y })
          }
        }
      }

      formNumber()
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
    function formNumber() {
      for (
        var i = 0;
        i < releases[renderFrom].numberPixelCoordinates.length;
        i++
      ) {
        // Loop out as many coordionates as we need & pass dots in to animate
        tweenDots(dots[i], releases[renderFrom].numberPixelCoordinates[i], '')
      }

      // Break number apart
      if (renderRunning && renderFrom + 1 !== releases.length) {
        setTimeout(function() {
          if (renderFrom % 3 === 0) {
            setTimeout(() => {
              breakTag()
            }, renderTimer + 500)
          } else {
            render()
          }
        }, getRenderTimer())
      }
    }

    function breakTag() {
      for (var i = dots.length - 1; i >= totalDotsCount; i--) {
        tweenDots(dots[i], '', 'empty')
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
      } else if (type === 'empty') {
        TweenMax.to(dot, 0.5 + Math.round(Math.random() * 100) / 100, {
          x: randomNumber(0, stageWidth),
          y: randomNumber(0, stageHeight),
          alpha: 0,
          ease: Sine.easeOut,
          onComplete: function() {
            // dots.pop()
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
        <canvas id="canvas-version" />
        <canvas id="canvas-dots" />
      </div>
    )
  }
}
