const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return ''
    const genreIds = selectedGenres.map((g)=>g.id);
    return genreIds.reduce((a, b)=>a+','+b)
}

export default useGenre;