"use client"

import { useState } from "react"
import Pagination from "./pagination"

export default function Demo() {
  const [currentPage, setCurrentPage] = useState(3)
  const totalItems = 160
  const itemsPerPage = 10

  return (
    <div className="p-4">
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

