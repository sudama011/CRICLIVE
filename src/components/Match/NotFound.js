import React, { useEffect } from 'react'

export default function NotFound() {
  // set document title
  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <h2>Not Found</h2>
  )
}