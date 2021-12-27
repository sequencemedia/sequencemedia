import debug from 'debug'

const log = debug('@sequencemedia/sequencemedia')

log('`sequencemedia` is awake')

const {
  $ = function jQuery () {
    log('`jQuery` is not available')
  }
} = global

function goFrom () {
  const {
    location: {
      href
    } = {}
  } = global

  return href
}

function goTo (href) {
  const {
    location = {}
  } = global

  location.href = href
}

const getHref = ({ currentTarget }) => $(currentTarget).attr('href')

function handleClick (e) {
  log('✔')

  const {
    ga
  } = global

  if (ga) {
    e.preventDefault()

    const href = getHref(e)

    ga('send', 'event', 'Click', goFrom(), href, {
      hitCallback () {
        log('❤')

        return goTo(href)
      }
    })
  }
}

function handleDOMContentLoaded () {
  const anchors = $('section a')

  return (
    anchors.on('click', handleClick)
  )
}

$(handleDOMContentLoaded)
