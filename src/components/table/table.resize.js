import {$} from '@core/dom'

export function resizeHandler($root, e) {
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.$el.dataset.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = (event) => {
    if (type === 'col') {
      const delta = event.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else if (type === 'row') {
      const delta = event.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = value + 'px'))
    } else if (type === 'row') {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })

    document.onmousemove = null
    document.onmouseup = null
  }
}
