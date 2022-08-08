///////////////////////////////////////////////////
///////////////////////////////////////////////////
// *** CUSTOM CURSOR by Adrián Gubrica, v1.0 *** //
///////////////////////////////////////////////////
///////////////////////////////////////////////////

/////////////// Variables /////////////////

// ---> selectorOuter [string] - Selector & Container for the cursor div, that is being moved
// ---> selectorInner [string] - Holds the shape, color and size of the cursor, and should be centered inside selectorOuter. Also, hover classes are applied on it.
// ---> ease [int or float] - Amount of ease on cursor movement. Also affects the stickyAmount a little.
// ---> sticky [bool] = If true, stickiness is turned on.
// ---> stickyAmount [int or float] = Amount of force, that holds the cursor in the centre of the hovered object.
// ---> hoverClass [string] = Class, that is added to the selectorInner on hover.

export default class CustomCursor {
  constructor(_options) {
    // Selector
    this.selectorOuter = document.querySelector(_options.selectorOuter)
    this.selectorInner = document.querySelector(_options.selectorInner)

    // ---> Do not display until mousemove
    this.selectorOuter.style.display = 'none'

    // Settings
    this.ease = _options.ease
    this.sticky = _options.sticky
    this.stickyAmount = _options.stickyAmount
    this.hoverClass = _options.hoverClass

    // Flags
    this.flagSticky = false

    // Emptys
    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.mousemovement = {
      x: 0,
      y: 0,
    }

    this.hoverPosition = {
      x: 0,
      y: 0,
    }

    // Init
    if (this.selectorOuter) {
      this.getMousePosition()

      this.animate()
    }
  }

  getHoverItems() {
    this.hoverItems = document.querySelectorAll('[data-cursor="hover"]')

    this.hoverItems.forEach((_item) => {
      // ---> Add
      _item.addEventListener('mouseenter', () => {
        this.selectorInner.classList.add(this.hoverClass)
        if (this.sticky) {
          this.flagSticky = true

          this.hoverPosition = {
            x: _item.getBoundingClientRect().x + _item.getBoundingClientRect().width / 2,
            y: _item.getBoundingClientRect().y + _item.getBoundingClientRect().height / 2,
          }
        }
      })

      // ---> Remvoe
      _item.addEventListener('mouseleave', () => {
        this.selectorInner.classList.remove(this.hoverClass)
        if (this.sticky) {
          this.flagSticky = false
        }
      })
    })
  }

  getMousePosition() {
    window.addEventListener('mousemove', (_e) => {
      this.selectorOuter.style.display = 'block'

      this.mousemovement = {
        x: _e.pageX,
        y: _e.pageY,
      }
    })
  }

  animate() {
    if (!this.flagSticky) {
      this.cursorPosition.x -= (this.cursorPosition.x - this.mousemovement.x) * this.ease
      this.cursorPosition.y -= (this.cursorPosition.y - this.mousemovement.y) * this.ease
    } else {
      this.cursorPosition.x -= ((this.cursorPosition.x - this.hoverPosition.x) * this.ease + (this.cursorPosition.x - this.mousemovement.x) * this.ease) / this.stickyAmount
      this.cursorPosition.y -= ((this.cursorPosition.y - this.hoverPosition.y) * this.ease + (this.cursorPosition.y - this.mousemovement.y) * this.ease) / this.stickyAmount
    }

    this.selectorOuter.style.left = `${this.cursorPosition.x}px`
    this.selectorOuter.style.top = `${this.cursorPosition.y}px`

    window.requestAnimationFrame(this.animate.bind(this))
  }
}
