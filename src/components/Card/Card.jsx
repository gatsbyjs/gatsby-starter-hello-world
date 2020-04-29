import React, { useState, useEffect } from "react"
import { css } from "emotion"
import axios from "axios"
import oval from "../../images/oval.svg"

const Card = () => {
  const [loading, setLoading] = useState(true)
  const [joke, setJoke] = useState("")
  const [fetch, setFetch] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios(
        "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/general"
      )
      // console.log(result)
      setJoke(`${result.data[0].setup} ${result.data[0].punchline}`)
      setLoading(false)
    }
    fetchData()
  }, [fetch])

  return (
    <div
      className={css`
        padding: 10%;
        width: 75vw;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        box-shadow: -20px 20px 0px rgba(255, 255, 255, 0.4);

        h1 {
          color: #5f6c7b;
          text-align: center;
          margin-bottom: 60px;
        }

        p {
          cursor: pointer;
          padding: 20px 30px;
          background-color: #ef4565;
          border-radius: 10px;
          color: #fff;
          box-shadow: 0px 0px 0px rgba(239, 69, 101, 0.4);
          transition: all 0.3s ease;
        }

        p:hover {
          box-shadow: -5px 5px 0px rgba(239, 69, 101, 0.4);
          transform: translateY(-5px);
        }
      `}
    >
      {loading ? (
        <img
          className={css`
            margin: 40px;
          `}
          src={oval}
          alt="loader"
        />
      ) : (
        <h1>{joke}</h1>
      )}
      <p onClick={() => setFetch(!fetch)}>Another One!</p>
    </div>
  )
}

export default Card
