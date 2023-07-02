import debug from 'debug'

const log = debug('@sequencemedia/sequencemedia')

log('`sequencemedia` is awake')

const {
  $ = function jQuery () {
    log('`jQuery` is not available')
  }
} = window

function getPage () {
  const {
    location: {
      href
    } = {}
  } = window

  return href
}

function goTo (href) {
  const {
    location = {}
  } = window

  if (location.href !== href) location.href = href
}

const getHref = ({ currentTarget }) => $(currentTarget).attr('href')

function handleClick (e) {
  log('🚀')

  const {
    gtag
  } = window

  if (gtag) {
    const href = getHref(e)

    if (href.startsWith('mailto')) {
      gtag('event', 'click', {
        on: getPage(),
        to: href
      })
    } else {
      e.preventDefault()

      gtag('event', 'click', {
        from: getPage(),
        to: href,
        event_callback () {
          log('👍')

          goTo(href)
        },
        event_timeout: 500
      })
    }
  }
}

function handleDOMContentLoaded () {
  $('section a')
    .on('click', handleClick)
}

$(handleDOMContentLoaded)
