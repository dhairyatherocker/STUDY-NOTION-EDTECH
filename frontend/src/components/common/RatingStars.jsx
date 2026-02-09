import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  })

  useEffect(() => {
    try {
      // Convert to number and validate
      const ratingNum = Number(Review_Count) || 0
      const rating = Math.min(Math.max(ratingNum, 0), 5) // Clamp between 0-5
      
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 >= 0.5
      const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0) // Ensure not negative
      
      setStarCount({
        full: fullStars,
        half: hasHalfStar ? 1 : 0,
        empty: emptyStars,
      })
    } catch (error) {
      console.error("Error calculating star rating:", error)
      // Fallback to all empty stars if error occurs
      setStarCount({ full: 0, half: 0, empty: 5 })
    }
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-500">
      {Array.from({ length: starCount.full }).map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      ))}
      {starCount.half > 0 && (
        <TiStarHalfOutline key="half" size={Star_Size || 20} />
      )}
      {Array.from({ length: starCount.empty }).map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
      ))}
    </div>
  )
}

export default RatingStars