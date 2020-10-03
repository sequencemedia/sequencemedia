import debug from 'debug'

const log = debug('@sequencemedia/sequencemedia')

log('`sequencemedia` is awake')

const {
  $
} = global

function goFrom (url) {
  const {
    location: { href } = {}
  } = global

  return href
}

function goTo (url) {
  const {
    location = {}
  } = global

  location.href = url
}

const getUrl = ({ currentTarget }) => $(currentTarget).attr('href')

function handleClick (e) {
  log('✔')

  const {
    ga
  } = global

  if (ga) {
    e.preventDefault()

    const url = getUrl(e)

    ga('send', 'event', 'Click', goFrom(), url, {
      hitCallback () {
        return goTo(url)
      }
    })
  }
}

$(() => {
  const anchors = $('section a')

  return (
    anchors.on('click', handleClick)
  )
})
