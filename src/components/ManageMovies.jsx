import React, { useEffect, useState } from 'react';
import './ManageMovies.css';

function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [editedMovie, setEditedMovie] = useState(null);
  const [editedShowtimes, setEditedShowtimes] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMoviesAndShowtimes = async () => {
      try {
        const [movieRes, showtimeRes] = await Promise.all([
          fetch('http://localhost:8080/api/movies/View'),
          fetch('http://localhost:8080/api/showtimes/View'),
        ]);

        if (movieRes.ok && showtimeRes.ok) {
          const movieData = await movieRes.json();
          const showtimeData = await showtimeRes.json();
          setMovies(movieData);
          setShowtimes(showtimeData);
        } else {
          console.error('Failed to fetch movies or showtimes');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMoviesAndShowtimes();
  }, []);

  const handleEdit = (movie) => {
    setEditedMovie({ ...movie });
    const filtered = showtimes.filter(st => st.movie.movieID === movie.movieID);
    const mapped = filtered.reduce((acc, st) => {
      acc[st.showtimeID] = { showDate: st.showDate, showTime: st.showTime };
      return acc;
    }, {});
    setEditedShowtimes(mapped);
  };

  const handleChange = (e) => {
    setEditedMovie({
      ...editedMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowtimeChange = (showtimeID, field, value) => {
    setEditedShowtimes(prev => ({
      ...prev,
      [showtimeID]: {
        ...prev[showtimeID],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      const movieResponse = await fetch('http://localhost:8080/api/movies/Update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedMovie),
      });

      if (movieResponse.ok) {
        alert('Movie updated successfully');
        setMovies(movies.map(m => m.movieID === editedMovie.movieID ? editedMovie : m));
      } else {
        alert('Failed to update movie');
      }

      const updatedShowtimesArray = Object.entries(editedShowtimes).map(([showtimeID, values]) => ({
        showtimeID: parseInt(showtimeID),
        showDate: values.showDate,
        showTime: values.showTime,
        movie: {
          movieID: editedMovie.movieID,
        }
      }));
      console.log("🔍 Final showtime payload:", JSON.stringify(updatedShowtimesArray, null, 2));

      const showtimeResponse = await fetch('http://localhost:8080/api/showtimes/Update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedShowtimesArray),
      });

      if (showtimeResponse.ok) {
        alert('Showtimes updated successfully');
        const updated = await showtimeResponse.json();
        setShowtimes(prev => prev.map(st =>
          updated.find(u => u.showtimeID === st.showtimeID) || st
        ));
      } else {
        alert('Failed to update showtimes');
      }

      setEditedMovie(null);
      setEditedShowtimes({});
    } catch (error) {
      alert('Error updating movie or showtimes');
      console.error(error);
    }
  };

  const handleDelete = async (movieID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/Delete?id=${movieID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Movie deleted successfully');
        setMovies(movies.filter(movie => movie.movieID !== movieID));
      } else {
        alert('Failed to delete movie');
      }
    } catch (error) {
      alert('Error deleting movie');
    }
  };

  const getShowtimesForMovie = (movieID) => {
    return showtimes.filter(st => st.movie.movieID === movieID);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.movieName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-movies">
      <h3>Manage Movies</h3>


      <input
        type="text"
        placeholder="Search movies by name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar2"
      />

      <table className="manage-movies-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Type</th><th>Director</th>
            <th>Release</th><th>Duration</th><th>Rating</th>
            <th>Language</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => {
            const movieShowtimes = getShowtimesForMovie(movie.movieID);
            return (
              <React.Fragment key={movie.movieID}>
                <tr>
                  <td>{movie.movieID}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="text" name="movieName" value={editedMovie.movieName} onChange={handleChange} />
                    : movie.movieName}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="text" name="movieType" value={editedMovie.movieType} onChange={handleChange} />
                    : movie.movieType}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="text" name="movieDirector" value={editedMovie.movieDirector} onChange={handleChange} />
                    : movie.movieDirector}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="date" name="movieReleaseDate" value={editedMovie.movieReleaseDate} onChange={handleChange} />
                    : movie.movieReleaseDate}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="number" name="duration" value={editedMovie.duration} onChange={handleChange} />
                    : movie.duration}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="number" name="rating" value={editedMovie.rating} step="0.1" onChange={handleChange} />
                    : movie.rating}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="text" name="language" value={editedMovie.language} onChange={handleChange} />
                    : movie.language}</td>
                  <td>{editedMovie?.movieID === movie.movieID
                    ? <input type="text" name="status" value={editedMovie.status} onChange={handleChange} />
                    : movie.status}</td>
                  <td>
                    {editedMovie?.movieID === movie.movieID ? (
                      <button className="save-btn" onClick={handleSave}>Save</button>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => handleEdit(movie)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(movie.movieID)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>

                {movieShowtimes.length > 0 && (
                  <tr className="showtime-row">
                    <td colSpan="10" style={{ backgroundColor: '#1b1929', color: '#ccc', fontSize: '12px' }} >
                      <strong>Showtimes:</strong>{' '}
                      {editedMovie?.movieID === movie.movieID
                        ? movieShowtimes.map((st) => (
                            <div key={st.showtimeID} style={{ marginBottom: '4px' }}>
                              <input
                                type="date"
                                value={editedShowtimes[st.showtimeID]?.showDate || ''}
                                onChange={(e) => handleShowtimeChange(st.showtimeID, 'showDate', e.target.value)}
                                style={{ marginRight: '8px' }}
                              />
                              <input
                                type="time"
                                value={editedShowtimes[st.showtimeID]?.showTime || ''}
                                onChange={(e) => handleShowtimeChange(st.showtimeID, 'showTime', e.target.value)}
                              />
                            </div>
                          ))
                        : movieShowtimes.map((st, idx) => (
                            <span key={idx}>
                              {st.showDate} @ {st.showTime}{idx < movieShowtimes.length - 1 && ', '}
                            </span>
                          ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMovies;
