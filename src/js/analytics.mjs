import debug from 'debug'
import $ from 'jquery'

const log = debug('@sequencemedia/sequencemedia')

log('`sequencemedia` is awake')

const getLinkHref = ({ currentTarget }) => $(currentTarget).attr('href')

function getLocationHref () {
  const {
    location: {
      href
    } = {}
  } = window

  return href
}

function goTo (href) {
  if (getLocationHref() !== href) {
    const {
      location = {}
    } = window

    location.href = href
  }
}

function handleLinkClick (e) {
  log('🚀')

  const {
    gtag
  } = window

  if (gtag) {
    const href = getLinkHref(e)

    if (href.startsWith('mailto')) {
      gtag('event', 'email_link_click', {
        on: getLocationHref(),
        to: href
      })
    } else {
      e.preventDefault()

      const timeout = setTimeout(function handleTimeout () {
        log('😬')

        goTo(href)
      }, 175)

      gtag('event', 'link_click', {
        from: getLocationHref(),
        to: href,
        event_callback () {
          clearTimeout(timeout)

          log('👍')

          goTo(href)
        },
        event_timeout: 125
      })
    }
  }
}

function handleDOMContentLoaded () {
  $('section a')
    .on('click', handleLinkClick)
}

$(handleDOMContentLoaded)
