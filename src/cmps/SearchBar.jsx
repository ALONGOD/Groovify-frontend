import { useState, useCallback, useEffect, useRef } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/actions/station.actions.js'
import { useNavigate } from 'react-router-dom'
import { FaMicrophone } from 'react-icons/fa'

export function SearchBar({
  searchType = 'youtube',
  placeholder = 'What do you want to play?',
  onSearch = {},
}) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()
  const searchBarRef = useRef(null)
  const recognitionRef = useRef(null) // Ref for speech recognition


  function debounce(func, delay) {
    let timer
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const handleSearch = useCallback(
    debounce(async query => {
      if (!query) {
        if (searchType === 'station') {
          dispatch(setSearchTerm('')) // Reset the search term if the query is empty
        }
        return
      }

      if (searchType === 'youtube') {
        navigate(`/search/${query}`)
      } else if (searchType === 'station') {
        console.log('Dispatching search term:', query)
        dispatch(setSearchTerm(query))
      } else if (searchType === 'youtube-inline') {
        onSearch(query)
      }
    }, 800),
    [dispatch, searchType]
  )
  // const handleSearch = useCallback(
  //     debounce(async (query) => {
  //         if (!query) {
  //             if (searchType === 'station') {
  //                 dispatch(setSearchTerm('')); // Reset the search term if the query is empty
  //             }
  //             return;
  //         }

  //         if (searchType === 'youtube') {
  //             try {
  //                 const results = await YouTubeAPIService.searchVideos(query);
  //                 dispatch(setSearchResults(results));
  //             } catch (error) {
  //                 console.error('Error fetching YouTube API:', error);
  //             }
  //         } else if (searchType === 'station') {
  //             console.log('Dispatching search term:', query);
  //             dispatch(setSearchTerm(query));
  //         }
  //     }, 800),
  //     [dispatch, searchType]
  // );

  const handleChange = event => {
    const value = event.target.value
    setSearchParams(value)
    return handleSearch(value)
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleClickOutside = event => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported by your browser.')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript
      setSearchParams(transcript)
      handleSearch(transcript)
    }

    recognition.onerror = event => {
      console.error('Speech recognition error:', event.error)
    }

    recognitionRef.current = recognition
    recognition.start()
  }
  return (
    <div
      ref={searchBarRef}
      className={`search-bar ${isExpanded ? 'expanded' : ''}`}
      onClick={handleExpand}
    >
      <FaMagnifyingGlass />
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        value={searchParams}
        onChange={handleChange}
        className={isExpanded ? 'visible' : ''}
      />
      <div
        className="speech-recognition-icon"
        onClick={startSpeechRecognition}
        title="Click to use voice search"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <FaMicrophone />
      </div>
    </div>
  )
}
