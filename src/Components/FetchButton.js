import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function FetchButton(props) {
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
  const questionIndex = useSelector((state) => state.index)

  const dispatch = useDispatch()

  const setLoading = (value) => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value,
    })
  }

  const setQuestions = (value) => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value,
    })
  }

  const handleQuery = async () => {
    //let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`
    let apiUrl = `http://ec2co-ecsel-2ywowx2i6mv7-1312890108.us-east-1.elb.amazonaws.com/quiz`

    //let apiUrl = `https://localhost:49155/Quiz`

    
    if (questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`)
    }

    setLoading(true)

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.questions)
        setLoading(false)
      })

    if (questionIndex > 0) {
      dispatch({
        type: 'SET_INDEX',
        index: 0,
      })

      dispatch({
        type: 'SET_SCORE',
        score: 0,
      })
    }
  }

  return <button onClick={handleQuery}>{props.text}</button>
}
export default FetchButton
