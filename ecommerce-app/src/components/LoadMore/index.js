import React from 'react'
import Button from './../Forms/Button'

function LoadMore({
   onLoadMoreEvent= ()=>{}
}) {
  return (
    <Button onClick={()=> onLoadMoreEvent()}>
      Load More
    </Button>
  )
}

export default LoadMore