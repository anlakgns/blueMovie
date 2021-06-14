import MovieRoller from "../../shared/UI Components/MovieRoller";

export const MovieList = () => {

  const row = [1, 1, 1, 1, 1, 1, 1];

  return (
        <>
          <MovieRoller
            headline="Action"
            movies={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          />

          <MovieRoller
            headline="Best of Mine"
            movies={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          />

          <MovieRoller
            headline="Action"
            movies={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          />

          <MovieRoller
            headline="Action"
            movies={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          />

          <MovieRoller
            headline="Action"
            movies={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          />
        </>
  );
};
