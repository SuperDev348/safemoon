const isUpperCase = char => char.charCodeAt(0) >= 65 && char.charCodeAt(0)<= 90
const isLowerCase = char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122
export const toTitlecase = (string) => {
  return string.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }).join(' ')
}

export const toAlternate = (string) => {
  let res = '';
  [...string].forEach((item, index) => {
    if(index%2 === 1) {
      res += item.toUpperCase()
    }
    else
      res += item.toLowerCase()
  })
  return res
}

export const toInversecase = (string) => {
  let res = ''
  const margin = 32;
  [...string].forEach((item) => {
    if(isLowerCase(item)){
        res += String.fromCharCode(item.charCodeAt(0) - margin);
    }else if(isUpperCase(item)){
        res += String.fromCharCode(item.charCodeAt(0) + margin);
    }else{
        res += item;
    }
  })
  return res;
}

export const copyText = (string) => {
  navigator.clipboard.writeText(string)
    .then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
}

export const downloadText = (filename, text) => {
  var blob = new Blob([text], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

export const stringToRegex = (str) => {
  try {
    // Main regex
    const main = str.match(/\/(.+)\/.*/)[1]
    
    // Regex options
    const options = str.match(/\/.+\/(.*)/)[1]
    
    // Compiled regex
    return new RegExp(main, options)
  } catch(e) {
    return null
  }
}

export const isJsonString = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const isNumeric = (str) => {
  return !isNaN(str)
}

const cronValid = (str, from, to) => {
  let res = true
  if (str == '*')
    return res;
  if (str == '' || str == null || str == undefined)
    return false
  str.split(',').forEach((item) => {
    if (!isNumeric(item))
      res = false
    else {
      const num = parseInt(item)
      if (num < from || num > to)
        res = false
    }
  })
  return res
}

export const getCron = (str) => {
  const [minute, hour, dayMonth, month, dayWeek, other] = str.split(' ')
  // validate
  const validMinute = cronValid(minute, 0, 59)
  const validHour = cronValid(hour, 0, 23)
  const validDayMonth = cronValid(dayMonth, 1, 30)
  const validMonth = cronValid(month, 1, 12)
  const validDayWeek = cronValid(dayWeek, 1, 7)
  let error = {
    minute: !validMinute,
    hour: !validHour,
    dayMonth: !validDayMonth,
    month: !validMonth,
    dayWeek: !validDayWeek
  }
  const weekString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December']
  let string = ''
  if (validMinute && validHour && validDayMonth && validMonth && validDayWeek) {
    if (minute == '*')
      string += 'At every minute'
    else
      string += 'At minute ' + minute
    if (hour != '*')
      string += ' past hour ' + hour
    if (dayMonth != '*')
      string += ' on day-of-month ' + dayMonth
    if (dayWeek != '*')
      string += ' and on ' + weekString[dayWeek - 1]
    if (month != '*')
      string += ' in ' + monthString[month - 1] + '.'
  }
  return {string, error}
}

export const displayNumber = (value) => {
  return value.toLocaleString()
}