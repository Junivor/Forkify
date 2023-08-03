import { TIME_OUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  })
}

export const AJAX = async (url, uploadData = null) => {
  try {
    const fetchData =  uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData)
        })
      : fetch(`${url}`)
    console.log(fetchData);
    const res = await Promise.race([timeout(TIME_OUT_SEC), fetchData])
    const data = await res.json()

    if (!res.ok) throw new Error(`${data.message}(${res.status})`)
    return data
  } catch (err) {
    throw err
  }
}