import { useState, useEffect } from 'react'
import axios from 'axios'

const useFlip = (initialState = true) => {
  const [isFlipped, setFlipped] = useState(initialState)

  const flip = () => {
    setFlipped(isFaceUp => !isFaceUp)
  }

  return [isFlipped, flip]
}

const useAxios = (keyFromLS, baseURL) => {
  const [responses, setRes] = useLocalStorage(keyFromLS)

  const resData = async (format = data => data, remainingUrl = '') => {
    const res = await axios.get(`${baseURL}${remainingUrl}`)
    setRes(data => [...data, format(res.data)])
  }

  const clearCards = () => {
    setRes([])
  }

  return [responses, resData, clearCards]
}

const useLocalStorage = (key, initialValue = []) => {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key))
  }

  const [val, setVal] = useState(initialValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [val, key])

  return [val, setVal]
}

export default useLocalStorage

export { useFlip, useAxios, useLocalStorage }
