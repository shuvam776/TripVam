// Backend/controllers/search.controller.js

import axios from "axios"

/**
 * GET /api/search?q=paris
 */
export const search = async (req, res) => {
  try {
    const { q } = req.query

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      })
    }

    // 🔹 Call AI semantic search service
    // (your already-working AI service)
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/semantic-search`,
      {
        query: q,
      }
    )

    return res.status(200).json({
      success: true,
      query: q,
      results: aiResponse.data?.results || [],
    })
  } catch (error) {
    console.error("Search error:", error.message)

    return res.status(500).json({
      success: false,
      message: "Search failed",
    })
  }
}
