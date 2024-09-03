export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function getTimeOfSent(time) {
  if (!time) return ''
  const date = new Date(time)
  const today = new Date()

  const options = { month: 'short', day: 'numeric' }
  let hours = date.getHours()
  const minutes = date.getMinutes()

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12'

  const minutesStr = minutes < 10 ? '0' + minutes : minutes

  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  const isSameYear = date.getFullYear() === today.getFullYear()

  if (isSameDay) {
    return hours + ':' + minutesStr + ' ' + ampm
  } else if (!isSameYear) {
    // Format date as dd/mm/yyyy if not from the current year
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day < 10 ? '0' : ''}${day}/${
      month < 10 ? '0' : ''
    }${month}/${year}`
  } else {
    // Format date as "MMM dd" for dates from the current year but not today
    return date.toLocaleDateString('en-US', options)
  }
}

export function adjustBrightnessAndSaturation(hex, brightnessFactor = 1.2, saturationFactor = 1.2) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Increase brightness
  r = Math.min(255, r * brightnessFactor);
  g = Math.min(255, g * brightnessFactor);
  b = Math.min(255, b * brightnessFactor);

  // Convert RGB to HSL for saturation adjustment
  let hsl = rgbToHsl(r, g, b);
  hsl[1] *= saturationFactor; // Increase saturation
  const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

  // Return adjusted color in rgba
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`; // Keeping full opacity for now
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
      h = s = 0; // achromatic
  } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h, s, l];
}

// HSL to RGB conversion
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
      r = g = b = l; // achromatic
  } else {
      const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
