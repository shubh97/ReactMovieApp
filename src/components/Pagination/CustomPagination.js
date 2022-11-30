import React, { createFactory } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider } from '@material-ui/core'

const darkTheme = createTheme({
    palette: {
        type: "dark"
    }
});

const CustomPagination = ({setPage, numOfPages=10}) => {

    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0)
    }

  return (
    <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    }}>
    <ThemeProvider theme={darkTheme}>
        <Pagination 
            count={numOfPages}
            onChange={(e)=>handlePageChange(e.target.textContent)}
            color='secondary'
        />
    </ThemeProvider>
    </div>
  )
}

export default CustomPagination
