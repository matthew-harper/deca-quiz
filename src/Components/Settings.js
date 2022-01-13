import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FetchButton from './FetchButton'

function Settings() {
  const [options, setOptions] = useState(null)

  const loading = useSelector((state) => state.options.loading)

  const questionCategory = useSelector(
    (state) => state.options.question_category
  )
  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  )
  const questionType = useSelector((state) => state.options.question_type)
  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`

    const handleLoadingChange = (value) => {
      dispatch({
        type: 'CHANGE_LOADING',
        loading: value,
      })
    }

    handleLoadingChange(true)

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false)
        setOptions(response.trivia_categories)
      })
  }, [setOptions, dispatch])

  const handleCategoryChange = (event) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      question_category: event.target.value,
    })
  }

  const handleDifficultyChange = (event) => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      question_difficulty: event.target.value,
    })
  }

  const handleTypeChange = (event) => {
    dispatch({
      type: 'CHANGE_TYPE',
      question_type: event.target.value,
    })
  }

  const handleAmountChange = (event) => {
    dispatch({
      type: 'CHANGE_AMOUNT',
      amount_of_questions: event.target.value,
    })
  }

  if (!loading) {
    return (
      <div>
        <h1>Quiz App</h1>
        <div>
          <h2>Amount of Questions:</h2>
          <input value={questionAmount} onChange={handleAmountChange} />
        </div>

        <FetchButton text="Get started!" />
      </div>
    )
  }

  return <p>LOADING...</p>
}
export default Settings
